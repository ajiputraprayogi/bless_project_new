"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";

export default function AddPortfolioVideoButton() {
  const router = useRouter();

  function handleAdd() {
    router.push("/backend/portofolio-video/create"); // ✅ arahkan ke halaman tambah video
  }

  return (
    <Button
      size="xs"
      variant="primary"
      type="button"
      onClick={handleAdd}
    >
      Tambah Video
    </Button>
  );
}
