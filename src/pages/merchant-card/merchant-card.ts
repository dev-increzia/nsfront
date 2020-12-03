import { Component } from '@angular/core';
import {
    AlertController,
    Events,
    LoadingController,
    ModalController,
    NavController,
    NavParams
} from 'ionic-angular';
import {AssociationProvider} from "../../providers/association/association";
import {GlobalsProvider} from "../../providers/globals/globals";
import * as moment from "moment";
import {CommentProvider} from "../../providers/comment/comment";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {Calendar} from "@ionic-native/calendar";
import {DetailArticlePage} from "../detail-article/detail-article";
import {MerchantProvider} from "../../providers/merchant/merchant";
import {GoodplanrestProvider} from "../../providers/goodplanrest/goodplanrest";
import {GoodPlanDetailsPage} from "../good-plan-details/good-plan-details";

/**
 * Generated class for the MerchantCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-merchant-card',
  templateUrl: 'merchant-card.html',
})
export class MerchantCardPage {

    private id: any;
    private association: any;
    private page: number = 0;
    private articles: any;
    private items = [];
    public comment: any;
    public numberComments = 0;
    public showPush: any;
    public eventParticipted = [];
    public currentUser: any;
    public cacheLifeTime = 3600;
    private allowInfiniteScroll = true;
    public associationId: any;
    public account: any;
    public currentMerchant: any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public associationService: AssociationProvider,
                public loader: LoadingController,
                public appEvents: Events,
                public calendarPlugin: Calendar,
                public appGlobals: GlobalsProvider,
                public merchantService: MerchantProvider,
                public commentService: CommentProvider,
                private modal: ModalController,
                public serviceEvent: EventsrestProvider,
                public event: Events,
                public goodPlanService: GoodplanrestProvider) {

        this.currentMerchant = this.navParams.get('currentMerchant');
    }

    ionViewDidLoad() {
    }

    ionViewWillEnter() {
        this.appGlobals.showFooter = true;
        this.appGlobals.showHeader = false;
        this.appGlobals.currentPageLogo = null;
        this.appEvents.publish('updateFooter');

        this.items = [];
        this.page = 1;
        this.getCurrentAssociationDetails();
    }

    ionViewDidEnter() {
        if(this.appGlobals.currentPageid == "goodplans"){
            this.appGlobals.currentPageid = "goodplans";
        }else{
            this.appGlobals.currentPageid = "mySpace";
        }
        this.appEvents.publish('updateFooter');
    }

    ionViewWillLeave() {
        this.page = 1;
        this.appGlobals.showFooter = true;
        this.appGlobals.showHeader = true;
    }

    getCurrentAssociationDetails() {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.getAssociationArticle(loadingPopup);
         this.merchantService.getDetails(this.currentMerchant.creatorId).then(data => {
             this.association = data;
             this.appGlobals.currentPageTitle = this.association.name;
         },
             err => {
                 loadingPopup.dismiss();
                 this.appEvents.publish('http:errors', err);
             });
    }

    getAssociationArticle(loadingPopup) {
        let page = 0;
        this.merchantService.getMerchantCard(this.currentMerchant.creatorId, page,4).then(data => {
                this.articles = data;

                for (let article of this.articles) {
                    this.items.push(article);
                }
                this.articles = [];
                loadingPopup.dismiss();
            },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }

    detailsArticle(article) {
        this.navCtrl.push(DetailArticlePage, {
            article: article
        });
    }

    goBack() {
        this.navCtrl.pop();
    }

    detailsEvent(event, withComments) {
        this.appGlobals.currentEvent = event;
        this.navCtrl.push(GoodPlanDetailsPage, {
            id: event.id,
            title: event.title,
            withComments: withComments
        });
    }

    doInfinite(infiniteScroll) {
        if(this.allowInfiniteScroll == false) {
            infiniteScroll.complete();

        }else {
            this.page += 1;
            this.merchantService.getMerchantCard(this.id, this.page, 4).then(data => {
                if(data.length == 0){
                    this.allowInfiniteScroll = false;
                    infiniteScroll.complete();
                }else {
                    this.articles = data;
                    for (let article of this.articles) {
                        this.items.push(article);
                    }
                    this.articles = [];
                    infiniteScroll.complete();
                }
                },
                err => {
                    infiniteScroll.complete();
                });
        }
    }

    showMembershipPopUp(id)
    {
        const myModal2 = this.modal.create('PopinMembershipAssociationPage', {id:id}, {cssClass: 'style-modal choice-modal'});
        myModal2.onDidDismiss(() => {

        });
        this.appGlobals.isFromMerchant = true;
        myModal2.present();
    }

    showHideContactBar(id) {
        this.appGlobals.goodPlanCreatorId = id;
        if (!this.appGlobals.showcontactBar) {
            this.appGlobals.showcontactBar = true;
        } else {
            this.appGlobals.showcontactBar = false;
        }
    }

    showHidePutAgenda(event) {
        if (!this.appGlobals.showPutAgenda) {
            this.appGlobals.showPutAgenda = true;
        } else {
            this.appGlobals.showPutAgenda = false;
        }
        this.goodPlanService.takePart(event.id).then(data => {
                this.appGlobals.currentEvent = event;
                event.isParticipated = true;
                event.nbParticipants++;
                event = data.event;
            },
            err => {
                this.appEvents.publish('http:errors', err);
            })

    }

    cancelParticipation(event) {
        let result: any;
        this.goodPlanService.cancelTakePart(event.id).then(data => {
                result = data;
                var start = moment(event.startAt).toDate();
                var end = moment(event.endAt).toDate();

                this.calendarPlugin.deleteEvent(event.title, event.place, '', start, end).then(
                    (msg) => {
                    },
                    (err) => {
                    }
                );

                if (result.success) {
                    event.isParticipated = false;
                    event.nbParticipants--;
                    event = data.event;
                    const myModal2 = this.modal.create('PopupPage', {"message": "<p>Votre annulation a été bien enregistrée ! </p>"}, {cssClass: 'message-modal'});
                    myModal2.onDidDismiss(() => {
                    });
                    myModal2.present();
                }

            },
            err => {
                this.appEvents.publish('http:errors', err);
            });
    }


}
