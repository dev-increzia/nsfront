import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {UserProvider} from "../../providers/user/user";
import {DeleteCitzenAccountLastPage} from "../../pages/delete-citzen-account-last/delete-citzen-account-last";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the DeleteCitzenAccountFirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-delete-citzen-account-first',
    templateUrl: 'delete-citzen-account-first.html',
})
export class DeleteCitzenAccountFirstPage {
    private items = [];
    private errors = [];
    private submited = false;
    public currentUser: any;

    constructor(public navCtrl: NavController,
        public appGlobals: GlobalsProvider,
        public serviceEvent: EventsrestProvider,
        public myUser: UserProvider,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public event: Events,
        public navParams: NavParams) {
        this.items = this.navParams.get("items");
    }

    goBack() {
        this.navCtrl.pop();
    }
    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;

    }
    performFirstStepRemove(errorValidation) {
        this.submited = true;
        if (!errorValidation) {
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            this.myUser.postSuperAdminAssociationsMerchants(this.items).then(data => {
                loadingPopup.dismiss();
                if (data.sucess) {
                    this.navCtrl.push(DeleteCitzenAccountLastPage);
                } else {
                    this.errors = data.errors;
                    for (let savedId of data.saved) {
                        let index = this.items.findIndex(item => item.id === savedId);
                        if (index !== -1) {
                            this.items.splice(index, 1);
                        }
                    }

                }
            },
                err => {
                    loadingPopup.dismiss();
                    this.event.publish('http:errors', err);
                });
        }
    }

}
