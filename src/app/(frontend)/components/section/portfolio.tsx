/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  desc: string;
  img: string;
  size: string;
  slug: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem("projects");

    if (cached) {
      // ✅ pake cache dulu
      setProjects(JSON.parse(cached));
      setLoading(false);
    } else {
      // ✅ kalau belum ada cache, fetch API
      const fetchProjects = async () => {
        try {
          const res = await fetch("/api/portofolio/");
          if (!res.ok) throw new Error("Failed to fetch data");
          const data: Project[] = await res.json();

          setProjects(data);

          // simpan ke sessionStorage
          sessionStorage.setItem("projects", JSON.stringify(data));
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }
  }, []);

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

      {loading ? (
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
