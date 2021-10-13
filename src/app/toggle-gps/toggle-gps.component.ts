import { Component, OnInit } from '@angular/core';
import {HomePageModule} from '../home/home.module';

function onSuccess(position: GeolocationPosition) {
  HomePageModule.route.push(position);
}

function onError(error: GeolocationPositionError) {
  alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
}

function saveRouteToFirebase(){
  alert("Saving the route would go here.")
  // iterate over the route, extract the useful info
  // put it in firebase
}

@Component({
  selector: 'app-toggle-gps',
  templateUrl: './toggle-gps.component.html',
  styleUrls: ['./toggle-gps.component.scss']
})
export class ToggleGpsComponent implements OnInit {
  color: string = "danger";
  watchId: number;
  options: any = {
    maximumAge: 3600000,
    timeout: 3000,
    enableHighAccuracy: true,
  }

  toggleGPS() {
    if (this.color == "danger") {
      this.watchId = navigator.geolocation.watchPosition(onSuccess, onError, this.options)
      this.color = "success";
    } else {
      navigator.geolocation.clearWatch(this.watchId);
      saveRouteToFirebase();
      this.color = "danger"
    }
  }

  constructor() { }

  ngOnInit() { }

}
