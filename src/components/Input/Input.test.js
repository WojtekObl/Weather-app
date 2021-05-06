import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./Input.js";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  it("calls searchCity function when cityName>2", async () => {
    const searchCity = jest.fn();
    const setCityName = jest.fn();
    const setCity = jest.fn();

    render(<Input searchCity={searchCity} setCity={setCity} />);

    await userEvent.type(screen.getByLabelText(/Search City/), "Lond");

    expect(searchCity).toHaveBeenCalledTimes(2);
  });
  it("calls getLocation", async () => {
    const searchCity = jest.fn();
    const setCityName = jest.fn();
    const setCity = jest.fn();
    const getLocation = jest.fn();

    render(
      <Input
        searchCity={searchCity}
        setCity={setCity}
        getLocation={getLocation}
      />
    );
    screen.debug();

    await fireEvent.click(screen.getByRole("img"));

    expect(getLocation).toHaveBeenCalledTimes(1);
  });
});
