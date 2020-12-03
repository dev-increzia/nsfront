import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {EditEventPage} from "./edit-event";
import {EmojiPickerModule} from '@ionic-tools/emoji-picker';

@NgModule({
  declarations: [
    EditEventPage,
    
  ],
  imports: [
    IonicPageModule.forChild(EditEventPage),
    EmojiPickerModule
  ],
})
export class EditEventPageModule {}
