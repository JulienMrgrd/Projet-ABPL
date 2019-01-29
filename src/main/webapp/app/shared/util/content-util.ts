import { MEDIA_TEST_URL, MEDIA_TRAINING_URL, PDF_URL } from 'app/app.constants';
import { QuizMode } from 'app/quiz/shared/quiz/quiz-mode.enum';

export class ContentUtil {
  // TODO: load from Backend (S3, cloud, ...)
  static getMediaUrl(imageFilename: string, mode?: QuizMode) {
    // TODO: detect if file extension is correct, or display error
    if (imageFilename && imageFilename.includes('.')) {
      return mode === QuizMode.TEST ? MEDIA_TEST_URL + imageFilename : MEDIA_TRAINING_URL + imageFilename;
    }
  }

  static getPdfUrl(pdfFilename: string): string {
    if (pdfFilename && pdfFilename.endsWith('.pdf')) {
      return PDF_URL + pdfFilename;
    }
  }
}
