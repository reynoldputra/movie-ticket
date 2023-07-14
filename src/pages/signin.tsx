import Layout from "@/components/Layout";
import Login from "@/pageComponents/login/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter()
  const {data : session} = useSession()
  if(session) router.push("/")

  return (
    <Layout>
      <Login />
    </Layout>
  );
}
