import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { UserInfo } from "@/components/UserInfo";
import { QuestionCard } from "@/components/QuestionCard";
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
        <UserInfo user={user} />

        {/* question input */}

        <p className="pl-1">Send an anonymous message</p>
        <Textarea placeholder="Type your message here..." />
      </div>

      <div className="w-full max-w-[1400px] mt-8 px-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <QuestionCard
          question="What is the most unexpected compliment you’ve ever received and why?"
          date="Jul 29, 2025 7:50 PM"
        />
        <QuestionCard
          question="If you could swap lives with someone for a day, who would it be?"
          date="Jul 30, 2025 12:10 PM"
        />
        {/* Add more QuestionCards here */}
      </div>
    </div>
  );
}
