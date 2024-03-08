import PocketBase from "pocketbase";
import Strapi from "strapi-sdk-js";

// function getAllBlog

async function getAllBlogs() {
 const strapi = new Strapi({ url: "https://breval-api.lightin.io" });


  const blo = await strapi.find("blogs", { populate: "image" });

  const bloa = blo.data.map((data) => {
    return {
      title: data.attributes.title,
      describe: data.attributes.describe,
      content: data.attributes.content,
      image: data.attributes.image.data?.attributes.url ?? "",
      url: data.attributes.url,
      tags: data.attributes.tags,
      publishedAt: data.attributes.publishedAt,
    };
  });

  // console.log(bloa);

  return bloa;
}

export default getAllBlogs;
