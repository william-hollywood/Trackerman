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
  @Input()
  id:any;

  constructor(private router: Router, private popoverController: PopoverController) {}

  ngOnInit() {
  }

  navmap(){
    this.popoverController.dismiss();
    this.router.navigate(['tabs/history/map', { id: this.id }])
  }

  navinfo(){
    this.popoverController.dismiss();
    this.router.navigate(['tabs/history/info', { id: this.id }])
  }

}