import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {PublishPage} from "./publish";
import {EmojiPickerModule} from '@ionic-tools/emoji-picker';

@NgModule({
    declarations: [
        PublishPage,
    ],
    imports: [
        IonicPageModule.forChild(PublishPage),
        EmojiPickerModule
    ],
})
export class PublishPageModule {}
