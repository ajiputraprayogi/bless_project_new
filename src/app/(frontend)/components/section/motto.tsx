"use client";

import { useEffect, useState } from "react";

type Feature = {
  label: string;
  image: string;
  badge?: string;
};

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      className="group relative rounded-2xl bg-gradient-to-br from-neutral-950 to-neutral-950 p-5 shadow-md backdrop-blur hover:-translate-y-1 hover:scale-[1.01] transition"
    >
      {children}
    </div>
  );
}

function FeatureRow({ label, image, badge }: Feature) {
  return (
    <div className="flex md:flex-col items-center gap-3">
      <span className="inline-flex size-9 items-center justify-center rounded-xl border border-yellow-500/40 bg-neutral-900 text-yellow-400 shadow-sm group-hover:shadow-md overflow-hidden">
        <img src={image} alt={label} className="size-5 object-contain" />
      </span>
      <span className="text-sm md:text-base font-medium text-neutral-200">
        {label}
      </span>
      {badge ? (
        <span className="ml-auto inline-flex items-center rounded-full border border-yellow-500/40 bg-yellow-400/10 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-yellow-300">
          {badge}
        </span>
      ) : null}
    </div>
  );
}

export default function MottoPage() {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/dummyapi/features");
      const data = await res.json();
      setFeatures(data);
    }
    fetchData();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 bg-black">
      <section>
        <h2 className="mb-5 text-lg md:text-2xl font-bold text-yellow-400">
          Keunggulan Utama
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.label}>
              <FeatureRow {...f} />
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
