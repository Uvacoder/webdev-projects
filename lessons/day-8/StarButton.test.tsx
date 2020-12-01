import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import StarButton from "./StarButton";

test("displays and toggles StarButton", async () => {
  render(<StarButton activeTitle="Foo" inactiveTitle="Bar" />);

  expect(screen.getByRole("button")).toHaveTextContent("Foo");

  fireEvent.click(screen.getByRole("button"));

  await waitFor(() => screen.getByText("Bar"));

  expect(screen.getByRole("button")).toHaveTextContent("Bar");
});
