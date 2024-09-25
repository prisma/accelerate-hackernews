import { Post } from "@/components/Posts";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function Home() {
	const posts = await prisma.post.findMany({
		take: 20,
		orderBy: {
			createdAt: "desc",
		},
		cacheStrategy: {
			ttl: 120,
			tags: ["posts"],
		},
	});

	return (
		<>
			<div className="bg-[#f6f6ef] h-full w-full">
				<ol className="p-12 md:p-8 text-black">
					{posts.map((post, itemNo) => (
						<li
							key={post.id}
							className="mb-4"
						>
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
