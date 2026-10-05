import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export async function extractResumeText(file) {
  if (!file) {
    throw new Error('Resume file is required.');
  }

  const fileName = file.originalname.toLowerCase();

  if (fileName.endsWith('.pdf')) {
    const result = await pdf(file.buffer);

    return result.text
      .replace(/\s+/g, ' ')
      .trim();
  }

  if (fileName.endsWith('.docx')) {
    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    });

    return result.value
      .replace(/\s+/g, ' ')
      .trim();
  }

  if (fileName.endsWith('.txt')) {
    return file.buffer
      .toString('utf-8')
      .replace(/\s+/g, ' ')
      .trim();
  }

  throw new Error(
    'Unsupported resume format. Please upload PDF, DOCX, or TXT.'
  );
}