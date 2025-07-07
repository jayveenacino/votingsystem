import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { useOffset } from '../context/chartLayoutContext';
import { uniqueId } from '../util/DataUtils';
var ClipPathIdContext = /*#__PURE__*/createContext(undefined);

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
export var ClipPathProvider = _ref => {
  var {
    children
  } = _ref;
  var [clipPathId] = useState("".concat(uniqueId('recharts'), "-clip"));
  var offset = useOffset();
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
export var useClipPathId = () => {
  return useContext(ClipPathIdContext);
};