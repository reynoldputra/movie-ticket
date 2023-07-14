import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "inspector";
import { NextApiRequest, NextApiResponse } from "next";
import { UnauthorizedException } from "next-api-decorators";
import { getServerSession } from "next-auth";

export const checkSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) throw new UnauthorizedException();
  return session
};
