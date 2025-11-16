"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black text-white fixed top-0 left-0 z-50 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="w-[70px] h-[35px] bg-red-600"></div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm tracking-wide">
          <Link href="/" className="hover:text-red-500">
            HOME
          </Link>
          <Link href="/schedule" className="hover:text-red-500">
            SCHEDULE
          </Link>
          <Link href="/podcast" className="hover:text-red-500">
            PODCAST
          </Link>
          <Link href="/about" className="hover:text-red-500">
            ABOUT US
          </Link>
        </nav>

        {/* Stream Button (Desktop only) */}
        <div className="hidden md:block">
          <Link
            href="/stream"
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-semibold text-xs flex items-center gap-1"
          >
            STREAM NOW <span>▶</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation with animation */}
      <div
        className={`md:hidden bg-black px-6 py-6 flex flex-col gap-4 text-sm transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Link href="/" className="hover:text-red-500" onClick={() => setMenuOpen(false)}>
          HOME
        </Link>
        <Link href="/schedule" className="hover:text-red-500" onClick={() => setMenuOpen(false)}>
          SCHEDULE
        </Link>
        <Link href="/podcast" className="hover:text-red-500" onClick={() => setMenuOpen(false)}>
          PODCAST
        </Link>
        <Link href="/about" className="hover:text-red-500" onClick={() => setMenuOpen(false)}>
          ABOUT US
        </Link>
        <Link
          href="/stream"
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-semibold text-xs text-center"
          onClick={() => setMenuOpen(false)}
        >
          STREAM NOW <span>▶</span>
        </Link>
      </div>
    </header>
  );
}
