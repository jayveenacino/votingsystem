import { selectAxisWithScale } from './state/selectors/axisSelectors';
import { useAppSelector } from './state/hooks';
import { useIsPanorama } from './context/PanoramaContext';
import { selectActiveLabel } from './state/selectors/tooltipSelectors';
export var useXAxis = xAxisId => {
  var isPanorama = useIsPanorama();
  return useAppSelector(state => selectAxisWithScale(state, 'xAxis', xAxisId, isPanorama));
};
export var useYAxis = yAxisId => {
  var isPanorama = useIsPanorama();
  return useAppSelector(state => selectAxisWithScale(state, 'yAxis', yAxisId, isPanorama));
};

/**
 * Returns the active tooltip label. The label is one of the values from the chart data,
 * and is used to display in the tooltip content.
 *
 * Returns undefined if there is no active user interaction.
 *
 * @returns string | undefined
 */
export var useActiveTooltipLabel = () => {
  return useAppSelector(selectActiveLabel);
};