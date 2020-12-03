import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModerationPage } from './moderation';

@NgModule({
  declarations: [
    ModerationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModerationPage),
  ],
  exports: [
    ModerationPage
  ]
})
export class ModerationPageModule {}
