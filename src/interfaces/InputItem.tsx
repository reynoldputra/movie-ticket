import { RegisterOptions } from "react-hook-form"

export interface InputItem {
  name : string
  label : string
  required : boolean
  type? : string
  option? : RegisterOptions
}

