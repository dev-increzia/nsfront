import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {AddSelectedAdminPage} from "./add-selected-admin";

@NgModule({
    declarations: [
        AddSelectedAdminPage,
    ],
    imports: [
        IonicPageModule.forChild(AddSelectedAdminPage),
    ],
})
export class AddSelectedAdminPageModule {}
