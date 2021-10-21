import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private router: Router) {}

  /**
   * basic navigate method for the hrtap button
   */
  navigate(){
    this.router.navigate(['tabs/home/hrtap'])
  }

}
