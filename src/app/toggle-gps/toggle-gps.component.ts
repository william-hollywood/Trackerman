import { Component, OnInit } from '@angular/core';
import { Model } from '../model';

@Component({
  selector: 'app-toggle-gps',
  templateUrl: './toggle-gps.component.html',
  styleUrls: ['./toggle-gps.component.scss']
})
export class ToggleGpsComponent implements OnInit {
  color: string = "danger";

  /**
   * toggle the GPS on/off ig the user is valid
   */
  toggleGPS() {
    if (Model.valid) {
      if (this.color == "danger") {
        Model.startGPS()
        this.color = "success";
      } else {
        Model.stopGPS();
        Model.saveRouteToFirebase();
        this.color = "danger"
      }
    } else {
      alert("Please login in the Settings")
    }
  }

  constructor() { }

  ngOnInit() { }

}
