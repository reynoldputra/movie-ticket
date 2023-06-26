import Link from "next/link"
import { CgProfile } from "react-icons/cg"

interface NavbarItemType {
  tag: string
  endpoint: string
}

export default function Navbar() {
  const navbarItems: NavbarItemType[] = [
    {
      tag: "Home",
      endpoint: "/"
    },
    {
      tag: "Ticket",
      endpoint: "/ticket"
    },
    {
      tag: "History",
      endpoint: "/history"
    }
  ]

  return (
    <div className="h-20 bg-gradient-to-b from-black fixed w-full flex justify-between items-center z-50">
      <p className="w-64 text-cyan-300 text-center font-bold">App name</p>
      <div className="flex gap-14">
        {
          navbarItems.map((item: NavbarItemType, idx: number) => {
            return (
              <div key={idx} className="text-slate-200">
                <Link href={item.endpoint}>
                  {item.tag}
                </Link>
              </div>
            )
          })
        }
      </div>
      <div className="w-64 h-full flex items-center justify-center text-white gap-6">
        <p className="font-bold">Username</p>
        <div className="h-8 w-8 bg-white rounded-md flex justify-center items-center">
          <CgProfile className="h-6 w-auto text-slate-700/60" />
        </div>
      </div>
    </div>
  )
}
