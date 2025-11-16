// app/schedule/page.tsx

interface Schedule {
  time: string;
  title: string;
  day: string;
}

// Fungsi ini jalan di server (SSR)
async function getSchedules(): Promise<Schedule[]> {
  // Mock data sementara
  return [
    { time: "00.00 - 01.00", title: "lorem ipsum dolor sit amet", day: "setiap hari" },
    { time: "01.00 - 02.00", title: "morning vibes", day: "setiap hari" },
    { time: "02.00 - 03.00", title: "music hits", day: "setiap hari" },
    { time: "03.00 - 04.00", title: "chill session", day: "setiap hari" },
    { time: "04.00 - 05.00", title: "late night talk", day: "setiap hari" },
    { time: "05.00 - 06.00", title: "top 10 songs", day: "setiap hari" },
  ];
}

export default async function SchedulePage() {
  const schedules = await getSchedules();

  return (
    <div className="w-full">
      {/* ========= Section 1: Hero ========= */}
      <section
        className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 
                   flex items-center justify-center 
                   bg-gradient-to-r from-red-700 via-black to-red-700"
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
          BRITE RADIO SCHEDULE
        </h1>
      </section>

      {/* ========= Section 2: Schedule Grid ========= */}
      <section className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {schedules.map((item, index) => (
      <div
        key={index}
        className="p-4 rounded-lg border border-gray-800 
                   bg-gradient-to-r from-red-950 via-black to-red-950
                   hover:scale-[1.02] hover:shadow-lg transition duration-300"
      >
        <p className="font-bold text-sm sm:text-base text-red-500">
          {item.time}
        </p>
        <p className="font-semibold text-base sm:text-lg text-white">
          {item.title}
        </p>
        <p className="text-gray-400 text-sm">{item.day}</p>
      </div>
    ))}
  </div>
</section>
    </div>
  );
}
