import { Component, AfterViewInit} from '@angular/core';
import { Location } from '@angular/common';
import { Model } from '../model';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements AfterViewInit{
  //img link
  img = ""

  constructor(public location: Location ) {}

  /**
   * construct a custom URL to get a static maps image from
   */
  ngAfterViewInit(): void {
    let id = this.location.path().split('id=')[1];
    let str = Model.getPointsFromRoute(id);
    this.img = "https://maps.googleapis.com/maps/api/staticmap?size=1024x1024&path=color:0xff0000ff|weight:5"+str+"&key=AIzaSyDCNbgcEiKA25j7Cg7Jddx0QusAqBRi13c"
  }
}
