import Image from "next/image";
import React from "react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { convertNumber } from "@/lib/convert";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { generateTicketCode } from "@/lib/generate-code";

interface Props {
  id: string;
}

export default function OrderSuccessComponent(props: Props) {
  const { id } = props;

  const detailPaymentMidtrans = useRef({
    status_code: "200",
    status_message: "Success, transaction is found",
    transaction_id: "0782dd34-5ac6-413f-a76f-7fb4b7163eca",
    order_id: "fc6351f8-996c-48f0-b64b-22d41b27efcd",
    gross_amount: "2000000.00",
    payment_type: "bank_transfer",
    transaction_time: "2024-09-26 22:24:31",
    transaction_status: "settlement",
    fraud_status: "accept",
    va_numbers: [
      {
        bank: "bca",
        va_number: "47083326116",
      },
    ],
    bca_va_number: "47083326116",
    pdf_url:
      "https://app.sandbox.midtrans.com/snap/v1/transactions/29d0ccc7-3d0a-40ac-8c74-ad984180746a/pdf",
    finish_redirect_url:
      "https://event-ticketing-prod.vercel.app/?order_id=fc6351f8-996c-48f0-b64b-22d41b27efcd&status_code=200&transaction_status=settlement",
  });

  const dataOrder = useRef({
    id: "fc6351f8-996c-48f0-b64b-22d41b27efcd",
    fullname: "John Doe",
    email: "alfian.nuha@gmail.com",
    phone: "08123456789",
    total_payment: "2000000",
    status: "pending",
    created_at: "2024-09-26 22:24:31",

    event: {
      id: "1",
      title: "React Meetup",
      description: "React Meetup is a meetup for React developers",
      location: "Jakarta",
      date: "2024-09-26",
      time: "22:24:31",
      price: "2000000",
      image: "/assets/images/react-meetup.jpg",
    },

    tickets: [
      {
        id: "1",
        title: "React Meetup Ticket",
        type: "regular",
        description: "React Meetup Ticket is a ticket for React Meetup",
        price: "2000000",
        code: generateTicketCode({
          prefix: "RTMTP",
          length: 3,
          is_random: false,
        }),
      },
      {
        id: "2",
        title: "React Meetup Ticket",
        type: "regular",
        description: "React Meetup Ticket is a ticket for React Meetup",
        price: "2000000",
        code: "RTMTP-002",
      },
      {
        id: "3",
        title: "React Meetup Ticket",
        type: "regular",
        description: "React Meetup Ticket is a ticket for React Meetup",
        price: "2000000",
        code: "RTMTP-003",
      },
    ],
  });

  const QRCodeTicket = dynamic(() => import("./QRCodeTicket"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });

  return (
    <div>
      <div>
        <Image
          width={50}
          height={50}
          className="w-full h-96 mx-auto"
          src="/assets/images/success.svg"
          alt="icon success"
        />

        <h1 className="text-4xl font-bold text-center mt-6">Order Success</h1>

        <p className="text-center mt-4">
          Your order has been successfully processed
        </p>
      </div>

      <div className="mt-10">
        <h1 className="text-xl font-bold">Transaction Detail</h1>

        <div className="mt-4">
          <div>Order ID: {detailPaymentMidtrans.current.order_id}</div>
          <div>
            Transaction ID: {detailPaymentMidtrans.current.transaction_id}
          </div>
          <div>Payment Type: {detailPaymentMidtrans.current.payment_type}</div>
          <div>
            Transaction Time: {detailPaymentMidtrans.current.transaction_time}
          </div>
          <div>
            Transaction Status:{" "}
            {detailPaymentMidtrans.current.transaction_status}
          </div>
          <div>Gross Amount: {detailPaymentMidtrans.current.gross_amount}</div>
        </div>

        <div className="mt-4">
          <h1 className="text-xl font-bold">Virtual Account Number</h1>
          <div>Bank: {detailPaymentMidtrans.current.va_numbers[0].bank}</div>
          <div>
            Virtual Account Number:{" "}
            {detailPaymentMidtrans.current.va_numbers[0].va_number}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-xl font-bold">Order Detail {id}</h1>

        <div className="mt-4">
          <div>Order ID: {dataOrder.current.id}</div>
          <div>Fullname: {dataOrder.current.fullname}</div>
          <div>Email: {dataOrder.current.email}</div>
          <div>Phone: {dataOrder.current.phone}</div>
          <div>Total Payment: {dataOrder.current.total_payment}</div>
          <div>Status: {dataOrder.current.status}</div>
          <div>Created At: {dataOrder.current.created_at}</div>
        </div>

        <div className="mt-4">
          <h1 className="text-xl font-bold">Event Detail</h1>
          <div>Event ID: {dataOrder.current.event.id}</div>
          <div>Title: {dataOrder.current.event.title}</div>
          <div>Description: {dataOrder.current.event.description}</div>
          <div>Location: {dataOrder.current.event.location}</div>
          <div>Date: {dataOrder.current.event.date}</div>
          <div>Time: {dataOrder.current.event.time}</div>
          <div>Price: {dataOrder.current.event.price}</div>
        </div>

        <div className="mt-4">
          <h1 className="text-xl font-bold">Ticket Detail</h1>
          <Accordion type="multiple" className="w-full">
            {dataOrder.current.tickets.map((ticket, index) => (
              <AccordionItem key={index} value={ticket.id} className="py-3">
                <AccordionTrigger className="flex justify-between items-center bg-primary text-white rounded-lg px-4">
                  <div className="flex-1 text-left">
                    <div>{ticket.id}</div>
                    <div>{ticket.title}</div>
                  </div>
                  <div className="mr-4 text-right">
                    <div className="uppercase font-medium text-sm">
                      {ticket.type}
                    </div>
                    <div className="font-semibold">
                      Rp{convertNumber(Number(ticket.price))} / ticket
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-10 text-center bg-green-100 rounded-lg">
                  <div className="space-y-5">
                    {ticket.code && <QRCodeTicket code={ticket.code} />}
                    <div className="flex justify-center items-center gap-4 text-lg">
                      Code:
                      <div className="flex justify-center items-center gap-2">
                        <span className="font-bold">{ticket.code}</span>
                        <Copy
                          className="cursor-pointer w-4 h-4"
                          onClick={() => {
                            navigator.clipboard.writeText(ticket.code);
                            toast.success(
                              `Code ${ticket.code} copied to clipboard`
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
