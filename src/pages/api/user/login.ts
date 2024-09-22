import { type NextApiRequest, NextApiResponse } from "next";
import { signUpUser } from "@/services/auth/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const user = await signUpUser(
        req.body,
        (status: boolean, error: string) => {
          if (!status) {
            throw new Error(error);
          }
        }
      );
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Registration is successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        statusCode: 400,
        message: (error as Error).message,
      });
    }
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "Method Not Allowed" });
  }
}
