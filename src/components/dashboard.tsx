import React from "react";

import { Typography, Card, Col, Row } from "antd";
import { useAppDispatch } from "store/hooks";
import { load } from "store/taxes";
import useAsyncEffect from "use-async-effect";

import IncomeInput from "./income-input";
import Taxes from "./taxes";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  useAsyncEffect(() => dispatch(load()), []);

  return (
    <Row gutter={[40, 20]}>
      <Col xs={24} md={14}>
        <Card style={{ height: "100%" }}>
          <Typography.Title level={4}>Income</Typography.Title>
          <IncomeInput />
        </Card>
      </Col>
      <Col xs={24} md={10}>
        <Card style={{ height: "100%" }}>
          <Taxes />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
