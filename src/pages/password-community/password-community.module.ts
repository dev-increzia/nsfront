import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {PasswordCommunityPage} from "./password-community";

@NgModule({
  declarations: [
    PasswordCommunityPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordCommunityPage),
  ],
  exports: [
    PasswordCommunityPage
  ]
})
export class PasswordCommunityPageModule {}
