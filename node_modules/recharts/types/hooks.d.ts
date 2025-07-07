import type { AxisId } from './state/cartesianAxisSlice';
import { BaseAxisWithScale } from './state/selectors/axisSelectors';
export declare const useXAxis: (xAxisId: AxisId) => BaseAxisWithScale | undefined;
export declare const useYAxis: (yAxisId: AxisId) => BaseAxisWithScale | undefined;
/**
 * Returns the active tooltip label. The label is one of the values from the chart data,
 * and is used to display in the tooltip content.
 *
 * Returns undefined if there is no active user interaction.
 *
 * @returns string | undefined
 */
export declare const useActiveTooltipLabel: () => string | undefined;
