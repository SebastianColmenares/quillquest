
import TopNavbar from '@/components/TopNavbar';
import { Cabin } from "next/font/google";
import "./globals.css";
import NextAuthProvider from './NextAuthProvider';

const cabin = Cabin({
  weight: '500',
  subsets: ['latin'],
})

export const metadata = {
  title: "Quill Quest",
  description: "Descubre tu próxima historia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cabin.className}>
          <NextAuthProvider>
            <TopNavbar/>
              
              {children}
              
          </NextAuthProvider>
      </body>
    </html>
  );
}
