// app/AboutUs/page.tsx

interface AboutContent {
  title: string;
  description: string[];
  cta: string;
}

// Fungsi SSR ambil data (sementara mock data)
async function getAboutContent(): Promise<AboutContent> {
  // Contoh nanti bisa ambil dari API/DB
  return {
    title: "BRITE RADIO ABOUT US",
    description: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque ...",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque ...",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque ..."
    ],
    cta: "ANY QUESTION? Contact Us",
  };
}

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <div className="w-full">
      {/* ===== Section 1: Hero ===== */}
      <section
        className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 
                   flex items-center justify-center 
                   bg-gradient-to-r from-black via-neutral-900 to-black"
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
          {about.title}
        </h1>
      </section>

      {/* ===== Section 2: Content ===== */}
      <section className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        {about.description.map((para, idx) => (
          <p key={idx} className="text-gray-700 leading-relaxed text-justify">
            {para}
          </p>
        ))}

        <div className="pt-8 border-t border-gray-300">
          <h2 className="font-bold text-lg text-black">
            {about.cta}
          </h2>
        </div>
      </section>
    </div>
  );
}