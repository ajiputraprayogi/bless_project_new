"use client";

import { motion, Variants } from "framer-motion";
import SpotlightCard from "@/app/(frontend)/components/layout/spotlight";

export interface MottoItem {
  title: string;
  text: string;
  icon: React.ReactNode;
}

interface MottoSectionProps {
  data: MottoItem[];
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function StepCard({ data }: MottoSectionProps) {
  return (
    <motion.section
      className="max-w-7xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      {data.map((item, idx) => (
        <motion.div
          key={idx}
          variants={card}
          animate={{ rotate: 0 }}
          whileHover={{
            scale: 1.05,
            rotate: [0, 2, -2, 0],
            transition: {
              scale: { type: "tween", duration: 0.3 },
              rotate: { type: "tween", duration: 0.4 },
            },
          }}
          className="bg-gray-900 rounded-xl flex flex-col gap-4 cursor-pointer"
        >
          <SpotlightCard
            className="custom-spotlight-card flex flex-col gap-4 relative overflow-hidden"
            spotlightColor="rgba(229, 226, 23, 0.2)"
          >
            {/* Overlay gradien untuk mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent pointer-events-none md:hidden"></div>

            <div>{item.icon}</div>
            <h3 className="font-semibold text-xl text-yellow-400">{item.title}</h3>
            <p className="text-gray-300 flex-1">{item.text}</p>
            <button className="mt-auto w-1/2 md:w-1/3 bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition">
              Pelajari
            </button>
          </SpotlightCard>
        </motion.div>
      ))}
    </motion.section>
  );
}
