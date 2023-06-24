import { ReactNode } from "react";
import Navbar from "./Navbar";

type PropsType = {
  children: ReactNode
}

export default function Layout({ children }: PropsType) {
  return (
    <div className="bg-slate-900 min-h-screen relative">
      <Navbar />
      {children}
    </div>
  )

}
