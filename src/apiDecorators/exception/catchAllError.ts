import { NextApiRequest, NextApiResponse } from "next";

export default function validationExceptionHandler(
  error: unknown,
  _: NextApiRequest,
  res: NextApiResponse
) {
  const message = error instanceof Error ? error.message : "An unknown error occurred.";
  res.status(200).json({ success: false, error: message });
}
