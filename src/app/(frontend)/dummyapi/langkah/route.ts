import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      title: "TAHAP KONSULTASI",
      icon: "HiOutlineDocumentText",
      content: [
        {
          subSection: "Informasi Awal",
          text: [
            "Klien memberikan data-data yang diperlukan berupa lokasi lahan, ukuran, style rumah yang disukai, rencana budget, dan rincian kebutuhan ruang."
          ]
        },
        {
          subSection: "Penawaran Desain",
          text: [
            "Tim Arsitek akan memberikan sketch denah dan penawaran biaya desain berdasarkan perkiraan luasan bangunan yang diperlukan."
          ]
        }
      ]
    },
    {
      title: "TAHAP PEMBAYARAN",
      icon: "FaCreditCard",
      content: [
        {
          subSection: "1. PEMBAYARAN TAHAP PERTAMA",
          text: [
            "Klien melakukan Pembayaran Tahap I sebesar 30% dari total biaya desain untuk Pembuatan Denah/Floor Plan.",
            "Revisi denah dipersilakan tanpa batas hingga konsep denah disetujui."
          ]
        },
        {
          subSection: "2. PEMBAYARAN TAHAP KEDUA",
          text: [
            "Klien melakukan Pembayaran Tahap II sebesar 50% dari total biaya desain untuk pembuatan Gambar 3D dan Render Kasar Exterior.",
            "Tahap ini fokus pada bentuk & tampilan bangunan. Revisi hanya diperbolehkan untuk tampilan."
          ]
        },
        {
          subSection: "3. PEMBAYARAN TAHAP KETIGA",
          text: [
            "Pelunasan 20% untuk pembuatan Visual Render Halus (Final) & Gambar Teknis (Arsitektur, Struktur, Elektrikal, Plumbing).",
            "File final berupa Print Out A3 dan Flash Disk softcopy. Tidak ada revisi pada tahap ini."
          ]
        }
      ]
    },
    {
      title: "KELENGKAPAN GAMBAR DESAIN RUMAH",
      icon: "FiFileText",
      content: [
        {
          subSection: "1. TAHAP PERTAMA",
          text: ["Konsep Denah 2D (2 Dimensi)"]
        },
        {
          subSection: "2. TAHAP KEDUA",
          text: ["Konsep Gambar 3D (3 Dimensi) & contoh view desain 3D."]
        },
        {
          subSection: "3. TAHAP KETIGA",
          text: [
            "Visual Render Halus sesuai luas bangunan",
            "RAB Bangunan Standar",
            "Gambar Teknis Arsitektur, Struktur, Elektrikal & Plumbing",
            "Bonus Video 3D Exterior & Interior"
          ]
        }
      ]
    }
  ];

  return NextResponse.json(data);
}
