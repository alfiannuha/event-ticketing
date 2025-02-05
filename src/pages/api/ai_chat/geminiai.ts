import type { NextApiRequest, NextApiResponse } from 'next'
import { Groq } from "groq-sdk";
import axios from 'axios';

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

    // await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_GEMINI_AI_API_KEY}`, {
    await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.NEXT_GEMINI_AI_API_KEY}`, {
      "contents": [
        {
          "parts": [
            {
              "text": content
            }
          ]
        }
      ]
    }).then((response) => {
      console.log(response.data);
      return res.status(200).json(response.data);
    }).catch((error) => {
      console.error(error);
      return res.status(400).json({ error: 'Something went wrong' });
    })

  }
  
}