/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  id: number;        // dari API
  title: string;
  desc: string;
  img: string;
  size: string;
}

export default function ServicePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ganti URL sesuai endpoint API kamu
    const fetchProjects = async () => {
      try {
        const res = await fetch("/dummyapi/data"); 
        if (!res.ok) throw new Error("Failed to fetch data");
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
            scrollbar-hide flex flex-wrap content-start gap-6 overflow-x-auto
            max-h-[calc(2*25rem+1.5rem)]
            sm:grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-[300px]
            sm:grid-flow-dense
          "
        >
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id || idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`
                min-w-[100%] sm:min-w-0 
                bg-gray-900 rounded-xl overflow-hidden flex flex-col group ${proj.size}
              `}
            >
              <div className="relative w-full h-64 sm:h-full">
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
                  <p className="text-gray-300 text-sm md:hidden">
  {proj.desc.split(" ").slice(0, 5).join(" ") + "..."}
</p>

{/* Desktop (full) */}
<p className="text-gray-300 text-sm hidden md:block">
  {proj.desc.split(" ").slice(0, 15).join(" ") + "..."}
</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
