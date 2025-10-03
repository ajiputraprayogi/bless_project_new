"use client";

import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  sortOrder: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { data, error, isLoading } = useSWR<FAQ[]>("/api/faq", fetcher, {
    dedupingInterval: 24 * 60 * 60 * 1000, // cache 1 jam
    revalidateOnFocus: false, // gak auto refetch saat pindah tab
  });

  const faqs = data ? [...data].sort((a, b) => a.sortOrder - b.sortOrder) : [];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-black text-yellow-500 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10 text-center"
        >
          F.A.Q.{" "}
          <span className="text-yellow-400">
            (Frequently Asked Questions)
          </span>
        </motion.h1>

        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center text-yellow-500">
          <div className="loader"></div>
        </div>
        ) : error ? (
          <p className="text-red-400 text-center">Gagal memuat FAQ.</p>
        ) : (
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900 rounded-2xl shadow-lg cursor-pointer"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="cursor-pointer w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-yellow-400"
                >
                  {item.question}
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 text-base text-gray-300"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
