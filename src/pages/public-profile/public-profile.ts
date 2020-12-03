import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {NewsPage} from "../../pages/news/news";
import {CreateMerchantPage} from "../../pages/create-merchant/create-merchant";
import {AgendaPage} from "../../pages/agenda/agenda";
import {MySpacePage} from "../../pages/my-space/my-space";
import {ListArticlePage} from "../../pages/list-article/list-article";
import {ListEventPage} from "../../pages/list-event/list-event";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {ListGoodplanPage} from "../list-goodplan/list-goodplan";

/**
 * Generated class for the PublicProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-public-profile',
    templateUrl: 'public-profile.html',
})
export class PublicProfilePage {

    public account: any;
    public currentUser: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loader: LoadingController,
        public myAlert: AlertController,
        public appEvents: Events,
        public myModal: ModalController,
        public serviceEvent: EventsrestProvider,
        public appGlobals: GlobalsProvider,
        private modal: ModalController) {

        this.account = navParams.get('account');
        this.appGlobals.currentPageid = "mySpace";
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;

    }

    ionViewWillEnter() {
        this.appGlobals.currentPageid = "mySpace";
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;
        this.appGlobals.onNegativeTopSearch = true;
    }

    ionViewDidEnter() {
        this.appEvents.publish('updateFooter');
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

    listArticles() {
        this.navCtrl.push(ListArticlePage, {
            account: this.account,
            survey: false
        });
    }
    listSurvey() {
        this.navCtrl.push(ListArticlePage, {
            account: this.account,
            survey: true
        });
    }
    listGoodPlan() {
        this.navCtrl.push(ListGoodplanPage, {
            account: this.account
        });
    }

    listEvent() {
        this.navCtrl.push(ListEventPage, {
            account: this.account
        });
    }

    popPublish() {
        const myModal2 = this.modal.create('PublishPage', { "account": this.account, "accountType": this.account.type }, { cssClass: 'style-modal  publish-modal' });
        myModal2.onDidDismiss(data => {
            this.appGlobals.showHeader = false;
            this.appGlobals.showFooter = true;

        });
        myModal2.present();
    }

}
