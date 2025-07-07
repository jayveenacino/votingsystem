"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useYAxis = exports.useXAxis = exports.useActiveTooltipLabel = void 0;
var _axisSelectors = require("./state/selectors/axisSelectors");
var _hooks = require("./state/hooks");
var _PanoramaContext = require("./context/PanoramaContext");
var _tooltipSelectors = require("./state/selectors/tooltipSelectors");
var useXAxis = xAxisId => {
  var isPanorama = (0, _PanoramaContext.useIsPanorama)();
  return (0, _hooks.useAppSelector)(state => (0, _axisSelectors.selectAxisWithScale)(state, 'xAxis', xAxisId, isPanorama));
};
exports.useXAxis = useXAxis;
var useYAxis = yAxisId => {
  var isPanorama = (0, _PanoramaContext.useIsPanorama)();
  return (0, _hooks.useAppSelector)(state => (0, _axisSelectors.selectAxisWithScale)(state, 'yAxis', yAxisId, isPanorama));
};

/**
 * Returns the active tooltip label. The label is one of the values from the chart data,
 * and is used to display in the tooltip content.
 *
 * Returns undefined if there is no active user interaction.
 *
 * @returns string | undefined
 */
exports.useYAxis = useYAxis;
var useActiveTooltipLabel = () => {
  return (0, _hooks.useAppSelector)(_tooltipSelectors.selectActiveLabel);
};
exports.useActiveTooltipLabel = useActiveTooltipLabel;