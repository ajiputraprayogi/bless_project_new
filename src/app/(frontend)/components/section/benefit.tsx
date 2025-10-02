"use client";

import { motion } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

export default function BenefitSection() {
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

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-5 md:py-20 bg-gradient-to-b from-black via-neutral-950 to-black">
        
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* KERUGIAN */}
        <motion.div
        //   initial={{ opacity: 0, x: -40 }}
        //   whileInView={{ opacity: 1, x: 0 }}
        //   transition={{ duration: 0.6 }}
        //   viewport={{ once: true }}
        data-aos="fade-right"
          className="rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 shadow-lg"
        >
          <h2 className="text-xl md:text-2xl font-extrabold text-yellow-500 mb-6">
            APA KERUGIAN TANPA JASA ARSITEK ?
          </h2>
          <ul className="space-y-3 text-sm md:text-base text-neutral-300">
            {kerugian.map((point, i) => (
              <li key={i} className="flex gap-3">
                <FiAlertTriangle className="mt-0.5 flex-shrink-0 text-red-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* KEUNTUNGAN */}
        <motion.div
        //   initial={{ opacity: 0, x: 40 }}
        //   whileInView={{ opacity: 1, x: 0 }}
        //   transition={{ duration: 0.6 }}
        //   viewport={{ once: true }}
        data-aos="fade-left"
          className="rounded-3xl border border-yellow-500/40 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 shadow-lg"
        >
          <h2 className="text-xl md:text-2xl font-extrabold text-yellow-400 mb-6">
            MENGAPA BLESS ARCHITECT ?
          </h2>
          <ul className="space-y-3 text-sm md:text-base text-neutral-300">
            {keuntungan.map((point, i) => (
              <li key={i} className="flex gap-3">
                <FiCheckCircle className="mt-0.5 flex-shrink-0 text-green-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
