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
import "rxjs/add/operator/map";
import {UserProvider} from "../../providers/user/user";
import {GlobalsProvider} from "../../providers/globals/globals";
import {NewsPage} from "../../pages/news/news";
import {CreateMerchantPage} from "../../pages/create-merchant/create-merchant";
import {AgendaPage} from "../../pages/agenda/agenda";
import {SpaceAssoMerchPage} from "../../pages/space-asso-merch/space-asso-merch";
import {CreateAssociationPage} from "../../pages/create-association/create-association";
import {NotificationPage} from "../../pages/notification/notification";
import {OrderBy} from "../../pipes/orderby/orderby";
import {ParameterPage} from "../../pages/parameter/parameter";
import {PracticalInformationPage} from "../practical-information/practical-information";
import {MyTownHallPage} from "../../pages/my-town-hall/my-town-hall";
import {HelpPage} from "../../pages/help/help";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the MySpacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-my-space',
    templateUrl: 'my-space.html',
})
export class MySpacePage {

    public associations: any;
    public merchants: any;
    public memberAssociations: any;
    public memberMerchants: any;
    public currentUser: any;
    private choiceAccount = false;
    private createAccount = false;
    public accountType: any;
    public list = [];
    private listAccount = [];
    private items = [];
    public nbreNotifications = 0;
    public linkedCommunities:any;

    constructor(public navCtrl: NavController,
                public platform: Platform,
                public navParams: NavParams,
                public userService: UserProvider,
                public appEvent: Events,
                public serviceEvent: EventsrestProvider,
                public appGlobals: GlobalsProvider,
                public loader: LoadingController,
                public myAlert: AlertController,
                public appEvents: Events,
                public myModal: ModalController,
                public alertCtrl: AlertController) {


        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.appGlobals.currentPageid = "mySpace";
        this.appGlobals.showHeader = false;
        this.appEvents.publish('refreshNotifications');
        this.appEvents.publish('admin:associations');
        this.appEvents.publish('admin:merchants');
        this.appEvents.publish('member:associations');
        this.appEvents.publish('member:merchants');
        this.appEvents.publish('communities:all');
        this.appEvents.publish('closeFilters');
        this.getAccount();
        this.appEvent.subscribe('refresh:groups', () => {
            this.list=[];
            this.getAccount();
        });
        this.appEvent.subscribe('count_notifications', () => {

            this.nbreNotifications = parseInt(localStorage.getItem("count_notifications"));
        });
    }

    ionViewWillEnter() {
        this.appGlobals.currentPageid = "mySpace";
        this.appGlobals.showHeader = false;
        this.appEvent.publish('myspace:refresh');
        this.appEvents.publish('updateFooter');
        if (localStorage.getItem("count_notifications")) {
            this.nbreNotifications = parseInt(localStorage.getItem("count_notifications"));
        }
        this.appGlobals.onNegativeTopSearch = true;
    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
        this.appGlobals.onNegativeTopSearch = false;
    }

    createMerchant() {
        this.createAccount = false;
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

    MyTownHall() {
        this.navCtrl.setRoot(MyTownHallPage);
    }

    notification() {
        this.navCtrl.push(NotificationPage);
    }


    getAccount() {
        this.associations = JSON.parse(localStorage.getItem("adminAssociations"));
        this.merchants = JSON.parse(localStorage.getItem("adminMerchants"));
        this.memberAssociations = JSON.parse(localStorage.getItem("adherentAssociations"));
        this.memberMerchants = JSON.parse(localStorage.getItem("adherentMerchants"));
        this.linkedCommunities = JSON.parse(localStorage.getItem("allCommunities"));

        for (let association of this.associations) {
            this.list.push(association);
        }
        for (let merchant of this.merchants) {
            this.list.push(merchant);
        }
        for (let association of this.memberAssociations) {
            this.list.push(association);
        }
        let o = new OrderBy();
        this.listAccount = [];
        this.items = o.transform(this.list, ['name']);
        for (let it of this.items) {
            this.listAccount.push(it);
        }
    }

    hideChoiceAccount() {
        this.choiceAccount = false;
        this.createAccount = true;
    }

    showMessage() {
        this.createAccount = true;
    }

    showCreate(type) {
        this.accountType = type;
        this.createAccount = false;
        this.choiceAccount = true;
    }

    hideCreateAccount() {
        this.createAccount = false;
    }

    logOut() {
        this.appEvent.publish('user:logout');

    }

    calender() {
        let errorAlert = this.alertCtrl.create({
            title: "Bientôt!",
            subTitle: "Cette fonctionnalité est en cours de développement.",
            buttons: [
                {
                    text: 'Fermer',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        errorAlert.present();
    }

    espaceAssoMerch(account) {
        if (account.moderate == 'accepted') {
            localStorage.setItem('account_role', account.role);
            this.navCtrl.push(SpaceAssoMerchPage, {
                account: account
            });
        } else {
            let errorAlert = this.alertCtrl.create({
                subTitle: 'Votre compte est en attente de validation',
                buttons: [
                    {
                        text: 'Fermer',
                        role: 'cancel',
                        handler: () => {
                        }
                    }
                ]
            });
            errorAlert.present();
        }
    }

    pageCreate() {

        if(!this.linkedCommunities || this.linkedCommunities.length == 0){
            const myModal2 = this.myModal.create('PopupPage', {"message": "<p>Vous devez être lié à une communauté pour créer un groupe / association ou un commerce / partenaire</p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();
        }
        else {
            this.createAccount = false;
            this.choiceAccount = true;
        }
    }

    goToPageFromChoice(accountType){
        if (accountType == 'association') {
            this.navCtrl.push(CreateAssociationPage);
        } else {
            this.navCtrl.push(CreateMerchantPage);
        }
    }

    searchAccounts() {
        this.appGlobals.searchCriteria = {
            key: null,
            theme: null,
            event: false,
            article: false,
            goodplans: false,
            account: true,
            cities: "all"
        };
        this.appGlobals.appSearch = true;
    }

    globalSearch() {
        this.appGlobals.searchCriteria = {
            key: null,
            theme: null,
            event: true,
            article: true,
            goodplans: true,
            account: true,
            cities: "all"
        };
        this.appGlobals.appSearch = true;
    }

    parameter() {
        this.navCtrl.push(ParameterPage);
    }

    goto() {
        this.navCtrl.push(PracticalInformationPage);
    }

    help() {
        this.navCtrl.push(HelpPage);
    }

}
