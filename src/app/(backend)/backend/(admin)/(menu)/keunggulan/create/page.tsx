"use client";

import React, { useState, useEffect, useRef } from "react";
import withPermission from "@/components/auth/withPermission";
import { useRouter } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import FileInput from "@/components/form/input/FileInput";
import Button from "@/components/ui/button/Button";

function CreateKeunggulan() {
  // State 'slug' dihapus karena akan digenerate di backend
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      setImageFile(file);

      // bersihkan URL lama
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);

      const url = URL.createObjectURL(file);
      previewRef.current = url;
      setPreviewUrl(url);
    } else {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
      setImageFile(null);
      setPreviewUrl(null);
    }
  };

  // cleanup hanya saat unmount
  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validasi dasar, hanya 'title' yang wajib diisi
    if (!title) {
      alert("Judul Keunggulan wajib diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title); 
    // formData.append("slug", slug); -> Dihapus
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    setLoading(true);

    try {
      const res = await fetch("/api/backend/keunggulan", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal membuat keunggulan");
      }

      // Redirect setelah berhasil
      router.push("/backend/keunggulan");
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Tambah Keunggulan" />
      <ComponentCard title="Form Tambah Keunggulan">
        <form onSubmit={handleSubmit} className="grid gap-4">
          
          {/* Input untuk Title (Judul Keunggulan) */}
          <div>
            <Label>Judul Keunggulan</Label>
            <Input
              type="text"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul keunggulan"
            />
          </div>

          {/* Input untuk Slug Dihapus */}
          
          {/* Input untuk Deskripsi */}
          <div>
            <Label>Deskripsi</Label>
            <textarea
              className="w-full rounded-md border border-gray-300 p-2"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi keunggulan"
            />
          </div>

          {/* Input File Gambar */}
          <div>
            <Label>Upload Gambar</Label>
            <FileInput onChange={handleFileChange} className="custom-class" />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 max-h-48 rounded border border-gray-300 object-cover"
              />
            )}
          </div>

          <div className="flex justify-end">
            <Button
              size="sm"
              variant="danger"
              type="button"
              onClick={() => router.back()}
              className="mr-2"
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
export default withPermission(CreateKeunggulan, "add-keunggulan");