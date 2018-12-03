export interface Option {
  id: string;
  questionId: string;
  name?: string;
  image?: string;
  video?: string;
  isAnswer: boolean;
  selected?: boolean;
}
