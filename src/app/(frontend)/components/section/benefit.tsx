"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

type BenefitData = {
  kerugian: string[];
  keuntungan: string[];
};

export default function BenefitSection() {
  const [data, setData] = useState<BenefitData>({ kerugian: [], keuntungan: [] });

  useEffect(() => {
    fetch("/dummyapi/benefit")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-5 md:py-20 bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">

        {/* KERUGIAN */}
        <motion.div
          data-aos="fade-right"
          className="rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 shadow-lg"
        >
          <h2 className="text-xl md:text-2xl font-extrabold text-yellow-500 mb-6">
            APA KERUGIAN TANPA JASA ARSITEK ?
          </h2>
          <ul className="space-y-3 text-sm md:text-base text-neutral-300">
            {data.kerugian.map((point, i) => (
              <li key={i} className="flex gap-3">
                <FiAlertTriangle className="mt-0.5 flex-shrink-0 text-red-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* KEUNTUNGAN */}
        <motion.div
          data-aos="fade-left"
          className="rounded-3xl border border-yellow-500/40 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 shadow-lg"
        >
          <h2 className="text-xl md:text-2xl font-extrabold text-yellow-400 mb-6">
            MENGAPA BLESS ARCHITECT ?
          </h2>
          <ul className="space-y-3 text-sm md:text-base text-neutral-300">
            {data.keuntungan.map((point, i) => (
              <li key={i} className="flex gap-3">
                <FiCheckCircle className="mt-0.5 flex-shrink-0 text-green-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
