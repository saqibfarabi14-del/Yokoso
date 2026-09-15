import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Shippori_Mincho,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-shippori",
  display: "swap",
});

const zen = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-zen",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yōkoso — Destination Dining in Sylhet",
  description:
    "Fine Pan-Asian dining in Sylhet. Signature sushi boats, dim sum, and a quiet room for private celebrations. Al Madani Tower, Mirboxtula.",
  metadataBase: new URL("https://yokoso.vercel.app"),
  openGraph: {
    title: "Yōkoso — Destination Dining in Sylhet",
    description:
      "Eighteen sushi compositions, two signature boats, and a Pan-Asian kitchen of quiet precision.",
    url: "https://yokoso.vercel.app",
    siteName: "Yōkoso",
    images: [{ url: "/assets/yokoso-og.jpg", width: 1200, height: 630 }],
    locale: "en_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yōkoso — Destination Dining in Sylhet",
    description:
      "Eighteen sushi compositions, two signature boats, and a Pan-Asian kitchen of quiet precision.",
    images: ["/assets/yokoso-og.jpg"],
  },
  icons: {
    icon: [
      { url: "/assets/yokoso-mark-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/yokoso-mark-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/assets/yokoso-mark-180.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${shippori.variable} ${zen.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
