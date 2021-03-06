import { Model } from './../model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hrtap',
  templateUrl: 'hrtap.page.html',
  styleUrls: ['hrtap.page.scss']
})
export class HRTapPage {
  hr = 0;

  constructor() {}

  /**
   * method to calculate bps from tap time
   * @returns
   */
  onTap(){
    // update now
    let now = Date.now();
    if (now - Model.tapTimings[Model.tapTimings.length-1] > 2000){
      console.log(now - Model.tapTimings[Model.tapTimings.length-1])
      Model.tapTimings = [];
    }
    // push now
    Model.tapTimings.push(now);
    if (Model.tapTimings.length == Model.tapTimeLen+1){
      Model.tapTimings.splice(0,1);
    }

    // dont do anything if only 1 tap timing
    if (Model.tapTimings.length == 1){
      this.hr = 0;
      return;
    }

    let avg = 0;
    for (let i = 1; i < Model.tapTimings.length; i++){
      avg += Model.tapTimings[i] - Model.tapTimings[i-1];
    }
    
    //turn to bps
    avg /= Model.tapTimings.length-1;
    avg /= 1000;
    this.hr = parseInt((60/avg).toString());
    
  }

}
