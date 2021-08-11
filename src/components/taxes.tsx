import React from "react";

import { Space, Typography } from "antd";
import { useAppSelector, } from "store/hooks";
import { calculateTaxes, currencyFormatter } from "utils";

const getBracketLabel = (min: number, max: number | undefined) => {
  const format = currencyFormatter(0, "");
  return max ? `${format(min)} - ${format(max)}` : `${format(min)}+`;
};

const taxOwedFormatter = currencyFormatter(1);

import FlexView from "react-flexview";

const LineItem = (data: { label: string; value: string }) => (
  <FlexView>
    <span>{data.label}</span>
    <span
      style={{
        flexGrow: 1,
        borderBottom: "1px dotted #ddd",
        position: "relative",
        top: -6,
        margin: "0 6px",
      }}
    ></span>
    <span>{data.value}</span>
  </FlexView>
);

const Taxes = () => {
  const { brackets, income } = useAppSelector((s) => s.taxes);

  const { totalOwed, perBracket, effectiveRate } = calculateTaxes(
    income,
    brackets
  );

  return (
    <Space
      direction="vertical"
      style={{ width: "100%", minHeight: 250 }}
      size="large"
    >
      <section>
        <Typography.Title level={4}>Taxes</Typography.Title>
        <LineItem label="Total Owed" value={taxOwedFormatter(totalOwed)} />
        <LineItem
          label="Effective Rate"
          value={(effectiveRate * 100).toFixed(1) + "%"}
        />
      </section>
      <section>
        <Typography.Title level={5}>Per Bracket</Typography.Title>
        {perBracket.map(({ min, max, owed }, i) => (
          <LineItem
            key={i}
            label={getBracketLabel(min, max)}
            value={taxOwedFormatter(owed)}
          />
        ))}
      </section>
    </Space>
  );
};

export default Taxes;
