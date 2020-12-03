import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {NewsPage} from "../../pages/news/news";
import {CreateMerchantPage} from "../../pages/create-merchant/create-merchant";
import {AgendaPage} from "../../pages/agenda/agenda";
import {MySpacePage} from "../../pages/my-space/my-space";
import {PublicProfilePage} from "../../pages/public-profile/public-profile";
import {ParameterAssoMerchPage} from "../../pages/parameter-asso-merch/parameter-asso-merch";
import {VolunteersPage} from "../volunteers/volunteers";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {AdherentPage} from "../adherent/adherent";

/**
 * Generated class for the SpaceAssoMerchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-space-asso-merch',
    templateUrl: 'space-asso-merch.html',
})
export class SpaceAssoMerchPage {

    public account: any;
    public currentUser: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public serviceEvent: EventsrestProvider,
        public appGlobals: GlobalsProvider,
        public loader: LoadingController,
        public myAlert: AlertController,
        public appEvents: Events,
        public myModal: ModalController,
        public alertCtrl: AlertController) {
        this.appGlobals.currentPageid = "mySpace";
        this.account = navParams.get('account');
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;

    }

    ionViewWillEnter() {
        this.appGlobals.currentPageid = "mySpace";
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;
        this.appGlobals.onNegativeTopSearch = true;

    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
        this.appGlobals.onNegativeTopSearch = false;
    }

    goBack() {
        this.navCtrl.pop();
    }

    createMerchant() {
        this.navCtrl.push(CreateMerchantPage);
    }

    news() {
        this.navCtrl.setRoot(NewsPage);
    }

    mySpace() {
        this.navCtrl.setRoot(MySpacePage);
    }

    agenda() {
        this.navCtrl.setRoot(AgendaPage);
    }

    club() {
        this.navCtrl.push(AdherentPage, {
            account: this.account
        });
    }

    publicProfile() {
        this.navCtrl.push(PublicProfilePage, {
            account: this.account
        });
    }

    parameter() {
        this.navCtrl.push(ParameterAssoMerchPage, {
            account: this.account
        });
    }

    volunteers() {
        this.navCtrl.push(VolunteersPage, {
            account: this.account
        });
    }

}
