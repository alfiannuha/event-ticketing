import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { content } = req.body;

    console.log("content", content);
    

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content,
          },
        ],
      });

      console.log("RESPONSE", response);

      return res.status(200).json(response);

    }catch(e: any) {
      console.log("ERROR", e.error.message);
      res.status(429).json({ status: false, statusCode: e.error.code, message: e.error.message });
    }

  }
  
}