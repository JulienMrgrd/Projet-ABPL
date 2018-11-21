export interface Option {
  id: string;
  questionId: string;
  name: string;
  image?: string;
  isAnswer: boolean;
  selected?: boolean;
}
