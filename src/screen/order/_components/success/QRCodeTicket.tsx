import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";

interface Props {
  code: string;
}

export default function QRCodeTicket(props: Props) {
  const { code } = props;

  const svgRef = useRef<SVGSVGElement>(null);

  const downloadStringAsFile = (data: string, filename: string) => {
    const a = document.createElement("a");
    a.download = filename;
    a.href = data;
    a.click();
  };

  const onDownloadQRCode = () => {
    const node = svgRef.current;
    if (node == null) {
      return;
    }

    // For SVG, we need to get the markup and turn it into XML.
    // Using XMLSerializer is the easiest way to ensure the markup
    // contains the xmlns. Then we make sure it gets the right DOCTYPE,
    // encode all of that to be safe to be encoded as a URI (which we
    // need to stuff into href).
    const serializer = new XMLSerializer();
    const fileURI =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(
        '<?xml version="1.0" standalone="no"?>' +
          serializer.serializeToString(node)
      );

    downloadStringAsFile(fileURI, "qrcode-svg.svg");
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <QRCodeSVG
        ref={svgRef}
        value={code}
        size={256}
        bgColor="transparent"
        imageSettings={{
          src: "/assets/images/logo-umby.png",
          height: 70,
          width: 60,
          excavate: true,
        }}
      />
      {/* button download */}
      <Button
        onClick={onDownloadQRCode}
        className="ml-4 text-white px-4 py-2 rounded-md w-fit"
      >
        Download QR Code
      </Button>
    </div>
  );
}
