import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/providers/query-provider";
import { Outfit } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
  title: "GoCart. - Shop smarter",
  description: "GoCart. - Shop smarter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <QueryProvider>
          <NuqsAdapter>
            {children}
            <Toaster richColors position="top-right" />
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
