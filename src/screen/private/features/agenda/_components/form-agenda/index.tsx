import "@uiw/react-md-editor/markdown-editor.css";
import "easymde/dist/easymde.min.css";
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
import { CalendarIcon, Loader, Sparkles } from "lucide-react";
import { useRouter } from "next/router";
import React, {
  Fragment,
  useEffect,
  useMemo,
  useState,
  // useRef
} from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
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
import eventsServices from "@/services/events";
import { Textarea } from "@/components/ui/textarea";
import openaiServices from "@/services/ai_chat";

// import SimpleMdeReact from "react-simplemde-editor"; // SimpleMdeToCodemirrorEvents,
// import SimpleMDE from "easymde";

// import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
// import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import {
//   bold,
//   italic,
//   hr,
//   strikethrough,
//   checkedListCommand,
//   orderedListCommand,
//   unorderedListCommand,
//   link,
//   title,
//   quote,
//   divider,
//   fullscreen,
// } from "@uiw/react-md-editor";

export default function FormAgendaComponent() {
  const { push, query } = useRouter();

  // console.log("params form", query);

  const [isLoading, setIsLoading] = useState(false);
  const [ticketTypes, setTicketTypes] = useState<any[]>([]);
  const [tikectTypeEdited, setTicketTypeEdited] = useState<any | null>(null);
  const [openType, setOpenType] = useState("create");
  const [isOpen, setIsOpen] = useState(false);
  // const [isGenetatedFormAI, setIsGenetatedFormAI] = useState(false);

  const SimpleMdeReact = dynamic(
    () => import("react-simplemde-editor").then((mod) => mod.default),
    { ssr: false }
  );

  // const MDEditor = dynamic(
  //   () => import("@uiw/react-md-editor").then((mod) => mod.default),
  //   { ssr: false }
  // );

  // const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  // const modulesRef = useRef({
  //   toolbar: [
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     [{ font: [] }],
  //     [{ align: [] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     [{ color: [] }, { background: [] }],
  //     [{ script: "sub" }, { script: "super" }],
  //     ["link"],
  //     ["clean"],
  //   ],
  // });
  // const formatsRef = useRef([
  //   "header",
  //   "font",
  //   "align",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "color",
  //   "background",
  //   "script",
  //   "link",
  // ]);

  const form = useForm({
    defaultValues: {
      event_title: "",
      event_description: "",
      event_date: "",
      event_time: "",
      event_location: "",
      event_link_maps: "",
      event_sold_ticket: 0,
      event_total_participant: "",
      event_created_at: "",
      event_updated_at: "",
    },
  });

  useEffect(() => {
    if (query.slug !== "create") {
      const getDetailEvents = async () => {
        const { data } = await eventsServices.getDetailEvent(
          query.slug as string
        );

        if (data.data.id !== "undefined") {
          form.setValue("event_title", data.data.event_title);
          form.setValue("event_description", data.data.event_description);
          form.setValue("event_date", data.data.event_date);
          form.setValue("event_time", data.data.event_time);
          form.setValue("event_location", data.data.event_location);
          form.setValue("event_link_maps", data.data.event_link_maps);
          form.setValue(
            "event_total_participant",
            data.data.event_total_participant
          );

          setTicketTypes(data.data.ticketTypes);
        }
      };

      getDetailEvents();
    }
  }, [query.slug]);

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

  const disablegenerateAI = useMemo(() => {
    if (
      !form.getValues("event_title") ||
      !form.getValues("event_date") ||
      !form.getValues("event_time") ||
      !form.getValues("event_location")
    ) {
      return true;
    }

    return false;
  }, [form.watch()]);

  const generateAI = async (params: string) => {
    console.log("generateAI", params);

    // const resultGroqAI = await requestToGroqAI(
    //   `deskripsikan event menggunakan bahasa indonesia mengenai event ${form.getValues(
    //     "event_title"
    //   )} pada tanggal ${format(
    //     new Date(form.getValues("event_date")),
    //     "PPP"
    //   )} dan jam ${form.getValues(
    //     "event_time"
    //   )} serta berlokasi di  ${form.getValues("event_location")}`
    // );

    // form.setValue(
    //   "event_description",
    //   resultGroqAI.choices[0].message.content || ""
    // );

    await openaiServices.groqAIChat({
      content: `deskripsikan event menggunakan bahasa indonesia mengenai event ${form.getValues(
        "event_title"
      )} pada tanggal ${format(
        new Date(form.getValues("event_date")),
        "PPP"
      )} dan jam ${form.getValues(
        "event_time"
      )} serta berlokasi di  ${form.getValues("event_location")}`,
    }).then((results) => {
      console.log("results", results);
      
      form.setValue("event_description", results.data.choices[0].message.content);
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
    
  };

  const onHandleSubmit = async (formData: any) => {
    // toast.success(`Data berhasil disimpan ${query.slug}`);

    setIsLoading(true);

    if (query.slug) {
      const data = {
        ...formData,
        event_created_at: new Date(),
        ticketTypes,
      };

      if (query.slug === "create") {
        await eventsServices.createEvents({ data }).then((results) => {
          if (results.status) {
            toast.success(`Data berhasil disimpan`);
            setIsLoading(false);
          } else {
            toast.error("Gagal menyimpan data");
            setIsLoading(false);
          }
        });
      } else {
        const id = query.slug as string;

        await eventsServices.updateEvents(id, data).then((results) => {
          if (results.status) {
            toast.success(`Data berhasil disimpan`);
            setIsLoading(false);
          } else {
            toast.error("Gagal menyimpan data");
            setIsLoading(false);
          }
        });
      }
    }

    push("/admin/agenda");
  };

  // const autofocusNoSpellcheckerOptions = useMemo(() => {
  //   console.log("autofocusNoSpellcheckerOptions");

  //   return {
  //     autofocus: true,
  //     spellChecker: false,
  //   } as SimpleMDE.Options;
  // }, [form.getValues("event_description")]);

  return (
    <Fragment>
      <Form {...form}>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">
            {query.slug === "create" ? "Buat" : "Ubah"} Event / Agenda Baru
          </h1>
          <div>
            {query.slug === "create" ? "Buat" : "Ubah"} event / agenda baru
            untuk event anda
          </div>
        </div>

        <form
          onSubmit={form.handleSubmit(onHandleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="event_title"
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
              name="event_date"
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
              name="event_time"
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
            name="event_total_participant"
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
            name="event_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lokasi Alamat Event</FormLabel>
                <FormControl>
                  <Textarea
                    rows={
                      form.getValues("event_location").split("\n").length + 1
                    }
                    placeholder="Tuliskan lokasi lengkap event disini"
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
            name="event_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between items-end">
                  <div>
                    Deskripsi Event
                    <div className="text-xs mt-1 italic text-red-500">
                      Periksa kembali deskripsi event Anda sebelum menyimpan
                      data
                    </div>
                  </div>
                  <Button
                    disabled={disablegenerateAI}
                    size={"sm"}
                    type="button"
                    onClick={() => generateAI("event_description")}
                  >
                    <Sparkles className="mr-2 w-4 h-4" />
                    Generate Description with AI
                  </Button>
                </FormLabel>
                <FormControl>
                  <>
                    {/* <ReactQuill
                      modules={modulesRef.current}
                      formats={formatsRef.current}
                      theme="snow"
                      {...field}
                    /> */}
                    {/* <div className="bg-slate-100 border rounded-md">
                      <MDEditor
                        value={value}
                        // commands={[
                        //   bold,
                        //   italic,
                        //   hr,
                        //   strikethrough,
                        //   checkedListCommand,
                        //   orderedListCommand,
                        //   unorderedListCommand,
                        //   link,
                        //   title,
                        //   quote,
                        //   divider,
                        // ]}
                        preview="live"
                        onChange={(value) => setValue(value || "")}
                      />
                    </div> */}
                    <SimpleMdeReact
                      // data-testid="autofocus-no-spellchecker-editor"
                      // options={autofocusNoSpellcheckerOptions}
                      {...field}
                      value={form.getValues("event_description")}
                      onChange={(value) => {
                        form.setValue("event_description", value.toString());
                      }}
                    />
                    {/* <Textarea
                      rows={
                        form.getValues("event_description").split("\n").length +
                        1
                      }
                      placeholder="Tuliskan deskripsi event disini"
                      {...field}
                      required
                    /> */}
                    {/* <ReactMarkdown
                    // className="markdown-body"
                    // remarkPlugins={remarkPlugins}
                    // rehypePlugins={[rehypeHighlight]}
                    >
                      {form.getValues("event_description")}
                    </ReactMarkdown> */}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="event_link_maps"
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
                          {convertNumber(ticketType.total_qty)} Tiket
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
              disabled={isLoading}
              type="button"
              onClick={() => push("/admin/agenda")}
            >
              Batal
            </Button>
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <div className="flex justify-start items-center gap-3">
                  <Loader className="animate-spin w-4 h-4" />
                  Menyimpan Data
                </div>
              ) : (
                "Simpan Data"
              )}
            </Button>
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
