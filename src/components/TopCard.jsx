import { div } from "framer-motion/client";
import BikeCard from "./BikeCard";


const TopCard = async () => {
    let bikes = [];

    const res = await fetch("http://localhost:5000/bikes", {
        cache: "no-store",
    });
    bikes = await res.json();
    
    const topRated = bikes
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topRated.map(bike => (
                <BikeCard key={bike._id} allbike={bike} />
            ))}

        </div>
        </div>
    )
}

export default TopCard
