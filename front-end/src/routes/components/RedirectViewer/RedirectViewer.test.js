import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForDomChange,
} from "@testing-library/react";
import { within } from "@testing-library/dom";
import RedirectViewer from "./RedirectViewer";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("Redirect Viewer", () => {
  test("Clipboard", async () => {
    const { getByTestId } = render(<RedirectViewer url="https://google.com" />);

    const copyIconButton = getByTestId("copyIconButton");
    fireEvent.click(copyIconButton);

    await waitForDomChange();

    const copyInfoAlert = getByTestId("copyInfoAlert");
    const { getByText } = within(copyInfoAlert);
    getByText("Link copied to clipboard!");
  });

  test("Link presence", async () => {
    const { getByText } = render(<RedirectViewer url="https://google.com" />);

    getByText("https://google.com");
  });
});
