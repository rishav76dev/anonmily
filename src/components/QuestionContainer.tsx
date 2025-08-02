import { useEffect, useState } from "react";
import { Question } from "@/lib/types";
import { QuestionCard } from "./QuestionCard";

export default function QuestionContainer({ slug }: { slug: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);

  async function fetchData() {
    const result = await fetch(`/api/messages/${slug}`, {
      method: "GET",
    });
    const data = await result.json();

    setQuestions(data.message);
  }

  useEffect(() => {
    fetchData();
  }, [slug]);

  return (
   <div className="space-y-4">
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q.question}
          date={new Date(q.createdAt).toLocaleString()}
        />
      ))}
    </div>
);

}
