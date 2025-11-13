import type { Preview } from '@storybook/nextjs';
import React, { useEffect } from 'react';
import '../src/app/globals.css';
import { ThemeProvider, useTheme } from 'next-themes';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    backgrounds: {
      disable: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'system', icon: 'browser', title: 'System' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      return (
        <ThemeProvider
          attribute="class"
          defaultTheme={theme}
          enableSystem={true}
          disableTransitionOnChange
        >
          <ThemeWrapper theme={theme}>
            <Story />
          </ThemeWrapper>
        </ThemeProvider>
      );
    },
  ],
};

// Helper component to apply theme changes
function ThemeWrapper({ theme, children }: { theme: string; children: React.ReactNode }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return <div className="min-h-screen bg-background text-foreground p-4">{children}</div>;
}

export default preview;
