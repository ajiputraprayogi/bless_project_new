// src/app/api/background/route.ts
import { NextResponse } from "next/server";

// API GET untuk ngirim URL background
export async function GET() {
  // Data bisa statis atau dari database
  const data = {
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600", // contoh url gambar random
  };

  return NextResponse.json(data);
}
