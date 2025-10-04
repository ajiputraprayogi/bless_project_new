import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";

// --- Supabase Setup ---
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Supabase environment variables are missing");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// --- Utility Functions ---
// Slugify text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

// Generate unique slug untuk keunggulan
async function generateUniqueSlug(baseSlug: string) {
  let uniqueSlug = baseSlug;
  let count = 1;

  while (await prisma.keunggulan.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${count++}`;
  }

  return uniqueSlug;
}

// =========================================================================
// ✅ GET semua keunggulan
// =========================================================================
export async function GET() {
  try {
    const keunggulan = await prisma.keunggulan.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        description: true,
        created_by: true,
        created_at: true,
      },
      orderBy: { id: "desc" },
    });
    return NextResponse.json(keunggulan);
  } catch (error) {
    console.error("Prisma error (GET Keunggulan):", error);
    return NextResponse.json(
      { error: "Failed to fetch keunggulan" },
      { status: 500 }
    );
  }
}

// =========================================================================
// ✅ POST keunggulan baru + upload image ke Supabase
// =========================================================================
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    let userSlug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title) {
      return NextResponse.json(
        { error: "Judul keunggulan wajib diisi" },
        { status: 400 }
      );
    }

    // Jika slug kosong → generate dari title
    if (!userSlug) {
      userSlug = title;
    }

    const baseSlug = slugify(userSlug);
    const uniqueSlug = await generateUniqueSlug(baseSlug);

    // --- Upload Image (Jika ada) ---
    let imageUrl: string | null = null;
    const bucketName = "keunggulan-images";

    if (imageFile) {
      // ✅ Validasi ukuran file (max 500KB)
      if (imageFile.size > 500 * 1024) {
        return NextResponse.json(
          { error: "Ukuran file maksimal 500KB" },
          { status: 400 }
        );
      }

      // ✅ Validasi format file
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { error: "Format file hanya boleh JPG, PNG, atau WEBP" },
          { status: 400 }
        );
      }

      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${uniqueSlug}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return NextResponse.json(
          { error: `Gagal upload gambar ke ${bucketName}` },
          { status: 500 }
        );
      }

      // ✅ Ambil public URL
      const { data: publicUrl } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      imageUrl = publicUrl.publicUrl;
    }

    const createdBy = 1; // TODO: ganti dengan user login (session)

    // ✅ Simpan ke DB
    const newKeunggulan = await prisma.keunggulan.create({
      data: {
        title,
        slug: uniqueSlug,
        created_by: createdBy,
        image: imageUrl,
        description: description || null,
      },
    });

    return NextResponse.json(newKeunggulan, { status: 201 });
  } catch (error: any) {
    console.error("Prisma error (POST Keunggulan):", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Slug sudah ada. Coba gunakan Judul/Slug lain." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create keunggulan" },
      { status: 500 }
    );
  }
}
