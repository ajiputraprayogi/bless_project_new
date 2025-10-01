"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Award {
  id: number;
  title: string;
  year: string;
  image: string;
}

export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await fetch("/dummyapi/awards"); // ganti sesuai API lo
        const data = await res.json();
        setAwards(data);
      } catch (error) {
        console.error("Error fetching awards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-yellow-500">
          <div className="loader"></div>
        </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-6 py-20">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-yellow-400 mb-12">
        Penghargaan Kami 🏆
      </h1>

      {/* Grid Award */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {awards.map((award, i) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setSelectedImage(award.image)}
          >
            <div className="w-full h-56 relative rounded-xl overflow-hidden">
              <Image
                src={award.image}
                alt={award.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold text-yellow-300">
                {award.title}
              </h2>
              <p className="text-gray-300">{award.year}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
          >
            {/* Tombol Exit */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 text-white bg-red-500 hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow-lg"
            >
              ✕
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90%] max-w-4xl h-[70vh]"
            >
              <Image
                src={selectedImage}
                alt="Full Image"
                fill
                className="object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
