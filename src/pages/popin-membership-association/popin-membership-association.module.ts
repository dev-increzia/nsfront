import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopinMembershipAssociationPage } from './popin-membership-association';

@NgModule({
  declarations: [
    PopinMembershipAssociationPage,
  ],
  imports: [
    IonicPageModule.forChild(PopinMembershipAssociationPage),
  ],
  exports: [
    PopinMembershipAssociationPage
  ]
})
export class PopinMembershipAssociationPageModule {}
