// app/page.tsx
import Image from "next/image";

interface Podcast {
  id: string;
  title: string;
  desc: string;
  image: string;
  youtube?: string;
  spotify?: string;
  soundcloud?: string;
  audio?: string;
}

// Ambil data podcast dari public/podcasts.json
async function getPodcasts(): Promise<Podcast[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/podcasts.json`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Gagal memuat data podcast");
    return res.json();
  } catch (err) {
    console.error("Error fetching podcasts:", err);
    return [];
  }
}

export default async function HomePage() {
  const podcasts = await getPodcasts();

  const top5 = podcasts.slice(0, 5);
  const latest = podcasts[0];

  return (
    <main className="w-full">
      {/* ====== HERO SECTION ====== */}
<section
  className="relative w-full h-[400px] 
             bg-[url('/images/mic.png')] bg-cover bg-center 
             flex flex-col justify-center items-start text-white px-10"
>
  {/* Overlay hitam transparan */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Konten teks */}
  <div className="relative z-10">
    <h1 className="text-4xl md:text-5xl font-bold mb-2">BRITE RADIO</h1>
    <p className="text-xl font-medium">24 Hours</p>
  </div>
</section>


      {/* ====== RADIO BRITE SECTION ====== */}
      <section className="max-w-7xl mx-auto py-12 px-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">RADIO BRITE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card utama */}
          <div className="relative bg-black text-white rounded-lg overflow-hidden">
            <Image
              src="/images/jakarta.jpg"
              alt="Jakarta Konten"
              width={500}
              height={300}
              className="object-cover w-full h-64"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 flex justify-between items-center">
              <p className="text-lg font-semibold">JAKARTA</p>
              <span className="text-white text-xl">▶</span>
            </div>
          </div>

          {/* Ads placeholder */}
          <div className="bg-gray-300 w-full h-64 rounded-md flex items-center justify-center text-gray-700 font-semibold">
            Ad Space
          </div>
          <div className="bg-gray-300 w-full h-64 rounded-md flex items-center justify-center text-gray-700 font-semibold">
            Ad Space
          </div>
        </div>
      </section>

      {/* ====== NEWS SECTION ====== */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">NEWS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <Image
                  src="/images/news1.jpg"
                  alt={`News ${n}`}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    Lorem ipsum dolor sit amet {n}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum quis lorem eu nulla facilisis gravida.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== BRITE TOP 5 & TOP PODCAST ====== */}
      <section className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BRITE TOP #5 */}
        <div className="border border-gray-400 rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-bold mb-6">BRITE TOP #5</h2>
          {top5.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {top5.map((podcast, index) => (
                <a
                  key={index}
                  href={`/podcast/${podcast.id}`}
                  className="flex items-center gap-4 hover:text-red-700 transition"
                >
                  <Image
                    src={podcast.image}
                    alt={podcast.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover w-[60px] h-[60px]"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">{podcast.title}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {podcast.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Belum ada data podcast.</p>
          )}
        </div>

        {/* TOP PODCAST */}
        <div className="border border-gray-400 rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-bold mb-6">TOP PODCAST</h2>
          {latest ? (
            <div>
              <div className="bg-black text-white rounded-md p-6 mb-4">
                <p className="text-2xl font-semibold mb-4">{latest.title}</p>
                <p className="text-sm text-gray-300 mb-6">{latest.desc}</p>

                {/* Embed YouTube */}
                {latest.youtube && (
                  <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px]">
                    <iframe
                      src={latest.youtube}
                      title={latest.title}
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
              <a
                href={`/podcast/${latest.id}`}
                className="text-red-700 font-semibold hover:underline"
              >
                Listen now →
              </a>
            </div>
          ) : (
            <p className="text-gray-500">Belum ada podcast terbaru.</p>
          )}
        </div>
      </section>
    </main>
  );
}
