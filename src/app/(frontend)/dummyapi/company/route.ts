import { NextResponse } from "next/server";

// Endpoint GET: /api/company
export async function GET() {
  // Data dummy perusahaan
  const data = {
    sejarah: "Bless Kontraktor hadir sebagai jawaban atas kebutuhan masyarakat akan layanan kontraktor dan desain bangunan yang tidak hanya fungsional, tetapi juga menghadirkan nilai estetika dan kemewahan.",
    visi: "Menjadi perusahaan kontraktor dan desain bangunan terpercaya di Indonesia dengan kualitas dan inovasi terbaik.",
    misi: [
      "Memberikan layanan desain dan pembangunan yang detail, transparan, dan profesional.",
      "Menghadirkan solusi efisiensi biaya tanpa mengurangi kualitas hasil pekerjaan.",
      "Menggunakan teknologi terbaru dalam visualisasi dan perencanaan proyek.",
      "Membangun hubungan jangka panjang dengan klien melalui kepercayaan, kepuasan, dan integritas.",
      "Mengembangkan tim yang kompeten, kreatif, dan berkomitmen tinggi dalam setiap proyek."
    ]
  };

  return NextResponse.json(data);
}
