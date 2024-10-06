import { Groq } from "groq-sdk";

const groqapi = new Groq({
  apiKey: process.env.NEXT_GROQ_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const requestToGroqAI = async (content: string) => {
  const reply = await groqapi.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-8b-8192",
    // model: "curie:ft-user:groq",
  });

  return reply;
};
