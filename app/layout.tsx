"use client";

import { SessionProvider } from "next-auth/react";
import Header from "./components/Header";

import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Header />
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
