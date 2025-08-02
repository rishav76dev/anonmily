import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { UserInfo } from "@/components/UserInfo";
import QuestionForm from "@/components/QuestionForm";
import QuestionContainer from "@/components/QuestionContainer";
import { Suspense } from "react";

//this is for visitor to ask question

export default async function Page({ params }: { params: { slug: string } }) {

  const { slug } = await params;

  const user = await prisma.user.findUnique({
    where: { slug },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="flex  min-h-screen items-center flex-col">
      <div className="w-full max-w-[600px] px-4">
        {/* user profile */}
        <UserInfo
          user={{
            username: user.name ?? "Anonymous",
            image: user.image,
            bio: user.bio,
          }}
        />

        {/* question input */}

        <p className="pl-1">Send an anonymous message</p>
        <QuestionForm slug={slug} />
      </div>

      <div className="w-full max-w-[1400px] mt-8 px-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<p>Loading questions...</p>}>
          <QuestionContainer slug={slug} />
        </Suspense>
      </div>
    </div>
  );
}
