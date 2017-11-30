import {Component} from '@angular/core';
import {GaugeData} from "./gauge/gauge.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataA: GaugeData = {
    label: "primo",
    thickness: 10,
    radius: 100,
    values: [
      {
        value: 1,
        color: "#bccbcc"
      },
      {
        value: 2,
        color: "#33cccc"
      }
    ]
  };

  dataB: GaugeData = {
    label: "secondo",
    thickness: 10,
    radius: 100,
    values: [
      {
        value: 20,
        color: "#bccbcc"
      },
      {
        value: 3,
        color: "#33cccc"
      }
    ]
  }
}
