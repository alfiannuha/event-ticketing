import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import localdayjs from "@/lib/dayjs";
import { generateTicketCode } from "@/lib/generate-code";
import eventsServices from "@/services/events";
import transactionServices from "@/services/transaction";
import classNames from "classnames";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface Props {
  eventId: string;
}

declare global {
  interface Window {
    snap: any;
  }
}

interface SuccessPayment {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  va_numbers: VaNumber[];
  bca_va_number: string;
  pdf_url: string;
  finish_redirect_url: string;
}

export interface VaNumber {
  bank: string;
  va_number: string;
}

const TICKETTYPELIST = [
  {
    id: 1,
    event_id: 1,
    name: "Tiket Reguler",
    price: 100000,
    qty: 0,
    total_qty: 100,
  },
  {
    id: 2,
    event_id: 1,
    name: "Tiket VIP",
    price: 200000,
    qty: 0,
    total_qty: 50,
  },
  {
    id: 3,
    event_id: 1,
    name: "Tiket VVIP",
    price: 300000,
    qty: 0,
    total_qty: 25,
  },
];

export default function EventBuyComponent(props: Props) {
  const { eventId } = props;

  const { push } = useRouter();

  const [selectedTicket, setSelectedTicket] = useState<any>(TICKETTYPELIST);
  // const [eventDetail, setEventDetail] = useState<any>({});
  const [paymentID, setPaymentID] = useState("");

  const [event, setEvent] = useState<any>({});
  useEffect(() => {
    const getDetailEvents = async () => {
      const { data } = await eventsServices.getDetailEvent(eventId);

      setEvent(data.data);
    };

    getDetailEvents();
  }, [eventId]);

  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      qty: 1,
      ticket: 0,
    },
  });

  useEffect(() => {
    // get event detail
    // const { data, error } = await supabase.from('events')
    //   .select()
    //   .eq('id', eventId)
    //   .single()
    // if (error) {
    //   toast.error('Event tidak ditemukan')
    //   return
    // }
    // if (!data) {
    //   toast.error('Event tidak ditemukan')
    //   return
    // }
    // setEventDetail(data)
  }, [eventId]);

  const increment = (selected: any) => {
    setSelectedTicket((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...selected,
            qty: item.qty + 1,
          };
        }

        return item;
      });
    });
  };

  const decrement = (selected: any) => {
    setSelectedTicket((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...selected,
            qty: item.qty - 1,
          };
        }

        return item;
      });
    });
  };

  const onValidation = () => {
    let isValid = true;

    const ticket = selectedTicket
      .filter((item: any) => item.qty > 0)
      .map((item: any) => {
        return {
          ticket_id: item.id,
          qty: item.qty,
        };
      });

    if (ticket.length === 0) {
      isValid = false;
      toast.warning(
        "Tiket belum dipilih, silahkan pilih tiket terlebih dahulu"
      );
    }

    return isValid;
  };

  const onSubmit = async (FormData: any) => {
    if (!onValidation()) return;

    const paymentId = uuidv4();

    const tickets = selectedTicket
      .filter((item: any) => item.qty > 0)
      .map((item: any) => {
        return {
          event_id: item.event_id,
          ticket_type_id: item.id,
          ticket_name: item.name,
          ticket_price: item.price,
          qty: item.qty,
        };
      });

    //  data payment
    const formData = {
      ...FormData,
      payment_id: paymentId,
      total_ticket: tickets.reduce((acc: any, item: any) => acc + item.qty, 0),
      total_payment: tickets.reduce(
        (acc: any, item: any) => acc + item.qty * item.price,
        0
      ),
      tickets,
    };

    console.log(formData);

    // hit service to create transaction
    const { data } = await transactionServices.generateTransation(formData);

    console.log("generateTransation", data);

    const transaction_token = data.data.token;

    window.snap.pay(transaction_token, {
      onSuccess: function (result: SuccessPayment) {
        console.log("success", result);
        toast.success(
          "Pembayaran berhasil, anda akan diarahkan ke halaman tiket"
        );

        setTimeout(() => {
          push(`/order/success/${result.order_id}`);
        }, 50);
        // hit service to update transaction status
      },
      onPending: function (result: any) {
        console.log("pending", result);
        // hit service to update transaction status
      },
      onError: function (result: any) {
        console.log("error", result);
        // hit service to update transaction status
      },
      onClose: function () {
        console.log("customer closed the popup without finishing the payment");
      },
    });

    // insert data payment to database
    // const { data, error } = await supabase.from('tickets')
    //   .insert({
    //     ...formData
    //   })
    //   .select()
    //   .single()

    // if (error) {
    //   toast.error('Gagal membeli tiket')
    //   return
    // }

    // if (data) {
    //    toast.success('Berhasil membeli tiket')
    setPaymentID(data.id);
    // }

    // insert ticket data to datab
    tickets.forEach(async (item: any) => {
      for (let i = 0; i < item.qty; i++) {
        const code = generateTicketCode(8);

        // get detail tiket
        // const { data: ticketDetail, error: ticketDetail } = await supabase.from('tickets')
        //   .select()
        //   .eq('code', code)
        //   .single()

        // if (ticketDetail) {
        //   toast.error('Gagal membeli tiket')
        //   return
        // }

        // if (!ticketDetail) {
        //   toast.error('Event tidak ditemukan')
        //   return
        // }

        // if (ticketDetail) {
        //   code = generateTicketCode()
        //   return
        // }

        // insert ticket data
        const tiketData = {
          // ...formData,
          event_id: eventId,
          ticket_type_id: item.ticket_type_id,
          payment_id: paymentID,
          ticket_id: uuidv4(),
          ticket_title: item.name,
          ticket_code: code,
          ticket_price: item.price,
          is_used: false,
          is_expired: false,
          created_at: new Date(),
          ticket_json_qr: JSON.stringify({
            event_id: eventId,
            event_name: "React Meetup", // nanti diganti dengan nama event
            ticket_type: item.name,
            ticket_price: item.price,
            ticket_code: code,
            customer_name: FormData.fullname,
            customer_phone: FormData.phone,
            customer_email: FormData.email,
          }),
          // expired_at: eventDetail.datetime,
        };

        console.log(`tiketdata ${i}`, tiketData);

        // const { data, error } = await supabase.from('tickets')
        //   .insert({
        //     ...formData,
        //     event_id: eventId,
        //     code,
        //     ticket_id: item.ticket_id,
        //     price: item.price,
        //     qty: 1
        //   })
        //   .select()
        //   .single()

        // if (error) {
        //   toast.error('Gagal membeli tiket')
        //   return
        // }

        // if (data) {
        //   toast.success('Berhasil membeli tiket')
        // }
      }
    });

    // create transaction with midtrans
  };

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL} // change to production url
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div>
        <div className="bg-[url('/assets/images/patternpad-3.png')] w-full h-96 object-contain flex flex-col justify-center items-center space-y-4 mb-5">
          <div className="text-white text-5xl font-bold text-center">
            {event.event_title}
          </div>
          <div className="text-white text-2xl font-bold">
            {localdayjs(event.event_date).format("DD MMMM YYYY")} pukul{" "}
            {event.event_time}
          </div>
        </div>

        <div className="font-semibold text-4xl mb-5">Detail Pembelian</div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="grid grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nama lengkap disini"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan alamat email disini"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Telephone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan no.telephone disini"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <div className="font-semibold text-4xl mb-5">Pilih Tiket</div>

              {TICKETTYPELIST.map((ticket, index) => (
                <div
                  key={index}
                  className={classNames(
                    "flex justify-between items-center border p-4 mb-2 rounded-md cursor-pointer",
                    "border rounded-md p-4 cursor-pointer"
                  )}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-bold">{ticket.name}</div>
                    <div className="text-sm">
                      (
                      {Intl.NumberFormat("id-ID", {
                        currency: "IDR",
                        style: "currency",
                      }).format(ticket.price)}
                      ) / <span className="font-semibold">ticket</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 justify-end gap-4">
                    <div className="grid grid-cols-3 items-center text-center gap-4">
                      <Button
                        type="button"
                        className="rounded-md cursor-pointer p-1"
                        disabled={
                          selectedTicket.find(
                            (item: any) => item.id === ticket.id
                          )?.qty === 0
                        }
                        onClick={(e) => {
                          e.stopPropagation();

                          decrement(ticket);
                        }}
                      >
                        <Minus className="w-7 h-7 rounded-md cursor-pointer p-1" />
                      </Button>
                      <div className="font-semibold">
                        {selectedTicket.find(
                          (item: any) => item.id === ticket.id
                        )?.qty || 0}
                      </div>
                      <Button
                        type="button"
                        className="rounded-md cursor-pointer p-1"
                        disabled={
                          selectedTicket.find(
                            (item: any) => item.id === ticket.id
                          )?.qty === ticket.total_qty
                        }
                        onClick={(e) => {
                          e.stopPropagation();

                          increment(ticket);
                        }}
                      >
                        <Plus className="w-7 h-7 rounded-md cursor-pointer p-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="font-semibold text-4xl mb-5">
              Ringkasan Pembelian
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="font-semibold text-xl">Total Tiket</div>
                <div className="text-sm">Jumlah tiket yang dibeli</div>
              </div>
              <div>
                <div className="font-semibold text-xl">
                  {selectedTicket.reduce(
                    (acc: any, item: any) => acc + item.qty,
                    0
                  )}{" "}
                  Tiket
                </div>
              </div>
              <div>
                <div className="font-semibold text-xl">Total Pembayaran</div>
                <div className="text-sm">
                  Total pembayaran yang harus dibayarkan
                </div>
              </div>
              <div>
                <div className="font-semibold text-xl">
                  {Intl.NumberFormat("id-ID", {
                    currency: "IDR",
                    style: "currency",
                  }).format(
                    selectedTicket.reduce(
                      (acc: any, item: any) => acc + item.qty * item.price,
                      0
                    )
                  )}
                </div>
              </div>
            </div>

            <Button className="w-full py-6" type="submit">
              Beli Tiket
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
