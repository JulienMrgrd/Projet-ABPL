import { MEDIA_TEST_URL, PDF_URL } from 'app/app.constants';

export class ContentUtil {
  static getMediaUrl(imageFilename: string): string {
    // TODO: detect if file extension is correct, or display error
    if (imageFilename && imageFilename.includes('.')) {
      return MEDIA_TEST_URL + imageFilename;
    }
  }

  static getPdfUrl(pdfFilename: string): string {
    if (pdfFilename && pdfFilename.endsWith('.pdf')) {
      return PDF_URL + pdfFilename;
    }
  }
}
