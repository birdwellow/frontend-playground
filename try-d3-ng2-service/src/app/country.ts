import {Point} from "./math/point";
export interface Country {
  name: string;
  svgData: string;
  center: Point;
  selected?: boolean;
}
