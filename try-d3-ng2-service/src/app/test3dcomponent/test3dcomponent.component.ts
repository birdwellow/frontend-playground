import {Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation} from "@angular/core";
import {D3, D3Service, Selection} from "d3-ng2-service";
import {Country} from "../country";

@Component({
  selector: 'test3dcomponent',
  templateUrl: './test3dcomponent.component.html',
  styleUrls: ['./test3dcomponent.component.css'],

  // TODO: do it the standard way
  encapsulation: ViewEncapsulation.None
})
export class Test3dcomponentComponent implements OnInit, OnChanges {

  private d3: D3;
  private parentNativeElement: any;
  private g: Selection<any, any, any, Country>;

  private width: number = 960;
  private height: number = 500;

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
        .attr('width', this.width)
        .attr('height', this.height)
        // .attr('transform', 'scale(2) translate(-300, -260)')
      ;

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

    if(selectedCountries.length >= 2) {

    }
  }

}
