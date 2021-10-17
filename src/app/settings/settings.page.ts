import { Component } from '@angular/core';
import jsSHA from 'jssha'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Model } from '../model';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor() {}

  inputUpdate(type: string, event: any){
    let val = event.target.value;
    switch(type){
      case "uname":
        Model.uname = val;
        Model.valid = false;
        break;
      case "pass":
        let shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(val);
        let hash = shaObj.getHash("HEX");
        Model.passhash = hash;
        Model.valid = false;
        break;
      case "walk":
        Model.walkspeed = val;
        break;
    }
  }

  testLogin(){
    //if firebase get uname == passhash good. change button colour?
    Model.firebaseGet("logins/" + Model.uname).then((val) => {
      if (val.toJSON() != null) {
        //does it match or not
        if (val.toJSON() == Model.passhash) {
          Model.valid = true;
          alert("Logged in successfully");
        } else {
          Model.valid = false;
          alert("Invalid login");
        }
      }
    });
  }

  register(){
    //if name not exist && name and pass not empty
    Model.firebaseGet("logins/" + Model.uname).then((val) => {
      //ensure the login doesnt exist already
      if (val.toJSON() == null) {
        Model.valid = true;
        Model.firebaseSet("logins/" + Model.uname, Model.passhash);
        alert("Account successfully created")
      } else { //otherwise its invalid
        Model.valid = false;
        alert("Account name already in use")
      }
    });
  }
}
