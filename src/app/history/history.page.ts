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


  constructor(private router: Router, public popoverController: PopoverController) {
    this.doRefresh(null);
  }

  currentPopover = null;

  async handleButtonClick(ev, selected) {
    let popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {id: selected},
      event: ev,
      translucent: true
    });
    // alert(popover.innerHTML)
    this.currentPopover = popover;
    return popover.present();
  }

  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }

  navigate(selected) {
    this.router.navigate(['tabs/history/map', { id: selected }])
  }

  doRefresh(event) {
    if (Model.valid) {
      Model.firebaseGet("routes/" + Model.uname + "/").then((val) => {
        if (val.toJSON() != null) {
          this.list = [];
          val.forEach((childsnap) => { // for each route
            let date = new Date(parseInt(childsnap.key));
            let speed = childsnap.child("distance").val() / (childsnap.child("duration").val() / 3600);
            let entry = { id: childsnap.key, time: date.toLocaleString(), icon: speed > Model.walkspeed ? "bicycle" : "walk" };
            this.list.push(entry);
          });
        }
      }).then(() => {
        if (event != null) event.target.complete();
      });
    } else {
      alert("Please login in the Settings")
      if (event != null) event.target.complete();
    }
  }

}
