import LoginForm from '@/components/admin/LoginForm';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-dark-500/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <h1 className="text-xl font-light tracking-wide text-white mb-1">
            Sign in
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            This area is restricted.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
