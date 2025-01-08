import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-2">
      <div>
        <Image
          className="w-full absolute top-0 left-0 z-0 h-screen"
          src={"/assets/images/bg-event-2.jpg"}
          alt="Vercel logomark"
          width={600}
          height={400}
        />
        <main className="text-white z-10 relative">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-8xl font-bold">Event KU</h1>
            <p className="text-2xl font-semibold text-white">
              Choose your event and join us now
            </p>

            <div className="flex flex-col mt-4">
              <div className="font-semibold mb-2">
                Lets see our next or new event{" "}
              </div>
              <Link href="/events">
                <Button className="bg-white text-black px-4 py-2 rounded-lg w-full font-semibold hover:bg-gray-200">
                  Go To Event Page
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
