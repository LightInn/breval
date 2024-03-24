import {format} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogLayoutThree = ({ blog }) => {
  return (
    <div className="group flex flex-col items-center text-dark">
      <Link
        href={"/blog/articles/" + blog.url}
        className="h-full rounded-xl overflow-hidden"
      >
        <Image
          src={blog.image}
          alt={blog.title}
          width={1792}
          height={1024}
          className=" aspect-[4/3] w-full h-full object-cover object-center  group-hover:scale-105 transition-all ease duration-300 "
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col w-full mt-4">
        <span className="uppercase text-accent font-semibold text-xs sm:text-sm">
          {blog.tags[0]}
        </span>
        <Link href={"/blog/articles/" + blog.url} className="inline-block my-1">
          <h2 className="font-semibold capitalize  text-base sm:text-lg">
            <span
              className="bg-gradient-to-r from-accent/50 to-accent/50
            bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog.title}
            </span>
          </h2>
        </Link>

        <span className="capitalize text-gray font-semibold text-sm  sm:text-base">
          {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutThree;
