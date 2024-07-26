// cannot convert to client cmp coz exporting metadata

import "./globals.css";
import React from "react";
import DataContextProvider from "../store/data-context";
import type { Metadata } from "next";
import Sidebar from "../components/Sidebar";

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
            <Sidebar />
            {children}
          </main>
        </DataContextProvider>
      </body>
    </html>
  );
}
