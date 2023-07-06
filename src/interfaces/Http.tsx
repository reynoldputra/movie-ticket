import { NextApiRequest, NextApiResponse } from "next";

export type HttpHandler = (request: NextApiRequest, response: NextApiResponse) => void;
