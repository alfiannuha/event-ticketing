import localdayjs from "@/lib/dayjs";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import React from "react";
import { toast } from "sonner";

interface Props {
  eventId: string;
}

export default function ScannerComponent(props: Props) {
  const { eventId } = props;

  console.log("params scanner", eventId);

  const [scanResult, setScanResult] = React.useState<IDetectedBarcode[]>([]);

  const event = {
    id: eventId,
    title: "Task Force Meeting",
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

  const onHandleScan = (result: IDetectedBarcode[]) => {
    console.log(result);
    setScanResult(result);

    toast.success("Scan Success");
  };

  const onError = (error: unknown) => {
    console.error(error);

    toast.error("Scan Error");
  };

  const onHandleResultRawValue = (value: string) => {
    interface ResultVal {
      event_id: string;
      event_name: string;
      ticket_id: string;
      ticket_type: string;
      ticket_price: number;
      ticket_code: string;
      customer_name: string;
      customer_phone: string;
      customer_email: string;
    }

    const resultVal: ResultVal = JSON.parse(value);

    console.log(resultVal);

    return (
      <div>
        <div>
          <div className="flex justify-between items-center border-b-[1px] py-2">
            <div>Tipe Ticket</div>
            <div className="font-bold ">{resultVal.ticket_type ?? "-"}</div>
          </div>
          <div className="flex justify-between items-center border-b-[1px] py-2">
            <div>Code Ticket</div>
            <div className=" font-semibold">{resultVal.ticket_code ?? "-"}</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center border-b-[1px] py-2">
            <div>Nama Pembeli</div>
            <div className="font-bold ">{resultVal.customer_name ?? "-"}</div>
          </div>
          <div className="flex justify-between items-center border-b-[1px] py-2">
            <div>Email Pembeli</div>
            <div className=" font-semibold">
              {resultVal.customer_email ?? "-"}
            </div>
          </div>
          <div className="flex justify-between items-center border-b-[1px] py-2">
            <div>No.Hp Pembeli</div>
            <div className=" font-semibold">
              {resultVal.customer_phone ?? "-"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-center py-0">
      <div className="mb-4">
        <div className="text-2xl uppercase font-bold">Scan Ticket</div>
      </div>

      <Scanner onScan={onHandleScan} onError={onError} />

      <div className="mt-4">
        <div className="font-semibold text-xl">{event?.title}</div>
        <div className="text-sm">
          {localdayjs(event.date)
            .locale("id")
            .format("dddd, DD MMMM YYYY HH:mm")}
        </div>
      </div>

      <div>
        {scanResult.length > 0 && (
          <div className="mt-3">
            <div className="font-semibold text-lg">QR Code Info</div>
            <div className="text-sm">
              {scanResult.map((result) => (
                <div key={result.rawValue}>
                  {onHandleResultRawValue(result.rawValue)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
