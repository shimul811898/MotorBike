import BikeCard from "./BikeCard";

const TopCard = async () => {
  let bikes = [];
  try {
    const res = await fetch("http://localhost:5000/bikes", {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        bikes = data;
      }
    }
  } catch (error) {
    console.error("Error fetching top-rated bikes:", error);
  }

  const topRated = bikes
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md">
          <span>⚡</span> Top Tier Machines
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Top Rated <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Superbikes</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-base">
          Selected based on dynamic performance, track testing, and rider satisfaction.
        </p>
      </div>

      {topRated.length === 0 ? (
        <div className="text-center py-16 text-slate-400 font-semibold glass-panel rounded-3xl">
          <span className="text-4xl block mb-2">🏍️</span>
          No bikes available to display at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topRated.map((bike) => (
            <BikeCard key={bike._id} allbike={bike} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TopCard;