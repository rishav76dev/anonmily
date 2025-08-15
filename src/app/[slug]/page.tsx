import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { UserInfo } from "@/components/UserInfo";
import QuestionForm from "@/components/QuestionForm";
import QuestionContainer from "@/components/QuestionContainer";
import CopyLink from "@/components/CopyLink";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await prisma.user.findUnique({ where: { slug } });

  if (!user) notFound();
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;

  // const loggedInUser = getUserFromToken(token);

  // const isOwner = loggedInUser?.userId === user.id;

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground transition-colors">
      <div className="w-full max-w-[600px] px-4 mt-10">
        {/* user profile */}
        <UserInfo
          user={{
            username: user.username ?? "Anonymous",
            image: user.image,
            bio: user.bio,
          }}
        />

        <CopyLink slug={slug} />

        {/* question input */}
        <div className="bg-card p-5 rounded-xl shadow-md border border-border mb-6 transition-colors">
          <p className="text-lg font-medium text-primary mb-2">
            Send an anonymous message
          </p>
          <QuestionForm slug={slug} />
        </div>
      </div>

      {/* questions */}
      <div>
        <h1 className="flex justify-center mt-10 text-4xl font-bold text-gray-800 tracking-wide dark:text-white">
          Answered Questions
        </h1>

        <div className="w-full max-w-[1200px] mt-8 px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuestionContainer slug={slug} />
        </div>
      </div>
    </div>
  );
}
