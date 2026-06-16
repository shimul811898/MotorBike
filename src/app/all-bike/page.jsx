import BikeCard from "@/components/BikeCard"


const AllBike = async () => {
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
        console.error("Error fetching bikes:", error);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">All Bikes</h1>
            {bikes.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <span className="text-5xl block mb-4">🏍️</span>
                    <h2 className="text-xl font-bold text-slate-700">No Bikes Available</h2>
                    <p className="text-slate-400 mt-1 max-w-sm mx-auto">
                        Could not load bikes at the moment. Please check if the backend server and database are running.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bikes.map((bike) => (
                        <BikeCard key={bike._id} allbike={bike} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default AllBike
