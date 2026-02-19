import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fyahbun Creative | Modern Jamaican Food | New York",
  description:
    "Authentic Jamaican jerk chicken and Caribbean flavors in Midtown Manhattan. Catering available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-dark font-[Inter] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
