import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { RoleSwitcherDock } from "@/components/common/RoleSwitcherDock";
import { NotificationToast } from "@/components/common/NotificationToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "azentio.ai - Enterprise AI & Intelligent Collaboration Portal",
  description: "Enterprise AI showcase, tenant-isolated client sandboxes, and governed collective learning platform by Azentio Software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-azentio-500 selection:text-white`}>
        <AppProvider>
          <NotificationToast />
          {children}
          <RoleSwitcherDock />
        </AppProvider>
      </body>
    </html>
  );
}
