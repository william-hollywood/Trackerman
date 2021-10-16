import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { formatNumber, Location } from '@angular/common';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss']
})
export class InfoPage implements AfterViewInit{
  dist: any;
  time: string;
  duration: any;
  speed: any;

  constructor(public location: Location ) {}

  ngAfterViewInit(): void {
    let id = this.location.path().split('id=')[1]
    firebase.database().ref("routes/"+SettingsPage.uname+"/"+id).get().then((val) => {
      this.time = new Date(parseInt(id)).toLocaleString();
      this.duration = parseInt((val.child('duration').val()/1000).toString());
      this.dist = parseFloat(val.child('distance').val()).toPrecision(3)
      this.speed = (this.dist / (this.duration / 3600)).toPrecision(3);
    });
  }
}
