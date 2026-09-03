import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dandiya-festival-pune-2026.abhi-d92.chatgpt.site'),
  title: 'Dandiya Festival Pune | 17–18 October 2026',
  description: 'Two unforgettable evenings of Garba, Dandiya, live music and festive celebration at Phoenix Marketcity, Pune.',
  openGraph: {
    title: 'Dandiya Festival Pune',
    description: 'Two evenings of Garba, Dandiya, live music and community celebration at Phoenix Marketcity, Pune.',
    type: 'website',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'Dandiya Festival at Phoenix Marketcity, Pune' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dandiya Festival Pune',
    description: 'Two evenings of Garba, Dandiya, live music and community celebration at Phoenix Marketcity, Pune.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
