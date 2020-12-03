import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {PopupAskRoomPage} from "./popup-ask-room";

@NgModule({
    declarations: [
        PopupAskRoomPage,
    ],
    imports: [
        IonicPageModule.forChild(PopupAskRoomPage),
    ]
})
export class PopupAskRoomPageModule {}
