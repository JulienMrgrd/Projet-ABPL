export interface QuizConfig {
  allowMove?: boolean;
  allowBack?: boolean;
  allowReview?: boolean;
  autoMove?: boolean; // if boolean; it will move to next question automatically when answered.
  pageSize?: number;
  requiredAll?: boolean; // indicates if you must answer all the questions before submitting.
  richText?: boolean;
  nbQuestions?: number;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  showClock?: boolean;
  duration?: number; // indicates the time in which quiz needs to be completed. 0 means unlimited.
  countdown?: boolean;
  showPager?: boolean;
  theme?: string;
}
