import localdayjs from "@/lib/dayjs";
import eventsServices from "@/services/events";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function EventListComponent() {
  const [eventList, setEventList] = useState<any>([]);

  useEffect(() => {
    const getAllAgenda = async () => {
      const { data } = await eventsServices.getAllEvents();

      data.data.map((event: any) => {

        // check if event date is greater than current date
        if (new Date(event.event_date) > new Date()) {
          event.isUpcoming = true;
        } else {
          event.isUpcoming = false;
        }

        return event;
      });

      console.log(data.data);
      

      setEventList(data.data);
    };

    getAllAgenda();
  }, []);

  return (
    <div>
      <div className="bg-[url('/assets/images/bg-event.jpg')] w-full h-96 object-contain flex flex-col justify-center items-center space-y-4">
        <div className="text-white text-7xl font-bold">Event</div>
        <div className="text-white text-3xl font-bold">
          Welcome to our website event
        </div>
        <div className="text-white text-sm">
          Let`s get your ticket / buy ticket event from our webiste
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-10">
        <div className="text-2xl font-semibold">Event Available</div>
        <i>choose and buy tickets for the closest event here</i>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-7">
        {eventList?.map((event: any) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="border rounded-lg relative"
          >
            <img
              src="/assets/images/patternpad-1.png"
              alt={event.event_title}
              className="bg-contain w-full rounded-t-lg"
            />
            <div
              className={`${event.isUpcoming ? "bg-green-200" : "bg-slate-200"
              } p-2 w-full bg-slate-200`}
            >
              {event.isUpcoming ? (
                <div className="text-green-500 text-xs font-semibold">
                  Upcoming Event
                </div>
              ) : (
                <div className="text-gray-500 text-xs font-semibold">
                  Past Event
                </div>
              )}
            </div>
            {/* <img src={event.image_url} alt={event.title} className="bg-contain w-full rounded-t-lg" /> */}
            <div className="p-4">
              <div className="font-semibold">{event.event_title}</div>
              <div className="text-xs">
                {localdayjs(event.event_date).format("DD MMMM YYYY HH:mm")}{" "}
                pukul {event.event_time}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
