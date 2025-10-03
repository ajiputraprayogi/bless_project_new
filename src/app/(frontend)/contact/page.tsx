"use client";

import { JSX } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";
import Link from "next/link";
import OrderForm from "../components/section/order";

// mapping icon string → react-icon
const iconMap: Record<string, JSX.Element> = {
  instagram: <FaInstagram className="text-yellow-500 text-2xl" />,
  facebook: <FaFacebook className="text-yellow-500 text-2xl" />,
  linkedin: <FaLinkedin className="text-yellow-400 text-2xl" />,
  twitter: <FaTwitter className="text-yellow-400 text-2xl" />,
  email: <FaEnvelope className="text-yellow-400 text-2xl" />,
  whatsapp: <FaWhatsapp className="text-yellow-500 text-2xl" />,
  tiktok: <FaTiktok className="text-yellow-500 text-2xl" />,
};

interface Contact {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ContactPage() {
  const { data, error, isLoading } = useSWR<Contact[]>("/api/kontak", fetcher, {
    dedupingInterval: 24 * 60 * 60 * 1000, // cache 1 jam
    revalidateOnFocus: false,  // gak refetch pas balik tab
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16 flex flex-col items-center justify-center">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="max-w-3xl w-full text-center space-y-10"
      >
        {/* Judul */}
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">
          Hubungi Kami
        </h1>
        <p className="text-gray-300 text-lg">
          Terhubung dengan Bless Architect melalui sosial media atau email.
          Kami siap membantu kebutuhan desain rumah Anda.
        </p>

        {/* Grid Sosial Media */}
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center text-yellow-500">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <p className="text-red-400 text-center">Gagal memuat kontak.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {data?.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="bg-zinc-900 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-md transition"
              >
                {iconMap[item.icon] ?? (
                  <FaEnvelope className="text-yellow-400 text-2xl" />
                )}
                <Link
                  href={item.url}
                  target="_blank"
                  className="font-semibold text-white hover:text-yellow-400 transition"
                >
                  {item.platform}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Order Form */}
      <OrderForm />
    </section>
  );
}
