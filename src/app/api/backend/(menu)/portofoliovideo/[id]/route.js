import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// ✅ Ambil detail portofolio video by ID
export async function GET(req, context) {
  try {
    const id = parseInt(context.params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const video = await prisma.portofolio_video.findUnique({
      where: { id },
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
    console.error("Prisma error (GET Portofolio Video by ID):", error);
    return NextResponse.json(
      { error: "Gagal mengambil data portofolio video" },
      { status: 500 }
    );
  }
}

// ✅ Update portofolio video
export async function PUT(req, context) {
  try {
    const id = parseInt(context.params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const body = await req.json();
    const { title, youtubeId } = body;

    const existing = await prisma.portofolio_video.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Data portofolio video tidak ditemukan" },
        { status: 404 }
      );
    }

    const updated = await prisma.portofolio_video.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        youtubeId: youtubeId ?? existing.youtubeId,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Prisma error (PUT Portofolio Video):", error);
    return NextResponse.json(
      { error: "Gagal update data portofolio video" },
      { status: 500 }
    );
  }
}

// ✅ Hapus portofolio video
export async function DELETE(req, context) {
  try {
    const id = parseInt(context.params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const existing = await prisma.portofolio_video.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Data portofolio video tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.portofolio_video.delete({ where: { id } });

    return NextResponse.json(
      { message: "Portofolio video berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Prisma error (DELETE Portofolio Video):", error);
    return NextResponse.json(
      { error: "Gagal menghapus portofolio video" },
      { status: 500 }
    );
  }
}
