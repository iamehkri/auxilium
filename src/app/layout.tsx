import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Auxilium.io - Empowering Resilience Through Digital Aid',
  description: 'Your digital ally for modern web development, meaningful marketing, virtual experiences, media development, AI-powered workflows, and strategic consulting.',
  keywords: 'web development, app development, marketing, AI solutions, consulting, digital aid',
  authors: [{ name: 'Auxilium.io' }],
  openGraph: {
    title: 'Auxilium.io - Empowering Resilience Through Digital Aid',
    description: 'Your digital ally for modern web development, meaningful marketing, virtual experiences, media development, AI-powered workflows, and strategic consulting.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auxilium.io - Empowering Resilience Through Digital Aid',
    description: 'Your digital ally for modern web development, meaningful marketing, virtual experiences, media development, AI-powered workflows, and strategic consulting.',
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