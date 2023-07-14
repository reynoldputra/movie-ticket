import { toast } from "react-toastify"
import nextApi from "./api"
import { AxiosError } from "axios"
import { TicketOrderInput, TopupInput } from "@/interfaces/FormInput"

export const orderTicketPost = async (value: TicketOrderInput) => {
  const id = toast.loading("Sending data ...")
  try {
    await nextApi().post("/api/ticket/order", value)  
    toast.update(id, {
      render : "Success order tickets",
      type : "success",
      isLoading : false,
      autoClose : 3000
    })
    return null
  } catch (err) {
    if(err instanceof AxiosError) {
      console.log(err)
      toast.update(id, {
        render : err.response?.data?.message,
        type : "error",
        isLoading : false,
        autoClose : 3000
      })
    }
    console.log(err)
  }
}
