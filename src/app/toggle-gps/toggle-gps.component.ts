import { SettingsPage } from './../settings/settings.page';
import { Component, OnInit } from '@angular/core';
import { HomePageModule } from '../home/home.module';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

var lastGps = 0;
const gpsDelay = 2;

function onSuccess(position: GeolocationPosition) {
  if (position.timestamp >= lastGps + gpsDelay) {
    lastGps = position.timestamp;
    HomePageModule.route.push({timestamp: Date.now(), coords: {latitude: position.coords.latitude, longitude: position.coords.longitude}});
  }
}

function onError(error: GeolocationPositionError) {
  alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function calcCrow(lat1: any, lon1: any, lat2: any, lon2: any) {
  let R = 6371; // km
  let dLat = toRad(lat2 - lat1);
  let dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(value: number) {
  return value * Math.PI / 180;
}

function saveRouteToFirebase() {
  // iterate over the route, extract the useful info
  let startTime = HomePageModule.route[0].timestamp;
  let length = HomePageModule.route[HomePageModule.route.length - 1].timestamp - startTime;
  let points = []
  let dist = 0;
  for (let i = 0; i < HomePageModule.route.length; i++) {
    let pos = HomePageModule.route[i];
    points.push([pos.coords.latitude, pos.coords.longitude])
    if (i != 0) {
      dist += calcCrow(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]);
    }
  }
  let route = { duration: length, distance: dist, route: points }
  firebase.database().ref("routes/" + SettingsPage.uname + "/" + startTime).set(route);
  HomePageModule.route = []
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
  // let route = {duration: 890, distance:dist, route:points}
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
    } else {
      alert("Please login in the Settings")
    }
  }

  constructor() { }

  ngOnInit() { }

}
