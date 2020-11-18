import React, { Children, Fragment, ReactNode } from "react";
import { VerticalSpacer } from "./Spacer";
import Tabs from "./Tabs";

interface Props {
  title: string;
}

export default function Trade({ title }: Props) {
  return (
    <section className="block">
      <h2>{title}</h2>
      {/* <Tabs id="trade-tabs" accessibleLabel="Trade currency" /> */}
    </section>
  );
}
