"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    title: "8X",
    subtitle: "Peningkatan tingkat konversi",
    text: `"Kami butuh rumah yang modern dan mampu menarik klien. Tim Bless Luxury bantu bikin desain arsitektur online yang sukses menaikkan konversi meeting hingga 850% hanya dalam 3 minggu. Sangat direkomendasikan!"`,
    name: "Freddy Darto",
    role: "Direktur Perbankan",
    dark: false,
  },
  {
    title: "2X",
    subtitle: "Kenaikan jumlah prospek",
    text: `"Desain rumah yang rapi dan profesional bikin klien makin percaya. Dalam dua minggu saja, jumlah leads meningkat dua kali lipat. Prosesnya juga transparan dan cepat."`,
    name: "Pak Kamso",
    role: "Pengusaha Mebel",
    dark: false,
  },
  {
    subtitle: "Klien puas & proyek tepat waktu",
    text: `"Proses kerja sangat komunikatif dan hasilnya memuaskan. Semua desain arsitektur yang kami mau bisa diwujudkan dengan tampilan yang rapi dan elegan. Sesuai ekspektasi!"`,
    name: "Heri Kurniawan",
    role: "Pebisnis",
    dark: false,
  },
  {
    subtitle: "MVP rumah yang jadi pembeda",
    text: `"Bless Luxuri bantu kami bikin MVP rumah arsitektur dengan hasil visual yang clean dan profesional. Branding kami langsung naik kelas. Worth every rupiah!"`,
    name: "Margareta",
    role: "Spesialis Marketing",
    dark: true,
  },
];


export default function TestimoniPage() {
    return (
        <main className="min-h-screen bg-[#0C0C0C] text-gray-100 px-6 md:px-20 py-24">
            {/* Header Section */}
            <section className="text-center max-w-3xl mx-auto mb-20">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-yellow-500 tracking-wider uppercase mb-2"
                >
                    Testimoni
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-semibold text-yellow-400 mb-4"
                >
                    Results that Speak Volume
                </motion.h1>
                <p className="text-gray-400 text-lg">
                    Cari tahu bagaimana pengalaman klien kami setelah bekerja sama.
                </p>
            </section>

            {/* Testimonials Grid */}
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className={`rounded-2xl p-8 flex flex-col justify-between transition border border-[#1F1F1F] shadow-sm hover:shadow-md hover:border-yellow-500 duration-300 ${t.dark ? "bg-[#1A1A1A]" : "bg-[#141414]"
                            }`}
                    >
                        <div>
                            {t.title && (
                                <h2 className="text-3xl font-bold mb-1 text-yellow-400">
                                    {t.title}
                                </h2>
                            )}
                            {t.subtitle && (
                                <p className="text-lg font-medium text-gray-200 mb-5">
                                    {t.subtitle}
                                </p>
                            )}
                            <p className="italic text-gray-400 leading-relaxed">{t.text}</p>
                        </div>
                        <div className="mt-6">
                            <p className="font-semibold text-white">{t.name}</p>
                            <p className="text-sm text-gray-500">{t.role}</p>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Footer CTA */}
            <section className="text-center mt-20">
                <p className="text-gray-500 text-sm mb-4">
                    Semua Testimoni kami cantumkan tanpa rekayasa proyek fiktif
                </p>
                <button className="cursor-pointer group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl border border-yellow-600/30 bg-[#0E0E0E] font-medium shadow-[0_0_15px_rgba(255,215,0,0.08)]">
                    <div className="inline-flex h-12 translate-y-0 items-center justify-center px-8 text-yellow-400 transition duration-500 group-hover:-translate-y-[150%]">
                        Tunggu Apalagi
                    </div>
                    <div className="absolute inline-flex h-20 w-full translate-y-[100%] items-center justify-center text-black transition duration-500 group-hover:translate-y-0">
                        <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                        <span className="z-10 font-semibold">Hubungi Sekarang</span>
                    </div>
                </button>

            </section>
        </main>
    );
}
