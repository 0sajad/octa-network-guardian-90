
const OPENAI_API_KEY = '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';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const callOpenAI = async (messages: Array<{role: string; content: string}>) => {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 800,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    console.error('OpenAI API error:', response.status, response.statusText);
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  
  if (!content) {
    throw new Error('No content received from OpenAI');
  }

  return content;
};
