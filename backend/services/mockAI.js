import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const loadJson = (filename) => {
  const raw = fs.readFileSync(path.join(__dirname, '../data', filename), 'utf-8');
  return JSON.parse(raw);
};

/**
 * Mock disease detection — picks a result deterministically from image buffer.
 * Replace this function with a real ML model API call later.
 */
export const detectDiseaseMock = (file) => {
  const diseases = loadJson('mockDiseases.json');
  const seed = file?.buffer?.length ?? file?.size ?? Date.now();
  const index = seed % diseases.length;
  return diseases[index];
};

/**
 * Mock chatbot — keyword match first, then generic farming advice.
 * Replace with OpenAI / local LLM integration later.
 */
export const getChatResponseMock = (question) => {
  const responses = loadJson('mockChatResponses.json');
  const q = question.toLowerCase();

  for (const item of responses) {
    if (item.keywords.every((kw) => q.includes(kw))) {
      return item.answer;
    }
  }

  for (const item of responses) {
    if (item.keywords.some((kw) => q.includes(kw))) {
      return item.answer;
    }
  }

  return (
    'Thank you for your question. For best results, mention your crop type and symptoms. ' +
    'General tips: test soil every season, use certified seeds, follow IPM for pests, ' +
    'and consult your nearest Krishi Vigyan Kendra for region-specific advice.'
  );
};
