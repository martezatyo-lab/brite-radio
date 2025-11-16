import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const API_KEY = process.env.YOUTUBE_API_KEY;
const PLAYLIST_IDS = process.env.YOUTUBE_PLAYLIST_IDS?.split(",") || [];

export async function GET() {
  try {
    let youtubeData: any[] = [];

    // Fetch dari YouTube (jika API aktif)
    if (API_KEY && PLAYLIST_IDS.length > 0) {
      const results = await Promise.all(
        PLAYLIST_IDS.map(async (id) => {
          const res = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${id}&key=${API_KEY}`
          );

          if (!res.ok) {
            console.warn("⚠️ YouTube API gagal untuk playlist:", id, res.statusText);
            return [];
          }

          const data = await res.json();

          return (data.items || []).map((item: any, index: number) => ({
            id: `yt-${id}-${index + 1}`,
            title: item.snippet.title,
            desc: item.snippet.description,
            image:
              item.snippet.thumbnails?.medium?.url ||
              "/images/podcast-placeholder.jpg",
            youtube: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
            source: "youtube",
          }));
        })
      );

      youtubeData = results.flat();
    }

    // Ambil dari podcasts.json (local)
    const filePath = path.join(process.cwd(), "public", "podcasts.json");
    const localJson = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const localData = localJson.map((p: any) => ({ ...p, source: "local" }));

    // Gabungkan keduanya
    const combined = [...localData, ...youtubeData];
    return NextResponse.json(combined);
  } catch (error: any) {
    console.error("❌ Gagal memuat data YouTube:", error.message);

    // fallback ke lokal JSON
    const filePath = path.join(process.cwd(), "public", "podcasts.json");
    const fallback = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return NextResponse.json(fallback);
  }
}
