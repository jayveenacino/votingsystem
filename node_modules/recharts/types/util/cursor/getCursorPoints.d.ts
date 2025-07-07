import { ChartCoordinate, Coordinate, LayoutType, ChartOffsetRequired } from '../types';
import { RadialCursorPoints } from './getRadialCursorPoints';
export declare function getCursorPoints(layout: LayoutType, activeCoordinate: ChartCoordinate, offset: ChartOffsetRequired): [Coordinate, Coordinate] | RadialCursorPoints;
