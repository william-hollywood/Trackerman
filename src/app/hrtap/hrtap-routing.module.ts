import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HRTapPage } from './hrtap.page';

const routes: Routes = [
  {
    path: '',
    component: HRTapPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
