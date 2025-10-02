"use client";

import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
import LogoMeaningPage from "../components/section/logo";

interface TeamMember {
  id: number;
  title: string;
  desc: string;
  img: string;
  size: string;
}

export default function ProfilePage() {

  const [activeTab, setActiveTab] = useState<"visi" | "misi" | null>(null);

  return (
    <div className="bg-black text-white min-h-screen py-16 px-3 md:px-12 lg:px-0 space-y-20">

      {/* Sejarah Perusahaan */}
      <section
        className="max-w-4xl mx-auto text-center space-y-6 mb-10"
        data-aos="fade-up"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-left md:text-center text-yellow-400 px-5 md:px-0">
          Sejarah Perusahaan
        </h2>
        <p className="text-gray-300 leading-relaxed text-left md:text-center px-5 md:px-0">
          Bless Kontraktor hadir sebagai jawaban atas kebutuhan masyarakat akan
          layanan kontraktor dan desain bangunan yang tidak hanya fungsional,
          tetapi juga menghadirkan nilai estetika dan kemewahan. ...
        </p>
      </section>

      {/* Visi Misi */}
      <section className="max-w-3xl mx-auto">
        <div className="flex justify-center gap-4 mb-8 relative">
          {/* Visi */}
          <div className="group relative">
            <button
              className="px-6 py-2 rounded-full font-semibold bg-zinc-800 text-gray-300 transition"
              onClick={() =>
                setActiveTab((prev) => (prev === "visi" ? null : "visi"))
              }
            >
              Visi
            </button>

            <div
              className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 bg-zinc-900 p-4 rounded-xl shadow-lg transition-all duration-300 z-10
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              ${activeTab === "visi" ? "opacity-100 visible" : ""}`}
            >
              <p className="text-yellow-300 leading-relaxed">
                Menjadi perusahaan kontraktor dan desain bangunan terpercaya di
                Indonesia...
              </p>
            </div>
          </div>

          {/* Misi */}
          <div className="group relative">
            <button
              className="px-6 py-2 rounded-full font-semibold bg-zinc-800 text-gray-300 transition"
              onClick={() =>
                setActiveTab((prev) => (prev === "misi" ? null : "misi"))
              }
            >
              Misi
            </button>

            <div
              className={`absolute top-full mt-2 -translate-x-1/2 w-100 bg-zinc-900 px-8 py-6 md:px-8 md:py-6 rounded-xl shadow-lg transition-all duration-300 z-10
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              ${activeTab === "misi" ? "opacity-100 visible" : ""}`}
            >
              <ul className="list-disc list-outside text-yellow-300 space-y-2">
                <li>
                  Memberikan layanan desain dan pembangunan yang detail,
                  transparan, dan profesional.
                </li>
                <li>
                  Menghadirkan solusi efisiensi biaya tanpa mengurangi kualitas
                  hasil pekerjaan.
                </li>
                <li>
                  Menggunakan teknologi terbaru dalam visualisasi dan perencanaan
                  proyek.
                </li>
                <li>
                  Membangun hubungan jangka panjang dengan klien melalui
                  kepercayaan, kepuasan, dan integritas.
                </li>
                <li>
                  Mengembangkan tim yang kompeten, kreatif, dan berkomitmen tinggi
                  dalam setiap proyek.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Meaning */}
      <LogoMeaningPage />
    </div>
  );
}
