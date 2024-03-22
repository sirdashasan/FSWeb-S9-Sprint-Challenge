import React from "react";
import { render, screen } from "@testing-library/react";
import AppFunctional from "./AppFunctional";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<AppFunctional />);
});

test("Koordinatlar yazısı görünürlüğü", async () => {
  expect(screen.getByText("Koordinatlar:")).toBeInTheDocument();
});

test("Buton metinlerinin görünürlüğü", async () => {
  expect(screen.getByText("SOL")).toBeInTheDocument();
  expect(screen.getByText("YUKARI")).toBeInTheDocument();
  expect(screen.getByText("SAĞ")).toBeInTheDocument();
  expect(screen.getByText("AŞAĞI")).toBeInTheDocument();
  expect(screen.getByText("reset")).toBeInTheDocument();
});

test("Submit buton görünürlüğü", async () => {
  expect(screen.getByText(/submit/i)).toBeInTheDocument();
});

test("Başlangıç adım yazısının görünürlüğü", async () => {
  expect(screen.getByText("0 kere ilerlediniz")).toBeInTheDocument();
});

test("Inputa metin girildiğinde value değişimi", async () => {
  const input = screen.getByPlaceholderText("type email");
  await userEvent.type(input, "hasan.sirdas@outlook.com");
  expect(input.value).toBe("hasan.sirdas@outlook.com");
});
