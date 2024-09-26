"use server";

import prisma from "@/lib/db";

export async function deletePost(id: number) {
  console.log({
    deleting: id,
  });

  await prisma.post.delete({
    where: {
      id: id,
    },
  });

  await prisma.$accelerate.invalidate({
    tags: ["posts"],
  });

  return id;
}
