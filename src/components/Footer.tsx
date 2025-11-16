"use client";

import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        
        {/* Logo */}
        <div>
          <div className="w-[120px] h-[60px] bg-gray-400"></div>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-bold mb-4">PRODUCT</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">HOME</Link></li>
            <li><Link href="/schedule">SCHEDULE</Link></li>
            <li><Link href="/podcast">PODCAST</Link></li>
            <li><Link href="/about">ABOUT US</Link></li>
            <li><Link href="/stream">STREAM NOW</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold mb-4">SOCIAL MEDIA</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><FaInstagram /> lorem ipsum</li>
            <li className="flex items-center gap-2"><FaFacebookF /> lorem ipsum</li>
            <li className="flex items-center gap-2"><FaTiktok /> lorem ipsum</li>
            <li className="flex items-center gap-2"><FaYoutube /> lorem ipsum</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-4">CONTACT</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><FaWhatsapp /> 0898989898</li>
            <li className="flex items-center gap-2"><FaEnvelope /> wafi.alpa.infinity@gmail.com</li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" /> 
              Jl. Kebonbatu No. 12 RT.5/RW.7, Gedong, Kec. Pasar Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
