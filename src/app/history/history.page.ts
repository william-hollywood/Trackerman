import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class HistoryPage {

  list: { time: string; icon: string; }[] = []

  constructor() {
    this.doRefresh(null);
  }

  doRefresh(event) {
    if (SettingsPage.valid) {
      firebase.database().ref("routes/" + SettingsPage.uname + "/").get().then((val) => {
        if (val.toJSON() != null) {
          this.list = [];
          val.forEach((childsnap) => { // for each route
            let date = new Date(parseInt(childsnap.key) * 1000);
            let speed = childsnap.child("distance").val() / (childsnap.child("duration").val() / 3600);
            let entry = { time: date.toLocaleString(), icon: speed > SettingsPage.walkspeed ? "bicycle" : "walk" };
            this.list.push(entry);
          });
        }
      }).then(() => {
        if (event != null) event.target.complete();
      });
    }
  }

}
