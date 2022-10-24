import Button from "./Button";
import { render } from "@testing-library/vue";

test("Button.tsx should work", () => {
  const { getByText } = render(Button);
  getByText("按钮");
});
