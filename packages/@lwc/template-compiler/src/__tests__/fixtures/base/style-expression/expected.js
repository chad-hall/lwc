import { registerTemplate } from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const { h: api_element } = $api;
  return [
    api_element("section", {
      style: $cmp.customStyle,
      key: 0,
    }),
  ];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
