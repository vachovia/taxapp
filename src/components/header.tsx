import React from "react";

import { Avatar, Card, Col, Row } from "antd";
import { BiWallet } from "react-icons/bi";
import FlexView from "react-flexview";

const Logo = () => (
  <a
    href="/"
    style={{
      fontSize: "30px",
      lineHeight: "30px",
      letterSpacing: "-0.01em",
      marginBottom: 0,
      marginRight: "1em",
      fontWeight: 700,
      color: "#000",
      padding: "3px",
      display: "inline-block",
    }}
  >
    <FlexView vAlignContent="center" cellPadding={4}>
      <BiWallet />
      TaxApp
    </FlexView>
  </a>
);

const Header = () => {
  return (
    <Card bodyStyle={{ padding: "17.5px 50px" }}>
      <Row align="middle" gutter={2} justify="space-between">
        <Col flex="1">
          <Logo />
        </Col>
        <Col>
          <Avatar shape="circle" style={{ backgroundColor: "#2f53c6" }}>
            VP
          </Avatar>
        </Col>
      </Row>
    </Card>
  );
};

export default Header;
