// src/app/api/features/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const coreFeatures = [
    { label: "Simbol & Status Elit", image: "/images/icons/apple.png" },
    { label: "Tampilan Megah & Elegan", image: "/images/icons/github.png" },
    { label: "Tata Ruang Lega", image: "/images/icons/vk.png" },
    { label: "Interior Lebih Nyaman", image: "/images/icons/apple.png" },
    { label: "Struktur Lebih Aman", image: "/images/icons/github.png" },
    { label: "Long Lasting Style", image: "/images/icons/vk.png" },
    { label: "Cahaya Terang Alami", image: "/images/icons/apple.png" },
    { label: "Sirkulasi Hybrid", image: "/images/icons/github.png" },
    { label: "Material Berkelas", image: "/images/icons/vk.png" },
    { label: "Fasilitas Lengkap", image: "/images/icon/apple.png" },
  ];

  return NextResponse.json(coreFeatures);
}
