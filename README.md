# TrueView Media LLC Website

A modern, professional website for TrueView Media LLC — a web design studio focused on local service businesses.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd "TrueView Media LLC"
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   ├── contact/
│   │   └── page.tsx
│   ├── process/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── work/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── Card.tsx
    ├── ContactForm.tsx
    ├── CTA.tsx
    ├── FAQ.tsx
    ├── Footer.tsx
    ├── Header.tsx
    ├── Section.tsx
    └── index.ts
```

## Pages

- **Home** (`/`) - Main landing page with hero, services, portfolio preview, process, FAQ
- **Services** (`/services`) - Detailed service offerings and pricing
- **Work** (`/work`) - Portfolio grid with case studies
- **Work Detail** (`/work/[slug]`) - Individual case study pages
- **Process** (`/process`) - Step-by-step process explanation
- **About** (`/about`) - Company information and values
- **Contact** (`/contact`) - Contact form and information

## Contact Form Integration

The contact form endpoint is located at `src/app/api/contact/route.ts`. 

### Option 1: Formspree Integration (Recommended)

1. Create an account at [Formspree](https://formspree.io)
2. Create a new form and get your form ID
3. Update the API route to uncomment the Formspree integration code
4. Replace `YOUR_FORMSPREE_ID` with your actual form ID

### Option 2: Custom Email Service

You can integrate any email service (SendGrid, Resend, AWS SES, etc.):

1. Install the required SDK
2. Add your API keys to environment variables
3. Update the API route with your email sending logic

### Environment Variables

Create a `.env.local` file for any sensitive configuration:

```env
# Example for Formspree
FORMSPREE_ID=your_form_id

# Example for email service
EMAIL_API_KEY=your_api_key
EMAIL_FROM=noreply@trueviewmediallc.com
EMAIL_TO=contact@trueviewmediallc.com
```

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import the project in [Vercel](https://vercel.com)
3. Configure environment variables if needed
4. Deploy

### Manual Build

```bash
npm run build
npm start
```

## Features

- ✅ Mobile-first responsive design
- ✅ Semantic HTML & accessibility
- ✅ SEO metadata per page
- ✅ Open Graph metadata
- ✅ Contact form with validation
- ✅ Server-side form handling
- ✅ Sticky navigation with mobile hamburger menu
- ✅ Mobile sticky call button
- ✅ FAQ accordion
- ✅ Portfolio with case studies
- ✅ Fast performance (minimal dependencies)

## Customization

### Colors

Brand colors are defined in `tailwind.config.ts`. The primary brand color is a professional blue that can be adjusted:

```ts
colors: {
  brand: {
    50: '#f0f7ff',
    // ... other shades
    600: '#006fc7', // Primary
    // ...
  }
}
```

### Typography

The site uses Inter font. To change fonts, update:
1. The Google Fonts import in `globals.css`
2. The `fontFamily` configuration in `tailwind.config.ts`

### Content

All content is directly in the page files for easy editing. Update text in:
- `src/app/page.tsx` - Homepage content
- `src/app/services/page.tsx` - Service descriptions and pricing
- `src/app/work/[slug]/page.tsx` - Case study data
- `src/components/FAQ.tsx` - FAQ questions and answers

## Contact Information

- **Phone:** 972-339-0754
- **Email:** contact@trueviewmediallc.com
- **Location:** Texas (serving clients nationwide)

## License

© TrueView Media LLC. All rights reserved.
