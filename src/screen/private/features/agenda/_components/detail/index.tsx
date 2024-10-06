import React, { useEffect, useState } from "react";
import QRCodeCustom from "@/components/ui/QRCodeCustom";
import localdayjs from "@/lib/dayjs";
import Link from "next/link";
import eventsServices from "@/services/events";
import ReactMarkdown from "react-markdown";
import { convertNumber } from "@/lib/convert";

interface Props {
  eventId: string;
}

export default function AgendaDetailComponent(props: Props) {
  const { eventId } = props;

  const [event, setEvent] = useState<any>({});
  useEffect(() => {
    const getDetailEvents = async () => {
      const { data } = await eventsServices.getDetailEvent(eventId);

      // console.log(data.data);

      setEvent(data.data);
    };

    // console.log(event);

    getDetailEvents();
  }, [eventId]);

  return (
    <div className="pb-10">
      <div className="bg-[url('/assets/images/patternpad-3.png')] w-full h-80 object-contain flex flex-col justify-center items-center space-y-4 mb-5">
        <div className="text-white text-8xl font-bold">Event</div>
        <div className="text-white text-4xl font-bold">
          Welcome to your event
        </div>
        <div className="text-white text-lg">
          Let`s sell your ticket event from our webiste
        </div>
      </div>

      <div className="font-semibold text-4xl">{event?.event_title}</div>

      <div className="my-6">
        <div className="font-semibold text-lg">Deskripsi Event</div>
        <ReactMarkdown
        // className="markdown-body"
        // remarkPlugins={remarkPlugins}
        // rehypePlugins={[rehypeHighlight]}
        >
          {event?.event_description}
        </ReactMarkdown>
        {/* <p
          className="text-sm text-justify"
          dangerouslySetInnerHTML={{ __html: event?.event_description }}
        ></p> */}
      </div>

      <div className="text-center my-16">
        <div className="text-sm">Tanggal Event Berlangsung</div>
        <div className="font-semibold mt-4">
          <div className="text-5xl">
            {localdayjs(event?.event_date).format("DD")}
          </div>
          <div className="text-lg">
            {localdayjs(event?.event_date).format("MMMM YYYY")} pukul{" "}
            {event.event_time}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="text-center">
          <div className="text-4xl font-semibold mb-2">User full Name</div>
          <div>Penyelenggara Event</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-semibold mb-2">
            {convertNumber(Number(event?.event_total_participant))}
          </div>
          <div>Kuota Peserta</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-semibold mb-2">
            {event?.event_sold_ticket}
          </div>
          <div>Tiket Terjual</div>
        </div>
      </div>

      <div className="my-6">
        <div className="font-semibold text-lg">Lokasi Event</div>
        <p
          className="text-sm text-justify"
          dangerouslySetInnerHTML={{ __html: event?.event_location }}
        ></p>
      </div>

      <div className="space-y-4">
        <div className="font-semibold text-lg">Scan QR Map</div>
        {event?.event_link_maps && (
          <QRCodeCustom
            className="flex justify-start"
            imageLink=""
            size={100}
            value={event?.event_link_maps || ""}
          />
        )}
        <div>
          <i className="my-3">atau</i>
          <a
            href={event?.event_link_maps}
            target="_blank"
            className="text-sm text-justify underline ml-2"
          >
            {event?.event_link_maps}
          </a>
        </div>
      </div>

      {/* <div className="text-center space-y-4">
        <div className="font-semibold text-lg">Scan QR Map</div>
        {event?.event_link_maps && (
          <QRCodeCustom
            className="flex justify-center"
            imageLink=""
            size={200}
            value={event?.event_link_maps || ""}
          />
        )}
        <div>
          <i className="my-3">atau</i>
        </div>
        <a
          href={event?.event_link_maps}
          target="_blank"
          className="text-sm text-justify underline"
        >
          {event?.event_link_maps}
        </a>
      </div> */}

      <div className="flex justify-center items-center mt-10">
        <Link
          className="border rounded-lg w-full text-center py-3 bg-primary text-white"
          target="_blank"
          href={`/scan/${eventId}`}
        >
          Scan QR Code Tiket
        </Link>
      </div>
    </div>
  );
}
