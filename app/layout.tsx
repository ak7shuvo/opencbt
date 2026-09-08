import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import AssistantWidget from "@/components/assistant-widget";
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
    "A community-based tourism platform connecting travellers with the people, places, heritage and experiences of Sylhet, Bangladesh.",
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
      </body>
    </html>
  );
}
