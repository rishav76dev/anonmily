import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

export interface Question {
  id: number;
  question: string;
  answer?: string;
  isAnswered: boolean;
  userId?: number;
  createdAt: string;
  isDisplay: boolean;
  answeredAt?: string;
}

export function useQuestions(slug: string) {
  return useQuery({
    queryKey: ["questions", slug],
    queryFn: async (): Promise<Question[]> => {
      const res = await fetch(`/api/messages/${slug}`);
      if (!res.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await res.json();
      return data.message;
    },
    enabled: !!slug,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
}


export function useSubmitQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      question,
      slug,
    }: {
      question: string;
      slug: string;
    }) => {
      const res = await axios.post("/api/messages", { question, slug });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Question sent successfully!");
      // Invalidate and refetch questions for this slug
      queryClient.invalidateQueries({
        queryKey: ["questions", variables.slug],
      });
    },
    onError: (error) => {
      console.error("Failed to send question:", error);
      toast.error("Failed to send question. Please try again.");
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/messages/delete/${id}`);
    },
    onSuccess: () => {
      toast.success("Question deleted successfully!");
      // Invalidate all questions queries to update the UI
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error) => {
      console.error("Failed to delete question:", error);
      toast.error("Failed to delete question. Please try again.");
    },
  });
}

/**
 * Mutation to submit an answer
 */
export function useSubmitAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, answer }: { id: string; answer: string }) => {
      const res = await axios.put(`/api/messages/answer/${id}`, { answer });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Answer submitted successfully!");
      // Invalidate all questions queries to update the UI
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error) => {
      console.error("Failed to submit answer:", error);
      toast.error("An error occurred. Please try again.");
    },
  });
}
