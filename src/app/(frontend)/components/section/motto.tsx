"use client";

import useSWR from "swr";
import Link from "next/link";

type Feature = {
  id: number;
  slug: string;
  title: string;
  desc: string;
  img: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
    <Link
      href={`/pricing/${slug}`}
      className="flex flex-col items-center justify-center gap-3 text-center h-full"
    >
      <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white text-yellow-400 shadow-sm group-hover:shadow-md overflow-hidden">
        <img src={img} alt={title} className="size-8 object-contain" />
      </span>
      <span className="text-base md:text-lg font-semibold text-yellow-500">
        {title}
      </span>
      {/* <p className="text-sm text-gray-400">{desc}</p> */}
    </Link>
  );
}

export default function MottoPage() {
  const { data, error, isLoading } = useSWR<Feature[]>("/api/keunggulan", fetcher, {
    dedupingInterval: 24 * 60 * 60 * 1000, // 1 jam
    revalidateOnFocus: false,  // biar gak refetch tiap pindah tab
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 bg-black">
      <section>
        <h2 className="mb-5 text-lg md:text-2xl font-bold text-yellow-400 text-center">
          Keunggulan Utama
        </h2>

        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center text-yellow-500">
          <div className="loader"></div>
        </div>
        ) : error ? (
          <p className="text-red-400">Gagal memuat data.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((f) => (
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
