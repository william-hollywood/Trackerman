import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss']
})
export class StatsPage implements AfterViewInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;

  barChart: any;

  constructor() {

  }


  ngAfterViewInit() {
    this.barChartMethod();
  }

  doRefresh(event) {
    this.barChartMethod();
    event.target.complete();
  }
  
  barChartMethod() {
    if (SettingsPage.valid) {
      let now = Date.now();
      let time = now - 604800000 + 86400000;
      let labelData = [] // array strings, of day starting from 6 days ago until today
      for (let i = 0; i < 7; i++) {
        let d = new Date(time);
        let str = d.toLocaleDateString();
        labelData.push(str.substr(0, str.length - 5))
        time += 86400000;
      }
      let pastData = [0,0,0,0,0,0,0]; // array numbers, total on each day of past week.

      firebase.database().ref("routes/" + SettingsPage.uname + "/").get().then((val) => {
        if (val.toJSON() != null) {
          val.forEach((route) => {
            if (parseInt(route.key) > now - 604800000){
              let d = new Date(parseInt(route.key));
              let str = d.toLocaleDateString();
              str = str.substr(0, str.length - 5)
              for (let i = 0; i < 7; i++){
                if (str == labelData[i]){
                  pastData[i] += route.child("distance").val();
                }
              }
            }
          });
          this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
              labels: labelData,
              datasets: [{
                label: 'Distance Traveled (Km)',
                data: pastData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
        }
      });
    } else {
      alert("Please login in the Settings")
    }
  }
}