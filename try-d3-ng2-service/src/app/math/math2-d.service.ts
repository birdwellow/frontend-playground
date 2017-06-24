import { Injectable } from '@angular/core';
import {Rect} from "./rect";
import {Vector} from "./vector";
import {Point} from "./point";

@Injectable()
export class Math2DService {

  constructor() { }

  public getContainingRect (vector: Vector): Rect {
    let pos: Point = {
      'x': Math.min(vector.start.x, vector.end.x),
      'y': Math.min(vector.start.y, vector.end.y)
    };
    let width: number = Math.abs(vector.start.x - vector.end.x);
    let height: number = Math.abs(vector.start.y - vector.end.y);

    let rect: Rect = {
      'pos': pos,
      'width': width,
      'height': height
    };
    return rect;
  }

  public addSpacing(rect: Rect, xSpacing: number, ySpacing: number): Rect {
    let result = {
      pos: {
        x: rect.pos.x - (xSpacing / 2),
        y: rect.pos.y - (ySpacing / 2),
      },
      width: rect.width + xSpacing,
      height: rect.height + ySpacing,
    };
    return result;
  }

  public getViewPortRect(rect: Rect, widthToHeightRatio: number): Rect {
    let inputWidthToHeightRatio = rect.width / rect.height;
    let conserveWidth = widthToHeightRatio <= inputWidthToHeightRatio;

    let width = 0;
    let height = 0;
    let x = 0;
    let y = 0;

    if (conserveWidth) {
      width = rect.width;
      height = rect.width / widthToHeightRatio;
      x = rect.pos.x;
      y = rect.pos.y - Math.abs(rect.height - height) / 2;
    } else {
      height = rect.height;
      width = rect.height * widthToHeightRatio;
      y = rect.pos.y;
      x = rect.pos.x - Math.abs(rect.width - width) / 2;
    }
    let result: Rect = {
      pos: {
        x: x,
        y: y
      },
      width: width,
      height: height
    };
    return result;
  }

  // TODO: add Unit Tests
  public vector(start: Point, end: Point): Vector {
    let result: Vector = {
      start: start,
      end: end
    };
    return result;
  }

}
