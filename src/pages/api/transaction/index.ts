import createTransaction from "@/lib/midtrans/transaction";
import { v4 as uuidv4 } from "uuid";
import { type NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const payload = req.body;

    // insert data payment to firestore
    // firestore.collection("transactions").add({
    //   id: payload.id,
    //   fullname: payload.fullname,
    //   email: payload.email,
    //   phone: payload.phone,
    //   total_payment: payload.total_payment,
    //   status: "pending",
    //   created_at: new Date(),
    // });

    // MIDTRANS PAYMENT GATEWAY SECTION
    // params for create transaction midtrans
    const params = {
      transaction_details: {
        order_id: payload.id || uuidv4(),
        gross_amount: payload.total_payment,
      },
      customer_details: {
        first_name: payload.fullname,
        last_name: "",
        email: payload.email,
        phone: payload.phone,
      },
    };

    // create transaction midtrans
    createTransaction(
      params,
      (transaction: { token: string; redirect_url: string }) => {
        // console.log(transaction);
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "Transaction is successfully",
          data: transaction,
        });
      }
    );
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "Method Not Allowed" });
  }
}
