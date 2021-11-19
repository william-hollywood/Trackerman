import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "REDACTED",    
    authDomain: "REDACTED",    
    databaseURL: "REDACTED",
    projectId: "REDACTED",    
    storageBucket: "REDACTED",    
    messagingSenderId: "REDACTED",    
    appId: "REDACTED",
    measurementId: "REDACTED"
  };

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor() {    
    firebase.initializeApp(firebaseConfig);
  }
}
