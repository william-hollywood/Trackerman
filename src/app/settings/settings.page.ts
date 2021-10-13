import { Component } from '@angular/core';

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
        break;
      case "pass":
        alert("implement hashing from ass2 here");
        SettingsPage.passhash = val;
        break;
      case "walk":
        SettingsPage.walkspeed = val;
        break;
    }
  }

  testLogin(){
    //if firebase get uname == passhash good. change button colour?
    alert("Not Implemented Yet");
  }

  register(){
    //if name not exist && name and pass not empty
    alert("Not Implemented Yet");
  }
}
