
import TopNavbar from '@/components/TopNavbar';
import { Lato } from 'next/font/google';
import './globals.css';
import NextAuthProvider from './NextAuthProvider';

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: "Quill Quest",
  description: "Descubre tu próxima historia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={lato.className}>
        <NextAuthProvider>
          <TopNavbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
