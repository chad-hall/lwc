import _nsCmp from "ns/cmp";
import { registerTemplate } from "lwc";
const stc0 = {
  key: 0,
};
const stc1 = {
  key: 1,
};
const stc2 = {
  attrs: {
    slot: "",
  },
  key: 2,
};
const stc3 = {
  attrs: {
    slot: "",
  },
  key: 3,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { t: api_text, h: api_element, c: api_custom_element } = $api;
  return [
    api_element("section", stc0, [
      api_custom_element("ns-cmp", _nsCmp, stc1, [
        $cmp.isTrue ? api_element("p", stc2, [api_text("S1")]) : null,
        api_element("p", stc3, [api_text("S2")]),
      ]),
    ]),
  ];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
