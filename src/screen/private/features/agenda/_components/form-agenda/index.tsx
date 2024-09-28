import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ModalTicketType from "./modal-ticket-type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertNumber, IntlConvertPrice } from "@/lib/convert";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "sonner";

export default function FormAgendaComponent() {
  const { push, query } = useRouter();

  console.log("params form", query);

  const [ticketTypes, setTicketTypes] = useState<any[]>([]);
  const [tikectTypeEdited, setTicketTypeEdited] = useState<any | null>(null);
  const [openType, setOpenType] = useState("create");
  const [isOpen, setIsOpen] = useState(false);

  const modulesRef = useRef({
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["link"],
      ["clean"],
    ],
  });

  const formatsRef = useRef([
    "header",
    "font",
    "align",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "color",
    "background",
    "script",
    "link",
  ]);

  const onHandleAddTicketType = (formData: any) => {
    if (openType === "edit") {
      console.log("IF onHandleAddTicketType", formData, openType);
      const newTicketTypes = [...ticketTypes];
      newTicketTypes[formData.index] = formData;

      setTicketTypes(newTicketTypes);
      return;
    } else {
      console.log("ELSE onHandleAddTicketType", formData, openType);
      setTicketTypes((prev) => [...prev, formData]);
    }
  };

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      maps_location: "",
      sold_ticket: "",
      total_participant: "",
      created_at: "",
      updated_at: "",
    },
  });

  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  const onHandleSubmit = (formData: any) => {
    const data = {
      ...formData,
      date: new Date(formData.date).toISOString(),
      created_at: new Date().toISOString(),
      ticketTypes,
    };

    toast.success(`Data berhasil disimpan ${query.slug}`);

    if (query.slug) {
      if (query.slug === "create") {
        console.log("Data berhasil disimpan", data);
      } else {
        console.log("Data berhasil diupdate", data);
      }
    }
  };

  return (
    <Fragment>
      <Form {...form}>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Buat Event / Agenda Baru</h1>
          <div>Buat event / agenda baru untuk event anda</div>
        </div>

        <form
          onSubmit={form.handleSubmit(onHandleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Event</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tuliskan nama event disini"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Event</FormLabel>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jam Event</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Tuliskan nama event disini"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="total_participant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Pengunjung</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tuliskan total participat disini"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Event</FormLabel>
                <FormControl>
                  <ReactQuill
                    modules={modulesRef.current}
                    formats={formatsRef.current}
                    theme="snow"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lokasi Alamat Event</FormLabel>
                <FormControl>
                  <ReactQuill
                    modules={modulesRef.current}
                    formats={formatsRef.current}
                    theme="snow"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maps_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link Maps</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan link maps disini"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Tipe Tiket</h2>
            <div>Atur tipe tiket untuk event anda</div>
          </div>

          {ticketTypes.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Tipe Tiket</TableHead>
                  <TableHead>Total Dijual</TableHead>
                  <TableHead>Harga Tiket</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ticketTypes.length > 0 && (
                  <>
                    {ticketTypes.map((ticketType, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold text-lg">
                          {ticketType.name}
                        </TableCell>
                        <TableCell>
                          {convertNumber(ticketType.total)} Tiket
                        </TableCell>
                        <TableCell>
                          {IntlConvertPrice(ticketType.price)}
                        </TableCell>
                        <TableCell>{ticketType.description ?? "-"}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant={"ghost"}
                            size={"sm"}
                            type="button"
                            onClick={() => {
                              console.log(ticketType);

                              setTicketTypeEdited({ ...ticketType, index });
                              setIsOpen(true);
                              setOpenType("edit");
                            }}
                          >
                            <MdEdit size={20} className="text-primary" />
                          </Button>
                          <Button
                            variant={"ghost"}
                            size={"sm"}
                            type="button"
                            onClick={() =>
                              setTicketTypes((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <MdDelete size={20} className="text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          )}

          <Button
            variant={"outline"}
            type="button"
            onClick={() => {
              setIsOpen(true);
              setOpenType("create");
              setTicketTypeEdited(null);
            }}
            className="w-full"
          >
            Tambah Tipe Tiket
          </Button>

          <div className="flex justify-end items-center mt-5 gap-4">
            <Button
              variant={"outline"}
              type="button"
              onClick={() => push("/admin/agenda")}
            >
              Batal
            </Button>
            <Button type="submit">Simpan Data</Button>
          </div>
        </form>
      </Form>

      <ModalTicketType
        isOpen={isOpen}
        editedData={tikectTypeEdited}
        onClose={() => setIsOpen(false)}
        onAddTicketType={onHandleAddTicketType}
      />
    </Fragment>
  );
}
