import { prisma } from "@/lib/db";

export default async function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return <div>Invalid question ID</div>;
  }

  const question = await prisma.message.findUnique({
    where: { id },
  });

  if (!question) {
    return <div>Question not found</div>;
  }

  if (!question.isDisplay) {
    return <div>This question is not public.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
        📢 Shared Question
      </h1>
      <p className="text-gray-700 text-lg leading-relaxed">
        {question.question}
      </p>

      {question.answer && (
        <div className="mt-5 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-xl shadow-sm">
          <strong className="text-indigo-600">Answer:</strong>
          <p className="mt-2 text-gray-800 leading-relaxed">
            {question.answer}
          </p>
        </div>
      )}
    </div>
  );
}
