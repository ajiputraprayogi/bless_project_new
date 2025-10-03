"use client";

import useSWR from "swr";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

type Detail = {
  id: number;
  detail: string;
};

type Item = {
  id: number;
  judul: string;
  type: "kelebihan" | "kekurangan";
  kelebihan_kekurangan_detail: Detail[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BenefitSection() {
  const { data, error, isLoading } = useSWR<Item[]>(
    "/api/kelebihan-kekurangan",
    fetcher,
    {
          revalidateOnFocus: false, // ga re-fetch saat tab fokus lagi
    dedupingInterval: 24 * 60 * 60 * 1000, // 1 hari cache
    }
  );

  if (isLoading) {
    return (
      <div className="text-center text-neutral-400 py-20">
        Loading data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 py-20">
        Gagal memuat data.
      </div>
    );
  }

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-5 md:py-20 bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {data?.map((item) => (
          <motion.div
            key={item.id}
            data-aos={item.type === "kekurangan" ? "fade-right" : "fade-left"}
            className={`rounded-3xl border ${
              item.type === "kekurangan"
                ? "border-yellow-500/30"
                : "border-yellow-500/40"
            } bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 shadow-lg`}
          >
            <h2
              className={`text-xl md:text-2xl font-extrabold mb-6 ${
                item.type === "kekurangan"
                  ? "text-yellow-500"
                  : "text-yellow-400"
              }`}
            >
              {item.judul.toUpperCase()}
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-neutral-300">
              {item.kelebihan_kekurangan_detail.map((point) => (
                <li key={point.id} className="flex gap-3">
                  {item.type === "kekurangan" ? (
                    <FiAlertTriangle className="mt-0.5 flex-shrink-0 text-red-500" />
                  ) : (
                    <FiCheckCircle className="mt-0.5 flex-shrink-0 text-green-400" />
                  )}
                  <span>{point.detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
