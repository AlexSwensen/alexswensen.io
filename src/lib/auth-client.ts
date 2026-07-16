import { createAuthClient } from 'better-auth/react';
import { twoFactorClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect({ twoFactorMethods }) {
        const methods = twoFactorMethods ?? [];
        const path = methods.includes('totp') ? '/auth/two-factor' : '/auth/two-factor';
        window.location.href = path;
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
