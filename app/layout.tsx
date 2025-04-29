import './globals.css';
import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/components/providers/language-provider';
import { GridBackground } from '@/components/ui/grid-background';
import { DisclaimerModal } from '@/components/disclaimer-modal';
import { websiteSchema } from './schema';
import Script from 'next/script';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'فاحص النطاقات السعودية - Saudi Domain Checker',
  description: 'تحقق من توفر النطاقات السعودية (.sa, .com.sa, .net.sa) وأسعارها. خدمة مجانية للتحقق من توفر النطاقات في السعودية',
  keywords: 'نطاق سعودي, حجز نطاق, domain checker, saudi domains, نطاقات سعودية, sa domains, domain availability',
  authors: [{ name: 'Saudi Domain Checker' }],
  creator: 'Saudi Domain Checker',
  publisher: 'Saudi Domain Checker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    title: 'فاحص النطاقات السعودية - Saudi Domain Checker',
    description: 'تحقق من توفر النطاقات السعودية (.sa, .com.sa, .net.sa) وأسعارها. خدمة مجانية للتحقق من توفر النطاقات في السعودية',
    siteName: 'Saudi Domain Checker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'فاحص النطاقات السعودية - Saudi Domain Checker',
    description: 'تحقق من توفر النطاقات السعودية وأسعارها',
    creator: '@saudidomains',
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_ID',
    yandex: 'YOUR_YANDEX_VERIFICATION_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" suppressHydrationWarning lang="ar" dir="rtl">
      <head>
        <link rel="alternate" hrefLang="en" href="https://dosa.lexardev.xyz/en" />
        <link rel="alternate" hrefLang="ar" href="https://dosa.lexardev.xyz" />
        <link rel="canonical" href="https://dosa.lexardev.xyz" />
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_ID" />
        <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_ID" />
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_ID" />
        <meta name="format-detection" content="telephone=no" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="theme-color" content="#3b82f6" />
        <Script
          id="schema-script"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${cairo.className} ${cairo.variable} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <div className="flex flex-col min-h-screen" dir="auto">
              <DisclaimerModal />
              <GridBackground>
                <div className="relative z-10 flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                </div>
              </GridBackground>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
