import AgendaScreen from "@/screen/private/features/agenda/features";
import agendaServices from "@/services/agenda";
import React, { Fragment, useEffect, useState } from "react";

export default function AgendaPage() {
  const [agendaList, setAgendaList] = useState([]);

  useEffect(() => {
    const getAllAgenda = async () => {
      const { data } = await agendaServices.getAllAgenda();

      console.log(data);

      setAgendaList(data.data);
    };

    getAllAgenda();
  }, []);

  return (
    <Fragment>
      <div className="mb-10">
        <div className="text-2xl font-semibold">List Agenda Anda</div>
        <div>List data agenda yang anda miliki</div>
      </div>

      <AgendaScreen agendaList={agendaList} />
    </Fragment>
  );
}
