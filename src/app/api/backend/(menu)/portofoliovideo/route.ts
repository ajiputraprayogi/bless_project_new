import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// ✅ GET untuk ambil semua portofolio video
export async function GET() {
  try {
    const videos = await prisma.portofolio_video.findMany({
      select: {
        id: true,
        title: true,
        youtubeId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("Prisma error (GET Portofolio Video):", error);
    return NextResponse.json(
      { error: "Gagal mengambil data portofolio video" },
      { status: 500 }
    );
  }
}

// ✅ POST untuk buat portofolio video baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, youtubeId } = body as { title?: string; youtubeId?: string };

    if (!title || !youtubeId) {
      return NextResponse.json(
        { error: "Judul dan YouTube ID wajib diisi" },
        { status: 400 }
      );
    }

    const newVideo = await prisma.portofolio_video.create({
      data: {
        title,
        youtubeId,
      },
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("Prisma error (POST Portofolio Video):", error);
    return NextResponse.json(
      { error: "Gagal membuat portofolio video" },
      { status: 500 }
    );
  }
}
