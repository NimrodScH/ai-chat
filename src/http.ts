export async function sendMessageToAI(
  messages: { role: 'user' | 'assistant'; content: string }[],
  contextData?: any,
  businessInfo?: string,
) {
  const response = await fetch('http://localhost:3001/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
      contextData,
      businessInfo,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AI response');
  }

  const data = await response.json();
  return data.reply;
}
