"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Keunggulan = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  created_at: string;
};

export default function PricingDetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState<Keunggulan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/keunggulan/${slug}`);
        if (!res.ok) throw new Error("Gagal fetch data");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetch detail keunggulan:", err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-yellow-400">
        <div className="min-h-screen flex items-center justify-center text-yellow-500">
          <div className="loader"></div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-red-400">
        Data tidak ditemukan
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 bg-black text-white">
      <article className="flex flex-col items-center text-center gap-6">
        <img
          src={data.image}
          alt={data.title}
          className="w-40 h-40 object-contain rounded-xl shadow-lg bg-white"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">
          {data.title}
        </h1>
        <p className="text-gray-300">{data.description}</p>
        <span className="text-xs text-gray-500">
          Dibuat: {new Date(data.created_at).toLocaleDateString("id-ID")}
        </span>
      </article>
    </main>
  );
}
