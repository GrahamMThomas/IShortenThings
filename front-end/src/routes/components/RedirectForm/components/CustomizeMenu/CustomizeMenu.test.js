import React from "react";
import { render, cleanup } from "@testing-library/react";
import CustomizeMenu from "./CustomizeMenu";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("CustomizeMenu", () => {
  test("RickRoll Switch", async () => {
    const setRickRoll = jest.fn();
    const setUsesLeft = jest.fn();

    const { getByTestId } = render(
      <CustomizeMenu setRickRoll={setRickRoll} setUsesLeft={setUsesLeft} />
    );

    const rickRollSwitch = getByTestId("rickRollSwitch");

    rickRollSwitch.click();
    expect(setRickRoll.mock.calls.length).toBe(1);
  });
});
