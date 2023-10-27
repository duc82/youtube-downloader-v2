import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.scss";
import Control from "./components/Control/Control";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youtube Downloader",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <section className="main">
          <div className="container">
            <Control />
            {children}
          </div>
        </section>
      </body>
    </html>
  );
}
