import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, Events, ViewController} from 'ionic-angular';
import {AssociationProvider} from "../../providers/association/association";
import {isNumeric} from "rxjs/util/isNumeric";
import {GlobalsProvider} from "../../providers/globals/globals";
import {MerchantProvider} from "../../providers/merchant/merchant";

/**
 * Generated class for the PopinMembershipAssociationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popin-membership-association',
  templateUrl: 'popin-membership-association.html',
})
export class PopinMembershipAssociationPage {

  public id : number;
  public phoneNumber: any;
  public currentUser = JSON.parse(localStorage.getItem("currentUser"));
  public invalidPhoneNumber = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private view: ViewController,
              public loadingCtrl: LoadingController,
              public serviceAssociation : AssociationProvider,
              private modal: ModalController,
              public merchantService: MerchantProvider,
              public appEvent: Events,
              public appGloabs: GlobalsProvider) {
      this.id = navParams.get('id');
      this.phoneNumber = this.currentUser.phone;

  }

  ionViewDidLoad() {
  }

  Close() {
    this.view.dismiss();
  }

  sendRequest() {
      var phoneRegexp = /^(33|0)\d{9}$/;

      if (this.phoneNumber == '' || isNumeric(this.phoneNumber)) {
          if (phoneRegexp.test(this.phoneNumber)) {
              this.invalidPhoneNumber = false;
              this.view.dismiss();
              let loadingPopup = this.loadingCtrl.create({});
              if (this.appGloabs.isFromMerchant) {
                  this.merchantService.postDemandRequest(this.id, this.phoneNumber).then(data => {
                          loadingPopup.dismiss();
                          const myModal2 = this.modal.create('PopupPage', {"message": "<p>C'est parfait. <br> Votre demande d’accès a été envoyée à l’administrateur du commerce / partenaire. </p>"}, {cssClass: 'message-modal'});
                          myModal2.onDidDismiss(() => {
                          });
                          myModal2.present();
                          this.appGloabs.isFromMerchant = false;
                      },
                      err => {
                          this.appEvent.publish('http:errors', err);
                          loadingPopup.dismiss();
                          this.appGloabs.isFromMerchant = false;
                      });
              } else {
                  this.serviceAssociation.postDemandRequest(this.id, this.phoneNumber).then(data => {
                          loadingPopup.dismiss();
                          const myModal2 = this.modal.create('PopupPage', {"message": "<p>C'est parfait. <br> Votre demande d’accès a été envoyée à l’administrateur du Groupe / Association. </p>"}, {cssClass: 'message-modal'});
                          myModal2.onDidDismiss(() => {
                          });
                          myModal2.present();
                      },
                      err => {
                          this.appEvent.publish('http:errors', err);
                          loadingPopup.dismiss();
                      });
              }

          }
          else{
              this.invalidPhoneNumber = true;
          }
      }
      else {
        this.invalidPhoneNumber = true;
    }
  }

}
