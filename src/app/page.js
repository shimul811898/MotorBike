import Banner from "@/components/Banner";
import TopCard from "@/components/TopCard";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <Banner />
      <TopCard />
    </div>
  );
}

