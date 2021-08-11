import React from "react";
import { Layout } from "antd";

import Header from "./header";
import Wrapper from "./wrapper";
import Dashboard from "./dashboard";

export default () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header />
    <Wrapper>
      <Dashboard />
    </Wrapper>
  </Layout>
);
