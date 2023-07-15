import { toast } from "react-toastify"
import nextApi from "./api"
import { AxiosError } from "axios"

export const refundOrderPost = async (value: {paymentId : string }) => {
  const id = toast.loading("Sending data ...")
  try {
    const res = await nextApi().post("/api/ticket/refund", value)  
    toast.update(id, {
      render : "Success refund tickets",
      type : "success",
      isLoading : false,
      autoClose : 3000
    })

    return res.data
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
  }
}
