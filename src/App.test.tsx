import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders book shop", () => {
  render(<App />);
  const linkElement = screen.getByText(/book shop/i);
  expect(linkElement).toBeInTheDocument();
});
