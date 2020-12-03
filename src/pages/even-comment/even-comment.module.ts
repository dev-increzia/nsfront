import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {EvenCommentPage} from "./even-comment";

@NgModule({
  declarations: [
    EvenCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(EvenCommentPage),
  ],
})
export class EvenCommentPageModule {}
