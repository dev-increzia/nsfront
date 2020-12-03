import {Component} from "@angular/core";
import {
    AlertController,
    Events,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    Platform
} from "ionic-angular";
import {UserProvider} from "../../providers/user/user";
import {GlobalsProvider} from "../../providers/globals/globals";
import {CityProjectsPage} from "../../pages/city-projects/city-projects";
import {MapPage} from "../map/map";
import {NumberCategoryPage} from "../number-category/number-category";
import {DedicatedPage} from "../dedicated/dedicated";
import {EmergencyPhonesPage} from "../emergency-phones/emergency-phones";
import {ReprotProblemPage} from "../reprot-problem/reprot-problem";
import {ProposePage} from "../propose/propose";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {CanteenMenuPage} from "../canteen-menu/canteen-menu";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the MyTownHallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-my-town-hall',
    templateUrl: 'my-town-hall.html',
})
export class MyTownHallPage {

    public number: any;
    public currentUser: any;
    public communities = [];

    constructor(public event: Events,
        public platform: Platform,
        public userService: UserProvider,
        public navCtrl: NavController,
        public serviceEvent: EventsrestProvider,
        public navParams: NavParams,
        private loadingCtrl: LoadingController,
        public loader: LoadingController,
        public myAlert: AlertController,
        public appEvents: Events,
        public myModal: ModalController,
        public appGlobals: GlobalsProvider,
        public appEvent: Events,
        private inAppBrowser: InAppBrowser) {

        this.appEvent.publish('closeFilters');
        this.userService.findCurrentUser().then(user => {
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUser = user;
        });
        this.appEvent.subscribe('refreshApprovedCommunities', () => {
            this.communities = JSON.parse(localStorage.getItem("allCommunities"));
        });

        this.communities = JSON.parse(localStorage.getItem("allCommunities"));
    }

    ionViewWillEnter() {
        this.appGlobals.currentPageid = "MyTownHall";
        this.appEvents.publish('updateFooter');
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
        this.appGlobals.onNegativeTopSearch = true;
    }
    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
        this.appGlobals.onNegativeTopSearch = false;
    }

    openDedicatedPage(id, name, img_url) {
        this.navCtrl.push(DedicatedPage, {
            id: id,
            name: name,
            img_url: img_url
        });
    }

    goBack() {
        this.navCtrl.pop();
    }

    aLinkTo() {
        this.navCtrl.push(CityProjectsPage);
    }

    mapAction() {
        this.navCtrl.push(MapPage);
    }

    numbers() {
        this.navCtrl.push(NumberCategoryPage);
    }

    report() {
        this.navCtrl.push(ReprotProblemPage);
    }
    canteen() {
        this.navCtrl.push(CanteenMenuPage);
    }
    propose() {
        this.navCtrl.push(ProposePage);
    }
    emergency() {
        let loadingPopup = this.loadingCtrl.create({});
        // Show the popup
        loadingPopup.present();
        this.userService.getNumbers(10).then(data => {
            this.number = data;
            loadingPopup.dismiss();
            this.navCtrl.push(EmergencyPhonesPage, {
                numbers: this.number
            });
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });

    }
    openUrl() {
        this.platform.ready().then(() => {
           this.inAppBrowser.create('https://www.service-public.fr/');
        });
    }
    globalSearch() {
        this.appGlobals.searchCriteria = {
            key: null,
            theme: null,
            event: true,
            goodplans: true,
            article: true,
            account: true,
            cities: "all"
        }
        this.appGlobals.appSearch = true;
    }

}
