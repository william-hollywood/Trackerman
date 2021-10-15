import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HRTapPage } from './hrtap.page';

import { HomePageRoutingModule } from './hrtap-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule
  ],
  declarations: [HRTapPage]
})
export class HRTapPageModule {
  static route: GeolocationPosition[] = [];
}
