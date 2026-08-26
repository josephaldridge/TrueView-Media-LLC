'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutTemplate, LogOut, Radar, Users } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Leads', icon: Users },
  { href: '/admin/prospects', label: 'Find prospects', icon: Radar },
  { href: '/admin/previews', label: 'Previews', icon: LayoutTemplate },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <header className="border-b border-white/10 bg-dark-600/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-1">
          <span className="text-sm uppercase tracking-widest text-rose-gold mr-4">
            TrueView Admin
          </span>
          {links.map((link) => {
            const active =
              link.href === '/admin'
                ? pathname === '/admin'
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
        </div>

        <button
          type="button"
          onClick={signOut}
          className="btn-icon-glass inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </header>
  );
}
