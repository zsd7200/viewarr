import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Viewarr",
  description: "UI to see film collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="/" className="absolute top-[5px] left-[10px] text-white hover:text-gray-300 transition"><FontAwesomeIcon icon={faHouseChimney} /></a>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
