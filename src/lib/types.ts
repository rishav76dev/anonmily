export type Question = {
  id: number;
  question: string;
  answer?: string;
  isAnswered: boolean;
  userId?: number;
  createdAt: string;
  isDisplay: boolean;
  answeredAt?: string;
};
