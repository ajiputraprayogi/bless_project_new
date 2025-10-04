import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";
import slugify from "slugify";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Supabase environment variables are missing");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET_NAME = "keunggulan-images";

// --- Helper ---
function extractFilePathFromUrl(url) {
  const parts = url.split(`${BUCKET_NAME}/`);
  return parts[1] || null;
}

// =========================================================================
// ✅ GET detail keunggulan
// =========================================================================
export async function GET(req, context) {
  try {
    const id = Number(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const keunggulan = await prisma.keunggulan.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        description: true,
        created_by: true,
        created_at: true,
      },
    });

    if (!keunggulan) {
      return NextResponse.json({ error: "Keunggulan tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(keunggulan, { status: 200 });
  } catch (error) {
    console.error("Prisma error (GET Keunggulan by ID):", error);
    return NextResponse.json({ error: "Gagal mengambil keunggulan" }, { status: 500 });
  }
}

// =========================================================================
// ✅ PUT update keunggulan
// =========================================================================
export async function PUT(req, context) {
  try {
    const id = Number(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const formData = await req.formData();
    const title = formData.get("title")?.toString() || null;
    const description = formData.get("description")?.toString() || null;
    const file = formData.get("image");

    const existing = await prisma.keunggulan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Keunggulan tidak ditemukan" }, { status: 404 });
    }

    // --- Slug handling ---
    let finalSlug = existing.slug;
    if (title && title !== existing.title) {
      const baseSlug = slugify(title, { lower: true, strict: true });
      let tempSlug = baseSlug;
      let counter = 1;

      while (true) {
        const duplicate = await prisma.keunggulan.findUnique({ where: { slug: tempSlug } });
        if (!duplicate || duplicate.id === id) break;
        tempSlug = `${baseSlug}-${counter++}`;
      }

      finalSlug = tempSlug;
    }

    let imageUrl = existing.image;

    // --- File upload ---
    if (file instanceof File && file.size > 0) {
      // Hapus file lama
      if (existing.image) {
        const oldFilePath = extractFilePathFromUrl(existing.image);
        if (oldFilePath) {
          await supabase.storage.from(BUCKET_NAME).remove([oldFilePath]);
        }
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const fileName = `${finalSlug}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, buffer, { contentType: file.type, upsert: true });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return NextResponse.json({ error: "Gagal upload file ke Supabase" }, { status: 500 });
      }

      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
      imageUrl = data?.publicUrl ?? existing.image;
    }

    const updated = await prisma.keunggulan.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        slug: finalSlug,
        description: description ?? existing.description,
        image: imageUrl,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Prisma error (PUT Keunggulan):", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Slug sudah ada. Gunakan judul lain." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Gagal update keunggulan" }, { status: 500 });
  }
}

// =========================================================================
// ✅ DELETE hapus keunggulan
// =========================================================================
export async function DELETE(req, context) {
  try {
    const id = Number(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const existing = await prisma.keunggulan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Keunggulan tidak ditemukan" }, { status: 404 });
    }

    if (existing.image) {
      const oldFilePath = extractFilePathFromUrl(existing.image);
      if (oldFilePath) {
        await supabase.storage.from(BUCKET_NAME).remove([oldFilePath]);
      }
    }

    await prisma.keunggulan.delete({ where: { id } });

    return NextResponse.json({ message: "Keunggulan berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Prisma error (DELETE Keunggulan):", error);
    return NextResponse.json({ error: "Gagal menghapus keunggulan" }, { status: 500 });
  }
}
