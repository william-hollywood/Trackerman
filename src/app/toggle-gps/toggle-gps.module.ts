import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToggleGpsComponent } from './toggle-gps.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ToggleGpsComponent],
  exports: [ToggleGpsComponent]
})
export class ToggleGpsComponentModule {}
