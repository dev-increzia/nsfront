import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopEditEventPage } from './pop-edit-event';

@NgModule({
  declarations: [
    PopEditEventPage,
  ],
  imports: [
    IonicPageModule.forChild(PopEditEventPage),
  ],
  exports: [
    PopEditEventPage
  ]
})
export class PopEditEventPageModule {}
