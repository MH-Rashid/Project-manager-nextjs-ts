import React, { useState } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <App />
      </body>
    </html>
  );
}
