import { RegisterOptions } from "react-hook-form"

export interface InputItem {
  name : string
  label : string
  type? : string
  option? : RegisterOptions
}

