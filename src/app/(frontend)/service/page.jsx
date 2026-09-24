"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    id: 1,
    icon: "🏛️",
    title: "Layanan Arsitek",
    subtitle: "Dari Bless Luxury Kontraktor",
    desc: `Bless Luxury Kontraktor menghadirkan layanan arsitektur profesional untuk mewujudkan bangunan impian Anda—elegan, fungsional, dan bernilai tinggi. 
Didukung arsitek berpengalaman, kami melayani desain rumah, villa, apartemen, kost, kantor, hingga bangunan komersial. 
Setiap proyek disesuaikan dengan karakter dan kebutuhan klien, memastikan hasil yang mewah, aman, dan nyaman.`,
    tagline: "✨ Mewujudkan Desain dengan Sentuhan Elegan",
  },
  {
    id: 2,
    icon: "🏗️",
    title: "Layanan Kontraktor & Renovasi",
    subtitle: "Bangun & Perbarui dengan Kualitas Premium",
    desc: `Kami menyediakan layanan pembangunan dan renovasi untuk rumah, villa, kantor, hingga bangunan komersial. 
Fokus kami adalah keindahan, kenyamanan, dan ketahanan bangunan. 
Tim profesional kami memastikan proyek selesai tepat waktu, rapi, dan sesuai standar mutu tinggi dengan fleksibilitas anggaran.`,
    tagline: "✨ Kualitas, Kenyamanan, dan Keindahan dalam Setiap Pembangunan",
  },
  {
    id: 3,
    icon: "🪞",
    title: "Desain Interior & Pengerjaan",
    subtitle: "Dari Konsep hingga Realisasi",
    desc: `Kami membantu Anda merancang interior yang indah dan fungsional—serta menangani langsung pengerjaannya agar hasil sesuai konsep. 
Baik Anda sudah punya ide atau masih mencari arah, tim kami siap menghadirkan ruang yang mencerminkan karakter dan kenyamanan Anda.`,
    tagline: "✨ Setiap Detail Ruang Layak Mendapat Sentuhan Kemewahan",
  },
];

export default function ServiceSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <section
      id="layanan"
      className="bg-[#0E0E0E] text-[#EDEBE7] py-28 px-6 md:px-20"
    >
      {/* Header */}
      <div
        data-aos="fade-up"
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-semibold mb-3 text-white">
          Layanan <span className="text-yellow-400">Bless Luxury</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Kami menghadirkan layanan menyeluruh dari desain hingga pembangunan,
          dengan pendekatan modern dan berkelas.
        </p>
      </div>

      {/* Service List */}
      <div className="flex flex-col gap-16">
        {services.map((srv, index) => (
          <div
            key={srv.id}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            className="flex flex-col md:flex-row md:items-center md:gap-12 bg-[#1A1916] border border-[#3E3C38] rounded-3xl p-8 md:p-12 hover:bg-[#22211E] transition-colors"
          >
            {/* Icon */}
            {/* <div className="text-6xl md:text-7xl mb-6 md:mb-0">{srv.icon}</div> */}

            {/* Content */}
            <div>
              <h3 className="text-3xl font-semibold text-yellow-400 mb-2">
                {srv.title}
              </h3>
              <p className="text-lg text-gray-300 mb-4">{srv.subtitle}</p>
              <p className="text-gray-400 leading-relaxed mb-4 whitespace-pre-line">
                {srv.desc}
              </p>
              <p className="text-[#D6C082] font-medium">{srv.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
