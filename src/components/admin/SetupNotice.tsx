import { AlertCircle } from 'lucide-react';

export default function SetupNotice({ missing }: { missing: string[] }) {
  return (
    <div className="max-w-2xl mx-auto mt-12 bg-dark-500/50 border border-white/10 rounded-xl p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-white font-light tracking-wide mb-2">
            Finish the setup
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            The admin area needs these environment variables before it can run.
            Add them in your Vercel project settings, then redeploy.
          </p>
          <ul className="space-y-1 mb-4">
            {missing.map((name) => (
              <li key={name} className="text-sm">
                <code className="text-rose-gold">{name}</code>
              </li>
            ))}
          </ul>
          <p className="text-gray-500 text-xs">
            Setup instructions are in docs/ADMIN.md in the repository.
          </p>
        </div>
      </div>
    </div>
  );
}
