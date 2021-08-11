import React from "react";

const Wrapper = (props: { children?: any }) => (
  <div style={{ padding: "25px 50px", }}>{props.children}</div>
);

export default Wrapper;
