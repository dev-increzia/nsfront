import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DupliquerArticlePage } from './dupliquer-article';
import {EmojiPickerModule} from '@ionic-tools/emoji-picker';

@NgModule({
  declarations: [
    DupliquerArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(DupliquerArticlePage),
    EmojiPickerModule
  ],
  exports: [
    DupliquerArticlePage
  ]
})
export class DupliquerArticlePageModule {}
