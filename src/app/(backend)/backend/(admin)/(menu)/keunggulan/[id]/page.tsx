"use client";

import React, { useEffect, useState } from "react";
import withPermission from "@/components/auth/withPermission";
import { useRouter, useParams } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import SkeletonDefault from "@/components/skeleton/Default";
import FileInput from "@/components/form/input/FileInput";

function EditKeunggulan() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  // State 'slug' dihapus karena akan di-generate/update di backend
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    document.title = "Edit Keunggulan | Admin Panel";

    async function fetchKeunggulan() {
      try {
        // Fetch data keunggulan
        const res = await fetch(`/api/backend/keunggulan/${params.id}`);
        if (!res.ok) throw new Error("Gagal memuat keunggulan");

        const data = await res.json();
        setTitle(data.title || "");       // Ambil 'title'
        // setSlug(data.slug || "");      // Slug tidak perlu disimpan di state
        setDescription(data.description || "");
        setImagePreview(data.image || null);
      } catch (error) {
        console.error(error);
        alert("Gagal memuat data keunggulan");
      } finally {
        setInitialLoading(false);
      }
    }

    fetchKeunggulan();
  }, [params.id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    // Revoke object URL lama sebelum membuat yang baru
    if (imagePreview && imageFile) {
      URL.revokeObjectURL(imagePreview);
    }
    if (file) {
        setImagePreview(URL.createObjectURL(file));
    } else {
        setImagePreview(null);
    }
  };
  
  // Cleanup object URL saat komponen di-unmount
  useEffect(() => {
    return () => {
        if (imageFile && imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    }
  }, [imageFile, imagePreview]);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validasi dasar hanya untuk title
    if (!title) {
        alert("Judul wajib diisi.");
        return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title); // Gunakan 'title'
      // formData.append("slug", slug);   // Hapus 'slug' karena di-handle backend
      formData.append("description", description);
      
      if (imageFile) {
        formData.append("image", imageFile); 
      }
      
      // Kirim permintaan PUT ke backend
      const res = await fetch(`/api/backend/keunggulan/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
         const err = await res.json();
         throw new Error(err.error || "Gagal update keunggulan");
      }

      // Redirect ke halaman daftar
      router.push("/backend/keunggulan");
    } catch (error) {
      console.error(error);
      alert((error as Error).message || "Terjadi kesalahan saat update keunggulan");
      setLoading(false);
    }
  }

  if (initialLoading) {
    return (
      <>
        <PageBreadcrumb pageTitle="Data Keunggulan" />
        <ComponentCard title="Form Edit Keunggulan">
          <SkeletonDefault />
        </ComponentCard>
      </>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Data Keunggulan" />
      <ComponentCard title="Form Edit Keunggulan">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          
          {/* Input untuk Judul (Title) */}
          <div>
            <Label>Judul Keunggulan</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Input Judul Keunggulan"
              disabled={loading}
            />
          </div>

          {/* Input untuk Slug Dihapus */}

          {/* Input untuk Deskripsi */}
          <div>
            <Label>Deskripsi</Label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-transparent dark:border-gray-600"
              rows={3}
              disabled={loading}
            />
          </div>

          {/* Input File Gambar */}
          <div>
            <Label>Gambar</Label>
            <FileInput onChange={handleFileChange} disabled={loading} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 h-32 rounded-md object-cover"
              />
            )}
          </div>

          <div className="flex justify-end">
            <Button
              size="sm"
              className="mr-2"
              variant="danger"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
              disabled={loading}
            >
              Kembali
            </Button>

            <Button size="sm" variant="green" type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}

// Sesuaikan permission default untuk komponen
export default withPermission(EditKeunggulan, "edit-keunggulan");