"use client";

import useSWR from "swr";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiFileText } from "react-icons/fi";
import { useState } from "react";

interface PaymentStepDetail {
  id: number;
  sub_title: string;
  description: string;
}

interface StepItem {
  id: number;
  step_number: number;
  title: string;
  icon?: string;
  payment_step_detail: PaymentStepDetail[];
}

// fetcher function untuk SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StepPage() {
const { data: steps, error } = useSWR<StepItem[]>("/api/steppayment", fetcher, {
  dedupingInterval: 1000 * 60 * 60, // cache 1 jam
  revalidateOnFocus: true,          // fetch ulang saat tab aktif
});

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "HiOutlineDocumentText":
        return <HiOutlineDocumentText size={28} className="text-yellow-500 mb-2" />;
      case "FaCheckCircle":
        return <FaCheckCircle size={28} className="text-yellow-500 mb-2" />;
      case "FiFileText":
        return <FiFileText size={28} className="text-yellow-500 mb-2" />;
      default:
        return <HiOutlineDocumentText size={28} className="text-yellow-500 mb-2" />;
    }
  };

  if (error) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Failed to load data.</p>
      </section>
    );
  }

  if (!steps) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="min-h-screen flex items-center justify-center text-yellow-500">
          <div className="loader"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-yellow-500">
          TAHAPAN PEMESANAN JASA ARSITEK DESAIN RUMAH
        </h1>

        {steps.map((step, index) => (
          <div
            key={step.id}
            className="bg-zinc-900 p-6 rounded-2xl shadow-lg cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              {getIcon(step.icon)}
              <h2 className="text-xl font-semibold text-yellow-500 text-center">{step.title}</h2>
            </div>

            <div
              className={`mt-4 transition-all duration-300 overflow-hidden ${
                openIndex === index ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {step.payment_step_detail.map((detail) => (
                <div key={detail.id} className="mt-4">
                  <h3 className="text-md font-semibold text-yellow-400">{detail.sub_title}</h3>
                  <p className="text-base text-gray-300 mt-1 whitespace-pre-line">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center pt-6 border-t border-yellow-700">
          <p className="text-base text-yellow-400 flex items-center justify-center gap-2">
            <span className="hidden md:block">
              <FaCheckCircle />
            </span>{" "}
            Semua prosedur ini mengikuti standar profesional jasa arsitek desain rumah.
          </p>
        </div>
      </div>
    </section>
  );
}
