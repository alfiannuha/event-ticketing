import { type NextApiRequest, NextApiResponse } from "next";
import { signUpUser } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signUpUser(req.body, (status: boolean, error: string) => {
      if (status) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "Registration is successfully",
        });
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: error,
        });
      }
    });
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "Method Not Allowed" });
  }
}
