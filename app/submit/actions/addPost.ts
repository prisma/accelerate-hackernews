"use server";

import prisma from "@/lib/db";
import { Filter } from "bad-words";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const text = formData.get("text");
  const url = formData.get("url");

  const filter = new Filter();

  if (
    filter.isProfane(title?.toString() ?? "") ||
    filter.isProfane(text?.toString() ?? "") ||
    filter.isProfane(url?.toString() ?? "")
  ) {
    return false;
  }

  const newPost = await prisma.post.create({
    data: {
      title: title?.toString() ?? "",
      content: text?.toString() ?? "",
      url: url?.toString() ?? "",
      vote: 0,
    },
  });

  await prisma.$accelerate.invalidate({
    tags: ["posts"],
  });

  console.log({ newPost }, "has been created.");
  return true;
}
