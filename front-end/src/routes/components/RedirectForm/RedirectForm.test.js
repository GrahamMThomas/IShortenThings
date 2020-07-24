import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import RedirectForm from "./RedirectForm";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

// Local SAM container is kinda slow.
jest.setTimeout(10000);

describe("Integration Tests", () => {
  test("Update RickRoll", async () => {
    const apiTestFn = jest.fn();
    const { getByTestId, debug } = render(
      <RedirectForm
        apiTestFn={apiTestFn}
        setError={jest.fn()}
        setNewRedirect={jest.fn()}
      />
    );

    const urlTextField = getByTestId("urlTextField");
    const submitButton = getByTestId("submitButton");
    const customSettingsButton = getByTestId("customSettingsButton");

    fireEvent.change(urlTextField, { target: { value: "https://google.com" } });
    fireEvent.click(customSettingsButton);

    // Flip Rick Roll Switch
    const rickRollSwitch = getByTestId("rickRollSwitch");
    rickRollSwitch.click();

    fireEvent.click(submitButton);
    const apiCall = apiTestFn.mock.calls[0];

    expect(apiCall[2]).toEqual(true);
  });

  test("Create Password", async () => {
    const apiTestFn = jest.fn();
    const { getByTestId, debug } = render(
      <RedirectForm
        apiTestFn={apiTestFn}
        setError={jest.fn()}
        setNewRedirect={jest.fn()}
      />
    );

    const urlTextField = getByTestId("urlTextField");
    const submitButton = getByTestId("submitButton");
    const customSettingsButton = getByTestId("customSettingsButton");

    fireEvent.change(urlTextField, { target: { value: "https://google.com" } });
    fireEvent.click(customSettingsButton);

    // Enable Password Field
    const passwordCheckBox = getByTestId("passwordCheckBox");
    fireEvent.change(passwordCheckBox, { target: { checked: true } });

    // Enter Password Field
    const passwordTextField = getByTestId("passwordTextField");
    fireEvent.change(passwordTextField, {
      target: { value: "SneakyPassword" },
    });

    fireEvent.click(submitButton);
    const apiCall = apiTestFn.mock.calls[0];

    expect(apiCall[3]).toEqual("SneakyPassword");
  });

  test("Update Usage Slider", async () => {
    const apiTestFn = jest.fn();
    const { getByTestId, debug } = render(
      <RedirectForm
        apiTestFn={apiTestFn}
        setError={jest.fn()}
        setNewRedirect={jest.fn()}
      />
    );

    const urlTextField = getByTestId("urlTextField");
    const submitButton = getByTestId("submitButton");
    const customSettingsButton = getByTestId("customSettingsButton");

    fireEvent.change(urlTextField, { target: { value: "https://google.com" } });
    fireEvent.click(customSettingsButton);

    // Update usage amount
    const usesInput = getByTestId("usesInput");
    fireEvent.change(usesInput, { target: { value: 27 } });

    fireEvent.click(submitButton);
    const apiCall = apiTestFn.mock.calls[0];

    expect(apiCall[1]).toEqual(27);
  });
});
