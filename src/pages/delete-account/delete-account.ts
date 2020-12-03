import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {MerchantProvider} from "../../providers/merchant/merchant";
import {AssociationProvider} from "../../providers/association/association";
import {MySpacePage} from "../../pages/my-space/my-space";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the DeleteAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-delete-account',
    templateUrl: 'delete-account.html',
})
export class DeleteAccountPage {
    private submited = false;
    private reason: string;
    private account: any;
    private type: any;
    public currentUser: any;
    constructor(public navCtrl: NavController,
        public appGlobals: GlobalsProvider,
        public serviceEvent: EventsrestProvider,
        public loadingCtrl: LoadingController,
        public merchantProvider: MerchantProvider,
        public associationProvider: AssociationProvider,
        public alertCtrl: AlertController,
        public event: Events,
        public navParams: NavParams) {
        this.account = this.navParams.get('account');
        this.type = this.navParams.get('type');
    }

    goBack() {
        this.navCtrl.pop();
    }
    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;

    }

    deleteAccount(errorValidation) {
        this.submited = true;
        if (errorValidation) {
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            if (this.type == 'merchant') {
                this.merchantProvider.deleteMerchant(this.account.id, this.reason).then(data => {
                    loadingPopup.dismiss();
                    if (data.succes) {
                        for (let key in this.appGlobals.adminMerchants) {
                            let value = this.appGlobals.adminMerchants[key];
                            if (value.id == this.account.id) {
                                delete this.appGlobals.adminMerchants[key];
                            }
                        }
                        let errorAlert = this.alertCtrl.create({
                            title: "Succès",
                            subTitle: "Compte commerçant est supprimer avec succès.",
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: () => {
                                        this.navCtrl.push(MySpacePage);
                                    }
                                }
                            ]
                        });
                        errorAlert.present();
                    }
                },
                    err => {
                        loadingPopup.dismiss();
                        this.event.publish('http:errors', err);
                    });
            } else if (this.type == 'association') {
                this.associationProvider.deleteAssociation(this.account.id, this.reason).then(data => {
                        for (let key in this.appGlobals.adminAssociations) {
                            let value = this.appGlobals.adminAssociations[key];
                            if (value.id == this.account.id) {
                                delete this.appGlobals.adminAssociations[key];
                            }
                        }
                    loadingPopup.dismiss();
                    if (data.succes) {
                        let errorAlert = this.alertCtrl.create({
                            title: "Succès",
                            subTitle: "Compte association est supprimer avec succès.",
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: () => {
                                        this.navCtrl.push(MySpacePage);
                                    }
                                }
                            ]
                        });
                        errorAlert.present();
                    }
                },
                    err => {
                        loadingPopup.dismiss();
                        this.event.publish('http:errors', err);
                    });
            }
        }
    }



}
