import { NextResponse } from "next/server";

// Dummy data penghargaan
const awards = [
  {
    id: 1,
    title: "Best Architecture Design",
    year: "2022",
    image: "/images/brand/awd1.png",
  },
  {
    id: 2,
    title: "Innovative Building Award",
    year: "2023",
    image: "/images/brand/awd1.png",
  },
  {
    id: 3,
    title: "Sustainable Design Prize",
    year: "2024",
    image: "/images/brand/awd1.png",
  },
];

export async function GET() {
  return NextResponse.json(awards);
}
