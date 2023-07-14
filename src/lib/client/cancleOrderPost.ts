
import { toast } from "react-toastify"
import nextApi from "./api"
import { AxiosError } from "axios"

export const cancelOrderPost = async (value: string) => {
  const id = toast.loading("Sending data ...")
  console.log(value)
  try {
    const res = await nextApi().post("/api/pay/cancelorder", {
      paymentId : value
    })  
    toast.update(id, {
      render : "Success cancel order",
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
    console.log(err)
  }
}
