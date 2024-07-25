// cannot make into client cmp coz exporting metadata

import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import DataContextProvider from "../store/data-context";

import App from "../components/App";

export const metadata: Metadata = {
  title: "Project Manager App",
  description: "Created using NextJS, TypeScript and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DataContextProvider>
          <main className="h-screen flex align-top gap-8">
            <App />
            {children}
          </main>
        </DataContextProvider>
      </body>
    </html>
  );
}
