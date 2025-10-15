/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useEffect,useRef, useState } from "react";
import StepCard from "./components/section/step";
import BenefitSection from "./components/section/benefit";
// import MottoPage from "./components/section/motto";
import PortfolioPage from "./components/section/portfolio";
import StepSection from "./components/section/tahapan";

import { FiHome } from "react-icons/fi";
import { GiHammerNails, GiDeskLamp } from "react-icons/gi";

export default function LuxuryContractor() {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const stepRef = useRef<HTMLDivElement | null>(null); // ✅ referensi ke StepCard

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

  const handleExploreClick = () => {
    if (stepRef.current) {
      stepRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-[7rem] tracking-wide text-white/90"
          >
            Bless Luxury <br /><span className="text-yellow-400">Kontraktor</span>
          </motion.h1>

          <button
            onClick={handleExploreClick}
            className="mt-8 cursor-pointer group relative inline-flex items-center justify-center overflow-hidden rounded-3xl bg-[#F1D6A7] font-medium w-auto transition-all duration-500 hover:scale-[1.03]"
          >
            <div className="inline-flex h-12 translate-y-0 items-center justify-center px-8 text-[#1C1B18] transition-all duration-500 group-hover:-translate-y-[150%]">
              Eksplor Sekarang
            </div>

            <div className="absolute inline-flex h-24 w-full translate-y-[100%] items-center justify-center text-[#1C1B18] transition-all duration-500 group-hover:translate-y-0">
              <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-[#DDBB6B] transition-all duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
              <span className="z-10 px-8">Let&apos;s Go</span>
            </div>
          </button>

        </div>
      </section>

      {/* Info Section */}
      <div ref={stepRef} className="scroll-mt-32">

      <StepCard data={infoData} />
      </div>

      {/* Portfolio */}
      <PortfolioPage />

      {/* Benefit */}
      <BenefitSection />

      {/* Step Section */}
      <StepSection />

      {/* Motto Section */}
      {/* <MottoPage /> */}
    </div>
  );
}
