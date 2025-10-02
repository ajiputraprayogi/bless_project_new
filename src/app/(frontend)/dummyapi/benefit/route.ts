import { NextResponse } from "next/server";

// Data kerugian dan keuntungan
const kerugian = [
  "Miskomunikasi dan kecerobohan dalam membangun",
  "Pelaksana atau kontraktor tidak memiliki acuan",
  "Tampilan Bangunan tidak sesuai ekspektasi",
  "Kesalahan struktur yang membuat bangunan rawan roboh",
  "Pembengkakan biaya saat proses membangun",
  "Property tidak nyaman",
  "Dibangun mahal, dijual tidak laku karena tidak menarik",
  "Pemborosan uang, waktu dan tenaga akibat bongkar tanpa henti",
  "Bangunan yang terkesan asal jadi",
  "Property gelap, lembab, dan tidak sehat",
  "Tata ruang semrawut",
  "Gampang ditipu karena tanpa gambar",
];

const keuntungan = [
  "Quality Control Berlapis, 3-4 Tier Arsitek untuk 1 project",
  "Mengadopsi Kenyamanan ala Liburan di Villa",
  "Tampilan Mewah Tropis Khas Bless Architect Architect",
  "Tata Ruang Lega, Sirkulasi Udara Hybrid dan Cahaya Terang Alami",
  "Mendapatkan Perencanaan Keamanan Struktur",
  "Bantuan Koordinasi Gambar Saat Pembangunan",
  "Optimal untuk Lahan Kecil Ataupun Besar",
  "Mendapatkan 3D Suggest Interior, Video 3D, dan RAB",
  "Garansi Desain 100% Bisa Dibangun",
  "Revisi Sampai Desain Memuaskan",
];

export async function GET() {
  return NextResponse.json({ kerugian, keuntungan });
}
