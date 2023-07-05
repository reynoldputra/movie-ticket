import { TabItem } from "@/interfaces/TabItem"
import LoginTab from "./LoginTab"
import RegisterTab from "./RegisterTab"
import Grid from "@/components/layout/grid"
import Cell from "@/components/layout/cell"
import Tabs from "@/components/Tabs"

export default function Login() {

  const AuthTab : TabItem[] = [
    {
      menu : "Login",
      content : <LoginTab />
    },
    {
      menu : "Register",
      content : <RegisterTab />
    }
  ]

  return (
    <Grid className="pt-32">
      <Cell cols="1_full" className="flex justify-center">
        <Tabs items={AuthTab} />
      </Cell>
    </Grid>
  )
}
