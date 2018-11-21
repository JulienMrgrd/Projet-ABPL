export interface QuizConfig {
  allowMove?: boolean;
  allowBack?: boolean;
  allowReview?: boolean;
  autoMove?: boolean; // if boolean; it will move to next question automatically when answered.
  duration?: number; // indicates the time in which quiz needs to be completed. 0 means unlimited.
  pageSize?: number;
  requiredAll?: boolean; // indicates if you must answer all the questions before submitting.
  richText?: boolean;
  nbQuestions?: number;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  showClock?: boolean;
  showPager?: boolean;
  theme?: string;
}
