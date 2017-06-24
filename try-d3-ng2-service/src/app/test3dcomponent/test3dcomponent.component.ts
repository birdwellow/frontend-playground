import {Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation} from "@angular/core";
import {D3, D3Service, Selection} from "d3-ng2-service";
import {Country} from "../country";
import {Math2DService} from "../math/math2-d.service";
import {Vector} from "../math/vector";
import {Rect} from "../math/rect";

@Component({
  selector: 'test3dcomponent',
  templateUrl: './test3dcomponent.component.html',
  styleUrls: ['./test3dcomponent.component.css'],

  // TODO: do it the standard way
  encapsulation: ViewEncapsulation.None
})
export class Test3dcomponentComponent implements OnInit, OnChanges {

  private math2D: Math2DService;
  private d3: D3;
  private parentNativeElement: any;
  private g: Selection<any, any, any, Country>;
  private svg: Selection<any, any, any, any>;

  private width: number = 960;
  private height: number = 500;
  private transformString: string = '';

  @Input()
  private countries: Array<Country> = [];

  constructor(element: ElementRef, d3Service: D3Service, math2D: Math2DService) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
    this.math2D = math2D;
  }

  ngOnInit() {
    let d3 = this.d3;
    let countries = this.countries;

    if (this.parentNativeElement !== null) {
      this.svg = d3.select("svg")
        .attr('width', this.width)
        .attr('height', this.height)
        // .attr('transform', 'scale(2) translate(-300, -260)')
      ;
      let svg = this.svg;

      this.g = this.svg.selectAll("g")
        .data(countries)
        .enter()
        .append("g")
        .attr("class", "groups");

      this.g.append("path")
        .attr("d", function (country) {
          return country.svgData;
        });
      this.g.append("text")
        .text(function (country) {
          return country.name;
        })
        .attr("x", function (d) {
          return d.center.x;
        })
        .attr("y", function (d) {
          return d.center.y;
        });
      this.g.append("circle")
        .attr("cx", function (d) {
          return d.center.x;
        })
        .attr("cy", function (d) {
          return d.center.y;
        })
        .attr("r", function () {
          return 5;
        });

      this.g.on('click', function (data) {
        data.selected = !data.selected;
      });

      // this.svg.on('mousemove', function () {
      //   console.log(d3.mouse(svg.node()));
      // });

    }
  }

  ngDoCheck() {
    this.ngOnChanges();
  }

  ngOnChanges() {
    this.update();
  }

  update () {
    if(!this.g) {
      return;
    }
    let shapeData = this.countries;
    this.g.data(shapeData);

    this.g.attr('class', function (country) {
      return country.selected ? 'groups selected' : 'groups';
    });

    this.g.selectAll("path")
      .attr("d", function (country: Country) {
        return country.svgData;
      });

    this.scale();
  }

  scale() {
    let selectedCount = 0;
    let selectedCountries = this.countries.filter(function (country: Country) {
      if(selectedCount < 2) {
        if(country.selected) {
          selectedCount++;
          return true;
        }
      }
      return false;
    });

    let transformString: string = 'scale(1) translate(0, 0)';
    if(selectedCountries.length === 2) {
      let vector: Vector = this.math2D.vector(selectedCountries[0].center, selectedCountries[1].center);
      let containingRect: Rect = this.math2D.getContainingRect(vector);
      let spacedContainingRect: Rect = this.math2D.addSpacing(containingRect, 50, 50);
      let viewPort = this.math2D.getViewPortRect(spacedContainingRect, this.width/this.height);

      let scale = Math.min(this.width / viewPort.width, this.height / viewPort.height);
      transformString = 'scale(' + scale + ') translate(' + -viewPort.pos.x + ', ' + -viewPort.pos.y + ')';
    }

    // IMPORTANT; if no check is perormed, the transition will be set after every tick, thus
    // triggering ngDoCheck again and causing an infinite loop
    if(this.transformString !== transformString) {
      this.transformString = transformString
      this.svg
        .transition()
        .duration(500)
        .attr('transform', this.transformString);
    }
  }

}
