import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import localdayjs from "@/lib/dayjs";
import eventsServices from "@/services/events";
import { Loader, Pencil, Trash2 } from "lucide-react";
// import Link from "next/link";
import { useRouter } from "next/router";
// import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  eventList: any;
}

export default function AgendaScreen(props: Props) {
  const { eventList } = props;

  const { push } = useRouter();

  // const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [detailEvent, setDetailEvent] = useState<any>({});

  // useEffect(() => {
  //   const getAllAgenda = async () => {
  //     const { data } = await eventsServices.getAllEvents();

  //     setEventList(data.data);
  //   };

  //   getAllAgenda();
  // }, []);

  const EmptyAgenda = () => {
    return (
      <div className="flex flex-col justify-center items-center">
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

  const onConfirmation = (e: any, type: string, event: any) => {
    e.stopPropagation();
    setDetailEvent(event);

    if (type == "delete") {
      setDialogDelete(true);
    } else {
      push(`/admin/agenda/${event.id}`);
    }
  };

  const onDeleteData = async () => {
    setIsLoading(false);

    const id = detailEvent?.id;

    await eventsServices.deleteEvents(id).then((results) => {
      if (results.status) {
        toast.success(`Data berhasil dihapus`);
        setIsLoading(false);
        setDialogDelete(false);
      } else {
        toast.error("Gagal menghapus data");
        setIsLoading(false);
        setDialogDelete(false);
      }
    });
  };

  return (
    <div>
      <div>
        {eventList.length === 0 && EmptyAgenda()}

        {eventList.length > 0 && (
          <>
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
            <div className="grid grid-cols-3 gap-5 mt-7">
              {eventList?.map((event: any) => (
                <div
                  key={event.id}
                  onClick={() => {
                    push(`/admin/agenda/detail/${event.id}`);
                  }}
                  className="border rounded-lg cursor-pointer"
                >
                  <img
                    src="/assets/images/patternpad-1.png"
                    alt={event.event_title}
                    className="bg-contain w-full rounded-t-lg"
                  />
                  {/* <img src={event.image_url} alt={event.title} className="bg-contain w-full rounded-t-lg" /> */}
                  <div className="flex justify-between items-center">
                    <div className="p-4 flex-1">
                      <div className="font-semibold truncate w-56">
                        {event.event_title}
                      </div>
                      <div className="text-xs">
                        {localdayjs(event.event_date).format("DD MMMM YYYY")}{" "}
                        pukul {event.event_time}
                      </div>
                    </div>
                    <div className="flex gap-3 mr-3">
                      <Pencil
                        onClick={(e) => onConfirmation(e, "update", event)}
                        className="w-5 h-5 text-primary cursor-pointer"
                      />
                      <Trash2
                        onClick={(e) => onConfirmation(e, "delete", event)}
                        className="w-5 h-5 text-red-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <AlertDialog open={dialogDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus Data</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah kamu ingin menghapus data ini ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isLoading}
              onClick={() => setDialogDelete(false)}
            >
              Batal
            </AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={onDeleteData}>
              {isLoading ? (
                <div className="flex justify-start items-center gap-3">
                  <Loader className="animate-spin w-4 h-4" />
                  Menyimpan Data
                </div>
              ) : (
                "Ya, Hapus"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
