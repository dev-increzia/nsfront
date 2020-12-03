import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {VolunteersMailPage} from "./volunteers-mail";

@NgModule({
    declarations: [
        VolunteersMailPage,
    ],
    imports: [
        IonicPageModule.forChild(VolunteersMailPage),
    ],
})
export class VolunteersMailPageModule {}
