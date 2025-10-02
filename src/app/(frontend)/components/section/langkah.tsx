"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiFileText } from "react-icons/fi";

interface FAQItem {
  title: string;
  icon?: string;
  content: any[];
}

export default function StepPage() {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFaq() {
      try {
        const res = await fetch("/dummyapi/langkah");
        const data = await res.json();
        setFaqData(data);
      } catch (err) {
        console.error("Failed to fetch FAQ data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFaq();
  }, []);

  const renderTextWithHighlight = (text: string) => {
    const parts = text.split(/{{highlight:(.+?)}}/);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="text-green-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "HiOutlineDocumentText":
        return <HiOutlineDocumentText size={28} className="text-yellow-500 mb-2" />;
      case "FaCreditCard":
        return <FaCreditCard size={28} className="text-yellow-500 mb-2" />;
      case "FiFileText":
        return <FiFileText size={28} className="text-yellow-500 mb-2" />;
      default:
        return null;
    }
  };

  const renderContent = (content: any[]) => {
    return content.map((item, idx) => {
      if (typeof item === "string") {
        return (
          <p key={idx} className="text-base text-gray-300 mt-2">
            {renderTextWithHighlight(item)}
          </p>
        );
      } else if (item.list) {
        return (
          <ul key={idx} className="list-disc list-inside space-y-1 mt-2 text-base text-gray-300">
            {item.list.map((li: any, i: number) => (
              <li key={i}>{typeof li === "string" ? renderTextWithHighlight(li) : li}</li>
            ))}
          </ul>
        );
      } else if (item.subSection) {
        return (
          <div key={idx} className="mt-2">
            <h3 className="text-md font-semibold text-yellow-400">{item.subSection}</h3>
            {item.text?.map((txt: string, i: number) => (
              <p key={i} className="text-base text-gray-300 mt-1">
                {renderTextWithHighlight(txt)}
              </p>
            ))}
          </div>
        );
      }
    });
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

        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900 p-6 rounded-2xl shadow-lg cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            data-aos="fade-up-left"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              {getIcon(item.icon)}
              <h2 className="text-xl font-semibold text-yellow-500 text-center">{item.title}</h2>
            </div>


            <div
              className={`mt-4 transition-all duration-300 overflow-hidden ${openIndex === index ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              {renderContent(item.content)}
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
