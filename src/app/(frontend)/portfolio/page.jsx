"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PortfolioPage from "../components/section/portfolio";

export default function Portfolio() {
  // List video (bisa ganti id sesuai YouTube)
  const videos = [
    { id: "MusSy_FV_Gg", title: "Rumah Komtemporer" },
    { id: "VLCVOeDcd7I", title: "Loft Modern" },
    { id: "qaOF4TAoJDc", title: "Rumah Minimalis" },
    { id: "fLvE9mORMxw", title: "Rumah Americano" },
    
  ];

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <>
     <PortfolioPage />
    <section className="min-h-screen bg-black text-yellow-400 px-6 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Video Portfolio</h1>
        <p className="text-gray-300 text-lg">
          Kumpulan project video kami yang menampilkan karya terbaik.
        </p>
      </div>

      {/* Grid Video */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {videos.map((video, i) => (
          <div
            key={video.id}
            className="bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-yellow-500/30"
            data-aos="fade-up"
            data-aos-delay={i * 200} // bikin stagger
          >
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.id}?autoplay=0&mute=1&loop=0&controls=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
