import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  value: string;
  size?: number;
  className?: string;
  imageLink?: string;
}

export default function QRCodeCustom(props: Props) {
  const {
    value,
    size = 256,
    className,
    imageLink = "/assets/images/logo-umby.png",
  } = props;

  const svgRef = useRef<SVGSVGElement>(null);

  const imagesSettings = useRef({
    src: imageLink,
    height: 70,
    width: 60,
    excavate: true,
  });

  return (
    <div className={className}>
      {value && (
        <>
          {imageLink ? (
            <QRCodeSVG
              ref={svgRef}
              value={value}
              size={size}
              bgColor="transparent"
              imageSettings={imagesSettings.current}
            />
          ) : (
            <QRCodeSVG
              ref={svgRef}
              value={value}
              size={size}
              bgColor="transparent"
            />
          )}
        </>
      )}
    </div>
  );
}
