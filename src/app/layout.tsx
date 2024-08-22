import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/provider/AuthProvider";
import QueryProvider from "@/provider/QueryProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ELSA - Electrical Solution Applicatiton | By PLN Haleyora Power",
  description:
    "ELSA (Electrical Solution Application) is a web-based application that helps PLN Haleyora Power to manage their electrical solution and products to their end users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body className={manrope.className}>
        <AuthProvider>
          <QueryProvider>
            <Toaster richColors position="top-right" theme="light" />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
