import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupEvenDuplicateDetailPage } from './popup-even-duplicate-detail';
import {EmojiPickerModule} from '@ionic-tools/emoji-picker';

@NgModule({
  declarations: [
    PopupEvenDuplicateDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupEvenDuplicateDetailPage),
    EmojiPickerModule
  ],
  exports: [
    PopupEvenDuplicateDetailPage
  ]
})
export class PopupEvenDuplicateDetailPageModule {}
