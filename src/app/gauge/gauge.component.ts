import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";
import * as D3 from "d3";

export class GaugeData {
  public label: string;
  public thickness: number = 10;
  public radius: number;
  public values: any[];
}

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements AfterViewInit {

  @ViewChild("containerPieChart") element: ElementRef;

  private host: D3.Selection;
  private svg: D3.Selection;
  private htmlElement: HTMLElement;

  @Input() private data: GaugeData;

  constructor() {
  }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.buildSVG();
    this.buildPie();
  }

  private buildSVG(): void {
    this.host.html("");
    this.svg = this.host.append("svg")
      .attr("viewBox", `0 0 ${this.data.radius*2} ${this.data.radius*2}`)
      .append("g")
      .attr("transform", `translate(${this.data.radius},${this.data.radius})`);
  }

  private buildPie(): void {
    let pie = D3.layout.pie();
    let values = this.data.values.map(data => data.value);
    let arcSelection = this.svg.selectAll(".arc")
      .data(pie(values))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcSelection.append("text")
      .attr("transform", "translate(0,0)")
      .text(this.data.label)
      .attr("class", "gauge-title")
      .style("text-anchor", "middle");

    this.populatePie(arcSelection);
  }

  private populatePie(arcSelection: D3.Selection<D3.layout.pie.Arc>): void {
    let innerRadius = this.data.radius - this.data.thickness;
    let outerRadius = this.data.radius;
    let arc = D3.svg.arc<D3.layout.pie.Arc>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    arcSelection.append("path")
      .attr("d", arc)
      .attr("fill", (datum, index) => {
        return this.data.values[index].color;
      });

  }

}
