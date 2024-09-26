"use server";

import prisma from "@/lib/db";

export async function clearCache() {
  await prisma.$accelerate.invalidate({
    tags: ["posts"],
  });

  console.log("Cleared cached posts");
  return;
}
