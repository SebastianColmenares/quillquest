
import Navbar from '@/components/TopNavbar';
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
        <meta name="keywords" content="relatos, cuentos, historias cortas, quill, quest, cesun" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://quillquest-tau.vercel.app/" />
      </head>
      <body className={lato.className}>
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
