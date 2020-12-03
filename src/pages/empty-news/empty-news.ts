import {Component} from "@angular/core";
import {
    AlertController,
    Events,
    ModalController,
    NavController,
    NavParams,
    Platform
} from "ionic-angular";
import "rxjs/add/operator/map";
import {GlobalsProvider} from "../../providers/globals/globals";

/**
 * Generated class for the EmptyNewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-empty-news',
    templateUrl: 'empty-news.html',
})
export class EmptyNewsPage {


    private registredUser = false;
    public currentUser: any;
    public hasApprovedCommunities = false;


    constructor(public event: Events,
                public platform: Platform,
                public navCtrl: NavController,
                private modal: ModalController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public appGlobals: GlobalsProvider) {
        this.registredUser = this.navParams.get("register");
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
        this.appGlobals.showSearchNews = false;
        this.appGlobals.currentPageTitle = "A la Une";
        this.appGlobals.currentPageLogo = "md-paper";
        this.appGlobals.currentPageid = "news";
        this.event.publish('showMenus');

    }

    ionViewWillLeave() {
        this.appGlobals.showSearchNews = false;
    }

    hideConfirmationMessage() {
        this.registredUser = false;
    }

    ionViewDidEnter() {
        this.appGlobals.currentPageid = "news";
        this.event.publish('updateFooter');
    }


    publish() {

        /*let adherentAssociations:any = this.appGlobals.adherentAssociations;
        let adherentMerchants:any = this.appGlobals.adherentMerchants;
        let adminAssociations:any = this.appGlobals.adminAssociations;
        let adminMerchants:any = this.appGlobals.adminMerchants;*/

        let adminAssociations = JSON.parse(localStorage.getItem("adminAssociations"));
        let adminMerchants = JSON.parse(localStorage.getItem("adminMerchants"));
        let adherentAssociations = JSON.parse(localStorage.getItem("adherentAssociations"));
        let adherentMerchants = JSON.parse(localStorage.getItem("adherentMerchants"));

        if (localStorage.getItem("hasApprovedCommunities") == 'true') {
            this.hasApprovedCommunities = true;
        } else {
            this.hasApprovedCommunities = false;
        }

        if (adherentAssociations.length != 0 || adherentMerchants.length != 0 || adminAssociations.length != 0 || adminMerchants.length != 0 || this.currentUser.role == 'community_su_admin' || this.hasApprovedCommunities) {
            const myModal2 = this.modal.create('ChoicePage', {}, {cssClass: 'style-modal choice-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();

        } else {
            const myModal2 = this.modal.create('PopupPage', {"message": "<p>Vous ne pouvez pas publier ! </p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();
        }

    }

}
