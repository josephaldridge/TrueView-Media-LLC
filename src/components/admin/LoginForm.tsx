'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.message ?? 'Sign in failed.');
        setPassword('');
        return;
      }

      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Network error. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="admin-password" className="label">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
          autoFocus
        />
      </div>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !password}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Signing in
          </>
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  );
}
