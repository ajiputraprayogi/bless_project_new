"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InteriorPage() {
    const [bgImage, setBgImage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch data banner dari API
    useEffect(() => {
        async function fetchBackground() {
            try {
                const res = await fetch("/api/banner");
                const data = await res.json();

                // filter hanya item aktif
                const activeItems = data.filter((item: any) => item.active === true);

                if (activeItems.length > 0) {
                    // ambil random 1 item aktif
                    const randomItem =
                        activeItems[Math.floor(Math.random() * activeItems.length)];
                    setBgImage(randomItem.img);

                    console.log("🎯 Random banner terpilih:", randomItem.id);
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
        <section
            className="
        relative min-h-screen flex items-center justify-center 
        bg-cover bg-center bg-no-repeat transition-all duration-700
      "
            style={{
                backgroundImage: loading
                    ? "url('/images/interior-bg.jpg')" // fallback
                    : `url(${bgImage})`,
            }}
        >
            {/* Overlay gelap agar teks lebih kontras */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Konten utama */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 text-center px-6 max-w-2xl text-yellow-100"
            >
                {/* Judul */}
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400 drop-shadow-lg"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Interior Modern & Elegan
                </motion.h1>

                {/* Deskripsi */}
                <motion.p
                    className="text-sm md:text-base leading-relaxed text-yellow-200 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Kami menghadirkan desain interior yang menggabungkan keindahan,
                    kenyamanan, dan fungsionalitas. Dari ruang tamu hingga kantor, setiap
                    detail kami rancang untuk menciptakan suasana yang mewah dan hangat.
                </motion.p>

                {/* Tombol Hubungi */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <Link
                        href="https://wa.me/6285176965609?text=Halo%20Bless%2C%20Saya%20berminat%20konsultasi%20terkait%20desain%20interior."
                        target="_blank"
                        className="
    inline-block bg-yellow-500 text-black font-semibold px-6 py-3 
    rounded-full shadow-lg hover:bg-yellow-400 transition-all
  "
                    >
                        Hubungi Admin
                    </Link>

                </motion.div>
            </motion.div>
        </section>
    );
}
