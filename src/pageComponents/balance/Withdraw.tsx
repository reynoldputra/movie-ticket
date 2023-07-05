import DropdownInput from "@/components/form/DropdownInput";
import GeneralForm from "@/components/form/GeneralForm";
import InputText from "@/components/form/InputText";
import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import { Item } from "@/interfaces/DropdownItems";

export default function Withdraw() {
  const PayMathods: Item[] = [
    { id: 1, tag: "OVO" },
    { id: 2, tag: "GOPAY" },
    { id: 3, tag: "BRI" },
    { id: 4, tag: "BCA" },
  ];

  return (
    <Grid className="pt-40">
      <Cell cols="1_full" className="flex justify-center">
        <GeneralForm title="Withdraw" submitLabel="Pay" >
          <p className="font-bold mt-2">Cash (IDR)</p>
          <InputText name="cash" />
          <p className="font-bold mt-2">Payment Method</p>
          <DropdownInput items={PayMathods} />
        </GeneralForm>
      </Cell>
    </Grid>
  );
}
