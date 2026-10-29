import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thegenerationalcursebreaker.com"),
  title: "The Generational Curse Breaker | Victor L. Evans",
  description:
    "A true account of one family's fight for justice — undue influence, systemic neglect, and the theft of Carrie Evans's legacy, documented over thirty years.",
  keywords: [
    "Victor L. Evans author",
    "The Generational Curse Breaker book",
    "true family story",
    "undue influence",
    "financial exploitation of disabled adults",
    "guardianship",
    "Adult Protective Services",
    "Washington D.C. family history",
  ],
  authors: [{ name: "Victor L. Evans" }],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "The Generational Curse Breaker | Victor L. Evans",
    description:
      "A true account of one family's fight for justice. Thirty years of documentation. Six demands. This book is the audit.",
    siteName: "The Generational Curse Breaker",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Generational Curse Breaker — book cover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Generational Curse Breaker | Victor L. Evans",
    description: "A true account of one family's fight for justice.",
    images: ["/og-image.jpg"],
  },
};

const themeInit = `(function(){try{var s=localStorage.getItem('gcb-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(d?'storm':'dawn');document.documentElement.classList.add(t==='storm'?'dark':'light');document.documentElement.style.colorScheme=(t==='storm'?'dark':'light');}catch(e){document.documentElement.classList.add('dark');}})();`;

const scrollInit = `(function(){var sp=0,ticking=false;function u(){var h=document.documentElement;sp=h.scrollTop/((h.scrollHeight-h.clientHeight)||1);h.style.setProperty('--sp',Math.min(1,Math.max(0,sp)));ticking=false;}
addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(u);ticking=true;}},{passive:true});u();})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script dangerouslySetInnerHTML={{ __html: scrollInit }} />
      </head>
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
