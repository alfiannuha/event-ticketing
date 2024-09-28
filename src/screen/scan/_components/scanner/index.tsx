import { Button } from "@/components/ui/button";
import localdayjs from "@/lib/dayjs";
import { IDetectedBarcode, outline, Scanner } from "@yudiel/react-qr-scanner";
// import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { CheckCheck, CircleX } from "lucide-react";

interface Props {
  eventId: string;
}

interface ResultVal {
  event_id: string;
  event_name: string;
  ticket_type: string;
  ticket_price: number;
  ticket_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
}

export default function ScannerComponent(props: Props) {
  const { eventId } = props;

  const [startScan, setStartScan] = useState(false);
  const [scanResult, setScanResult] = useState<IDetectedBarcode[]>([]);
  const [scanError, setScanError] = useState(false);
  const [scanErrorMessage, setScanErrorMessage] = useState("");

  // const jsonResult: ResultVal = {
  //   event_id: "",
  //   event_name: "",
  //   ticket_id: "",
  //   ticket_type: "",
  //   ticket_price: 0,
  //   ticket_code: "",
  //   customer_name: "",
  //   customer_phone: "",
  //   customer_email: "",
  // };

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
    setScanResult(result);
    setStartScan(false);

    try {
      const resultVal: ResultVal = JSON.parse(result[0].rawValue);
      if (resultVal.event_id !== eventId) {
        setScanError(true);
        setScanErrorMessage("QR Code tidak sesuai dengan event");
        return toast.error("Event tidak sesuai");
      }

      // hit api to check ticket if used or not

      return toast.success("Berhasil Scan QR Code");
    } catch (error) {
      console.error(error);
      setScanError(true);
      setScanErrorMessage("QR Code tidak valid");
      return toast.error("QR Code tidak valid");
    }
  };

  const onError = (error: unknown) => {
    console.error(error);
    setScanError(true);

    toast.error("Scan Error");
  };

  const renderInformationTicket = (value: string) => {
    const resultVal: ResultVal = JSON.parse(value);
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
    <div className="text-center py-0 relative h-full">
      <div className="mb-5 space-y-3">
        <div className="text-2xl uppercase font-bold">Scan Ticket</div>
        <div>
          <div className="font-semibold text-xl">{event?.title}</div>
          <div className="text-sm">
            {localdayjs(event.date)
              .locale("id")
              .format("dddd, DD MMMM YYYY HH:mm")}
          </div>
        </div>
      </div>

      {scanResult.length > 0 && !startScan && (
        <div className="mt-3">
          {scanError && (
            <CircleX
              size={100}
              className="mx-auto bg-red-700 p-5 rounded-full"
              color="white"
            />
          )}
          {!scanError && (
            <CheckCheck
              size={100}
              className="mx-auto bg-green-700 p-5 rounded-full"
              color="white"
            />
          )}

          <div className="text-sm my-5">
            {scanResult.map((result) => (
              <div key={result.rawValue}>
                {!scanError ? (
                  <>
                    <div className="font-semibold text-lg">
                      Information Ticket
                    </div>
                    {renderInformationTicket(result.rawValue)}
                  </>
                ) : (
                  <div className="text-red-500 space-y-3 my-4">
                    <div className="font-semibold text-xl">
                      {scanErrorMessage}
                    </div>
                    <div>
                      Informasi data tidak ditemukan, pastikan QR Code yang
                      discan adalah tiket dengan event yang sesuai.
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {scanResult.length === 0 && startScan && (
        <div className="mt-3">
          <Scanner
            onScan={onHandleScan}
            onError={onError}
            components={{
              audio: true,
              onOff: true,
              torch: true,
              finder: true,
              tracker: outline,
            }}
            scanDelay={2000}
          />
        </div>
      )}

      {scanResult.length > 0 && !startScan && (
        <Button
          className="mt-3 w-full"
          onClick={() => {
            setStartScan(true);
            setScanError(false);
            setScanResult([]);
          }}
        >
          Scan Selanjutnya
        </Button>
      )}

      {scanResult.length === 0 && !startScan && (
        <Button
          className="mt-3 w-full"
          onClick={() => {
            setStartScan(true);
            setScanError(false);
            setScanResult([]);
          }}
        >
          Mulai Scan Ticket
        </Button>
      )}
    </div>
  );
}
