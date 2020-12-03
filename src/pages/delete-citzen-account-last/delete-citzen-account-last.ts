import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {UserProvider} from "../../providers/user/user";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the DeleteCitzenAccountLastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-delete-citzen-account-last',
    templateUrl: 'delete-citzen-account-last.html',
})
export class DeleteCitzenAccountLastPage {
    private submited = false;
    private reason: string;
    public currentUser: any;

    constructor(public navCtrl: NavController,
        public appGlobals: GlobalsProvider,
        public myUser: UserProvider,
        public appEvents: Events,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        public serviceEvent: EventsrestProvider,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public event: Events,
        public navParams: NavParams) {
    }

    goBack() {
        this.navCtrl.pop();
    }
    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;

    }
    deleteAccountConfirmation(errorValidation) {
        this.submited = true;
        this.submited = true;
        if (errorValidation) {
            let confirmationAlert = this.alertCtrl.create({
                title: "Confirmation",
                subTitle: "Êtes-vous sûr de vouloir supprimer votre compte.",
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            this.deleteAccount();
                        }
                    }

                ]
            });
            confirmationAlert.present();
        }
    }

    deleteAccount() {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.myUser.deleteAccount(this.reason).then(data => {
            loadingPopup.dismiss();
            if (data.succes) {
                let errorAlert = this.alertCtrl.create({
                    title: "Succès",
                    subTitle: "Votre compte est supprimé avec succès.",
                    buttons: [
                        {
                            text: 'OK',
                            handler: () => {
                                this.appEvents.publish('user:logout');
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
