import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryProvider } from '@/providers/query-provider';
import './globals.css';

const appFont = Inter({
  variable: '--font-app',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Drivo',
  description: 'Sua garagem de veículos',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={`${appFont.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
