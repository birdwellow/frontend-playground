import {inject, TestBed} from "@angular/core/testing";

import {Math2DService} from "./math2-d.service";
import {Vector} from "./vector";
import {Rect} from "./rect";

describe('Math2DService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Math2DService]
    });
  });

  it('should be created', inject([Math2DService], (service: Math2DService) => {
    expect(service).toBeTruthy();
  }));

  it('should calculate the vector-containing Rect (NW to SE)', inject([Math2DService], (service: Math2DService) => {
    let vector: Vector = {
      start: {
        x: 100,
        y: 300,
      },
      end: {
        x: 500,
        y: 500
      }
    };
    let result: Rect = service.getContainingRect(vector);
    expect(result).toEqual({
      pos: {
        x: 100,
        y: 300
      },
      width: 400,
      height: 200
    });
  }));

  it('should calculate the vector-containing Rect (NE to SW)', inject([Math2DService], (service: Math2DService) => {
    let vector: Vector = {
      start: {
        x: 500,
        y: 300,
      },
      end: {
        x: 100,
        y: 500
      }
    };
    let result: Rect = service.getContainingRect(vector);
    expect(result).toEqual({
      pos: {
        x: 100,
        y: 300
      },
      width: 400,
      height: 200
    });
  }));

  it('should calculate the vector-containing Rect (SW to NE)', inject([Math2DService], (service: Math2DService) => {
    let vector: Vector = {
      start: {
        x: 100,
        y: 500,
      },
      end: {
        x: 500,
        y: 300
      }
    };
    let result: Rect = service.getContainingRect(vector);
    expect(result).toEqual({
      pos: {
        x: 100,
        y: 300
      },
      width: 400,
      height: 200
    });
  }));

  it('should calculate the vector-containing Rect (SE to NW)', inject([Math2DService], (service: Math2DService) => {
    let vector: Vector = {
      start: {
        x: 500,
        y: 300
      },
      end: {
        x: 100,
        y: 500,
      }
    };
    let result: Rect = service.getContainingRect(vector);
    expect(result).toEqual({
      pos: {
        x: 100,
        y: 300
      },
      width: 400,
      height: 200
    });
  }));

  it('should add spacing', inject([Math2DService], (service: Math2DService) => {
    let rect: Rect = {
      pos: {
        x: 100,
        y: 200,
      },
      width: 300,
      height: 500
    };
    let result: Rect = service.addSpacing(rect, 53, -7);
    expect(result).toEqual({
      pos: {
        x: 73.5,
        y: 203.5
      },
      width: 353,
      height: 493
    })
  }));

  it('should get viewport for square', inject([Math2DService], (service: Math2DService) => {
    let rect: Rect = {
      pos: {
        x: 100,
        y: 100,
      },
      width: 200,
      height: 200
    };
    let result: Rect = service.getViewPortRect(rect, 2);
    expect(result).toEqual({
      pos: {
        x: 0,
        y: 100
      },
      width: 400,
      height: 200
    });
  }));

  it('should get viewport for rectangle', inject([Math2DService], (service: Math2DService) => {
    let rect: Rect = {
      pos: {
        x: 100,
        y: 100,
      },
      width: 300,
      height: 200
    };
    let result: Rect = service.getViewPortRect(rect, 2);
    expect(result).toEqual({
      pos: {
        x: 50,
        y: 100
      },
      width: 400,
      height: 200
    });
  }));

  it('should get viewport for upright rectangle', inject([Math2DService], (service: Math2DService) => {
    let rect: Rect = {
      pos: {
        x: 100,
        y: 100,
      },
      width: 200,
      height: 300
    };
    let result: Rect = service.getViewPortRect(rect, 2);
    expect(result).toEqual({
      pos: {
        x: -100,
        y: 100
      },
      width: 600,
      height: 300
    });
  }));

});
