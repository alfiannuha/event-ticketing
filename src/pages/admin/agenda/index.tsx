import AgendaScreen from "@/screen/private/features/agenda/features";
import eventsServices from "@/services/events";
import React, { Fragment, useEffect, useState } from "react";

export default function AgendaPage() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const getAllAgenda = async () => {
      const { data } = await eventsServices.getAllEvents();

      setEventList(data.data);
    };

    // console.log(eventList);

    getAllAgenda();
  }, []);

  return (
    <Fragment>
      <div className="mb-10">
        <div className="text-2xl font-semibold">List Agenda Anda</div>
        <div>List data agenda yang anda miliki</div>
      </div>
      <AgendaScreen eventList={eventList} />
    </Fragment>
  );
}
