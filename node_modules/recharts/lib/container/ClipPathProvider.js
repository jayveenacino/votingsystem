"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useClipPathId = exports.ClipPathProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _chartLayoutContext = require("../context/chartLayoutContext");
var _DataUtils = require("../util/DataUtils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var ClipPathIdContext = /*#__PURE__*/(0, _react.createContext)(undefined);

/**
 * Generates a unique clip path ID for use in SVG elements,
 * and puts it in a context provider.
 *
 * To read the clip path ID, use the `useClipPathId` hook,
 * or render `<ClipPath>` component which will automatically use the ID from this context.
 *
 * @param props children - React children to be wrapped by the provider
 * @returns React Context Provider
 */
var ClipPathProvider = _ref => {
  var {
    children
  } = _ref;
  var [clipPathId] = (0, _react.useState)("".concat((0, _DataUtils.uniqueId)('recharts'), "-clip"));
  var offset = (0, _chartLayoutContext.useOffset)();
  if (offset == null) {
    return null;
  }
  var {
    left,
    top,
    height,
    width
  } = offset;
  return /*#__PURE__*/React.createElement(ClipPathIdContext.Provider, {
    value: clipPathId
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: clipPathId
  }, /*#__PURE__*/React.createElement("rect", {
    x: left,
    y: top,
    height: height,
    width: width
  }))), children);
};
exports.ClipPathProvider = ClipPathProvider;
var useClipPathId = () => {
  return (0, _react.useContext)(ClipPathIdContext);
};
exports.useClipPathId = useClipPathId;