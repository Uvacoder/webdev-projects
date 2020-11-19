import React, { Children, Fragment, ReactNode, useState } from "react";
import Button from "./Button";
import { VerticalSpacer } from "./Spacer";
import Tabs from "./Tabs";

interface Props {
  title: string;
}

function Buy() {
  const [text, setText] = useState("");

  const buyText =
    text === ""
      ? "Buy"
      : `Buy ${(parseFloat(text) / 17000).toPrecision(3)} BTC`;

  return (
    <div className="column flex-center">
      <input
        className="input-large"
        type="text"
        placeholder="0"
        onChange={(event) => {
          // TODO: Validation
          setText(event.target.value);
        }}
      ></input>
      <p>You can buy up to $25,000.00</p>
      <VerticalSpacer size={24} />
      <Button variant="primary" disabled={!text} onPress={() => {}}>
        {buyText}
      </Button>
    </div>
  );
}

export default function Trade({ title }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="block">
      <h2>{title}</h2>
      <VerticalSpacer size={12} />
      <Tabs
        id="trade-tabs"
        accessibleLabel="Trade currency"
        selectedIndex={selectedIndex}
        onChangeSelectedIndex={setSelectedIndex}
        tabs={[
          { title: "Buy", content: <Buy /> },
          { title: "Sell", content: "" },
          { title: "Convert", content: "" },
        ]}
      />
    </section>
  );
}
