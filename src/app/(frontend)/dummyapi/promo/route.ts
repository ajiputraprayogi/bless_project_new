import { NextResponse } from "next/server";

// Dummy data promo, anggap ini data dari DB
const promo = {
  id: 1,
  title: "Promo Diskon",
  description: "Promo spesial hari ini, diskon 50% untuk semua layanan!",
  discount: 50,
};

export async function GET() {
  return NextResponse.json(promo);
}
