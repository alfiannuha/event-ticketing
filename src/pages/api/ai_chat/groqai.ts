import type { NextApiRequest, NextApiResponse } from 'next'
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    try {
      const response = await groqapi.chat.completions.create({
        messages: [
          {
            role: "user",
            content,
          },
        ],
        model: "llama3-8b-8192",
        // model: "curie:ft-user:groq",
      });
      return res.status(200).json(response);

    }catch(e: any) {
      res.status(e.error.code).json({ status: false, statusCode: e.error.code, message: e.error.message });
    }

  }
  
}