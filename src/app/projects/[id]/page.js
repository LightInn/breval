import React from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../../../components/navbar";
import ImageWithFallback from "../../../components/Home/ImageWithFallback";
import Markdown from "react-markdown";
import { format, parseISO } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default async function ProjectDetail({ params }) {
  const { id } = params;
  const project = await getProject(id);
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>Bréval LE FLOCH | {project.attributes?.title} </title>

        <meta
          name="description"
          content={
            project.attributes?.title +
            " : " +
            project.attributes?.short_description
          }
        />
        <link
          rel="canonical"
          href={"https://brev.al/projet/" + project.attributes?.title}
          key="canonical"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/*@ts-ignore*/}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navbar />

      <div className="pb-16 pt-12 sm:pb-24 ">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        >
          <ol role="list" className="flex items-center space-x-4">
            <li className="list-none">
              <div className="flex items-center">
                <Link
                  href={"/projet"}
                  className="mr-4 list-disc text-sm font-medium text-gray-400"
                >
                  projets
                </Link>
                <svg
                  viewBox="0 0 6 20"
                  aria-hidden="true"
                  className="h-5 w-auto text-gray-300"
                >
                  <path
                    d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </li>

            <li className="list-none text-sm">
              <div aria-current="page" className="font-medium text-glow-500">
                {project.attributes?.title}
              </div>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-glow-500">
                  {project.attributes?.title}
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  {format(parseISO(project.attributes?.date), "LLLL d, yyyy")}
                </p>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                {project.attributes?.media?.data?.map((image, idx) => (
                  <ImageWithFallback
                    key={image.id}
                    src={image.attributes.url}
                    fallbackSrc="/projets.png"
                    width={image.attributes.width}
                    height={image.attributes.height}
                    alt={image.attributes.name}
                    className={classNames(
                      idx === 0
                        ? "lg:col-span-2 lg:row-span-2"
                        : "hidden lg:block",
                      "w-full rounded-lg",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mt-2 lg:col-span-5">
              {/* URL VIEW */}

              {project.attributes?.url && (
                <a
                  type="submit"
                  className=" button mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-glow-500 px-8 py-3 text-base font-medium text-black hover:bg-glow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  href={project.attributes?.url}
                  data-umami-event="project link"
                  data-umami-event-url={project.attributes?.url}
                >
                  {project.attributes?.url}
                </a>
              )}

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-400">
                  Description
                </h2>

                <div className="prose prose-sm text-md mt-4 text-gray-100">
                  <Markdown>
                    {project.attributes?.description.toString()}
                  </Markdown>
                </div>
              </div>

              {project.attributes?.creators?.length > 0 && (
                <section aria-labelledby="policies-heading" className="mt-10">
                  {/* Policies */}

                  <h2 id="policies-heading" className="text-gray-400">
                    {`
											Other team's members for this project :
										`}
                  </h2>

                  <dl className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {project.attributes?.creators?.map((creator, idx) => (
                      <Link
                        key={idx}
                        data-umami-event="creator link"
                        data-umami-event-site={creator.site}
                        href={"https://" + creator.site}
                        className=" shiny-button transition-100 rounded-lg border border-glow-600 bg-gray-900 p-6 text-center hover:bg-gray-800 hover:text-black no-underline"
                      >
                        <dt>
                          <div
                            className="mx-auto text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="mt-4 text-sm font-medium">
                            {creator.name}
                          </span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">
                          {creator.site}
                        </dd>
                      </Link>
                    ))}
                  </dl>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const res = await fetch(
    "https://breval-api.lightin.io/api/projets?fields=title",
  );
  const data = await res.json();

  const paths = data.data.map((project) => ({ id: project.attributes.title }));

  return paths;
}

async function getProject(title) {
  const res = await fetch(
    `https://breval-api.lightin.io/api/projets?filters[title][$eq]=${title}&populate=*`,
  );
  const data = await res.json();

  if (!data) {
    return {
      props: { hasError: true },
    };
  }

  return data.data[0];
}