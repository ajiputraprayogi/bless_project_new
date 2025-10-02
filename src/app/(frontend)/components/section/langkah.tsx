"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiFileText } from "react-icons/fi";

interface PaymentStepDetail {
  id: number;
  sub_title: string;
  description: string;
}

interface StepItem {
  id: number;
  step_number: number;
  title: string;
  payment_step_detail: PaymentStepDetail[];
}

export default function StepPage() {
  const [steps, setSteps] = useState<StepItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSteps() {
      try {
        const res = await fetch("/api/steppayment");
        const data = await res.json();
        setSteps(data);
      } catch (err) {
        console.error("Failed to fetch step data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSteps();
  }, []);

  const getIconByStepNumber = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <HiOutlineDocumentText size={28} className="text-yellow-500 mb-2" />;
      case 2:
        return <FaCreditCard size={28} className="text-yellow-500 mb-2" />;
      case 3:
        return <FiFileText size={28} className="text-yellow-500 mb-2" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-2xl md:text-2xl font-bold text-center text-yellow-500">
          TAHAPAN PEMESANAN JASA ARSITEK DESAIN RUMAH
        </h1>

        {steps.map((step, index) => (
          <div
            key={step.id}
            className="bg-zinc-900 p-6 rounded-2xl shadow-lg cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            data-aos="fade-up-left"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              {getIconByStepNumber(step.step_number)}
              <h2 className="text-xl font-semibold text-yellow-500 text-center">{step.title}</h2>
            </div>

            <div
              className={`mt-4 transition-all duration-300 overflow-hidden ${
                openIndex === index ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {step.payment_step_detail.map((detail) => (
                <div key={detail.id} className="mt-3">
                  <h3 className="text-md font-semibold text-yellow-400">{detail.sub_title}</h3>
                  <p className="text-base text-gray-300 mt-1 whitespace-pre-line">{detail.description}</p>
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
