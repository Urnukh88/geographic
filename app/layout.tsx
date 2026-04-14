import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbox";

export const metadata: Metadata = {
  title: "Газарзүйн Атлас",
  description: "Дэлхийн газарзүйг судлаж, шинэ мэдлэг эзэмшээрэй",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="mn">
        <body className="bg-[#F2EDE4] antialiased text-[#1A1209]">
          <div className="flex">
            <Sidebar />

            <div className="flex-1 flex flex-col min-h-screen ml-64">
              <Header />

              <main className="p-8 max-w-7xl mx-auto w-full">{children}</main>
            </div>
          </div>
          <Chatbot />
        </body>
      </html>
    </ClerkProvider>
  );
}
