import { ChartCoordinate, ChartOffsetRequired, LayoutType } from '../types';
export type CursorRectangle = {
    stroke: string;
    fill: string;
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare function getCursorRectangle(layout: LayoutType, activeCoordinate: ChartCoordinate, offset: ChartOffsetRequired, tooltipAxisBandSize: number): CursorRectangle;
