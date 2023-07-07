import { NextApiRequest, NextApiResponse } from "next";
import { BadRequestException } from "next-api-decorators";

export default function validationExceptionHandler(
  error: BadRequestException,
  _: NextApiRequest,
  res: NextApiResponse
) {
  const newError = [];
  const errors = error.errors;
  if (errors) {
    for (let idx in errors) {
      const words = errors[idx].split(" ");
      const target = words[0];
      words.shift();
      const message = words.join(" ");
      newError.push({
        target,
        message,
      });
    }
    res.status(400).json({ status: false, message: "Input not valid", error: newError });
  }
  const message = error instanceof Error ? error.message : "An unknown error occurred.";
  res.status(400).json({ status: false, message });
}
