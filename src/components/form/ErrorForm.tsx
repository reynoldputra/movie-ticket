import { CgDanger } from "react-icons/cg";

export default function ErrorForm ({message} : {message : string}) {
  return (
    <div className="flex gap-2 text-sm text-red-500 items-center mt-2">
      <CgDanger className="w-5 h-5" />
      <p>{message}</p>
    </div>
  ) 
}
