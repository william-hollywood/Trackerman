import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryPage } from './history.page';

import { HistoryPageRoutingModule } from './history-routing.module';
import { PopoverComponentModule } from '../popover/popover.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HistoryPageRoutingModule,
    PopoverComponentModule
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
