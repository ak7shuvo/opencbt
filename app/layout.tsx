import type { Metadata, Viewport } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import AssistantWidget from "@/components/assistant-widget";
import PwaRegister from "@/components/pwa-register";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600"],
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "OpenCBT — Community-Based Tourism in Sylhet",
  description:
    "A community-led tourism platform connecting travellers with the Khasi and tea garden communities, heritage and homestays of Sylhet, Bangladesh — Jaflong, Khasia Punji, and the tea garden belt.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OpenCBT",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F3A2E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-body`}>
        <Nav />
        <main className="mx-auto max-w-5xl px-6">{children}</main>
        <Footer />
        <AssistantWidget />
        <PwaRegister />
      </body>
    </html>
  );
}
