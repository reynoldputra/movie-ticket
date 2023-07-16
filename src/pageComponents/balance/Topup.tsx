import DropdownWithCtx from "@/components/form/DropdownWithCtx";
import GeneralForm from "@/components/form/GeneralForm";
import InputWithCtx from "@/components/form/InputWithCtx";
import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import { Item } from "@/interfaces/DropdownItems";
import { TopupInput } from "@/interfaces/FormInput";
import { topupPost } from "@/lib/client/topupPost";
import { PaymentMethod } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";

export default function Topup() {
  const PayMethods: Item[] = [
    { value: PaymentMethod.BCA, tag: "BCA" },
    { value: PaymentMethod.QRIS, tag: "QRIS" }
  ];

  const formMethod = useForm<TopupInput>();

  const onSubmit = formMethod.handleSubmit( async (data) => {
    const error = await topupPost(data)
    if(!error) {
      formMethod.reset()
    }
  });

  return (
    <Grid className="pt-40">
      <Cell cols="1_full" className="flex justify-center">
        <FormProvider {...formMethod}>
          <form onSubmit={onSubmit}>
            <GeneralForm title="Top up" submitLabel="Pay">
              <InputWithCtx
                name="amount"
                label="CASH (IDR)"
                option={{
                  required : true
                }}
              />
              <DropdownWithCtx
                items={PayMethods}
                name="paymentMethod"
                label="Payment Method"
              />
            </GeneralForm>
          </form>
        </FormProvider>
      </Cell>
    </Grid>
  );
}
