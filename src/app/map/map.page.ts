import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements AfterViewInit{
  points:string;

  constructor(public location: Location ) {}

  ngAfterViewInit(): void {
    let str = "";
    let id = this.location.path().split('id=')[1]
    firebase.database().ref("routes/"+SettingsPage.uname+"/"+id).get().then((val) => {
      let route = val.child('route')
      for (let i = 0; i < route.numChildren(); i++){
        let lat = route.child(i.toString()).child("0");
        let long = route.child(i.toString()).child("1");
        str += "|" + lat.val() + "," + long.val();
      }
      this.points = str;
    });
  }
}
