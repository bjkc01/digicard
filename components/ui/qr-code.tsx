"use client";

import { QRCodeSVG } from "qrcode.react";

type QRCodeProps = {
  value: string;
  size?: number;
  fgColor?: string;
};

export function QRCode({ value, size = 44, fgColor = "#475569" }: QRCodeProps) {
  return (
    <QRCodeSVG
      value={value}
      size={size}
      bgColor="transparent"
      fgColor={fgColor}
      level="M"
    />
  );
}
