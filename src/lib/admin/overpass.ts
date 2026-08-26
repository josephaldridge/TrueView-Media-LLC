/**
 * Finds businesses with no website using OpenStreetMap data.
 *
 * Two public endpoints are involved, both free and keyless:
 *   - Nominatim resolves a place name to a bounding box
 *   - Overpass runs the actual query against OSM
 *
 * Both are volunteer-run and ask that clients identify themselves and keep
 * request volume modest, which is why every call sends a User-Agent and the
 * result count is capped.
 */

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
/**
 * The main instance intermittently returns an HTML error page with HTTP 200
 * when its dispatcher is busy, so we try mirrors in turn and validate that
 * what came back is actually JSON.
 */
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
];

const USER_AGENT =
  'TrueViewMediaLeadFinder/1.0 (+https://trueviewmediallc.com; contact@trueviewmediallc.com)';

export const PROSPECT_CATEGORIES = {
  all: 'All business types',
  food: 'Restaurants, cafes & bars',
  shop: 'Retail & shops',
  trades: 'Trades & craft businesses',
  services: 'Professional services & offices',
  health: 'Health & wellness',
} as const;

export type ProspectCategory = keyof typeof PROSPECT_CATEGORIES;

export interface Prospect {
  sourceRef: string;
  name: string;
  category: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  lat: number | null;
  lon: number | null;
  alreadySaved?: boolean;
}

interface OverpassElement {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

/**
 * Overpass filters for "this tag is absent or empty". Applying them to every
 * website-ish tag is what actually selects businesses with no web presence.
 */
const NO_WEBSITE = '["website"!~"."]["contact:website"!~"."]["url"!~"."]';

/**
 * National chains are the main source of false positives: OSM often has no
 * website tag for a Goodyear or a UPS Store even though one plainly exists.
 * Excluding anything carrying brand/operator tags removes most of them.
 */
const NO_CHAIN = '["brand"!~"."]["brand:wikidata"!~"."]["operator"!~"."]';

function selectorsFor(category: ProspectCategory): string[] {
  const food =
    '["amenity"~"^(restaurant|cafe|bar|pub|fast_food|ice_cream|bakery|food_court)$"]';
  const shop = '["shop"]';
  const trades = '["craft"]';
  const services =
    '["office"]';
  const health =
    '["amenity"~"^(dentist|doctors|veterinary|pharmacy|clinic)$"]';
  const extraServices =
    '["amenity"~"^(car_repair|car_wash|driving_school|childcare|hairdresser)$"]';

  switch (category) {
    case 'food':
      return [food];
    case 'shop':
      return [shop];
    case 'trades':
      return [trades];
    case 'services':
      return [services, extraServices];
    case 'health':
      return [health];
    case 'all':
    default:
      return [food, shop, trades, services, health, extraServices];
  }
}

export interface GeocodedArea {
  displayName: string;
  boundingBox: [string, string, string, string]; // south, north, west, east
}

export async function geocodeArea(query: string): Promise<GeocodedArea | null> {
  const url = `${NOMINATIM_URL}?q=${encodeURIComponent(query)}&format=json&limit=1`;
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
    // Nominatim results are stable; caching keeps us well inside their policy.
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Location lookup failed (${response.status})`);
  }

  const results = (await response.json()) as Array<{
    display_name: string;
    boundingbox: [string, string, string, string];
  }>;

  if (!results.length) return null;

  return {
    displayName: results[0].display_name,
    boundingBox: results[0].boundingbox,
  };
}

function buildQuery(
  area: GeocodedArea,
  category: ProspectCategory,
  limit: number
): string {
  const [south, north, west, east] = area.boundingBox;
  const bbox = `${south},${west},${north},${east}`;

  const body = selectorsFor(category)
    .map(
      (selector) =>
        `  nwr${selector}["name"]${NO_WEBSITE}${NO_CHAIN}(${bbox});`
    )
    .join('\n');

  return `[out:json][timeout:60];\n(\n${body}\n);\nout center tags ${limit};`;
}

async function runOverpass(query: string): Promise<{ elements?: OverpassElement[] }> {
  let lastError = 'OpenStreetMap did not respond';

  for (const endpoint of OVERPASS_ENDPOINTS) {
    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'User-Agent': USER_AGENT,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${encodeURIComponent(query)}`,
        cache: 'no-store',
      });
    } catch {
      lastError = 'Could not reach OpenStreetMap';
      continue;
    }

    if (response.status === 429 || response.status === 504) {
      lastError = 'OpenStreetMap is rate limiting right now';
      continue;
    }

    const text = await response.text();
    // A busy dispatcher returns an HTML error body with a 200 status.
    if (!response.ok || !text.trimStart().startsWith('{')) {
      lastError = 'OpenStreetMap is busy';
      continue;
    }

    try {
      return JSON.parse(text) as { elements?: OverpassElement[] };
    } catch {
      lastError = 'OpenStreetMap returned an unreadable response';
    }
  }

  throw new Error(`${lastError}. Wait a moment and try again.`);
}

export interface FindOptions {
  category?: ProspectCategory;
  limit?: number;
  /** Businesses with no phone number cannot be acted on, so default to hiding them. */
  requirePhone?: boolean;
}

export async function findProspects(
  areaQuery: string,
  options: FindOptions = {}
): Promise<{ area: GeocodedArea; prospects: Prospect[]; totalFound: number }> {
  const { category = 'all', limit = 200, requirePhone = true } = options;
  const area = await geocodeArea(areaQuery);
  if (!area) {
    throw new Error(
      `Could not find "${areaQuery}". Try a more specific place, like "Plano, Texas".`
    );
  }

  const data = await runOverpass(buildQuery(area, category, limit));

  const prospects = (data.elements ?? [])
    .map((element): Prospect | null => {
      const tags = element.tags ?? {};
      const name = tags.name?.trim();
      if (!name) return null;

      const houseNumber = tags['addr:housenumber'];
      const street = tags['addr:street'];
      const city = tags['addr:city'];
      const addressParts = [
        [houseNumber, street].filter(Boolean).join(' '),
        city,
        tags['addr:state'],
      ].filter(Boolean);

      return {
        sourceRef: `${element.type}/${element.id}`,
        name,
        category:
          tags.shop ?? tags.amenity ?? tags.craft ?? tags.office ?? null,
        phone: tags.phone ?? tags['contact:phone'] ?? null,
        email: tags.email ?? tags['contact:email'] ?? null,
        address: addressParts.length ? addressParts.join(', ') : null,
        lat: element.lat ?? element.center?.lat ?? null,
        lon: element.lon ?? element.center?.lon ?? null,
      };
    })
    .filter((p): p is Prospect => p !== null);

  // Overpass can return the same place as both a node and a way.
  const seen = new Set<string>();
  const deduped = prospects.filter((p) => {
    const key = `${p.name}|${p.lat?.toFixed(4)}|${p.lon?.toFixed(4)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Businesses with a phone number are the ones you can actually act on.
  deduped.sort((a, b) => {
    if (Boolean(a.phone) !== Boolean(b.phone)) return a.phone ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const filtered = requirePhone ? deduped.filter((p) => p.phone) : deduped;

  return { area, prospects: filtered, totalFound: deduped.length };
}
