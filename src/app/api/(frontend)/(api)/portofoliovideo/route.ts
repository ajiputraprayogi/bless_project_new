import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // ✅ Ambil video portofolio terbaru
    const video = await prisma.portofolio_video.findFirst({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        youtubeId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!video) {
      return NextResponse.json(
        { error: "Data portofolio video tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    console.error("Error mengambil data portofolio video:", error);
    return NextResponse.json(
      { error: "Gagal memuat data portofolio video" },
      { status: 500 }
    );
  }
}
