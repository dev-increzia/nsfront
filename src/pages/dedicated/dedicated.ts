import {Component} from "@angular/core";
import {
    ActionSheetController,
    AlertController,
    Events,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    Platform,
    ToastController
} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {CommunityProvider} from "../../providers/community/community";
import {MapPage} from "../map/map";
import {NumberCategoryPage} from "../number-category/number-category";
import {CanteenMenuPage} from "../canteen-menu/canteen-menu";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {ReprotProblemPage} from "../reprot-problem/reprot-problem";


@Component({
    selector: 'page-dedicated',
    templateUrl: 'dedicated.html',
})
export class DedicatedPage {
    private id: any;
    private name: any;
    private img_url: any;
    private page: number = 0;
    private description: String;
    private headings={};

    private infos: any;


    constructor(
                public event: Events,
                public navCtrl: NavController,
                public navParams: NavParams,
                public appEvents: Events,
                public loader: LoadingController,
                public myAlert: AlertController,
                public myModal: ModalController,
                public platform: Platform,
                public loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                public toastCtrl: ToastController,
                public service: CommunityProvider,
                public actionSheetCtrl: ActionSheetController,
                public appGlobals: GlobalsProvider,
                private inAppBrowser: InAppBrowser) {
        this.id = this.navParams.get('id');
        this.name = this.navParams.get('name');
        this.img_url = this.navParams.get('img_url');
        this.description="";
        this.appEvents.publish('closeFilters');
        this.infos={blason:"",title:"",description:""};
        localStorage.setItem("currentCommunity", JSON.stringify({id : this.id, name : this.name, img_url : this.img_url}));
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.getHeadings(loadingPopup);

    }

    ionViewWillEnter() {
        this.appGlobals.showFooter = true;
        this.appGlobals.showHeader = false;
        this.appGlobals.currentPageTitle = this.name;
        this.appGlobals.currentPageLogo = null;
        this.event.publish('updateFooter');
        this.appGlobals.onNegativeTopSearch = true;
        this.page = 0;
    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
        this.appGlobals.onNegativeTopSearch = false;

    }

    ionViewDidLoad() {
    }

    getHeadings(loadingPopup)
    {
        this.getDedicatedPageInfos();
        this.loadHeadings(loadingPopup);


    }
    getDedicatedPageInfos() {
        this.service.getInfoCommunity(this.id).then(data => {
                this.infos = data ;
            },
            err => {
                this.event.publish('http:errors', err);
            });
    }

    loadHeadings(loadingPopup) {
        this.service.getHeadingCommunity(this.id).then(data => {
                this.headings = data;
                loadingPopup.dismiss();
            },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }


    openMapHeading(id) {
        this.navCtrl.push(MapPage, {
            data: id
        });
    }

    openArticleHeading(id) {
        this.navCtrl.push(CanteenMenuPage, {
            data: id,
            allowComment:this.infos.comment_allowed
        });
    }

    openPhoneBookHeading(id,name) {
        this.navCtrl.push(NumberCategoryPage, {
            data: id,
            name: name
        });
    }

    openReportHeading(id) {
        this.navCtrl.push(ReprotProblemPage, {
            data: id
        });
    }

    openUsefullLinkHeading(url) {
        this.platform.ready().then(() => {
            this.inAppBrowser.create(url);
        });
    }


    goBack() {
        this.navCtrl.pop();
    }

}
