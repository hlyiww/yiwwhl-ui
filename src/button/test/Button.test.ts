import Button from "../src/Button";
import { render } from "@testing-library/vue";

test("should be button ele", () => {
  const { getByRole } = render(Button);
  getByRole("button");
});

test("default slot text should be 按钮", () => {
  const { getByText } = render(Button);
  getByText("按钮");
});

test("slot should work", () => {
  const { getByText } = render(Button, {
    slots: {
      default: () => "测试插槽",
    },
  });
  getByText("测试插槽");
});

test("default prop type should be secondary", () => {
  const { getByRole } = render(Button);
  const button = getByRole("button");
  expect(button.classList.contains("s-btn--secondary")).toBe(true);
});

test("prop type should be secondary", () => {
  const { getByRole } = render(Button, {
    props: {
      type: "primary",
    },
  });
  const button = getByRole("button");
  expect(button.classList.contains("s-btn--primary")).toBe(true);
});
