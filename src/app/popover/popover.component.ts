import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import 'firebase/compat/database';

@Component({
  selector: 'app-popover',
  templateUrl: 'popover.component.html',
  styleUrls: ['popover.component.scss']
})
export class PopoverComponent implements OnInit {
  // parameter passed to popover to link to the correct site
  @Input()
  id:any;

  constructor(private router: Router, private popoverController: PopoverController) {}

  ngOnInit() {
  }

  /**
   * method to navigate to the map
   */
  navmap(){
    this.popoverController.dismiss(); // remove the popover
    this.router.navigate(['tabs/history/map', { id: this.id }])
  }

  /**
   * method to navigate to the info
   */
  navinfo(){
    this.popoverController.dismiss(); // remove the popover
    this.router.navigate(['tabs/history/info', { id: this.id }])
  }

}