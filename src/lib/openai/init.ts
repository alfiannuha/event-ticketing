import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const requestToOpenAI = async (content: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      // { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content,
      },
    ],
  });

  return response;
};
