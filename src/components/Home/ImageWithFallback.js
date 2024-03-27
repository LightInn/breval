"use client";
import React, { useState } from "react";
import Image from "next/image";
import rgbDataURL from "@/services/dataurl.services";

function ImageWithFallback(props) {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={"Image"}
      placeholder="blur"
      blurDataURL={rgbDataURL(231, 183, 202)}
      onError={(e) => {
        console.error(e);
        setImgSrc(fallbackSrc);
      }}
    />
  );
}

export default ImageWithFallback;
