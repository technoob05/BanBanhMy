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
  title: "Noodliverse - Hương Vị Mì Ba Miền | Bắc – Trung – Nam",
  description: "Noodliverse mang tinh hoa ẩm thực ba miền Bắc – Trung – Nam vào từng gói mì. Trải nghiệm hương vị Việt Nam hiện đại, sáng tạo và tiện lợi.",
  keywords: "Noodliverse, mì ba miền, mì gà thanh, mì bò cay, mì sữa dừa, mì ăn liền, ẩm thực Việt Nam",
  openGraph: {
    title: "Noodliverse - Hương Vị Mì Ba Miền",
    description: "Khám phá tinh hoa ẩm thực Việt qua từng tô mì",
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
