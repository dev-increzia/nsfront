import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {AssociationProvider} from "../../providers/association/association";
import {MerchantProvider} from "../../providers/merchant/merchant";
import {MySpacePage} from "../../pages/my-space/my-space";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the ChangeSuAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-change-su-admin',
    templateUrl: 'change-su-admin.html',
})
export class ChangeSuAdminPage {
    public account: any;
    public newSuAdmin: any;
    public submited = false;
    public type: any;
    public errors = [];
    public validateEmail: boolean = false;
    public eventParticipted = [];
    public currentUser: any;

    constructor(public navCtrl: NavController,
        public appGlobals: GlobalsProvider,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public associationProvider: AssociationProvider,
        public merchantProvider: MerchantProvider,
        public serviceEvent: EventsrestProvider,
        public event: Events,
        public navParams: NavParams) {
        this.account = this.navParams.get("account");
        this.type = this.navParams.get("type");
    }


    changeSuAdmin(formValidation) {
        this.submited = true;
        if (!formValidation) {
            let loadingPopup = this.loadingCtrl.create({});
            // Show the popup
            loadingPopup.present();
            if (this.type == "association") {
                this.associationProvider.putSuAdmin(this.account.id, this.newSuAdmin).then(data => {
                    loadingPopup.dismiss();
                    if (data.sucess) {
                        let errorAlert = this.alertCtrl.create({
                            title: "Succès",
                            subTitle: "Le super administrateur de " + this.account.name + " a été changer avec succès.",
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

                    } else {
                        this.errors = data.errors;
                    }
                },
                    err => {
                        loadingPopup.dismiss();
                        this.event.publish('http:errors', err);
                    });
            } else if (this.type == "merchant") {
                this.merchantProvider.putSuAdmin(this.account.id, this.newSuAdmin).then(data => {
                    loadingPopup.dismiss();

                    if (data.sucess) {
                        let errorAlert = this.alertCtrl.create({
                            title: "Succès",
                            subTitle: "Le super administrateur de " + this.account.name + " a été changer avec succès.",
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

                    } else {
                        this.errors = data.errors;
                    }
                },
                    err => {
                        loadingPopup.dismiss();
                        this.event.publish('http:errors', err);
                    });
            }
        }
    }
    goBack() {
        this.navCtrl.pop();
    }
    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;
        this.event.publish('updateFooter');


    }
    onBlurEmail() {
        this.validateEmail = true;
    }


}
