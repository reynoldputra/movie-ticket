import {BiSolidDownArrow} from "react-icons/bi"

export default function UpDownIcon () {
  return (
    <div className="text-gray-300 flex flex-col pt-1">
      <BiSolidDownArrow className="rotate-180 w-3" />
      <BiSolidDownArrow className="w-3 -translate-y-1"/>
    </div>  
  )
}
