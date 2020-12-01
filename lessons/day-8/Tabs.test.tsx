import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Tabs, { Tab } from "./Tabs";

test("displays tabs", async () => {
  const tabs: Tab[] = [
    { title: "Foo", content: "Foo Content" },
    { title: "Bar", content: "Bar Content" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const callback = jest.fn((_index: number) => {});

  render(
    <Tabs tabs={tabs} selectedIndex={0} onChangeSelectedIndex={callback} />
  );

  expect(screen.getAllByRole("tab")[0]).toHaveTextContent("Foo");
  expect(screen.getAllByRole("tab")[1]).toHaveTextContent("Bar");

  fireEvent.click(screen.getAllByRole("tab")[0]);

  expect(callback.mock.calls[0][0]).toEqual(0);
});
