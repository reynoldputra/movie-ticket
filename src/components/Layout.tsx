import { ReactNode } from "react";
import Navbar from "./navbar/Navbar";

type PropsType = {
  children: ReactNode
}

export default function Layout({ children }: PropsType) {
  return (
    <main className="bg-slate-900 min-h-screen overflow-x-hidden text-white relative">
      <Navbar />
      {children}
    </main>
  )

}
