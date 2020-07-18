import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForDomChange,
} from "@testing-library/react";
import { within } from "@testing-library/dom";
import App from "./routes/App";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

// Local SAM container is kinda slow.
jest.setTimeout(10000);

describe("Integration Tests", () => {
  test("Submit URL", async () => {
    const { getByTestId } = render(<App />);

    const urlTextField = getByTestId("urlTextField");
    const submitButton = getByTestId("submitButton");

    fireEvent.change(urlTextField, { target: { value: "https://google.com" } });
    fireEvent.click(submitButton);

    await waitForDomChange();

    const linkTypography = getByTestId("linkTypography");
    const { getByText } = within(linkTypography);
    getByText(/http:\/\/[^\/]+\/[a-zA-Z0-9]{8,}/);
  });

  test("Invalid URL", async () => {
    const { getByTestId, getByText } = render(<App />);

    const urlTextField = getByTestId("urlTextField");
    const submitButton = getByTestId("submitButton");

    fireEvent.change(urlTextField, { target: { value: "IsNotValidUrl" } });
    fireEvent.click(submitButton);

    expect(
      urlTextField.attributes.getNamedItem("aria-invalid").nodeValue
    ).toEqual("true");
    getByText("Must be a valid URL", { exact: false });
  });
});
