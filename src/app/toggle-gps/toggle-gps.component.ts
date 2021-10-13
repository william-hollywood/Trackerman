import { SettingsPage } from './../settings/settings.page';
import { Component, OnInit } from '@angular/core';
import {HomePageModule} from '../home/home.module';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

var lastGps = 0;
const gpsDelay = 5;

function onSuccess(position: GeolocationPosition) {
  if (position.timestamp >= lastGps + gpsDelay){
    lastGps = position.timestamp;
    HomePageModule.route.push(position);
  }
}

function onError(error: GeolocationPositionError) {
  alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
}

function saveRouteToFirebase(){
  // iterate over the route, extract the useful info
  // test upload
  // let points = [];
  // let x = 100;
  // let y = 100;
  // for (let i = 0; i < 1000; i++){
  //   points.push([x,y]);
  //   x += 0.01;
  //   y -= 0.01;
  // }
  // let timestamp = "1634118260"
  // let route = {"duration": 890, "route":points}
  // firebase.database().ref("routes/" + SettingsPage.uname+"/"+ timestamp).set(route);
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
    if (SettingsPage.valid) {
      if (this.color == "danger") {
        this.watchId = navigator.geolocation.watchPosition(onSuccess, onError, this.options)
        this.color = "success";
      } else {
        navigator.geolocation.clearWatch(this.watchId);
        saveRouteToFirebase();
        this.color = "danger"
      }
    }
  }

  constructor() { }

  ngOnInit() { }

}
