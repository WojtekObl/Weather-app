import React from "react";
import { render, screen } from "@testing-library/react";
import Forecast from "./Forecast.js";
import "@testing-library/jest-dom";
import mockupForecast from "./mockupForecast";

describe("Forecast", () => {
  console.log(mockupForecast);
  it("pass and change unit of measurment", async () => {
    const forecast = mockupForecast;
    let unit = "F";
    const city = "Warsaw";

    render(<Forecast forecast={forecast} unit={unit} city={city} />);
    expect(screen.getAllByText(/°F/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/mph/)[0]).toBeInTheDocument();

    unit = "C";
    render(<Forecast forecast={forecast} unit={unit} city={city} />);
    expect(screen.getAllByText(/°C/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/km/)[0]).toBeInTheDocument();
  });
  it("displays correct city name", async () => {
    const forecast = mockupForecast;
    const unit = "F";
    const city = { name: "Warsaw", country: "PL" };

    render(<Forecast forecast={forecast} unit={unit} city={city} />);
    expect(screen.getByText(/Warsaw PL/)).toBeInTheDocument();
  });
});
