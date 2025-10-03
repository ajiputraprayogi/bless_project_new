/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import StepCard from "./components/section/step";
import BenefitSection from "./components/section/benefit";
import MottoPage from "./components/section/motto";
import PortfolioPage from "./components/section/portfolio";
import StepSection from "./components/section/tahapan";

import { FiHome } from "react-icons/fi";
import { GiHammerNails, GiDeskLamp } from "react-icons/gi";

export default function LuxuryContractor() {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const infoData = [
    {
      title: "Desain Rumah Mewah",
      text: "Kami menciptakan desain rumah yang mewah dan elegan, sesuai dengan gaya hidup Anda. Setiap detail dirancang untuk memberikan kenyamanan dan kemewahan tiada tara.",
      icon: <FiHome size={32} className="text-yellow-400" />,
    },
    {
      title: "Konstruksi & Renovasi",
      text: "Tim profesional kami menangani konstruksi dan renovasi rumah mewah dengan presisi tinggi. Pastikan proyek selesai tepat waktu dan sesuai standar kualitas premium.",
      icon: <GiHammerNails size={32} className="text-yellow-400" />,
    },
    {
      title: "Konsultasi & Interior",
      text: "Kami memberikan konsultasi desain interior dan eksterior untuk rumah mewah Anda. Transformasikan hunian menjadi karya seni yang memukau dan nyaman untuk keluarga.",
      icon: <GiDeskLamp size={32} className="text-yellow-400" />,
    },
  ];

useEffect(() => {
  async function fetchBackground() {
    try {
      const res = await fetch("/api/banner");
      const data = await res.json();

      // filter hanya yang active
      const activeItems = data.filter((item: any) => item.active === true);

      if (activeItems.length > 0) {
        // ambil random 1 item
        const randomItem = activeItems[Math.floor(Math.random() * activeItems.length)];
        setBgImage(randomItem.img);

        console.log("Random ID terpilih:", randomItem.id);
      }
    } catch (err) {
      console.error("Failed to fetch background:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchBackground();
}, []);


  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background dynamic */}
        {!loading && bgImage && (
          <img
            src={bgImage}
            alt="Hero House"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative z-10 text-center max-w-2xl px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400 text-glow-gold">
            Bless Luxury <br /> <span className="text-white">Contractor</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Transformasikan rumah impian Anda menjadi kenyataan <br />
            Solusi Tepat, Hunian Hebat.
          </p>
        </motion.div>
      </section>

      {/* Info Section */}
      <StepCard data={infoData} />

      {/* Portfolio */}
      <PortfolioPage />

      {/* Benefit */}
      <BenefitSection />

      {/* Step Section */}
      <StepSection />

      {/* Motto Section */}
      <MottoPage />
    </div>
  );
}
