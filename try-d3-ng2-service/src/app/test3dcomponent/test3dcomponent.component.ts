import {
  Component, ElementRef, Input, IterableDiffer, IterableDiffers, OnChanges, OnInit, SimpleChanges,
  ViewEncapsulation
} from "@angular/core";
import {D3, D3Service, Selection} from "d3-ng2-service";
import {Country} from "../country";

@Component({
  selector: 'test3dcomponent',
  templateUrl: './test3dcomponent.component.html',
  styleUrls: ['./test3dcomponent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Test3dcomponentComponent implements OnInit, OnChanges {

  private d3: D3;
  private parentNativeElement: any;
  private g: Selection<any, any, any, Country>;

  @Input()
  private countries: Array<Country> = [];

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    let d3 = this.d3;
    let svg: Selection<any, any, any, any>;
    let countries = this.countries;

    if (this.parentNativeElement !== null) {
      svg = d3.select("svg")
        .attr('width', 960)
        .attr('height', 500);

      this.g = svg.selectAll("g")
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

      this.g.on('click', function (data) {
        data.selected = !data.selected;
      });

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
    }

}
