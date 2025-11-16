import Link from "next/link";

interface Podcast {
  id: number | string;
  title: string;
  desc: string;
  image: string;
  youtube: string;
}

export default async function PodcastDetail({
  params,
}: {
  params: { id: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/podcasts.json`, { cache: "no-store" });
  const local = await res.json();

  const apiRes = await fetch(`${baseUrl}/api/podcasts`, { cache: "no-store" });
  const api = await apiRes.json();

  const allPodcasts: Podcast[] = [...local, ...api];
  const podcast = allPodcasts.find((p) => p.id.toString() === params.id);

  if (!podcast) {
    return (
      <div className="p-10 text-center text-gray-500">
        Podcast tidak ditemukan 😢
        <div className="mt-6">
          <Link
            href="/podcast"
            className="text-red-700 font-semibold underline hover:text-red-900"
          >
            ← Kembali ke Halaman Podcast
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-24 space-y-10">
      <h1 className="text-3xl font-bold text-red-900">{podcast.title}</h1>
      <p className="text-red-900 leading-relaxed">{podcast.desc}</p>

      {/* YouTube Player */}
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-8">
        <iframe
          src={
            podcast.youtube.includes("embed")
              ? podcast.youtube
              : podcast.youtube.replace("watch?v=", "embed/")
          }
          title={podcast.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      <div className="flex justify-center">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-64 h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="text-center mt-10">
        <Link
          href="/podcast"
          className="bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-2 rounded-full transition"
        >
          ← Kembali ke Halaman Podcast
        </Link>
      </div>
    </div>
  );
}
