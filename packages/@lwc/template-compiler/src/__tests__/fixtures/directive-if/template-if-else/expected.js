import { registerTemplate } from "lwc";
const stc0 = {
  key: 0,
};
const stc1 = {
  key: 1,
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const { t: api_text, h: api_element } = $api;
  return [
    $cmp.isTrue ? api_element("p", stc0, [api_text("1")]) : null,
    !$cmp.isTrue2 ? api_element("p", stc1, [api_text("2")]) : null,
  ];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
