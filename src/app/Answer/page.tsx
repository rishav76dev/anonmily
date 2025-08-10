import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { getUserFromToken } from "@/lib/utils";
import { notFound } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function AnswerDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const payload = getUserFromToken(token);

  if (!payload) return notFound();

  const dbUser = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, username: true },
  });

  if (!dbUser) return notFound();

  const messages = await prisma.message.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span className="text-gray-900 dark:text-gray-100 tracking-tight">
            Your Questions
          </span>
          <span className="bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-200 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium border border-indigo-200 dark:border-indigo-700 shadow-sm">
            @{dbUser.username}
          </span>
        </h1>

        {/* If no questions */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center text-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M21 16.5a9.5 9.5 0 11-18 0 9.5 9.5 0 0118 0z"
              />
            </svg>

            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
              No questions yet
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              📢 Share your profile link and start receiving anonymous
              questions from friends and followers.
            </p>

            <button className="mt-6 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg transition">
              Share Profile
            </button>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              <TabsTrigger value="answered">Answered</TabsTrigger>
            </TabsList>

            {/* All */}
            <TabsContent value="all" className="mt-4 space-y-4">
              {messages.map((msg) => (
                <QuestionCard
                  key={msg.id}
                  id={msg.id.toString()}
                  question={msg.question}
                  date={new Date(msg.createdAt).toLocaleDateString()}
                  answer={msg.answer || undefined}
                  isOwner={true}
                  answeredAt={
                    msg.answer && msg.answeredAt
                      ? new Date(msg.answeredAt).toLocaleDateString()
                      : undefined
                  }
                  className={
                    msg.answer
                      ? "border-green-200 bg-green-50 dark:bg-green-900/30"
                      : "border-gray-200 bg-white dark:bg-gray-800"
                  }
                />
              ))}
            </TabsContent>

            {/* Unanswered */}
            <TabsContent value="unanswered" className="mt-4 space-y-4">
              {messages.filter((m) => !m.answer).length > 0 ? (
                messages
                  .filter((m) => !m.answer)
                  .map((msg) => (
                    <QuestionCard
                      key={msg.id}
                      id={msg.id.toString()}
                      question={msg.question}
                      date={new Date(msg.createdAt).toLocaleDateString()}
                      isOwner={true}
                      className="border-gray-200 bg-white dark:bg-gray-800"
                    />
                  ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-10">
                  No unanswered questions.
                </p>
              )}
            </TabsContent>

            {/* Answered */}
            <TabsContent value="answered" className="mt-4 space-y-4">
              {messages.filter((m) => m.answer).length > 0 ? (
                messages
                  .filter((m) => m.answer)
                  .map((msg) => (
                    <QuestionCard
                      key={msg.id}
                      id={msg.id.toString()}
                      question={msg.question}
                      date={new Date(msg.createdAt).toLocaleDateString()}
                      answer={msg.answer}
                      isOwner={true}
                      answeredAt={
                        msg.answeredAt
                          ? new Date(msg.answeredAt).toLocaleDateString()
                          : undefined
                      }
                      className="border-green-200 bg-green-50 dark:bg-green-900/30"
                    />
                  ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-10">
                  No answered questions yet.
                </p>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
