"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  sortOrder: number;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // ambil data dari API
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/faq");
        if (!res.ok) throw new Error("Gagal ambil FAQ");
        const data: FAQ[] = await res.json();

        // urutkan sesuai sortOrder
        const sorted = data.sort((a, b) => a.sortOrder - b.sortOrder);
        setFaqs(sorted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFaqs();
  }, []);

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
      </div>
    </section>
  );
}
