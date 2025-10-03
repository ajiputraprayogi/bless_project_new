"use client";

import useSWR from "swr";
import { motion } from "framer-motion";
import Image from "next/image";

// Definisi tipe untuk member tim
type TeamMember = {
  id: number;
  title: string;
  desc: string;
  img: string;
  size?: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TeamPage() {
  const { data, error, isLoading } = useSWR<TeamMember[]>("/api/tim", fetcher, {
    dedupingInterval: 24 * 60 * 60 * 1000, // cache 1 jam
    revalidateOnFocus: false,  // gak auto-refetch tiap pindah tab
  });

  return (
    <>
      {/* Team Section */}
      <section>
        <div className="text-center mt-20 md:mt-25 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-yellow-400">
            Tim Kami
          </h2>
          <p className="text-gray-400">
            Orang-orang di balik karya terbaik kami
          </p>
        </div>

        {isLoading ? (
          // Loading state
          <div className="min-h-screen flex items-center justify-center text-yellow-500">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="min-h-screen flex items-center justify-center text-red-400">
            Gagal memuat data tim.
          </div>
        ) : (
          // Data tim
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] sm:auto-rows-[320px] grid-flow-dense"
          >
            {data?.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`relative overflow-hidden rounded-2xl bg-zinc-900 group ${member.size ?? ""}`}
              >
                <Image
                  src={member.img}
                  alt={member.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-lg font-semibold text-yellow-300">
                    {member.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </>
  );
}
