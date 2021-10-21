import { PopoverComponent } from './../popover/popover.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Model } from '../model';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class HistoryPage {

  list: { id: string; time: string; icon: string; }[] = []

  /**
   * Refresh page on load
   * @param router 
   * @param popoverController 
   */
  constructor(private router: Router, public popoverController: PopoverController) {
    this.doRefresh(null);
  }

  /**
   * present a popover when an entry is selected
   * @param ev 
   * @param selected 
   * @returns 
   */
  async handleButtonClick(ev, selected) {
    let popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: { id: selected }, // pass through the id of the selected route
      event: ev,
      translucent: true
    });
    return popover.present();
  }

  /**
   * called when the ion-refresher is activated
   * @param event refresh event to complete when finished
   */
  async doRefresh(event) {
    // update the routes before updating the list
    await Model.firebaseGetRoutes();
    if (Model.valid) {
      let val = Model.routes;
      this.list = [];
      if (val.toJSON() != null) {
        val.forEach((route) => {
          let date = new Date(parseInt(route.key));
          let speed = route.child("distance").val() / ((route.child("duration").val() / 1000) / 3600);
          let entry = { id: route.key, time: date.toLocaleString(), icon: speed > Model.walkspeed ? "bicycle" : "walk" };
          this.list.unshift(entry);
        });
      }
      if (event != null) event.target.complete();
    } else {
      alert("Please login in the Settings")
      if (event != null) event.target.complete();
    }
  }

}
