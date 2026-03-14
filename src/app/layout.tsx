import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADJIS | Nurturing Little Steps to Big Steps",
  description: "Adorable Babies & Josemaria International School - A not-for-profit, private, non-sectarian, co-educational day and boarding school established in 2010.",
  icons: {
    icon: "/images/logo1.jpg",
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
