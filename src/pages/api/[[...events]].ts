import {
  addDataToDocument,
  deleteData,
  getCollection,
  // getDocumentByField,
  getDocument,
  updateData,
} from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { events } = req.query;

    // console.log("events", events);

    let agenda;
    if (events) {
      if (events.length > 1) agenda = await getDocument("events", events[1]);
      else agenda = await getCollection("events", "event_date");
    }

    // console.log(agenda);

    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "success",
      data: agenda,
    });
  }

  if (req.method === "POST") {
    const { data } = req.body;

    await addDataToDocument("events", data, (response: boolean) => {
      if (response) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "success",
        });
      } else {
        res.status(200).json({
          status: false,
          statusCode: 400,
          message: "failed",
        });
      }
    });
  }

  if (req.method === "PUT") {
    const { id, data } = req.body;

    await updateData("events", id, data, (response: boolean) => {
      if (response) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "success",
        });
      } else {
        res.status(200).json({
          status: false,
          statusCode: 400,
          message: "failed",
        });
      }
    });
  }

  //
  if (req.method === "DELETE") {
    const { events }: any = req.query;

    await deleteData("events", events[1], (response: boolean) => {
      if (response) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "success",
        });
      } else {
        res.status(200).json({
          status: false,
          statusCode: 400,
          message: "failed",
        });
      }
    });
  }
}
