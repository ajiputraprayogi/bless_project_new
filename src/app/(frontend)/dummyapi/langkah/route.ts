import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      id: 2,
      step_number: 1,
      title: "TAHAP KONSULTASI",
      payment_step_detail: [
        {
          id: 3,
          sub_title: "Informasi Awal",
          description: "Klien memberikan data-data yang diperlukan berupa lokasi lahan, ukuran, style rumah yang disukai, rencana budget, dan rincian kebutuhan ruang."
        },
        {
          id: 4,
          sub_title: "Penawaran Desain",
          description: "Tim Arsitek akan memberikan sketch denah dan penawaran biaya desain berdasarkan perkiraan luasan bangunan yang diperlukan."
        }
      ]
    },
    {
      id: 3,
      step_number: 2,
      title: "TAHAP PEMBAYARAN",
      payment_step_detail: [
        {
          id: 5,
          sub_title: "1. PEMBAYARAN TAHAP PERTAMA",
          description: "Klien melakukan Pembayaran Tahap I sebesar 30% dari total biaya desain untuk Pembuatan Denah/Floor Plan.\nRevisi denah dipersilakan tanpa batas hingga konsep denah disetujui."
        },
        {
          id: 6,
          sub_title: "2. PEMBAYARAN TAHAP KEDUA",
          description: "Klien melakukan Pembayaran Tahap II sebesar 50% dari total biaya desain untuk pembuatan Gambar 3D dan Render Kasar Exterior.\nTahap ini fokus pada bentuk & tampilan bangunan. Revisi hanya diperbolehkan untuk tampilan."
        },
        {
          id: 7,
          sub_title: "3. PEMBAYARAN TAHAP KETIGA",
          description: "Pelunasan 20% untuk pembuatan Visual Render Halus (Final) & Gambar Teknis (Arsitektur, Struktur, Elektrikal, Plumbing).\nFile final berupa Print Out A3 dan Flash Disk softcopy. Tidak ada revisi pada tahap ini."
        }
      ]
    },
    {
      id: 4,
      step_number: 3,
      title: "KELENGKAPAN GAMBAR DESAIN RUMAH",
      payment_step_detail: [
        {
          id: 8,
          sub_title: "1. TAHAP PERTAMA",
          description: "Konsep Denah 2D (2 Dimensi)"
        },
        {
          id: 9,
          sub_title: "2. TAHAP KEDUA",
          description: "Konsep Gambar 3D (3 Dimensi) & contoh view desain 3D."
        },
        {
          id: 10,
          sub_title: "3. TAHAP KETIGA",
          description: "Visual Render Halus sesuai luas bangunan\nRAB Bangunan Standar\nGambar Teknis Arsitektur, Struktur, Elektrikal & Plumbing\nBonus Video 3D Exterior & Interior"
        }
      ]
    }
  ];

  return NextResponse.json(data);
}
