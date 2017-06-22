import {Point} from "./point";
export interface Country {
  name: string;
  svgData: string;
  center: Point;
  selected?: boolean;
}
