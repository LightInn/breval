import BlogDetails from "/src/components/Blog/BlogDetails";
import RenderMdx from "/src/components/Blog/RenderMdx";
import Tag from "/src/components/Elements/Tag";
import siteMetadata from "/src/utils/siteMetaData";
import getAllBlogs from "/src/services/blog.services";
import {slug} from "github-slugger";
import Image from "next/image";
import {notFound} from "next/navigation";
import Head from "next/head";
import React from "react";
import Highlight from "/src/components/Highlight";

export async function generateStaticParams() {
  const allBlogs = await getAllBlogs();
  return allBlogs.map((blog) => ({ slug: blog.url }));
}

export async function generateMetadata({ params }) {
  const allBlogs = await getAllBlogs();
  const blog = allBlogs.find((blog) => blog.url === params.slug);
  if (!blog) {
    return;
  }

  const publishedAt = new Date(blog.publishedAt).toISOString();
  const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString();

  let imageList = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList =
      typeof blog.image === "string"
        ? [siteMetadata.siteUrl + blog.image]
        : blog.image;
  }
  const ogImages = imageList.map((img) => {
    return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
  });

  const authors = blog?.author ? [blog.author] : siteMetadata.author;

  return {
    title: blog.title,
    description: blog.describe,
    openGraph: {
      title: blog.title,
      description: blog.describe,
      url: siteMetadata.siteUrl + blog.url,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.describe,
      images: ogImages,
    },
  };
}

export default async function BlogPage({ params }) {
  const allBlogs = await getAllBlogs();
  const blog = allBlogs.find((blog) => blog.url === params.slug);

  if (!blog) {
    notFound();
  }

  let imageList = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList =
      typeof blog.image.filePath === "string"
        ? [siteMetadata.siteUrl + blog.image]
        : blog.image;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.title,
    description: blog.description,
    image: imageList,
    datePublished: new Date(blog.publishedAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
    author: [
      {
        "@type": "Person",
        name: blog?.author ? [blog.author] : siteMetadata.author,
        url: siteMetadata.twitter,
      },
    ],
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
        />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="mb-8 text-center relative w-full h-[70vh] ">
          <div className="w-full h-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-0 md:p-20">
            <div className="flex flex-col justify-center gap-8 backdrop-blur-xl bg-black/40 w-full h-full rounded-2xl md:max-w-[70vw]  ">
              <div>
                <Tag
                  name={blog.tags[0]}
                  link={`/blog/categories/${slug(blog.tags[0])}`}
                  className="px-6 text-sm py-2"
                />
              </div>
              <h1 className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl text-center !leading-normal relative w-full">
                {blog.title}
              </h1>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 h-full" />

          <Image
            src={blog.image}
            alt={blog.title}
            width={1792}
            height={1024}
            className="aspect-video w-full h-full object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <BlogDetails blog={blog} slug={params.slug} />

        <div className="grid grid-cols-12  gap-y-8 lg:gap-8 sxl:gap-16 mt-8 px-5 md:px-10">
          {/* sticky div */}
          <div className="col-span-12  lg:col-span-2 sticky top-0">
            {/* -------------------------------------------------------------------  TOC ! -----------------------------------------------------------------------------------------------------------------------  */}
            {/*<details*/}
            {/*  className="border-[1px] border-solid border-dark text-dark rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"*/}
            {/*  open*/}
            {/*>*/}
            {/*  <summary className="text-lg font-semibold capitalize cursor-pointer">*/}
            {/*    Table Of Content*/}
            {/*  </summary>*/}
            {/*  <ul className="mt-4 font-in text-base">*/}
            {/*    Not available for now*/}
            {/*  </ul>*/}
            {/*</details>*/}
            {/* -------------------------------------------------------------------  SIMILAR ARTICLES ! -----------------------------------------------------------------------------------------------------------------------  */}
            {/*<details*/}
            {/*  className="border-[1px] my-8 border-solid border-dark text-dark rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"*/}
            {/*  open*/}
            {/*>*/}
            {/*  <summary className="text-lg font-semibold capitalize cursor-pointer">*/}
            {/*    Similar Articles*/}
            {/*  </summary>*/}
            {/*  <ul className="mt-4 font-in text-base">*/}
            {/*    Not available for now*/}
            {/*  </ul>*/}
            {/*</details>*/}
          </div>
          <RenderMdx blog={blog} />
          <Highlight />
        </div>
      </article>
    </>
  );
}
