
import TopNavbar from '@/components/TopNavbar';
import { Lato } from "next/font/google";
import "./globals.css";
import NextAuthProvider from './NextAuthProvider';

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Quill Quest",
  description: "Descubre tu próxima historia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
          <NextAuthProvider>
            <TopNavbar/>
              
              {children}
              
          </NextAuthProvider>
      </body>
    </html>
  );
}
