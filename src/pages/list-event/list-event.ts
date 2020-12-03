import {Component} from "@angular/core";
import {
    AlertController,
    Events,
    ActionSheetController,
    LoadingController,
    ModalController,
    NavController,
    NavParams, Platform,
    ToastController
} from "ionic-angular";
import {ArticleProvider} from "../../providers/article/article";
import {CommentProvider} from "../../providers/comment/comment";
import {GlobalsProvider} from "../../providers/globals/globals";
import {EventDetailsPage} from "../event-details/event-details";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {AssociationProvider} from "../../providers/association/association";
import {MerchantProvider} from "../../providers/merchant/merchant";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import * as moment from "moment";
import {Calendar} from "@ionic-native/calendar";
import {CacheProvider} from "../../providers/cache/cache";
import {SocialSharing} from "@ionic-native/social-sharing";


/**
 * Generated class for the ListEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-list-event',
    templateUrl: 'list-event.html',
})
export class ListEventPage {

    public events: any;
    public account: any;
    public associationId: any;
    public merchantId: any;
    public accountImg: any;
    public eventType: any;
    private init = false;
    public items = [];
    private page: number = 1;
    public shownGroup = null;
    private itemsDates = [];
    private allowInfiniteScroll = true;
    public currentUser: any;
    public cacheLifeTime = 3600;
    private loaderShow: boolean = true;


    constructor(public commentService: CommentProvider,
        public toastCtrl: ToastController,
        private modal: ModalController,
        public eventService: EventsrestProvider,
        public appEvents: Events,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public serviceEvent: EventsrestProvider,
        public articleService: ArticleProvider,
        private loadingCtrl: LoadingController,
        public appGlobals: GlobalsProvider,
        public alertCtrl: AlertController,
        public merchantService: MerchantProvider,
        public associationService: AssociationProvider,
        public calendarPlugin: Calendar,
        public actionSheetController: ActionSheetController,
        public ga: GoogleAnalytics,
        public cacheService: CacheProvider,
        public event: Events,
        public platform: Platform,
        public socialsharing: SocialSharing) {

        this.appGlobals.showHeader = false;
        this.account = navParams.get('account');
        this.eventType = "all";
        this.page = 1;
        this.items = [];
        if (this.account.type == 'association' || this.account.type == 'community') {
            this.associationId = this.account.id;
            this.accountImg = this.account.image_url;

            this.event.unsubscribe('association:agenda');
            this.event.subscribe('association:agenda', data => {
                this.page = data[0];
                this.items = data[1];
                this.event = data[2];
                this.itemsDates = data[3];
                this.allowInfiniteScroll = !data[2] || data[2] && data[2].length;
            });

            this.event.unsubscribe('agendaAsso:refresh');
            this.event.subscribe('agendaAsso:refresh', () => {
                this.page = 1;

                    this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime, 'agendaAsso', this.account, true);

            });
            this.appEvents.unsubscribe('agenda:refresh');
            this.appEvents.subscribe('agenda:refresh', () => {
                this.page = 1;
                this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'agenda', null,true);
            });

        } else if (this.account.type == 'merchant') {
            this.merchantId = this.account.id;
            this.accountImg = this.account.image_url;
        }


    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.items = [];
        this.page = 1;
        this.init = true;
        this.getEvents();
    }

    detailsEvent(event, withComments) {
        this.navCtrl.push(EventDetailsPage, {
            id: event.id,
            title: event.title,
            withComments: withComments
        });
    }

    toggleGroup(group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        } else {
            this.shownGroup = group;
        }
    };

    isGroupShown(group) {
        return this.shownGroup === group;
    };

    updateStatus(event) {
        if (event.enabled == true) {
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            this.eventService.activate(event.id).then(data => {
                    this.appEvents.publish('agendaAsso:refresh');
                    this.appEvents.publish('agenda:refresh');
                loadingPopup.dismiss();
                let toast = this.toastCtrl.create({
                    message: 'Evenement activé avec succès',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();

            },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                });

        } else {
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            this.eventService.desactivate(event.id).then(data => {
                    this.appEvents.publish('agendaAsso:refresh');
                    this.appEvents.publish('agenda:refresh');

                loadingPopup.dismiss();
                let toast = this.toastCtrl.create({
                    message: 'evenement désactiver avec succès',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                });
        }
    }

    deleteEventAlert(event) {
        let alert = this.alertCtrl.create({
            title: 'Supprimer événement',
            subTitle: 'Voulez-vous vraiment supprimer cet événement ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'OK',
                    handler: data => {
                        this.deleteEvent(event,"current");
                    }
                }
            ]
        });
        alert.present();
    }
    deleteEventAlertNotParent(event,model) {
        let alert = this.alertCtrl.create({
            title: 'Supprimer événement',
            subTitle: 'Voulez-vous vraiment supprimer cet événement et les evenements à venir ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'OK',
                    handler: data => {
                        this.deleteEvent(event,model);
                    }
                }
            ]
        });
        alert.present();
    }
    async supprimerNotParent(item : any){
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Cet événement',
              icon: 'ios-backspace',
              handler: () => {
                this.deleteEventAlert(item);
              }
            }, { 
              text: 'Cet événement et les événements à venir',
              icon: 'trash',
              handler: () => {
                this.deleteEventAlertNotParent(item , "currentAndNext");
              }
            }, {
              text: 'Annuler',
              icon: 'close',
              role: 'cancel',
              handler: () => {
              }
            }]
          });
          await actionSheet.present();
    }
    deleteEvent(event,model) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.eventService.delete(event.id,model).then(data => {
                this.appEvents.publish('agendaAsso:refresh');
                this.appEvents.publish('agenda:refresh');

            loadingPopup.dismiss();
            let index = this.items.indexOf(event);
            if (index > -1) {
                this.items.splice(index, 1);
            }
            let toast = this.toastCtrl.create({
                message: 'Evénement supprimé avec succès.',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }


    async editeNotParent(item : any){
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Cet événement',
              icon: 'create',
              handler: () => {
                this.editeEventDup(item , "current");
              }
            }, { 
              text: 'Cet événement et les événements à venir',
              icon: 'ios-create',
              handler: () => {
                this.editeEventDup(item , "currentAndNext");
              }
            }, {
              text: 'Annuler',
              icon: 'close',
              role: 'cancel',
              handler: () => {
              }
            }]
          });
          await actionSheet.present();
    }
    editeEventDup(item : any , mode :any){
        const myModal2 = this.myModal.create('PopupEvenDuplicateDetailPage', { "event": item, "accountType": localStorage.getItem("account_type") , mode:mode}, { cssClass: 'style-modal' });
            myModal2.onDidDismiss(data => {
                this.items = [];
                this.page = 1;
                this.appEvents.publish('agendaAsso:refresh');
                this.appEvents.publish('agenda:refresh');
                this.appGlobals.showHeader = false;
            });
            myModal2.present();
    }

    getEvents() {
        if (this.account.type == 'association') {
            this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'agendaAsso', this.account);
        }
        else if(this.account.type == 'community'){
            this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'agendaCommu', this.account);
        }

    }

    loadEvents() {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        if (this.account.type == 'association') {
            this.associationService.getEvents(this.associationId, this.page).then(data => {
                this.events = data;
                for (let event of this.events) {
                    this.items.push(event);
                }

                loadingPopup.dismiss();
            });
        } else {
            this.merchantService.getEvents(this.merchantId, this.page).then(data => {
                this.events = data;
                for (let event of this.events) {
                    this.items.push(event);
                }

                loadingPopup.dismiss();
            });
        }


    }

    doInfinite(infiniteScroll) {
        if (this.init) {
            this.init = false;
            infiniteScroll.complete();
        } else if (this.allowInfiniteScroll) {
            this.page += 1;
            if (this.account.type == 'association') {
                this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'agendaAsso',this.account,false,infiniteScroll);
            }
            else if(this.account.type == 'community'){
                    this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'agendaCommu',this.account,false,infiniteScroll);
             
            }
            else if (this.account.type == 'merchant') {
                this.associationService.getEventsFilter(this.associationId, this.eventType, this.page).then(data => {
                    this.events = data;
                    for (let event of this.events) {
                        this.items.push(event);
                    }
                        infiniteScroll.complete();
                    },
                    err => {
                        infiniteScroll.complete();
                    });
            }
        } else {
            infiniteScroll.complete();
        }


    }

    comments(event, withComments) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        return new Promise(resolve => {
            this.commentService.markCommentsEventAsRead(event.id).then(data => {
                loadingPopup.dismiss();
                this.navCtrl.push(EventDetailsPage, {
                    id: event.id,
                    title: event.title,
                    withComments: withComments
                });
            },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                });
        });
    }

    HandlerTypeEvent($event) {
        this.items = [];
        this.page = 1;
        this.eventType = $event;
        if ($event == "all")
            this.getEvents();
        else
            this.getEventsPersonalized($event);
    }

    getEventsPersonalized(eventType) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        if (eventType == "personalized")
            eventType = 1;
        else
            eventType = 0;
        if (this.account.type == 'association') {
            this.associationService.getEventsFilter(this.associationId, eventType, this.page).then(data => {
                this.events = data;
                for (let event of this.events) {
                    this.items.push(event);
                }
                loadingPopup.dismiss();
            }, err => {
                this.appEvents.publish('http:errors', err);
            });
        } else {
            this.merchantService.getEventsFilter(this.merchantId, eventType, this.page).then(data => {
                this.events = data;
                for (let event of this.events) {
                    this.items.push(event);
                }
                loadingPopup.dismiss();
            }, err => {
                this.appEvents.publish('http:errors', err);
            });
        }
    }

    like(event) {
        let label = 'participation-' + event.id;
        this.appEvents.publish("googleAnalytics", label);

        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        let result: any;
        this.eventService.takePart(event.id).then(data => {
            loadingPopup.dismiss();
            result = data;
            if (result.success) {
                event.isLiked = true;
                event.nbParticipants++;
                let addToCalendarAlert = this.alertCtrl.create({
                    title: '',
                    subTitle: 'Voulez-vous ajouter cet évènement à votre agenda?',
                    buttons: [
                        {
                            text: 'Non',
                            role: 'cancel',
                            handler: () => {
                                this.showNeedVolunteerPopup(event);
                            }
                        },
                        {
                            text: 'Oui',
                            handler: () => {
                                var start = moment(event.startAt).toDate();
                                var end = moment(event.endAt).toDate();
                                this.calendarPlugin.createEvent(event.title, event.place, event.description, start, end).then(
                                    (msg) => { },
                                    (err) => { }
                                );
                                this.showNeedVolunteerPopup(event);
                            }
                        }
                    ]
                });
                addToCalendarAlert.present();
            }
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            })
    }

    unlike(event) {
        let label = 'cancelParticipation-' + event.id;
        this.appEvents.publish("googleAnalytics", label);
        let loadingPopup = this.loadingCtrl.create({});
        let result: any;
        loadingPopup.present();
        this.eventService.cancelTakePart(event.id).then(data => {
            loadingPopup.dismiss();
            result = data;
            var start = moment(event.startAt).toDate();
            var end = moment(event.endAt).toDate();

            this.calendarPlugin.deleteEvent(event.title, event.place, '', start, end).then(
                (msg) => { },
                (err) => { }
            );

            if (result.success) {
                let successAlert = this.alertCtrl.create({
                    title: 'Succès,',
                    subTitle: 'Votre annulation a été bien enregistrée.',
                    buttons: [
                        {
                            text: 'OK',
                            handler: () => {
                                event.isLiked = false;
                                event.nbParticipants--;
                            }
                        }
                    ]
                });
                successAlert.present();
            }

        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }

    showNeedVolunteerPopup(event) {
        if (event.needVolunteer) {
            let benevoleAlert = this.myAlert.create({
                title: '',
                subTitle: 'Voulez-vous être bénévole à cet évènement ?',
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

    cancelParticipation(event) {
        let result: any;
        this.eventService.cancelTakePart(event.id).then(data => {
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
                    for (let ev of this.items) {
                        if (ev.id == event.id) {
                            ev.isParticipated = false;
                            ev.nbParticipants--;
                        }
                    }
                    const myModal2 = this.myModal.create('PopupPage', {"message": "<p>Votre annulation a été bien enregistrée.</p>"}, {cssClass: 'message-modal'});
                    myModal2.onDidDismiss(() => {
                    });
                    myModal2.present();
                }

            },
            err => {
                this.appEvents.publish('http:errors', err);
            });
    }

    showHideNeedCarpooling(event) {
        if (event['alreadyPool'] == 0){
            this.appGlobals.currentEvent = event;
            this.appGlobals.checkedCarpool = null;
            this.appGlobals.showNeedCarpooling = !this.appGlobals.showNeedCarpooling;
        }
        else {
            let alert = this.myAlert.create({
                title: 'Demande existante',
                subTitle: 'Vous avez déjà fait une demande de covoiturage pour cet évènement.',
                buttons: ['fermer']
            });
            alert.present();
        }

    }

    showHidePutAgenda(event) {
        if (!this.appGlobals.showPutAgenda) {
            this.appGlobals.showPutAgenda = true;
        } else {
            this.appGlobals.showPutAgenda = false;
        }

        this.appGlobals.currentEvent = event;
        let result: any;
        this.eventService.takePart(event.id).then(data => {
                result = data;
                if (result.success) {
                    for (let ev of this.items) {
                        if (ev.id == event.id) {
                            ev.isParticipated = true;
                            ev.nbParticipants++;
                        }
                    }
                }
            },
            err => {
                this.appEvents.publish('http:errors', err);
            })

    }

    showAgendaBenevole(event) {
        this.appGlobals.currentEventId = event.id;
        if(event.isVolunteer){
            const myModal2 = this.myModal.create('PopupPage', {"message": "<p>Vous êtes déjà  bénévole  à cet événement.</p>"}, {cssClass: 'message-modal'});
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

    showHideProposeCarpooling(event) {
        if (event['alreadyAddPool'] == 0) {
            if (!this.appGlobals.showproposeCarpooling) {
                this.appGlobals.showproposeCarpooling = true;
                this.appGlobals.currentEvent = event;
            } else {
                this.appGlobals.showproposeCarpooling = false;
            }
        }
        else {
            let alert = this.myAlert.create({
                title: 'Demande existante',
                subTitle: 'Vous avez déjà proposé du covoiturage pour cet évènement.',
                buttons: ['fermer']
            });
            alert.present();
        }
    }


    goBack() {
        this.navCtrl.pop();
    }

    editEvent(event) {
        const myModal2 = this.modal.create('EditEventPage', { "event": event, "accountType": this.account.type }, { cssClass: 'style-modal' });
        myModal2.onDidDismiss(data => {
            this.items = [];
            this.page = 1;
            this.appEvents.publish('agendaAsso:refresh');
            this.appEvents.publish('agenda:refresh');
            this.appGlobals.showHeader = false;
        });
        myModal2.present();

    }


    doRefreshAgenda(refresher) {
        this.items = [];
        this.page = 1;
        this.loaderShow = true;
        if (this.account.type == 'association') {
            this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'agendaAsso', this.account,true,null,refresher);
        }
        else if(this.account.type == 'community'){
            this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'agendaCommu', this.account,true,null,refresher);
        }
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
}
