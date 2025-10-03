/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface Project {
  id: number;
  title: string;
  desc: string;
  img: string;
  size: string;
  slug: string;
}

// fetcher untuk SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PortfolioPage() {
  // pakai SWR
  const { data: projects, error, isLoading } = useSWR<Project[]>("/api/portofolio/", fetcher, {
    revalidateOnFocus: false, // ga re-fetch saat tab fokus lagi
    dedupingInterval: 24 * 60 * 60 * 1000, // 1 hari cache
  });

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-red-500">Gagal memuat proyek.</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen py-16 px-6 md:px-12 lg:px-20">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-yellow-400 uppercase tracking-widest mb-2">
          Karya Kami
        </p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Proyek Desain Terbaru
        </h2>
      </div>

      {isLoading || !projects ? (
        <div className="min-h-screen flex items-center justify-center text-yellow-500">
          <div className="loader"></div>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="
            grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4
            sm:auto-rows-[300px] sm:grid-flow-dense
          "
        >
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id || idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`bg-gray-900 rounded-xl overflow-hidden flex flex-col group ${proj.size}`}
            >
              <Link
                href={`/portfolio/${proj.slug}`}
                className="relative w-full h-64 sm:h-full block"
              >
                <Image
                  src={proj.img}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-lg text-yellow-300 font-semibold mb-2">
                    {proj.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
