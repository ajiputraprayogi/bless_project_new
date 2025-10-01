"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Squash as Hamburger } from "hamburger-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [openProfileMobile, setOpenProfileMobile] = useState(false); // khusus mobile

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowMenu(true);
    } else {
      const timer = setTimeout(() => setShowMenu(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Harga & Layanan", href: "/pricing" },
    { name: "Portfolio", href: "/portfolio" },
    {
      name: "Profil",
      dropdown: [
        { name: "Tentang Perusahaan", href: "/profile" },
        { name: "Tentang Tim", href: "/team" },
        { name: "Penghargaan", href: "/awards" },
      ],
    },
    { name: "Informasi", href: "/information" },
    { name: "Kontak", href: "/contact" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between p-3 mx-auto fixed top-0 z-50 w-full backdrop-blur bg-black/15">
        {/* Logo */}
        <Link href="/" className="flex flex-1 items-center gap-2">
          <Image
            src="/images/brand/logos.png"
            alt="Bless Architect Logo"
            width={50}
            height={50}
            className="rounded-lg"
          />
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex flex-2 gap-6 text-white relative">
          {menuItems.map((item, i) =>
            item.dropdown ? (
              <li key={i} className="relative group">
                <span className="hover:text-yellow-300 text-md transition-colors duration-300 flex items-center gap-1 cursor-pointer">
                  {item.name} ▾
                </span>

                {/* Dropdown muncul saat hover */}
                <ul className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur rounded-lg shadow-md py-2 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {item.dropdown.map((sub, j) => (
                    <li key={j}>
                      <Link
                        href={sub.href}
                        className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition rounded-md"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={i}>
                <Link
                  href={item.href}
                  className="hover:text-yellow-300 text-md transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Hamburger Mobile */}
        <div className="md:hidden text-yellow-400">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen backdrop-blur bg-black/35 text-white flex flex-col items-center justify-center gap-6 z-40 transform transition-all duration-400 ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
          data-aos={isOpen ? "fade-down" : undefined}
        >
          {menuItems.map((item, i) =>
            item.dropdown ? (
              <div key={i} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setOpenProfileMobile(!openProfileMobile)}
                  className="hover:text-yellow-300 text-lg transition-colors duration-300"
                >
                  {item.name} ▾
                </button>
                {openProfileMobile && (
                  <div className="flex flex-col gap-2">
                    {item.dropdown.map((sub, j) => (
                      <Link
                        key={j}
                        href={sub.href}
                        className="text-sm hover:text-yellow-300 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={i}
                href={item.href}
                className="hover:text-yellow-300 text-lg transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
          <Link
            href="https://wa.me/6285176965609"
            className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Hubungi Kami
          </Link>
        </div>
      )}
    </>
  );
}
