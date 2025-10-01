"use client";

import React, { useState, useEffect } from "react";
import withPermission from "@/components/auth/withPermission";
// Import yang diperlukan untuk Edit (useRouter, useParams)
import { useRouter, useParams } from "next/navigation"; 
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

// Tipe data yang disesuaikan untuk Edit (memiliki ID opsional)
type StepDetail = {
    id?: number; 
    sub_title: string;
    description: string;
};

function EditStepPayment() {
    const router = useRouter();
    // Mengambil ID dari path parameter
    const params = useParams();
    const stepId = params.id as string; 

    const [stepNumber, setStepNumber] = useState<number | "">("");
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState<StepDetail[]>([{ sub_title: "", description: "" }]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true); // State untuk memuat data awal

    // =========================================================================
    // LOGIKA FETCH DATA UNTUK EDIT
    // =========================================================================
    useEffect(() => {
        if (!stepId) {
            setFetching(false);
            return;
        }

        const fetchStep = async () => {
            try {
                const res = await fetch(`/api/backend/steppayment/${stepId}`);
                
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || "Gagal mengambil data step payment");
                }
                
                const data = await res.json();
                
                setStepNumber(data.step_number);
                setTitle(data.title || "");
                
                // Memetakan payment_step_detail dari API ke state details
                const fetchedDetails: StepDetail[] = data.payment_step_detail.map((d: any) => ({
                    id: d.id, // ID disertakan untuk update, tapi tidak ditampilkan
                    sub_title: d.sub_title,
                    description: d.description,
                }));

                setDetails(fetchedDetails.length > 0 ? fetchedDetails : [{ sub_title: "", description: "" }]);

            } catch (error) {
                console.error("Fetch Error:", error);
                alert(`Error: ${(error as Error).message}`); // Menggunakan alert seperti template add
                router.push("/backend/steppayment"); 
            } finally {
                setFetching(false);
            }
        };

        fetchStep();
    }, [stepId, router]);
    
    // =========================================================================
    // HANDLER FORM
    // =========================================================================

    // Tambah baris subtitle+description
    const addDetailRow = () => setDetails([...details, { sub_title: "", description: "" }]);

    // Hapus baris subtitle+description
    const removeDetailRow = (index: number) => {
        const newDetails = details.filter((_, i) => i !== index);
        setDetails(newDetails);
    };

    // Update nilai sub_title/description
    const handleDetailChange = (index: number, field: "sub_title" | "description", value: string) => {
        const newDetails = [...details];
        // Penting: mempertahankan ID detail yang sudah ada
        newDetails[index] = { ...newDetails[index], [field]: value }; 
        setDetails(newDetails);
    };

    // Handler submit (UPDATE)
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!stepId || stepNumber === "") return; // Pengecekan stepId

        if (details.some(d => !d.sub_title || !d.description)) {
            alert("Step number dan semua subjudul + deskripsi harus diisi!"); // Menggunakan alert
            return;
        }

        // Kirim hanya detail yang valid dan terisi penuh
        const validDetails = details.filter(d => d.sub_title && d.description);

        const body = JSON.stringify({
            step_number: Number(stepNumber),
            title,
            details: validDetails,
        });

        setLoading(true);

        try {
            const res = await fetch(`/api/backend/steppayment/${stepId}`, {
                method: "PUT", // Metode PUT untuk UPDATE
                headers: { "Content-Type": "application/json" },
                body,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Gagal memperbarui step payment");
            }

            router.push("/backend/steppayment");
        } catch (error) {
            console.error(error);
            alert((error as Error).message); // Menggunakan alert
        } finally {
            setLoading(false);
        }
    }

    // Tampilan Loading
    if (fetching) return <p>Memuat data...</p>;
    
    // Tampilan jika ID tidak ada
    if (!stepId) return <p>ID Step Payment tidak ditemukan.</p>;


    return (
        <div>
            {/* Judul Breadcrumb disesuaikan untuk Edit */}
            <PageBreadcrumb pageTitle="Edit Step Payment" /> 
            {/* Judul ComponentCard disesuaikan untuk Edit */}
            <ComponentCard title="Form Edit Step Payment"> 
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                        <Label>Step Number</Label>
                        <Input
                            type="number"
                            name="stepNumber"
                            // ✅ FIX: Konversi min ke string untuk kompatibilitas tipe
                            min={"1"} 
                            required
                            // ✅ FIX: Pastikan value dikirim sebagai string
                            value={String(stepNumber)} 
                            onChange={(e) =>
                                setStepNumber(e.target.value === "" ? "" : Number(e.target.value))
                            }
                            placeholder="Masukkan nomor step"
                        />
                    </div>

                    <div>
                        <Label>Judul</Label>
                        <Input
                            type="text"
                            name="title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Judul Step Payment"
                        />
                    </div>

                    <div className="space-y-4">
                        {details.map((detail, index) => (
                            <div
                                // ✅ IMPROVEMENT: Gunakan ID detail sebagai key (fallback ke index untuk baris baru)
                                key={detail.id || index} 
                                className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 relative bg-white dark:bg-gray-800"
                            >
                                {/* Menghilangkan p tag yang menampilkan ID detail */}
                                <div className="mb-2">
                                    <Label>Sub Judul</Label>
                                    <Input
                                        type="text"
                                        placeholder="Sub Judul"
                                        value={detail.sub_title}
                                        onChange={(e) => handleDetailChange(index, "sub_title", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-2">
                                    <Label>Deskripsi</Label>
                                    <textarea
                                        placeholder="Deskripsi"
                                        value={detail.description}
                                        onChange={(e) => handleDetailChange(index, "description", e.target.value)}
                                        required
                                        className="w-full rounded-md border border-gray-300 p-2 dark:bg-gray-800 dark:border-gray-700"
                                    />
                                </div>

                                {details.length > 1 && (
                                    <Button
                                        size="xs"
                                        variant="danger"
                                        type="button"
                                        onClick={() => removeDetailRow(index)}
                                        className="mt-2"
                                    >
                                        Hapus
                                    </Button>
                                )}
                            </div>
                        ))}

                        <Button size="sm" variant="primary" type="button" onClick={addDetailRow}>
                            Tambah Sub Judul
                        </Button>
                    </div>

                    <div className="flex justify-end mt-4">
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
                            {/* Teks tombol disesuaikan untuk Edit */}
                            {loading ? "Menyimpan..." : "Simpan Perubahan"} 
                        </Button>
                    </div>
                </form>
            </ComponentCard>
        </div>
    );
}

export default withPermission(EditStepPayment, "edit-steppayment");