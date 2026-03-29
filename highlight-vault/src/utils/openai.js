// src/utils/openai.js

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';

/**
 * Call the OpenAI Chat Completions API
 * @param {string} apiKey
 * @param {Array} messages - OpenAI messages array
 * @returns {Promise<string>} AI response text
 */
async function callOpenAI(apiKey, messages) {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: 800,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const msg = error?.error?.message || `API error: ${response.status}`;
    throw new Error(msg);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

/**
 * Summarize all highlights into bullet points
 * @param {string} apiKey
 * @param {Array} highlights - array of highlight objects
 * @returns {Promise<string>} bullet-point summary
 */
export async function summarizeAllHighlights(apiKey, highlights) {
  if (!highlights || highlights.length === 0) {
    throw new Error('No highlights to summarize.');
  }

  const content = highlights
    .map((h, i) => `[${i + 1}] From "${h.title || h.domain}": ${h.text}`)
    .join('\n\n');

  const messages = [
    {
      role: 'system',
      content:
        'You are an expert research assistant. Analyze the provided web highlights and create a concise, insightful bullet-point summary. Focus on key themes, insights, and connections between the highlights. Format your response as clean bullet points starting with • ',
    },
    {
      role: 'user',
      content: `Please summarize these ${highlights.length} web highlights I saved:\n\n${content}`,
    },
  ];

  return callOpenAI(apiKey, messages);
}

/**
 * Get AI insight for a single highlight
 * @param {string} apiKey
 * @param {Object} highlight
 * @returns {Promise<string>} AI insight
 */
export async function getHighlightInsight(apiKey, highlight) {
  const messages = [
    {
      role: 'system',
      content:
        'You are a knowledgeable assistant. Given a text snippet from a webpage, provide a concise, insightful analysis in 2-3 sentences. Explain why it might be important, provide relevant context, or highlight key implications.',
    },
    {
      role: 'user',
      content: `From the page "${highlight.title || highlight.domain}":\n\n"${highlight.text}"\n\nWhat's your insight on this?`,
    },
  ];

  return callOpenAI(apiKey, messages);
}
