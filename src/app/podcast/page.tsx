"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Podcast {
  id: string | number;
  title: string;
  desc: string;
  image: string;
  youtube: string;
}

export default function PodcastPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/podcasts", { cache: "no-store" });
        const data = await res.json();
        setPodcasts(data);
      } catch (error) {
        console.error("Gagal mengambil data podcast:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter berdasarkan pencarian
  const filtered = podcasts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePodcasts = filtered.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Generate limited pagination range
  const generatePageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative w-full h-[400px] bg-[url('/images/hero-dummy.jpg')] bg-cover bg-center 
                   flex flex-col justify-center items-start text-white px-10 rounded-lg overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            BRITE RADIO PODCAST
          </h1>
          <p className="text-lg font-medium">Explore our latest shows and episodes</p>
        </div>
      </section>

      {/* ===== SEARCH + GRID SECTION ===== */}
      <section>
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search podcast..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border border-gray-400 rounded-lg px-4 py-2 
                       text-black placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-red-700"
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-500">Loading podcasts...</p>
        ) : (
          <>
            {visiblePodcasts.length > 0 ? (
              <>
                {/* Grid Podcast */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visiblePodcasts.map((podcast) => (
                    <Link
                      key={podcast.id}
                      href={`/podcast/${podcast.id}`}
                      className="block rounded-lg overflow-hidden 
                                 border border-gray-700 bg-gradient-to-r from-[#1a0000] via-[#000000] to-[#1a0000]
                                 hover:shadow-xl hover:scale-[1.01] transition group"
                    >
                      <img
                        src={podcast.image}
                        alt={podcast.title}
                        className="w-full h-40 object-cover opacity-90 group-hover:opacity-100 transition"
                      />
                      <div className="p-4">
                        <h2 className="text-lg font-semibold text-white group-hover:text-red-600 transition">
                          {podcast.title}
                        </h2>
                        <p className="text-sm text-gray-300 group-hover:text-red-500 transition line-clamp-2">
                          {podcast.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-8 space-x-2 flex-wrap">
                    {/* Prev */}
                    <button
                      disabled={currentPage === 1}
                      onClick={() => goToPage(currentPage - 1)}
                      className="px-3 py-1 border border-gray-600 rounded text-black 
                                 bg-white hover:bg-gray-200 disabled:opacity-50"
                    >
                      Prev
                    </button>

                    {/* Page Numbers */}
                    {generatePageNumbers().map((page, idx) =>
                      page === "..." ? (
                        <span
                          key={`dots-${idx}`}
                          className="px-2 text-gray-600 select-none"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToPage(Number(page))}
                          className={`px-3 py-1 border border-gray-600 rounded font-medium transition
                            ${
                              currentPage === page
                                ? "bg-red-700 text-white"
                                : "bg-white text-black hover:bg-gray-100"
                            }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    {/* Next */}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => goToPage(currentPage + 1)}
                      className="px-3 py-1 border border-gray-600 rounded text-black 
                                 bg-white hover:bg-gray-200 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-gray-500 mt-6">No podcast found</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
