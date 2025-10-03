"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa6";

type Contact = {
  id: number;
  platform: string;
  url: string;
  icon: string;
};

// Mapping string → icon component
const iconMap: Record<string, React.ReactNode> = {
  instagram: <FaInstagram className="hover:text-yellow-400 transition" />,
  facebook: <FaFacebook className="hover:text-yellow-400 transition" />,
  linkedin: <FaLinkedin className="hover:text-yellow-400 transition" />,
  twitter: <FaTwitter className="hover:text-yellow-400 transition" />,
  email: <FaEnvelope className="hover:text-yellow-400 transition" />,
  whatsapp: <FaWhatsapp className="hover:text-yellow-400 transition" />,
  tiktok: <FaTiktok className="hover:text-yellow-400 transition" />,
  default: <FaGlobe className="hover:text-yellow-400 transition" />,
};

export default function Footer() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/kontak");
        if (!res.ok) throw new Error("Gagal fetch contacts");
        const data: Contact[] = await res.json();
        setContacts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContacts();
  }, []);

  return (
    <footer className="bg-black text-yellow-400 mt-12 mb-12">
      {/* Atas */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Brand + Deskripsi */}
        <div className="text-left">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/images/brand/logos.png"
              alt="Bless Project"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-lg font-semibold">Bless Project</span>
          </div>
          <p className="text-yellow-300 text-sm mb-4">
            Mewujudkan project kreatif dan inovatif dengan desain modern dan
            berkualitas tinggi.
          </p>

          {/* Sosial media dynamic */}
          <div className="flex gap-4 text-yellow-500 text-xl">
            {contacts.map((c) => (
              <Link key={c.id} href={c.url} target="_blank">
                {iconMap[c.icon.toLowerCase()] || iconMap.default}
              </Link>
            ))}
          </div>
        </div>

        {/* Placeholder Maps / Info tambahan */}
        <div className="text-right">
          <h3 className="font-semibold text-yellow-400 mb-4">Our Location</h3>
          <div className="rounded-lg overflow-hidden border border-yellow-600 shadow-sm inline-block w-1/2 max-w-sm">
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.956353093918!2d112.006837373642!3d-7.7944461922255845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78579e7d171915%3A0xc259f859b31dac69!2sBless%20Kontraktor!5e0!3m2!1sid!2sid!4v1759318592114!5m2!1sid!2sid"
  width="100%"
  height={80}
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

          </div>
        </div>
      </div>

      {/* Bawah */}
      <div className="border-t border-yellow-700 py-4 text-sm text-yellow-500 flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} Bless Project. All rights reserved.</p>
        {/* <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="/privacy" className="hover:text-yellow-400">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-yellow-400">
            Terms of Service
          </Link>
          <Link href="/cookies" className="hover:text-yellow-400">
            Cookies Settings
          </Link>
        </div> */}
      </div>
    </footer>
  );
}
