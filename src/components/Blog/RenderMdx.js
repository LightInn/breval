"use client";
import React from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkMdx from 'remark-mdx'


const mdxComponents = {
  Image,
};

const RenderMdx = ({ blog }) => {
  // const MDXContent = useMDXComponent(blog.body.code)

  return (
    <div
      id="mdx-content"
      className="col-span-12  lg:col-span-8 font-in prose sm:prose-base md:prose-lg max-w-max"
    >
      <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkMdx]}>{blog.content}</Markdown>
    </div>
  );
};

export default RenderMdx;
