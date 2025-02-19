import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../../public/src/styles.css";
import Header from '@/components/header';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vremesega",
  description: "Actual wheather in each city",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className='header'>
          <Header />
        </header>
        {children}
        <footer>Footer</footer>  
      </body>
    </html>
  );
}
