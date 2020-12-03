import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {EditAssociationPage} from "../../pages/edit-association/edit-association";
import {EditMerchantPage} from "../../pages/edit-merchant/edit-merchant";
import {AdminListPage} from "../../pages/admin-list/admin-list";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {EditCommunityPage} from "../edit-community/edit-community";
/**
 * Generated class for the ParameterAssoMerchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-parameter-asso-merch',
    templateUrl: 'parameter-asso-merch.html',
})
export class ParameterAssoMerchPage {

    public account: any;
    public currentUser: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public serviceEvent: EventsrestProvider,
        public loader: LoadingController,
        public myAlert: AlertController,
        public appEvents: Events,
        public myModal: ModalController,
        public appGlobals: GlobalsProvider) {

        this.account = navParams.get('account');
        this.appGlobals.currentPageid = "mySpace";
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;

    }

    ionViewWillEnter() {
        this.appGlobals.currentPageid = "mySpace";
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;
        this.appEvents.publish('updateFooter');

    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
    }

    goBack() {
        this.navCtrl.pop();
    }

    information() {
        if (this.account.type == "association" ) {
            this.navCtrl.push(EditAssociationPage, {
                accountId: this.account.id,
                account : this.account
            });
        } else if(this.account.type == "community"){
            this.navCtrl.push(EditCommunityPage, {
                accountId: this.account.id,
                account : this.account
            });
        } else {
            this.navCtrl.push(EditMerchantPage, {
                accountId: this.account.id,
                account : this.account
            });
        }

    }

    adminList() {
        this.navCtrl.push(AdminListPage, {
            account: this.account
        });
    }
}
