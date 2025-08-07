import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { getUserFromToken } from "@/lib/utils";
import { notFound } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";

export default async function AnswerDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = getUserFromToken(token);

  if (!user) return notFound();

  const messages = await prisma.message.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-4">Your Questions</h1>

        {messages.length === 0 ? (
          <p className="text-gray-500">No questions yet.</p>
        ) : (
          messages.map((msg) => (
            <QuestionCard
              key={msg.id}
              id={msg.id.toString()}
              question={msg.question}
              date={new Date(msg.createdAt).toLocaleDateString()}
              answer={msg.answer || undefined}
              answeredAt={
                msg.answer && msg.answeredAt
                  ? new Date(msg.answeredAt).toLocaleDateString()
                  : undefined
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
