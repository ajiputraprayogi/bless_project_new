import type { Metadata } from "next";
import "./globals.css";
import GradualBlur from "./components/layout/gradual";
import Navbar from "./components/layout/Navbar";
import AOSInitializer from "./components/layout/AOSinitializer";
import { Outfit } from "next/font/google"; // ✅ import font
import WhatsAppChatbot from "./components/slices/chat";
import Footer from "./components/layout/Footer";

// Setup Outfit
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bless Luxury Contractor",
  description: "Architect Site",
  icons: {
    icon: "/images/brand/logos.png", // favicon utama
    shortcut: "/favicon.ico", // untuk browser lama
    apple: "/images/brand/logos.png", // iOS homescreen
  },
  openGraph: {
    title: "Bless Luxury Contractor",
    description: "Luxury & Elegant Architect Contractor",
    url: "https://bless-project-new.vercel.app",
    siteName: "Bless Architect",
    images: [
      {
        url: "/images/brand/logos.png", // taruh di /public
        width: 1200,
        height: 630,
        alt: "Bless Architect",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bless Luxury Contractor",
    description: "Luxury & Elegant Architect Contractor",
    images: ["/images/brand/logos.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* ✅ apply Outfit ke body */}
      <body className={outfit.className}>

        {/* Jalankan AOS */}
        <AOSInitializer />

        <section className="relative min-h-screen overflow-hidden bg-black">
          <div className="h-full">
            <Navbar />
            <div className="mb-10"></div>
            {children}
            <Footer/>
            <WhatsAppChatbot />
          </div>

          {/* Gradual Blur fixed di bottom */}
          <div className="fixed bottom-0 left-0 w-full pointer-events-none">
            <GradualBlur
              target="parent"
              position="bottom"
              height="3rem"
              strength={2}
              divCount={5}
              curve="bezier"
              exponential={true}
              opacity={1}
            />
          </div>
        </section>
      </body>
    </html>
  );
}
