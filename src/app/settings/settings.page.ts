import { Component } from '@angular/core';
import jsSHA from 'jssha'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  static uname = ""
  static passhash = ""
  static walkspeed = 5;
  static valid = false;

  constructor() {}

  inputUpdate(type: string, event: any){
    let val = event.target.value;
    switch(type){
      case "uname":
        SettingsPage.uname = val;
        SettingsPage.valid = false;
        break;
      case "pass":
        let shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(val);
        let hash = shaObj.getHash("HEX");
        SettingsPage.passhash = hash;
        SettingsPage.valid = false;
        break;
      case "walk":
        SettingsPage.walkspeed = val;
        break;
    }
  }

  testLogin(){
    //if firebase get uname == passhash good. change button colour?
    firebase.database().ref("logins/" + SettingsPage.uname).get().then((val) => {
      if (val.toJSON() != null) {
        //does it match or not
        if (val.toJSON() == SettingsPage.passhash) {
          SettingsPage.valid = true;
          alert("True");
        } else {
          SettingsPage.valid = false;
        }
      }
    });
  }

  register(){
    //if name not exist && name and pass not empty
    firebase.database().ref("logins/" + SettingsPage.uname).get().then((val) => {
      //ensure the login doesnt exist already
      if (val.toJSON() == null) {
        SettingsPage.valid = true;
        firebase.database().ref("logins/" + SettingsPage.uname).set(SettingsPage.passhash);
      } else { //otherwise its invalid
        SettingsPage.valid = false;
      }
    });
  }
}
