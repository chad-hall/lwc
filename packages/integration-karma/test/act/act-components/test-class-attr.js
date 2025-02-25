/* eslint-disable */
export default function (define) {
    return define('records/recordLayout2', ['ui/something', 'lwc'], function (_uiSomething, lwc) {
        function _interopDefaultLegacy(e) {
            return e && typeof e === 'object' && 'default' in e ? e : { default: e };
        }
        var _uiSomething__default = /*#__PURE__*/ _interopDefaultLegacy(_uiSomething);
        function tmpl($api, $cmp, $slotset, $ctx) {
            const { c: api_custom_element } = $api;
            return [
                api_custom_element(
                    'ui-something',
                    _uiSomething__default['default'],
                    {
                        classMap: {
                            'slds-has-divider_top': true,
                            'slds-grid': true,
                        },
                        key: 1,
                    },
                    []
                ),
            ];
        }

        var _tmpl = lwc.registerTemplate(tmpl);
        tmpl.stylesheets = [];
        tmpl.stylesheetToken = 'records-recordLayout2_recordLayout2';
        var recordLayout2 = lwc.registerComponent(_tmpl, {
            tmpl: _tmpl,
        });
        return recordLayout2;
    });
}
