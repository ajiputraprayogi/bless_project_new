/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import StepCard from "./components/section/step";
import BenefitSection from "./components/section/benefit";
import MottoPage from "./components/section/motto";
import PortfolioPage from "./components/section/portfolio";
import StepSection from "./components/section/tahapan";

export default function LuxuryContractor() {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const infoData = [
    {
      title: "Desain Rumah Mewah",
      text: "Kami menciptakan desain rumah yang mewah dan elegan, sesuai dengan gaya hidup Anda. Setiap detail dirancang untuk memberikan kenyamanan dan kemewahan tiada tara.",
      icon: <img src="/images/icon/home.png" alt="home" className="w-8 h-8" />,
    },
    {
      title: "Konstruksi & Renovasi",
      text: "Tim profesional kami menangani konstruksi dan renovasi rumah mewah dengan presisi tinggi. Pastikan proyek selesai tepat waktu dan sesuai standar kualitas premium.",
      icon: <img src="/images/icon/hammer.png" alt="hammer" className="w-8 h-8" />,
    },
    {
      title: "Konsultasi & Interior",
      text: "Kami memberikan konsultasi desain interior dan eksterior untuk rumah mewah Anda. Transformasikan hunian menjadi karya seni yang memukau dan nyaman untuk keluarga.",
      icon: <img src="/images/icon/lamp.png" alt="lamp" className="w-8 h-8" />,
    },
  ];

  useEffect(() => {
    async function fetchBackground() {
      try {
        // contoh API dummy (ganti sesuai kebutuhanmu)
        const res = await fetch("/dummyapi/background");
        const data = await res.json();

        // misalnya API balikin { url: "https://..." }
        setBgImage(data.url);
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
