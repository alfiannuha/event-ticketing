import localdayjs from "@/lib/dayjs";
import Link from "next/link";
import React from "react";

interface Props {
  eventId: string;
}

export default function EventDetailComponent(props: Props) {
  const { eventId } = props;

  const event = {
    id: eventId,
    title: "Event Title",
    description: `
    Commodo sapien a montes aptent suspendisse scelerisque pellentesque dapibus enim nulla nunc.
    Urna mollis est amet eros dictum vulputate dapibus. Nullam tortor ut accumsan ante tempor neque venenatis elit amet augue egestas.
    Class nam eros donec pede purus tortor. Dis nisi dui mollis non pretium. Nulla elit netus consectetuer ut maximus natoque cras ultrices eget.
    Taciti si phasellus nisi consequat urna. Luctus habitant pede cursus sed ac ornare felis donec si vestibulum. Posuere tristique metus amet
    maecenas condimentum ridiculus etiam curae fringilla ligula hendrerit.
    Commodo sapien a montes aptent suspendisse scelerisque pellentesque dapibus enim nulla nunc.
    Urna mollis est amet eros dictum vulputate dapibus. Nullam tortor ut accumsan ante tempor neque venenatis elit amet augue egestas.
    Class nam eros donec pede purus tortor. Dis nisi dui mollis non pretium. Nulla elit netus consectetuer ut maximus natoque cras ultrices eget.
    Taciti si phasellus nisi consequat urna. Luctus habitant pede cursus sed ac ornare felis donec si vestibulum. Posuere tristique metus amet
    maecenas condimentum ridiculus etiam curae fringilla ligula hendrerit.
    `,
    event_name: "Nama Penyelenggara",
    location:
      "Lokasi Event Berlangsung, Commodo sapien a montes aptent suspendisse scelerisque pellentesque dapibus enim nulla nunc",
    date: "2024-09-30 12:00:00",
    max_participant: 100,
    sold_tickets: 50,
    image: "Event Image",
  };
  return (
    <div className="pb-10">
      <div className="bg-[url('/assets/images/patternpad-3.png')] w-full h-96 object-contain flex flex-col justify-center items-center space-y-4 mb-5">
        <div className="text-white text-8xl font-bold">Event</div>
        <div className="text-white text-4xl font-bold">
          Welcome to our website event
        </div>
        <div className="text-white text-lg">
          Let`s get your ticket or buy ticket event form our webiste
        </div>
      </div>

      <div className="font-semibold text-4xl">{event?.title}</div>

      <div className="my-6">
        <div className="font-semibold text-lg">Deskripsi Event</div>
        <p className="text-sm text-justify">{event?.description}</p>
      </div>

      <div className="text-center my-16">
        <div className="text-sm">Tanggal Event Berlangsung</div>
        <div className="font-semibold mt-4">
          <div className="text-5xl">{localdayjs(event?.date).format("DD")}</div>
          <div className="text-lg">
            {localdayjs(event?.date).format("MMMM YYYY HH:mm")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="text-center">
          <div className="text-4xl font-semibold mb-2">{event?.event_name}</div>
          <div>Penyelenggara Event</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-semibold mb-2">
            {event?.max_participant}
          </div>
          <div>Kuota Peserta</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-semibold mb-2">
            {event?.sold_tickets}
          </div>
          <div>Tiket Terjual</div>
        </div>
      </div>

      <div className="my-10">
        <div className="font-semibold text-lg">Lokasi Event</div>
        <p className="text-sm text-justify">{event?.location}</p>
      </div>

      <div className="flex justify-center items-center mt-20">
        {event?.sold_tickets < event?.max_participant ? (
          <Link
            className="border rounded-lg w-full text-center py-3 bg-primary text-white"
            href={`/events/${event?.id}/buy`}
          >
            Beli Tiket Sekarang
          </Link>
        ) : (
          <div className="text-red-500">Sold Out</div>
        )}
      </div>
    </div>
  );
}
