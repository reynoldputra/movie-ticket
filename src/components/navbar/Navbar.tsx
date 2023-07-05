import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import ProfileNavbar from "./Profile";

interface NavbarItemType {
  tag: string;
  endpoint: string;
}

export default function Navbar() {
  const navbarItems: NavbarItemType[] = [
    {
      tag: "Home",
      endpoint: "/",
    },
    {
      tag: "Ticket",
      endpoint: "/ticket",
    },
    {
      tag: "Transaction",
      endpoint: "/transaction",
    },
  ];

  return (
    <div className="h-20 bg-gradient-to-b from-black fixed w-full flex justify-between items-center z-50">
      <Link href="/">
        <p className="w-64 text-cyan-300 text-center font-bold">App name</p>
      </Link>
      <div className="flex gap-14">
        {navbarItems.map((item: NavbarItemType, idx: number) => {
          return (
            <div key={idx} className="text-slate-200">
              <Link href={item.endpoint}>{item.tag}</Link>
            </div>
          );
        })}
      </div>
      <ProfileNavbar />
    </div>
  );
}
