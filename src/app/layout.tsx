import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GIS | Understanding of each other",
  description: "Adorable Babies & Josemaria International School - A not-for-profit, private, non-sectarian, co-educational day and boarding school established in September 1955.",
  icons: {
    icon: "https://ext.same-assets.com/1957532446/2937842182.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-rubik antialiased">
        {children}
      </body>
    </html>
  );
}
