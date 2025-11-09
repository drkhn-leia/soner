import { LanguageProvider } from "@/lib/LanguageProvider";
import Script from "next/script";

import type { Metadata } from "next";

import { Geist, Oswald, Poppins, Onest } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["100", "200", "400", "700", "900"],
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-oswald",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nost Copy",
  description: "Nost Copy - Soner Coşkun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Hidrasyondan önce <html lang> değerini cookie ile senkronla */}
        <Script id="set-lang" strategy="beforeInteractive">
          {`
            (function(){
              try {
                var m = document.cookie.match(/(?:^|;\\s*)lang=([^;]+)/);
                var c = m && m[1] ? decodeURIComponent(m[1]) : "en";
                document.documentElement.setAttribute("lang", c);
              } catch(e) {}
            })();
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${oswald.variable} ${poppins.variable} ${onest.variable} antialiased`}
      >
        <LanguageProvider defaultLang="tr">
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
