import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DupliquerPage } from './dupliquer';
import {EmojiPickerModule} from '@ionic-tools/emoji-picker';

@NgModule({
  declarations: [
    DupliquerPage,
  ],
  imports: [
    IonicPageModule.forChild(DupliquerPage),
    EmojiPickerModule
  ],
  exports: [
    DupliquerPage
  ]
})
export class DupliquerPageModule {}
