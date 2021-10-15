import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'hrtap.page.html',
  styleUrls: ['hrtap.page.scss']
})
export class HRTapPage {

  tapTimings = []
  hr = 0;

  constructor() {}

  onTap(){
    let now = Date.now();
    if (now - this.tapTimings[this.tapTimings.length-1] > 2000){
      this.tapTimings = [];
    }
    this.tapTimings.push(now);
    if (this.tapTimings.length == 10){
      this.tapTimings.pop();
    }

    if (this.tapTimings.length == 1){
      this.hr = 0;
      return;
    }

    let avg = 0;
    for (let i = 1; i < this.tapTimings.length; i++){
      avg += this.tapTimings[i] - this.tapTimings[i-1];
    }
    avg /= this.tapTimings.length-1;
    avg /= 1000;
    this.hr = parseInt((60/avg).toString());
  }

}
