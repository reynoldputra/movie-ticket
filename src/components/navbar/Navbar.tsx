import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import ProfileNavbar from "./Profile";
import { useSession } from "next-auth/react";
import Grid from "../layout/grid";
import Cell from "../layout/cell";
import { BiLogIn } from "react-icons/bi";

interface NavbarItemType {
  tag: string;
  endpoint: string;
}

export default function Navbar() {
  const { data: session } = useSession();
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
    <div className="h-20 bg-gradient-to-b from-black fixed w-full z-50 flex items-center">
      <Grid screenHeight={false} className="w-full">
        <Cell cols="1_4">
          <div className="md:w-64 md:pl-24">
            <Link href="/">
              <p className="w-fit text-cyan-300 text-center font-bold">App name</p>
            </Link>
          </div>
        </Cell>
        <Cell cols="5_4" className="flex justify-center">
          <div className="gap-14 hidden lg:flex" >
            {navbarItems.map((item: NavbarItemType, idx: number) => {
              return (
                <div key={idx} className="text-slate-200">
                  <Link href={item.endpoint}>{item.tag}</Link>
                </div>
              );
            })}
          </div>
        </Cell>
        <Cell cols="9_full" className="flex justify-end">
          <div className="md:w-64 md:pr-24 flex justify-end">
            {session ? (
              <ProfileNavbar username={session?.user.name ? session?.user.name : "" } id={session?.user.id} />
            ) : (
              <>
                <Link href="/signin">
                  <div className="flex items-center gap-2 font-bold">
                    <BiLogIn className="w-5 h-5" />
                    <p>Login</p>
                  </div>
                </Link>
              </>
            )}
          </div>
        </Cell>
      </Grid>
    </div>
  );
}
