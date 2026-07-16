'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Mode = 'totp' | 'backup';

export default function TwoFactorPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('totp');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'totp') {
      const { error: err } = await authClient.twoFactor.verifyTotp({ code, trustDevice: true });
      if (err) {
        setError(err.message ?? 'Invalid code.');
      } else {
        router.push('/');
        router.refresh();
      }
    } else {
      const { error: err } = await authClient.twoFactor.verifyBackupCode({
        code,
        trustDevice: false,
      });
      if (err) {
        setError(err.message ?? 'Invalid backup code.');
      } else {
        router.push('/');
        router.refresh();
      }
    }

    setLoading(false);
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Two-factor verification</CardTitle>
          <CardDescription>
            {mode === 'totp'
              ? 'Enter the 6-digit code from your authenticator app.'
              : 'Enter one of your recovery backup codes.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleVerify} className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="code" className="text-sm font-medium">
                {mode === 'totp' ? 'Authenticator code' : 'Backup code'}
              </label>
              <input
                id="code"
                type="text"
                autoComplete="one-time-code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.trim())}
                placeholder={mode === 'totp' ? '000000' : 'xxxxxxxx-xxxx'}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm tracking-widest focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verifying…' : 'Verify'}
            </Button>
          </form>

          <div className="text-center">
            {mode === 'totp' ? (
              <button
                type="button"
                onClick={() => {
                  setMode('backup');
                  setCode('');
                  setError('');
                }}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
              >
                Use a backup code instead
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMode('totp');
                  setCode('');
                  setError('');
                }}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
              >
                Use authenticator app instead
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
