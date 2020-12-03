import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {InterestDetailsPage} from "./interest-details";

@NgModule({
    declarations: [
        InterestDetailsPage,
    ],
    imports: [
        IonicPageModule.forChild(InterestDetailsPage),
    ],
})
export class InterestDetailsPageModule {}
