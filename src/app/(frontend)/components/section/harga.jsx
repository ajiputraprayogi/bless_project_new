"use client";

import { useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

const prices = [
  {
    category: "Small & Medium Size Building",
    description: "Bangunan 0-500 m²",
  },
  {
    category: "Big Size Building",
    description: "Bangunan 501-1000 m²",
  },
  {
    category: "Extra Big Size Building",
    description: "Bangunan >1000 m²",
  },
];

export default function PricePage() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleContact = (category, description) => {
    const message = `Halo Admin, saya ingin menanyakan biaya desain untuk kategori: ${category}, ${description}.`;
    const waUrl = `https://wa.me/6285176965609?text=${encodeURIComponent(
      message
    )}`;
    window.open(waUrl, "_blank");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 bg-black">
      {/* Title */}
      <section className="mb-12 text-center">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
          KONSULTASI JASA DESAIN RUMAH TERBARU TAHUN 2025
        </h1>
        <p className="mt-4 text-sm md:text-base text-neutral-400">
          Untuk mendapatkan konsultasi biaya dari Arsitek kami, silahkan hubungi
          admin via WhatsApp. Proposal harga dilengkapi dengan sketsa denah konsep
          dalam 1–7 hari kerja. Jika diperlukan, bisa dilakukan online meeting awal.
        </p>
      </section>

      {/* Price Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {prices.map((item, i) => (
          <div
            key={i}
            data-aos="fade-up"
            className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-neutral-950 to-neutral-900 p-6 shadow-lg flex flex-col justify-between"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-yellow-400">
                {item.category}
              </h3>
              <p className="mt-2 text-neutral-300">{item.description}</p>
            </div>
            <button
              onClick={() => handleContact(item.category, item.description)}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black shadow-md hover:bg-yellow-400 transition"
            >
              <FiPhoneCall className="size-4" />
              Hubungi CS
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
