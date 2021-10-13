import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyCrQZ-TtxyW3K9HfSx2MCeAVu9eQ_XE0Z8",    
    authDomain: "swen325-trackerman.firebaseapp.com",    
    databaseURL: "https://swen325-trackerman-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "swen325-trackerman",    
    storageBucket: "swen325-trackerman.appspot.com",    
    messagingSenderId: "960313101926",    
    appId: "1:960313101926:web:54593a603800f74df667a7",
    measurementId: "G-HJLMCSM0W6"
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
