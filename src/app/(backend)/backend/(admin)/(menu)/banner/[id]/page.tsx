"use client";

import React, { useEffect, useState, useRef } from "react";
import withPermission from "@/components/auth/withPermission";
import { useRouter, useParams } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import SkeletonDefault from "@/components/skeleton/Default";
import FileInput from "@/components/form/input/FileInput";

function EditBanner() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [isActive, setIsActive] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const previewRef = useRef<string | null>(null);

  useEffect(() => {
    document.title = "Edit Banner | Admin Panel";

    async function fetchBanner() {
      try {
        const res = await fetch(`/api/backend/banner/${params.id}`);
        if (!res.ok) throw new Error("Gagal memuat banner");

        const data = await res.json();
        setIsActive(data.is_active ?? true);
        setImagePreview(data.image || null);
      } catch (error) {
        console.error(error);
        alert("Gagal memuat data banner");
      } finally {
        setInitialLoading(false);
      }
    }

    fetchBanner();
  }, [params.id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      // ✅ Validasi ukuran file (maks 500KB)
      if (file.size > 500 * 1024) {
        alert("Ukuran file maksimal 500KB");
        event.target.value = "";
        return;
      }

      // ✅ Validasi tipe file (JPG, PNG, WEBP)
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        alert("Format file hanya boleh JPG, PNG, atau WEBP");
        event.target.value = "";
        return;
      }

      setImageFile(file);

      // preview baru
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      const url = URL.createObjectURL(file);
      previewRef.current = url;
      setImagePreview(url);
    } else {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
      setImageFile(null);
      setImagePreview(null);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("is_active", String(isActive));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`/api/backend/banner/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal update banner");

      router.push("/backend/banner");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat update banner");
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return (
      <>
        <PageBreadcrumb pageTitle="Data Banner" />
        <ComponentCard title="Form Edit Banner">
          <SkeletonDefault />
        </ComponentCard>
      </>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Edit Banner" />
      <ComponentCard title="Form Edit Banner">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <Label>Upload Gambar (Max 500KB, JPG/PNG/WEBP)</Label>
            <FileInput onChange={handleFileChange} disabled={loading} accept="image/jpeg,image/png,image/webp"/>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 h-32 rounded-md object-cover border"
              />
            )}
          </div>

          <div>
            <Label>Status</Label>
            <select
              className="w-full rounded-md border border-gray-300 p-2 text-sm"
              value={isActive ? "true" : "false"}
              onChange={(e) => setIsActive(e.target.value === "true")}
              disabled={loading}
            >
              <option value="true">Aktif</option>
              <option value="false">Nonaktif</option>
            </select>
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

export default withPermission(EditBanner, "edit-banner");
