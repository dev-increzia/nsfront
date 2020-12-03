import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDepInfoPage } from './event-dep-info';

@NgModule({
  declarations: [
    EventDepInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDepInfoPage),
  ],
  exports: [
    EventDepInfoPage
  ]
})
export class EventDepInfoPageModule {}
