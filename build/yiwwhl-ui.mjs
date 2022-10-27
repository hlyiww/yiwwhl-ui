import { defineComponent as c, toRefs as p, createVNode as r } from "vue";
const f = {
  type: {
    type: String,
    default: "secondary"
  },
  size: {
    type: String,
    default: "medium"
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  block: {
    type: Boolean,
    default: !1
  }
}, n = c({
  name: "YButton",
  props: f,
  setup(t, {
    slots: e
  }) {
    const {
      type: o,
      size: l,
      disabled: s,
      block: a
    } = p(t);
    return () => {
      const u = e.default ? e.default() : "\u6309\u94AE", d = a.value ? "s-btn--block" : "";
      return r("button", {
        disabled: s.value,
        class: `s-btn s-btn--${o.value} s-btn--${l.value} ${d}`
      }, [u]);
    };
  }
}), i = {
  install(t) {
    t.component(n.name, n);
  }
}, b = [i], y = {
  install(t) {
    b.forEach((e) => t.use(e));
  }
};
export {
  n as Button,
  y as default
};
