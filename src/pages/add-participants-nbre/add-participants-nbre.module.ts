import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {AddParticipantsNbrePage} from "./add-participants-nbre";

@NgModule({
    declarations: [
        AddParticipantsNbrePage,
    ],
    imports: [
        IonicPageModule.forChild(AddParticipantsNbrePage),
    ],
})
export class AddParticipantsNbrePageModule {}
