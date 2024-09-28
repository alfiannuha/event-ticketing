import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
// import Image from "next/image";
import React from "react";

interface Props {
  agendaList: any;
}

export default function AgendaScreen(props: Props) {
  const { agendaList } = props;

  const { push } = useRouter();

  const EmptyAgenda = () => {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh]">
        <img width={500} src="/assets/images/empty.jpg" alt="empty image" />
        <div className="text-2xl font-semibold">Agenda Masih Kosong</div>
        <div className="mb-6">Silahkan buat agenda/acara anda</div>
        <Button
          onClick={() =>
            push({
              pathname: "/admin/agenda/[slug]",
              query: { slug: "create" },
            })
          }
        >
          Tambah Agenda / acara
        </Button>
      </div>
    );
  };

  return (
    <div>
      <div>
        {agendaList.length === 0 && EmptyAgenda()}

        {agendaList.length > 0 && (
          <>
            {agendaList.map((agenda: any) => (
              <div key={agenda.id}>
                <div>{agenda.title}</div>
                <div>{agenda.description}</div>
                <div>{agenda.date}</div>
                <div>{agenda.time}</div>
                <div>{agenda.location}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
