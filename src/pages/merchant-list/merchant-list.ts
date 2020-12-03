import {Component} from "@angular/core";
import {
    AlertController,
    Events,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    
} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {MerchantProvider} from "../../providers/merchant/merchant";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {ListGoodplanPage} from "../list-goodplan/list-goodplan";
/**
 * Generated class for the MerchantListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-merchant-list',
    templateUrl: 'merchant-list.html',
})
export class MerchantListPage {

    public merchants = [];
    private page: number = 1;
    public currentUser: any;
    public community : any;
    constructor(public event: Events,
        public modal: ModalController,
        public globals: GlobalsProvider,
        public serviceEvent: EventsrestProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public loader: LoadingController,
        public myAlert: AlertController,
        public appEvents: Events,
        public myModal: ModalController,
        public merchantService: MerchantProvider,
        private loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {

        this.globals.currentPageTitle = "Commerces";
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.community = JSON.parse(localStorage.getItem('currentCommunity'));
        this.merchantService.getAllMerchantsByCommunity(this.page,this.community.id).then(data => {
            for (let assoc of data) {
                this.merchants.push(assoc);
            }
            loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }

    doInfinite(infiniteScroll) {
        this.page += 1;
        this.merchantService.getAllMerchantsByCities(this.page).then(data => {
            for (let assoc of data) {
                this.merchants.push(assoc);
            }
            infiniteScroll.complete();
        },
            err => {
                infiniteScroll.complete();
            });
    }

    openMerchant(merchant) {
        this.navCtrl.push(ListGoodplanPage, {
            account: merchant
        });
    }

    capitalizeData(data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

    ionViewWillEnter() {
        this.globals.currentPageTitle = "Acteurs locaux";
        this.globals.showHeader = false;
        this.event.publish('updateFooter');

    }

    goBack() {
        this.navCtrl.pop();
    }


}
