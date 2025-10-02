"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Feature = {
  id: number;
  slug: string;
  title: string;
  desc: string;
  img: string;
};

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      className="group relative rounded-2xl bg-gradient-to-br from-neutral-950 to-neutral-950 p-5 shadow-md backdrop-blur hover:-translate-y-1 hover:scale-[1.01] transition cursor-pointer"
    >
      {children}
    </div>
  );
}

function FeatureRow({ title, desc, img, slug }: Feature) {
  return (
    <Link href={`/pricing/${slug}`} className="flex flex-col items-center justify-center gap-3 text-center h-full">
      <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white text-yellow-400 shadow-sm group-hover:shadow-md overflow-hidden">
        <img src={img} alt={title} className="size-8 object-contain" />
      </span>
      <span className="text-base md:text-lg font-semibold text-yellow-500">
        {title}
      </span>
      <p className="text-sm text-gray-400">{desc}</p>
    </Link>
  );
}

export default function MottoPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/keunggulan");
        const data = await res.json();
        setFeatures(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 bg-black">
      <section>
        <h2 className="mb-5 text-lg md:text-2xl font-bold text-yellow-400 text-center">
          Keunggulan Utama
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.id}>
                <FeatureRow {...f} />
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
