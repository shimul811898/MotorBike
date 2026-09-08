import AllBikesClient from "@/components/AllBikesClient";
import { API_BASE_URL } from "@/lib/api";

export const dynamic = "force-dynamic";

const AllBike = async () => {
    let bikes = [];
    try {
        const res = await fetch(`${API_BASE_URL}/bikes`, {
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

    return <AllBikesClient initialBikes={bikes} />;
};

export default AllBike;
