"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetCartesianGraphicalItem = SetCartesianGraphicalItem;
exports.SetPolarGraphicalItem = SetPolarGraphicalItem;
var _react = require("react");
var _hooks = require("./hooks");
var _graphicalItemsSlice = require("./graphicalItemsSlice");
var _ChartUtils = require("../util/ChartUtils");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function SetCartesianGraphicalItem(props) {
  var dispatch = (0, _hooks.useAppDispatch)();
  (0, _react.useEffect)(() => {
    var settings = _objectSpread(_objectSpread({}, props), {}, {
      stackId: (0, _ChartUtils.getNormalizedStackId)(props.stackId)
    });
    dispatch((0, _graphicalItemsSlice.addCartesianGraphicalItem)(settings));
    return () => {
      dispatch((0, _graphicalItemsSlice.removeCartesianGraphicalItem)(settings));
    };
  }, [dispatch, props]);
  return null;
}
function SetPolarGraphicalItem(props) {
  var dispatch = (0, _hooks.useAppDispatch)();
  (0, _react.useEffect)(() => {
    dispatch((0, _graphicalItemsSlice.addPolarGraphicalItem)(props));
    return () => {
      dispatch((0, _graphicalItemsSlice.removePolarGraphicalItem)(props));
    };
  }, [dispatch, props]);
  return null;
}