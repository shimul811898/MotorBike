import BikeCard from "./BikeCard";

const TopCard = async () => {
  const res = await fetch("http://localhost:5000/bikes", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bikes");
  }

  const bikes = await res.json();

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topRated.map((bike) => (
          <BikeCard key={bike._id} allbike={bike} />
        ))}
      </div>
    </section>
  );
};

export default TopCard;