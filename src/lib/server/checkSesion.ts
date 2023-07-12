import { UnauthorizedException } from "next-api-decorators"
import { getServerSession } from "next-auth"

export const checkSession = async () => {
  const session = await getServerSession()
  if(!session) throw new UnauthorizedException
  return session
}
