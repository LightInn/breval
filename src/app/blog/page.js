import getAllBlogs from "../../services/blog.services";
// import {allBlogs}       from '../../.contentlayer/generated/Blog/_index.mjs';
import HomeCoverSection from "../../components/Home/HomeCoverSection";
import FeaturedPosts from "../../components/Home/FeaturedPosts";
import RecentPosts from "@/components/Home/RecentPosts";

export const metadata = {
  title: "Bréval LE FLOCH | My Blog",
  description:
    "In this blog, I share my thoughts, my projects, my experiences and my knowledge about web and mobile development !",
};

export default async function Home() {
  const allBlogs = await getAllBlogs();

  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={allBlogs} />
      <FeaturedPosts blogs={allBlogs} />
      <RecentPosts blogs={allBlogs}/>
    </main>
  );
}
