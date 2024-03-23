import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";
import { slug } from "github-slugger";
// import ViewCounter from "./ViewCounter";

const BlogDetails = ({ blog, slug: blogSlug }) => {
  return (
    <div className="px-2 md:px-10 bg-accent text-dark py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5  md:mx-10 rounded-lg">
      <address className="author">
        By{" "}
        <a rel="author" href="/">
          Bréval LE FLOCH
        </a>
      </address>

      <p className="m-3 max-w-full overflow-hidden">
        {blog.tags.length > 1 &&
          blog.tags.map((tag) => (
            <Link
              key={slug(tag)}
              href={`/blog/categories/${slug(tag)}`}
              className="m-1"
            >
              #{tag}
            </Link>
          ))}
      </p>

      <p className="m-3">
        <time
          pubdate
          dateTime={parseISO(blog.publishedAt)}
          title={format(parseISO(blog.publishedAt), "LLLL d, yyyy, h:mm a")}
        >
          {format(parseISO(blog.publishedAt), "LLLL d, yyyy, h:mm a")}
        </time>
      </p>
    </div>
  );
};

export default BlogDetails;
