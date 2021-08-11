import React from "react";

import { InputNumber } from "antd";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { setIncome } from "store/taxes";
import { currencyFormatter } from "utils";

const inputFormatter = currencyFormatter(0);

const IncomeInput = () => {
  const dispatch = useAppDispatch();
  const income = useAppSelector((s) => s.taxes.income);

  return (
    <InputNumber
      formatter={(v) => {
        return v === "" ? "$ " : inputFormatter(Math.abs(Number(v)) || 0);
      }}
      min={0}
      parser={(value) => value!.replace(/\$\s?|(,*)|\-/g, "")}
      onChange={(e) =>
        dispatch(setIncome(e as number))
      }
      value={income}
      size="large"
      height={50}
      style={{ width: "100%" }}
      autoFocus
    />
  );
};

export default IncomeInput;
