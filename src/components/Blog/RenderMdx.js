"use client";
import React from "react";
import Image from "next/image";
import markdownIt from "markdown-it";
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor";

const mdxComponents = {
  Image,
};

const RenderMdx = ({ blog }) => {
  // const MDXContent = useMDXComponent(blog.body.code)

  return (
    <div
      className="col-span-12  lg:col-span-8 font-in prose sm:prose-base md:prose-lg max-w-max
    prose-blockquote:bg-accent/20 
    prose-blockquote:p-2
    prose-blockquote:px-6
    prose-blockquote:border-accent
    prose-blockquote:not-italic
    prose-blockquote:rounded-r-lg

    prose-li:marker:text-accent


    first-letter:text-3xl
    sm:first-letter:text-5xl

    "
    >
      {/*<Markdown>{blog.content}</Markdown>*/}
      <div
        className="text-container"
        dangerouslySetInnerHTML={{
          __html: markdownIt({
            html: true,
            linkify: true,
            typographer: true,
          })
            .use(markdownItTocAndAnchor, {
              anchorLinkSymbol: "",
              toc: false,
            })
            .render(blog.content),
        }}
      />
    </div>
  );
};

export default RenderMdx;
