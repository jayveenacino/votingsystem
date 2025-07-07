import * as React from 'react';
import { useOffset } from '../context/chartLayoutContext';
import { useAppSelector } from '../state/hooks';
import { implicitXAxis, implicitYAxis, selectXAxisSettings, selectYAxisSettings } from '../state/selectors/axisSelectors';
export function useNeedsClip(xAxisId, yAxisId) {
  var _xAxis$allowDataOverf, _yAxis$allowDataOverf;
  var xAxis = useAppSelector(state => selectXAxisSettings(state, xAxisId));
  var yAxis = useAppSelector(state => selectYAxisSettings(state, yAxisId));
  var needClipX = (_xAxis$allowDataOverf = xAxis === null || xAxis === void 0 ? void 0 : xAxis.allowDataOverflow) !== null && _xAxis$allowDataOverf !== void 0 ? _xAxis$allowDataOverf : implicitXAxis.allowDataOverflow;
  var needClipY = (_yAxis$allowDataOverf = yAxis === null || yAxis === void 0 ? void 0 : yAxis.allowDataOverflow) !== null && _yAxis$allowDataOverf !== void 0 ? _yAxis$allowDataOverf : implicitYAxis.allowDataOverflow;
  var needClip = needClipX || needClipY;
  return {
    needClip,
    needClipX,
    needClipY
  };
}
export function GraphicalItemClipPath(_ref) {
  var {
    xAxisId,
    yAxisId,
    clipPathId
  } = _ref;
  var offset = useOffset();
  var {
    needClipX,
    needClipY,
    needClip
  } = useNeedsClip(xAxisId, yAxisId);
  if (!needClip) {
    return null;
  }
  var {
    left,
    top,
    width,
    height
  } = offset;
  return /*#__PURE__*/React.createElement("clipPath", {
    id: "clipPath-".concat(clipPathId)
  }, /*#__PURE__*/React.createElement("rect", {
    x: needClipX ? left : left - width / 2,
    y: needClipY ? top : top - height / 2,
    width: needClipX ? width : width * 2,
    height: needClipY ? height : height * 2
  }));
}