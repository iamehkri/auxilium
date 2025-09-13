import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bridging Divides. Building Resilience. — Auxilium.io',
  description: 'Strategic partners in digital transformation. At Auxilium.io, we partner with mission-driven organizations to co-create solutions that address systemic challenges.',
  keywords: 'digital transformation, mission-driven, strategic consulting, nonprofit technology, social impact, systemic change, organizational resilience',
  authors: [{ name: 'Auxilium' }],
  icons: {
    icon: '/logo-icon.png',
    shortcut: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
  openGraph: {
    title: 'Bridging Divides. Building Resilience. — Auxilium.io',
    description: 'Strategic partners in digital transformation. At Auxilium.io, we partner with mission-driven organizations to co-create solutions that address systemic challenges.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bridging Divides. Building Resilience. — Auxilium.io',
    description: 'Strategic partners in digital transformation. At Auxilium.io, we partner with mission-driven organizations to co-create solutions that address systemic challenges.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialColorMode() {
                  const persistedColorMode = window.localStorage.getItem('theme');
                  const hasPersistedPreference = typeof persistedColorMode === 'string';
                  
                  if (hasPersistedPreference) {
                    return persistedColorMode;
                  }
                  
                  const mql = window.matchMedia('(prefers-color-scheme: dark)');
                  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
                  
                  if (hasMediaQueryPreference) {
                    return mql.matches ? 'dark' : 'light';
                  }
                  
                  return 'dark';
                }
                
                const colorMode = getInitialColorMode();
                const root = document.documentElement;
                
                if (colorMode === 'dark') {
                  root.classList.add('dark');
                } else {
                  root.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  )
}
