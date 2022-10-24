import { defineComponent, toRefs } from "vue";
import { buttonProps, ButtonProps } from "./button-types";

export default defineComponent({
  name: "YButton",
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const { type, size, disabled, block } = toRefs(props);
    return () => {
      const defaultSlot = slots.default ? slots.default() : "按钮";
      // block
      const blockCls = block.value ? "s-btn--block" : "";
      return (
        <button
          disabled={disabled.value}
          class={`s-btn s-btn--${type.value} s-btn--${size.value} ${blockCls}`}
        >
          {defaultSlot}
        </button>
      );
    };
  },
});
