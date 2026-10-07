'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutGrid, LogOut, Plus, Users } from 'lucide-react';

const LINKS = [
  { href: '/portal', label: 'Dashboard', icon: LayoutGrid, exact: true },
  { href: '/portal/leads', label: 'Companies', icon: Users, exact: false },
];

export default function PortalNav({
  email,
  role,
}: {
  email: string;
  role: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <header className="border-b border-white/10 bg-dark-600/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-16">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-sm uppercase tracking-widest text-rose-gold mr-4 hidden sm:inline">
            TrueView Sales
          </span>
          {LINKS.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/portal/leads/new"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:block text-xs text-gray-500 truncate max-w-[220px]">
            {email || role}
          </span>
          <button
            type="button"
            onClick={signOut}
            className="btn-icon-glass inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
