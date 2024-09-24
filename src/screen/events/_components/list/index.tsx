import localdayjs from "@/lib/dayjs";
import Link from "next/link";
import React from "react";

const EVENTLIST = [
  {
    id: 1,
    title: "Event 1",
    date: "2020-01-01",
    location: "Location 1",
    description: "Description 1",
    image_url: "https://via.placeholder.com/500x120",
  },
  {
    id: 2,
    title: "Event 2",
    date: "2020-01-02",
    location: "Location 2",
    description: "Description 2",
    image_url: "https://via.placeholder.com/500x120",
  },
  {
    id: 3,
    title: "Event 3",
    date: "2020-01-03",
    location: "Location 3",
    description: "Description 3",
    image_url: "https://via.placeholder.com/500x120",
  },
  {
    id: 4,
    title: "Event 4",
    date: "2020-01-03",
    location: "Location 4",
    description: "Description 4",
    image_url: "https://via.placeholder.com/500x120",
  },
  {
    id: 5,
    title: "Event 5",
    date: "2020-01-03",
    location: "Location 5",
    description: "Description 5",
    image_url: "https://via.placeholder.com/500x120",
  },
  {
    id: 6,
    title: "Event 6",
    date: "2020-01-03",
    location: "Location 6",
    description: "Description 6",
    image_url: "https://via.placeholder.com/500x120",
  },
];

export default function EventListComponent() {
  return (
    <div>
      <div className="bg-[url('/assets/images/bg-event.jpg')] w-full h-96 object-contain flex flex-col justify-center items-center space-y-4">
        <div className="text-white text-7xl font-bold">Event</div>
        <div className="text-white text-3xl font-bold">
          Welcome to our website event
        </div>
        <div className="text-white text-sm">
          Let`s get your ticket / buy ticket event form our webiste
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-10">
        <div className="text-2xl font-semibold">Event Available</div>
        <i>choose and buy tickets for the closest event here</i>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-7">
        {EVENTLIST?.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="border rounded-lg"
          >
            <img
              src="/assets/images/patternpad-1.png"
              alt={event.title}
              className="bg-contain w-full rounded-t-lg"
            />
            {/* <img src={event.image_url} alt={event.title} className="bg-contain w-full rounded-t-lg" /> */}
            <div className="p-4">
              <div className="font-semibold">{event.title}</div>
              <div className="text-xs">
                {localdayjs(event.date).format("DD MMMM YYYY HH:mm")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
