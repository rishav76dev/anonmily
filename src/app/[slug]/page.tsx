import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Example: Fetch user using slug
  const user = await prisma.user.findUnique({
    where: { slug },
  });

  if (!user) {
     notFound();
  }

  return <div>{user.username} page</div>;
}
