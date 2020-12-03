import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {UserProvider} from "../../providers/user/user";
import {DetailArticlePage} from "../detail-article/detail-article";
import {EventDetailsPage} from "../event-details/event-details";
import {AssociationSheetPage} from "../association-sheet/association-sheet";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {ArticleProvider} from "../../providers/article/article";
import {MerchantCardPage} from "../merchant-card/merchant-card";

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-notification',
    templateUrl: 'notification.html',
})
export class NotificationPage {
    public userEvents = [];
    public items = [];
    public importants = [];
    public notifications: any;
    public participationNotifs: any;
    private page: number = 1;
    public currentUser: any;

    constructor(public navCtrl: NavController,
                public articleService: ArticleProvider,
        public navParams: NavParams,
        public appGlobals: GlobalsProvider,
        public service: UserProvider,
        public serviceEvent: EventsrestProvider,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        private loadingCtrl: LoadingController,
        public event: Events) {
        localStorage.setItem("count_notifications", '0');
    }

    ionViewWillEnter() {
        this.items = [];
        this.importants = [];
        this.appGlobals.currentPageid = "mySpace";
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;
        this.event.publish('updateFooter');

        this.getNotifications();
        this.getParticipationNotif();
    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
    }

    ionViewDidEnter() {

        this.event.publish('updateFooter');
    }

    goBack() {
        this.navCtrl.pop();
    }

    getNotifications() {
        this.loadNotifications();
    }
    getParticipationNotif() {
        return new Promise(() => {
            this.service.getParticipationNotif().then(data => {
                this.participationNotifs = data;
                let i = 1;
                for (let notification of this.participationNotifs) {
                    this.importants.push(notification);
                    if (this.participationNotifs.length == i) {
                        this.event.publish('clean_notifications', this.importants.length);
                    }
                    i++;
                }

            },
                err => {
                    this.event.publish('http:errors', err);
                });
        });
    }

    loadNotifications() {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();

        return new Promise(() => {
            this.page = 1;
            this.service.getNotifications(this.page).then(data => {
                this.notifications = data;
                for (let notification of this.notifications) {
                    this.items.push(notification);
                }
                loadingPopup.dismiss();

            },
                err => {
                    loadingPopup.dismiss();
                    this.event.publish('http:errors', err);
                });
        });
    }

    doInfinite(infiniteScroll) {

        this.page += 1;


        this.service.getNotifications(this.page).then(data => {
            this.notifications = data;
            for (let notification of this.notifications) {
                this.items.push(notification);
                infiniteScroll.complete();
            }
        });
    }
    openArticleCommentPage(article) {
        
       // this.openArticleDetails(article);
        this.navCtrl.push(DetailArticlePage, {
            articleId: article
        });
    }

    openEventDetails(event) {
        this.navCtrl.push(EventDetailsPage, {
            id: event
        });
    }

    openArticleDetails(item) {
        this.navCtrl.push(DetailArticlePage, {
            articleId: item.article
        });

    }

    openAssociation(association) {
        this.navCtrl.push(AssociationSheetPage, {
            id: association

        })
    }

    openMerchant(merchant) {
        this.navCtrl.push(MerchantCardPage, {
            currentMerchant: {creatorId: merchant}
        })
    }

    openParticipation(event) {
        this.userEvents = [];
        let loadingPopup = this.loader.create({});
        // Show the popup
        loadingPopup.present();
        this.serviceEvent.getDetailsEvent(event).then(data => {
            this.userEvents.push(data);
            const myModal = this.myModal.create('AddParticipantsNbrePage', { 'events': JSON.stringify(this.userEvents) }, { cssClass: 'style-modal' });
            loadingPopup.dismiss();
            myModal.onDidDismiss((data) => {
                this.importants = [];
                this.getParticipationNotif();
            });
            myModal.present();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });

    }
}
