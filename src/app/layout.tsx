import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/ai/ChatBot";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MìMart - Thiên Đường Mì Gói | Mì Ly | Mì Tô",
  description: "Cửa hàng mì trực tuyến #1 Việt Nam. Đa dạng mì gói, mì ly, mì tô từ các thương hiệu nổi tiếng. Giao hàng nhanh, giá tốt nhất!",
  keywords: "mì gói, mì ly, mì tô, mì ăn liền, mì cay, mì hàn quốc, samyang, hảo hảo, omachi",
  openGraph: {
    title: "MìMart - Thiên Đường Mì Gói",
    description: "Cửa hàng mì trực tuyến #1 Việt Nam",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
