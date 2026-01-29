import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Sorry, we could not find the page you are looking for. It might have been moved or does not exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Link href="/contact" className="btn-outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
