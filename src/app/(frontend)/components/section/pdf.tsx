// app/components/PricelistPDF.tsx
"use client";

import { jsPDF } from "jspdf";
import { useState } from "react";

type Section = {
  title: string;
  description: string;
};

export default function PricelistPDF() {
  const [sections, setSections] = useState<Section[]>([
    { title: "Landing Page", description: "Desain modern + responsive" },
    { title: "E-Commerce", description: "Toko online dengan payment gateway" },
    { title: "Portfolio", description: "Tampilkan karya profesional" },
  ]);

  const addSection = () => {
    setSections([...sections, { title: "", description: "" }]);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Pricelist Jasa Web", 105, 20, { align: "center" });

    doc.setFontSize(14);
    let y = 40;
    const basePrice = 350;
    const extraPrice = 50;
    const maxSection = 6;

    sections.forEach((sec, idx) => {
      // Jika lebih dari 6 section, hitung tambahan
      const extra = idx + 1 > maxSection ? (idx + 1 - maxSection) * extraPrice : 0;
      const price = basePrice + extra;

      doc.setFont("helvetica", "bold");
      doc.text(`${sec.title}`, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${sec.description}`, 20, y + 6);
      doc.text(`Harga: ${price}k`, 150, y);
      y += 20;

      // Tambah halaman jika melebihi batas y
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("Pricelist_Jasa_Web.pdf");
  };

  return (
    <div className="p-5 flex flex-col gap-3">
      <h2 className="text-xl font-bold">Pricelist Jasa Web</h2>
      {sections.map((sec, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Judul section"
            value={sec.title}
            onChange={(e) => {
              const newSections = [...sections];
              newSections[idx].title = e.target.value;
              setSections(newSections);
            }}
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Deskripsi"
            value={sec.description}
            onChange={(e) => {
              const newSections = [...sections];
              newSections[idx].description = e.target.value;
              setSections(newSections);
            }}
            className="border px-2 py-1 rounded"
          />
        </div>
      ))}
      <button
        onClick={addSection}
        className="bg-blue-500 text-white px-4 py-2 rounded w-fit mt-2"
      >
        Tambah Section
      </button>
      <button
        onClick={generatePDF}
        className="bg-green-500 text-white px-4 py-2 rounded w-fit mt-2"
      >
        Generate PDF
      </button>
    </div>
  );
}
