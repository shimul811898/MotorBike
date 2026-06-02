import BikeCard from "@/components/BikeCard"


const AllBike = async () => {
    const res = await fetch("http://localhost:5000/bikes", {
        cache: "no-store",
    });
    const bikes = await res.json();

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">All Bikes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {bikes.map((bike) => (
                    <BikeCard key={bike._id} allbike={bike} />
                ))}
            </div>
        </div>
    )
}

export default AllBike
