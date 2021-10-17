import { Component, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Model } from '../model';

@Component({
  selector: 'app-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss']
})
export class InfoPage implements AfterViewInit {
  dist: any;
  time: string;
  duration: any;
  speed: any;

  constructor(public location: Location) { }

  ngAfterViewInit(): void {
    let id = this.location.path().split('id=')[1]
    let val = Model.routes.child(id);
    this.time = new Date(parseInt(id)).toLocaleString();
    this.duration = parseInt((val.child('duration').val() / 1000).toString());
    this.dist = parseFloat(val.child('distance').val()).toPrecision(3)
    this.speed = (this.dist / (this.duration / 3600)).toPrecision(3);
  }
}
