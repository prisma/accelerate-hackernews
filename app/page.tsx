import { Post } from "@/components/Posts";
import prisma from "@/lib/db";
import js_ago from "js-ago";
import { clearCache } from "./actions/clearCache";

export default async function Home() {
  const { info, data } = await prisma.post
    .findMany({
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
      cacheStrategy: {
        ttl: 120,
        tags: ["posts"],
      },
    })
    .withAccelerateInfo();

  return (
    <>
      <div className="bg-[#f6f6ef] h-full w-full">
        <div className="p-12 md:p-8 font-bold text-lg text-black">
          {info?.lastModified && (
            <p>Showing cached data from: {js_ago(info.lastModified)}</p>
          )}

          <form action={clearCache}>
            <button type="submit">Reset cache</button>
          </form>
        </div>
        <ol className="pl-12 pr-12 md:pl-8 md:pr-8 text-black">
          {data.map((post, itemNo) => (
            <li key={post.id} className="mb-4">
              <Post
                id={post.id}
                itemNo={itemNo + 1}
                title={post.title}
                votes={post.vote}
                url={post.url}
              />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
