import { Component, AfterViewInit} from '@angular/core';
import { Location } from '@angular/common';
import { Model } from '../model';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements AfterViewInit{
  img = ""

  constructor(public location: Location ) {}

  ngAfterViewInit(): void {
    let str = "";
    let id = this.location.path().split('id=')[1]
    Model.firebaseGet("routes/"+Model.uname+"/"+id).then((val) => {
      let route = val.child('route')
      for (let i = 0; i < route.numChildren(); i++){
        let lat = route.child(i.toString()).child("0");
        let long = route.child(i.toString()).child("1");
        str += "|" + lat.val() + "," + long.val();
      }
      this.img = "https://maps.googleapis.com/maps/api/staticmap?size=1024x1024&path=color:0xff0000ff|weight:5"+str+"&key=AIzaSyDCNbgcEiKA25j7Cg7Jddx0QusAqBRi13c"
    });
  }
}
