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
    <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Top Rated Bikes</h2>
        <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
          Explore our highest-rated motorcycles, selected based on performance,
          reliability, and rider reviews.
        </p>
      </div>

      {topRated.length === 0 ? (
        <div className="text-center py-10 text-slate-400 font-semibold bg-slate-50 rounded-2xl border border-dashed border-slate-200">
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