import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Model } from '../model';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss']
})
export class StatsPage implements AfterViewInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;

  constructor() { }

  async ngAfterViewInit() {
    this.doRefresh(null)
  }

  async doRefresh(event) {
    await Model.firebaseGetRoutes();
    this.barChartMethod();
    if (event != null)
      event.target.complete();
  }

  makeChart(labelData, pastData) {
    Chart.pluginService.register({
      afterDraw: function (chart) {
        if (typeof chart.config.options.lineAt != 'undefined') {
          var lineAt = chart.config.options.lineAt;
          var ctxPlugin = chart.chart.ctx;
          var xAxe = chart.scales[chart.config.options.scales.xAxes[0].id];
          var yAxe = chart.scales[chart.config.options.scales.yAxes[0].id];
          if (yAxe.min != 0) return;
          ctxPlugin.strokeStyle = "red";
          ctxPlugin.beginPath();
          lineAt = (lineAt - yAxe.min) * (100 / yAxe.max);
          lineAt = (100 - lineAt) / 100 * (yAxe.height) + yAxe.top;
          ctxPlugin.moveTo(xAxe.left, lineAt);
          ctxPlugin.lineTo(xAxe.right, lineAt);
          ctxPlugin.stroke();
        }
      }
    });
    return new Chart(this.barCanvas.nativeElement, {
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
        lineAt: 5,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMin: 6
            }
          }]
        }
      }
    });
  }

  barChartMethod() {
    if (Model.valid) {
      let data = Model.getChartData()
      let labelData = data[0];
      let pastData = data[1];
      this.barChart = this.makeChart(labelData, pastData)
    } else {
      alert("Please login in the Settings")
    }
  }
}