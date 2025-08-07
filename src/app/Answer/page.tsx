import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { getUserFromToken } from "@/lib/utils";
import { notFound } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";

export default async function AnswerDashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const payload = getUserFromToken(token);

  if (!payload) return notFound();

  // Fetch the full user from DB to get the username
  const dbUser = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      username: true,
    },
  });

  if (!dbUser) return notFound();

  const messages = await prisma.message.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-4">
          Your Questions <span className="text-blue-600">@{dbUser.username}</span>
        </h1>

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
