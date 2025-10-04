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

function EditPortfolioVideo() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    document.title = "Edit Portofolio Video | Admin Panel";

    async function fetchVideo() {
      try {
        const res = await fetch(`/api/backend/portofoliovideo/${params.id}`);
        if (!res.ok) throw new Error("Gagal memuat data video");

        const data = await res.json();
        setTitle(data.title || "");
        setYoutubeId(data.youtubeId || "");
      } catch (error) {
        console.error(error);
        alert("Gagal memuat data video");
      } finally {
        setInitialLoading(false);
      }
    }

    fetchVideo();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/backend/portofoliovideo/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          youtubeId,
        }),
      });

      if (!res.ok) throw new Error("Gagal update data video");

      router.push("/backend/portofoliovideo");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat update video");
      setLoading(false);
    }
  }

  if (initialLoading) {
    return (
      <>
        <PageBreadcrumb pageTitle="Portofolio Video" />
        <ComponentCard title="Form Edit Video">
          <SkeletonDefault />
        </ComponentCard>
      </>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Portofolio Video" />
      <ComponentCard title="Form Edit Video">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <Label>Judul Video</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Input judul video"
              disabled={loading}
            />
          </div>

          <div>
            <Label>YouTube ID</Label>
            <Input
              type="text"
              id="youtubeId"
              name="youtubeId"
              value={youtubeId}
              required
              onChange={(e) => setYoutubeId(e.target.value)}
              placeholder="Contoh: MusSy_FV_Gg"
              disabled={loading}
            />
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

export default withPermission(EditPortfolioVideo, "edit-portofolio-video");
