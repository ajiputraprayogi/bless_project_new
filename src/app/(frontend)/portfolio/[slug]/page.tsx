/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Project {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  created_at: string;
}

export default function ProjectSlugPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/portofolio/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch project");

        const data: Project = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Error fetch project:", err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-yellow-500">
    <div className="loader"></div>
  </div>;
  if (!project) return <p className="text-center text-red-400">Project not found</p>;

  const adminNumber = "6285176965609";

  // ✅ Pesan WA otomatis
  const waMessage = encodeURIComponent(
    `Halo Admin, saya tertarik dengan project: ${project?.name}`
  );

  return (
    <div className="bg-black text-white min-h-screen py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-yellow-300">
          {project.name}
        </h1>

        <div className="relative w-full h-[400px] md:h-[600px] mb-8 rounded-xl overflow-hidden">
          <Image
            src={project.image || "/images/placeholder.webp"}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>

        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          {project.description}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Created at: {new Date(project.created_at).toLocaleString()}
        </p>

        {/* ✅ Tombol Hubungi Admin */}
        <a
          href={`https://wa.me/${adminNumber}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl hover:bg-yellow-300 transition"
        >
          Hubungi Admin
        </a>
      </div>
    </div>
  );
}
