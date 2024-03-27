import React from "react";
import Image from "next/image";

export function Playground({ image = "/dynamic/0.webp" , setReload = null}) {
  return (
    <div className="flex flex-col md:ml-20 px-8 items-center justify-center w-full min-h-screen space-y-12 py-4 ">
      <div className="text-center p-4 bg-dynamic-vibrant-light rounded-lg shadow-xl">
        <p className="text-lg font-bold text-gray-800">
          Everything looks oddly colored here, doesn&apos;t it?
        </p>
        <p>Well, that&apos;s because I didn&apos;t choose the colors!</p>
        <p>
          The color theme is generated dynamically from the background image ⭐
        </p>
        <p>You can reload the page to try with a different image and theme!</p>
      </div>

      <div className="p-4">
        <p className="text-xl font-semibold text-black">Actual Theme</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <div className="grid grid-cols-3 gap-4 w-[25vw] min-w-80">
            <div className="aspect-square w-full max-w-48 flex justify-center items-center rounded-lg text-white text-sm font-medium shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 bg-dynamic-vibrant-light">
              Vibrant Light
            </div>
            <div className="aspect-square w-full max-w-48 flex justify-center items-center rounded-lg text-white text-sm font-medium shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 bg-dynamic-vibrant">
              Vibrant
            </div>
            <div className="aspect-square w-full max-w-48 flex justify-center items-center rounded-lg text-white text-sm font-medium shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 bg-dynamic-vibrant-dark">
              Vibrant Dark
            </div>
            <div className="aspect-square w-full max-w-48 flex justify-center items-center rounded-lg text-white text-sm font-medium shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 bg-dynamic-muted-light">
              Muted Light
            </div>
            <div className="aspect-square w-full max-w-48 flex justify-center items-center rounded-lg text-white text-sm font-medium shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 bg-dynamic-muted">
              Muted
            </div>
            <div className="aspect-square w-full max-w-48 flex justify-center items-center rounded-lg text-white text-sm font-medium shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 bg-dynamic-muted-dark">
              Muted Dark
            </div>
          </div>

          <p className="text-xl font-semibold text-black md:hidden">
            Based on Image
          </p>
          <Image
            src={image}
            height={1080 / 3}
            width={1920 / 3}
            className="rounded-2xl md:mx-10 md:w-1/2"
            alt="image of a landscape to generate the theme"
          />
        </div>
      </div>

      <button
        className="mt-5 px-6 py-3 bg-dynamic-vibrant font-bold rounded-full shadow-lg transition-colors duration-300 ease-in-out hover:bg-dynamic-vibrant-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        onClick={() => setReload(Math.random())}
        data-umami-event="reload"
      >
        Reload Page
      </button>
    </div>
  );
}
