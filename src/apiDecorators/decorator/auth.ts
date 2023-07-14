import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import {
  NextFunction,
  UnauthorizedException,
  createMiddlewareDecorator,
} from "next-api-decorators";
import { getServerSession } from "next-auth";

export const JwtAuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) throw new UnauthorizedException();
    next();
  }
);
