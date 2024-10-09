import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material/styles";
import mainTheme from '@/themes/mainTheme'
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next.js Auth0 Integration Example",
  description: "A project made to familiarize myself with Auth0 and next.js"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={mainTheme}>
              <CssBaseline />
              <Navbar />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </UserProvider>
      </body>
    </html>
  );
}
