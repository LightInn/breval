"use client";
import React, { useState } from "react";
import Image from "next/image";

function ImageWithFallback(props: any) {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={"Image"}
      onError={(e) => {
        console.error(e);
        setImgSrc(fallbackSrc);
      }}
    />
  );
}

export default ImageWithFallback;
