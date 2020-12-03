import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, Platform} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {UserProvider} from "../../providers/user/user";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import * as moment from "moment";
import {Calendar} from "@ionic-native/calendar";
import {ButAlsoPage} from "../butalso/butalso";
import {CommentProvider} from "../../providers/comment/comment";
import {Camera} from "@ionic-native/camera";
import {SocialSharing} from "@ionic-native/social-sharing";
import {GoodplanrestProvider} from "../../providers/goodplanrest/goodplanrest";
import {GoodPlanDetailsPage} from "../good-plan-details/good-plan-details";
import {CacheProvider} from "../../providers/cache/cache";
import {MerchantCardPage} from "../merchant-card/merchant-card";
import {File} from "@ionic-native/file";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {CommunityProvider} from "../../providers/community/community";
import { Downloader } from '@ionic-native/downloader';
import {DownloadRequest, NotificationVisibility} from "@ionic-native/downloader";

/**
 * Generated class for the AgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-good-plan',
    templateUrl: 'goodplan.html',
})
export class GoodPlanPage {

    public events: any;
    public categories: any;
    public cities = [];
    public currentUser: any;
    public selectedCities = [];
    public selectedCategories = [];
    private page: number = 1;
    private items = [];
    private itemsDates = [];
    private loaderShow: boolean = true;
    private init = false;
    public eventParticipted = [];
    public hasApprovedCommunities = false;
    public cacheLifeTime = 3600;
    private allowInfiniteScroll = true;

    private commentEvent = {
        content: '',
        photo: null
    };

    constructor(public event: Events,
                public navCtrl: NavController,
                public appGlobals: GlobalsProvider,
                public userService: UserProvider,
                public goodPlanService: GoodplanrestProvider,
                public eventService: EventsrestProvider,
                public platform: Platform,
                private camera: Camera,
                public commentService: CommentProvider,
                public myAlert: AlertController,
                public loader: LoadingController,
                public appEvents: Events,
                public ga: GoogleAnalytics,
                public calendarPlugin: Calendar,
                public myModal: ModalController,
                public socialsharing: SocialSharing,
                public cacheService: CacheProvider,
                public file: File,
                private inAppBrowser: InAppBrowser,
                public serviceCommunity: CommunityProvider,private downloader: Downloader) {

        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (this.currentUser.primary_city) {
            this.selectedCities.push(this.currentUser.primary_city.id);
        }

        this.event.publish('closeFilters');
        this.event.publish('resetFilters');
        this.eventProgress();
        this.refreshCommunities();
        // get event mais aussi

        this.event.unsubscribe('goodplan:cache');
        this.event.subscribe('goodplan:cache', data => {
            this.page = data[0];
            this.items = data[1];
            this.event = data[2];
            this.itemsDates = data[3];
            this.allowInfiniteScroll = !data[2] || data[2] && data[2].length;
        });

        this.appEvents.unsubscribe('goodplan:refresh');
        this.appEvents.subscribe('goodplan:refresh', () => {
            this.page = 1;
            this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'goodplan', null,true);
        });



        let communities : any;
        platform.ready().then(() => {
            communities = JSON.parse(localStorage.getItem("followedCommunities"));
            if (communities.length > 0) {
                for (let value of communities){
                    let label = 'agenda__' + value.id;
                    this.appEvents.publish("googleAnalytics", label);
                }

            }
        });

    }

    showComment(event){
        this.commentService.getCommentsGoodPlan(event.id,0).then(data =>{
            this.navCtrl.push(GoodPlanDetailsPage,
                {
                    id: event.id,
                    commentList: data,
                    showComment: true,
                    title: event.title
                })
        }).catch( error =>{
            console.log("Error from showing comment: ", error);
        });
    }

    ShareArticle(item: any){
        let options = {
            message: item.title+" : "+item.description,
            subject: "NOUS Ensemble",
            image: item.imageURL,
            url: item.imageURL
        };
        if (this.platform.is('cordova') || this.platform.is('core')){
            this.socialsharing.shareWithOptions(options).then(data =>{
            }).catch( error =>{
                console.log("Error from sharing"+ error)
            });
        }

    }

    ionViewWillEnter() {
        this.appGlobals.showFooter = true;
        this.appGlobals.currentPageid = "goodplans";
        this.appGlobals.showSearchAgenda = true;
        this.appEvents.publish('updateFooter');
        this.items = [];
        this.page = 1;
        this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime, 'goodplan');
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
        this.loaderShow = true;
        this.appGlobals.showSearchAgenda = false;
    }

    public refreshCommunities() {
        Promise.all([this.serviceCommunity.findCurrentUserFollowedCommunities()]).then(user => {
                localStorage.setItem("followedCommunities", JSON.stringify(user[0]));
                this.appEvents.publish('refreshCommunities');
                this.appEvents.publish('refreshApprovedCommunities');

            },
            err => {

                this.appEvents.publish('http:errors', err);
            });


    }

    showAgendaBenevole(event) {
        this.appGlobals.currentEventId = event.id;

        if(event.isVolunteer){
            const myModal2 = this.myModal.create('PopupPage', {"message": "<p>Vous êtes déjà  bénévole  à cet événement ! </p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();

        }else{
            if (!this.appGlobals.showBenevoleAgenda) {
                this.appGlobals.showBenevoleAgenda = true;
            } else {
                this.appGlobals.showBenevoleAgenda = false;
            }
            for (let ev of this.items) {
                if (ev.id == event.id) {
                    ev.isVolunteer = true;
                    ev.nbVolunteers++;
                }
            }
        }
    }

    showHideProposeCarpooling() {
        if (!this.appGlobals.showproposeCarpooling) {
            this.appGlobals.showproposeCarpooling = true;
        } else {
            this.appGlobals.showproposeCarpooling = false;
        }
    }

    showHideContactBar(id) {
        this.appGlobals.goodPlanCreatorId = id;
        if (!this.appGlobals.showcontactBar) {
            this.appGlobals.showcontactBar = true;
        } else {
            this.appGlobals.showcontactBar = false;
        }
    }

    showHideNeedCarpooling() {
        if (!this.appGlobals.showNeedCarpooling) {
            this.appGlobals.showNeedCarpooling = true;
        } else {
            this.appGlobals.showNeedCarpooling = false;
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

    dayDiff(firstDate, secondDate) {
        return Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24));
    }

    parseDate(str) {
        let arrayDateString = str.split('T');
        let arrayDate = arrayDateString[0].split('-');
        return new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2]);
    }

    parseDateNow(dateIn) {
        var yyyy = dateIn.getFullYear();
        var mm = dateIn.getMonth() + 1;
        var dd = dateIn.getDate();
        return String(yyyy + "-" + mm + "-" + dd) + "T00:00:00";
    }

    doInfinite(infiniteScroll) {
        if (this.init) {
            this.init = false;
            infiniteScroll.complete();
        } else if (this.allowInfiniteScroll) {
            this.page += 1;
            this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'goodplan', null,false,infiniteScroll);
        } else {
            infiniteScroll.complete();
        }
    }

    doRefreshAgenda(refresher) {
        this.items = [];
        this.page = 1;
        this.loaderShow = true;
        this.refreshCommunities();
        this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'goodplan', null,true,null,refresher);
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
                    const myModal2 = this.myModal.create('PopupPage', {"message": "<p>Votre annulation a été bien enregistrée ! </p>"}, {cssClass: 'message-modal'});
                    myModal2.onDidDismiss(() => {
                    });
                    myModal2.present();
                }

            },
            err => {
                this.appEvents.publish('http:errors', err);
            });
    }

    showNeedVolunteerPopup(event) {
        if (event.needVolunteer) {
            let benevoleAlert = this.myAlert.create({
                title: '',
                subTitle: 'Voulez-vous être bénévole à cet évènement?',
                buttons: [
                    {
                        text: 'Non',
                        role: 'cancel',
                        handler: () => {

                        }
                    },
                    {
                        text: 'Oui',
                        handler: () => {
                            let label = 'volunteer-' + event.id;
                            this.appEvents.publish("googleAnalytics", label);
                            const modalVolunteers = this.myModal.create('ParticpatelaststepPage', {"id": event.id}, {cssClass: 'style-modal'});
                            modalVolunteers.present();
                        }
                    }
                ]
            });
            benevoleAlert.present();
        }
    }

    goToMerchantCard(item){
        this.navCtrl.push(MerchantCardPage, {
            currentMerchant: item
        });
    }

    publish() {
        let adminAssociations = JSON.parse(localStorage.getItem("adminAssociations"));
        let adminMerchants = JSON.parse(localStorage.getItem("adminMerchants"));
        let adherentAssociations = JSON.parse(localStorage.getItem("adherentAssociations"));
        let adherentMerchants = JSON.parse(localStorage.getItem("adherentMerchants"));
        if(localStorage.getItem("hasApprovedCommunities") == 'true'){
            this.hasApprovedCommunities = true;
        }else{
            this.hasApprovedCommunities = false;
        }

        if(adherentAssociations.length != 0 || adherentMerchants.length != 0 || adminAssociations.length != 0 || adminMerchants.length != 0  || this.currentUser.role == 'community_su_admin' || this.hasApprovedCommunities){
            const myModal2 = this.myModal.create('ChoicePage', {}, {cssClass: 'style-modal choice-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();

        }else{
            const myModal2 = this.myModal.create('PopupPage', {"message": "<p>Vous ne pouvez pas publier ! </p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();
        }

    }

    detailsEvent(event, withComments) {
        this.appGlobals.currentEvent = event;
        this.navCtrl.push(GoodPlanDetailsPage, {
            id: event.id,
            title: event.title,
            withComments: withComments
        });
    }

    openButAlso() {
        this.navCtrl.push(ButAlsoPage);
    }

    eventProgress() {
        this.event.publish('user:current');

        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));


        this.eventService.getEventProgress(this.currentUser.id).then(data => {
                this.eventParticipted = data;

            },
            err => {

                this.event.publish('http:errors', err);
            });
    }

    addPhotoParticipated() {
        if (this.eventParticipted.length == 1) {
            this.takePicture();


        } else {
            const myModal2 = this.myModal.create('PopinChoiceEventPage', {"events": this.eventParticipted}, {cssClass: 'style-modal'});
            myModal2.present();

        }

    }


    public takePicture() {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            targetWidth: 600,
            targetHeight: 600,
            allowEdit: true,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG
        }).then((imageData) => {
            this.commentEvent.photo = "data:image/jpeg;base64," + imageData;
            const myModal2 = this.myModal.create('EvenCommentPage', {
                "comment": this.commentEvent,
                "participation": this.eventParticipted[0].articleId
            }, {cssClass: 'comment-modal'});
            myModal2.present();

        });
    }


    download(url) {
        let fileName = url.substring(url.lastIndexOf('/')+1);



        this.platform.ready().then(() => {
            if(this.platform.is('android')) {
                let request: DownloadRequest = {
                    uri: url,
                    title: 'Nous Ensemble',
                    description: fileName,
                    mimeType: '',
                    visibleInDownloadsUi: true,
                    notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
                    destinationInExternalFilesDir: {
                        dirType: 'Downloads',
                        subPath: fileName
                    }
                };


                this.downloader.download(request)
                    .then((location: string) => console.log('File downloaded at:'+location))
                    .catch((error: any) => console.error(error));
            }else{
                let target = "_system";

                this.inAppBrowser.create(url,target,"location=no,enableViewportScale=yes");
            }


        });
    }

}
