import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

describe("renders on first load", () => {
  const JSONmock = () => {
    JSON.parse = jest.fn().mockImplementationOnce((x) => {
      const object = {
        name: x,
      };
      return object;
    });
  };

  it("renders header", () => {
    JSONmock();
    render(<App />);
    expect(screen.getByText("Weather Forecast")).toBeInTheDocument();
  });

  it("renders imput", () => {
    JSONmock();
    render(<App />);
    expect(screen.getByLabelText("Search City")).toBeInTheDocument();
  });

  it("renders forecast buton", () => {
    JSONmock();
    render(<App />);
    expect(screen.getByText("Forecast")).toBeInTheDocument();
  });

  it("render toggle unit butoon", () => {
    JSONmock();
    render(<App />);
    expect(screen.getByText("F°/C°: C°")).toBeInTheDocument();
  });

  it("render status", () => {
    JSONmock();
    render(<App />);
    expect(screen.getByTitle("status")).toBeInTheDocument();
  });
});
