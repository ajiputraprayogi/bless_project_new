"use client";

import useSWR from "swr";

interface Fitur {
  id: number;
  id_paket: number;
  fitur: string;
}

interface PackageAPI {
  id: number;
  name: string;
  harga: string;
  created_at: string;
  updated_at: string;
  fitur: Fitur[];
}

interface PackageUI {
  name: string;
  price: string;
  features: string[];
  button: string;
  color: string;
  waLink: string;
}

// fetcher untuk SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PriceCard() {
  // pakai SWR
  const { data, error, isLoading } = useSWR<PackageAPI[]>("/api/paket", fetcher, {
    revalidateOnFocus: false, // ga fetch ulang saat tab fokus
    dedupingInterval: 24 * 60 * 60 * 1000, // cache 1 hari
  });

  // fungsi mapping API ke UI
  const mapPackages = (data: PackageAPI[]): PackageUI[] =>
    data.map(pkg => ({
      name: pkg.name,
      price: pkg.harga,
      features: pkg.fitur.map(f => f.fitur),
      button: "Pilih Paket",
      color: getColorById(pkg.id),
      waLink: `https://wa.me/6285176965609?text=Halo%20saya%20ingin%20memesan%20${encodeURIComponent(
        pkg.name
      )}`,
    }));

  // Fungsi warna
  const getColorById = (id: number) => {
    switch (id) {
      case 1:
        return "bg-blue-100 text-blue-700";
      case 2:
        return "bg-green-100 text-green-700";
      case 3:
        return "bg-gray-100 text-gray-700";
      case 4:
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-yellow-500">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Gagal memuat paket.
      </div>
    );
  }

  const packages = data ? mapPackages(data) : [];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16">
      <h2
        data-aos="fade-up"
        className="text-3xl md:text-4xl font-bold text-center tracking-tight bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-4"
      >
        Pilih Paket <br />Jasa Arsitektur
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay={150}
        className="text-gray-400 text-center max-w-2xl mb-12"
      >
        Sesuaikan kebutuhan proyekmu dengan paket yang kami sediakan. Harga
        berdasarkan luas bangunan (per meter persegi).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {packages.map((pkg, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 150}
            className="flex"
          >
            <div className="flex flex-col h-full w-full bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-gray-700 shadow-lg transform transition-transform ease-in-out duration-300 hover:scale-105 hover:shadow-yellow-700/30">
              {/* Header */}
              <div className="px-6 py-6 border-b border-gray-600 flex flex-col items-start gap-3">
                <span
                  className={`inline-block bg-gradient-to-r ${pkg.color} text-sm font-semibold px-4 py-1 rounded-full shadow-md`}
                >
                  {pkg.name}
                </span>
                <span className="inline-block text-yellow-400 text-lg font-bold px-2 rounded-xl">
                  {pkg.price}
                </span>
              </div>

              {/* Features */}
              <ul className="flex-1 px-6 py-6 space-y-3 text-sm text-gray-300">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-400">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <div className="px-6 py-6 border-t border-gray-600">
                <a
                  href={pkg.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center w-full py-2 rounded-xl font-semibold bg-gradient-to-r ${pkg.color} text-black transition-all duration-300 hover:opacity-90 hover:scale-[1.02]`}
                >
                  {pkg.button}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
