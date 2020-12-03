import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupArtDuplicateDetailPage } from './popup-art-duplicate-detail';
import {MomentModule} from "angular2-moment";
import {EmojiPickerModule} from '@ionic-tools/emoji-picker';

 
@NgModule({
  declarations: [
    PopupArtDuplicateDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupArtDuplicateDetailPage),
    MomentModule,
    EmojiPickerModule
  ],
  exports: [
    PopupArtDuplicateDetailPage
  ]
})
export class PopupArtDuplicateDetailPageModule {}
