import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {EditPublishPage} from "./edit-publish";
import {EmojiPickerModule} from '@ionic-tools/emoji-picker';

@NgModule({
    declarations: [
        EditPublishPage,
    ],
    imports: [
        IonicPageModule.forChild(EditPublishPage),
        EmojiPickerModule
    ],
})
export class EditPublishPageModule {}
