import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { UserInfo } from "@/components/UserInfo";
import QuestionForm from "@/components/QuestionForm";
import QuestionContainer from "@/components/QuestionContainer";

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const user = await prisma.user.findUnique({ where: { slug } });

  if (!user) notFound();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white">
      <div className="w-full max-w-[600px] px-4 mt-10">
        {/* user profile */}
        <UserInfo
          user={{
            username: user.username ?? "Anonymous",
            image: user.image,
            bio: user.bio,
          }}
        />

        {/* question input */}
        <div className="bg-white/5 p-5 rounded-xl shadow-md border border-white/10 mb-6">
          <p className="text-lg font-medium text-purple-300 mb-2">
            Send an anonymous message
          </p>
          <QuestionForm slug={slug} />
        </div>
      </div>

      {/* questions */}
      <div className="w-full max-w-[1200px] mt-8 px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuestionContainer slug={slug} />
      </div>
    </div>
  );
}
