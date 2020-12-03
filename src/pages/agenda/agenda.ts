import {Component} from "@angular/core";
import {AlertController, ActionSheetController,Events, LoadingController,ModalOptions, ModalController, NavController,Platform} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {UserProvider} from "../../providers/user/user";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {GroupitemsPipe} from "../../pipes/groupitems/groupitems";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import * as moment from "moment";
import {Calendar} from "@ionic-native/calendar";
import {EventDetailsPage} from "../event-details/event-details";
import {ButAlsoPage} from "../butalso/butalso";
import {CommentProvider} from "../../providers/comment/comment";
import {Camera} from "@ionic-native/camera";
import {SocialSharing} from "@ionic-native/social-sharing";
import {CacheProvider} from "../../providers/cache/cache";
import {AssociationSheetPage} from "../association-sheet/association-sheet";
import {CommunityProvider} from "../../providers/community/community";
import {ArticleProvider} from "../../providers/article/article";
/** 
 * Generated class for the AgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@Component({
    selector: 'page-agenda',
    templateUrl: 'agenda.html',
})
export class AgendaPage {
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
    public currentEvent: any = {}
    private allowInfiniteScroll = true;
    private commentEvent = {
        content: '',
        photo: null
    };
    adminAssociations: any;
    duplcateAr: any;
    constructor(public event: Events,
                public navCtrl: NavController,
                public appGlobals: GlobalsProvider,
                public userService: UserProvider,
                public eventService: EventsrestProvider,
                public platform: Platform,
                private camera: Camera,
                public commentService: CommentProvider,
                public myAlert: AlertController,
                public actionSheetController: ActionSheetController,
                public loader: LoadingController,
                public appEvents: Events,
                public ga: GoogleAnalytics,
                public serviceArticle: ArticleProvider,
                public calendarPlugin: Calendar,
                public myModal: ModalController,
                public socialsharing: SocialSharing,
                public cacheService: CacheProvider,
                public serviceCommunity: CommunityProvider) {

        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (this.currentUser.primary_city) {
            this.selectedCities.push(this.currentUser.primary_city.id);
        }
        this.refreshCommunities();
        this.event.publish('closeFilters');
        this.event.publish('resetFilters');
        this.eventProgress();
        this.event.unsubscribe('agenda:cache');
        this.event.subscribe('agenda:cache', data => {
            this.adminAssociations =JSON.parse(localStorage.getItem("adminAssociations"));
            this.page = data[0];
            this.items = data[1];
            this.event = data[2];
            this.allowInfiniteScroll = !data[2] || data[2] && data[2].length;
            this.updateItemsDates();
            
            console.log(JSON.stringify(this.items));
        });
        this.appEvents.unsubscribe('agenda:refresh');
        this.appEvents.subscribe('agenda:refresh', () => {
            this.page = 1;
            this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'agenda', null,true);
        });
        this.appEvents.unsubscribe('agenda:volunteerContact');
        this.appEvents.subscribe('agenda:volunteerContact', data => {
            let loadingPopup = this.loader.create({});
            loadingPopup.present();
            this.eventService.postContact(data[0], "phone", data[1]).then(
                result => {
                    loadingPopup.dismiss();
                    if (result.success) {
                        let index = this.items.findIndex(i => i.id == data[0]);
                        if (index != -1) {
                            this.items[index].isVolunteer = true;
                            this.items[index].nbVolunteers++;
                            this.cacheService.refreshItem(this.items[index], 'agenda.events');
                            this.updateItemsDates();
                        }
                        this.appGlobals.showBenevoleAgenda = false;
                    }
                },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                }
            );
        });
        this.appEvents.unsubscribe('agenda:carpoolAdd');
        this.appEvents.subscribe('agenda:carpoolAdd', data => {
            let loadingPopup = this.loader.create({});
            loadingPopup.present();
            this.eventService.addCarpool(data[0], data[1], data[2], data[3], data[4]).then(
                result => {
                    this.appEvents.publish('agenda:refresh');
                    loadingPopup.dismiss();
                    if (result.success) {
                        let index = this.items.findIndex(i => i.id == data[0]);
                        if (index != -1) {
                            this.items[index].alreadyAddPool = true;
                            this.cacheService.refreshItem(this.items[index], 'agenda.events');
                            this.updateItemsDates();
                        }
                        this.appGlobals.showAnswerCarpooling = false;
                    }
                },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                }
            );
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

    async supprimer(item : any , modeEvent :any){
        this.currentEvent = Object.assign({}, item);
        const alert = await this.myAlert.create({
            message: 'L\'événement  sera supprimé definitivement',
            buttons: [
              {
                text: 'Annuler',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                }
              }, {
                text: 'Valider', 
                handler: () => {
                let loadingPopup = this.loader.create({});
                loadingPopup.present();
                
                this.eventService.delete(this.currentEvent.id , modeEvent).then(data => {
                    if(data){
                        this.appEvents.publish('agenda:refresh');
                        this.appEvents.publish('news:refresh');
                        loadingPopup.dismiss();
                    }
                 }, err => {
                     console.log(err);
                     loadingPopup.dismiss();
                });

                }
              }
            ]
          });
          await alert.present();
    }
    creatorExists(id : any){
        let test = false;
        this.adminAssociations.forEach(function (adminAssociation) {
            if(adminAssociation.id == id){
                test = true;
                return true;
            }
          });
          return test;
    }
    async other(item: any){
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Supprimer',
              icon: 'trash',
              handler: () => {
                this.supprimer(item , "current");
              }
            }, {
              text: 'Partager',
              icon: 'share',
              handler: () => {
                this.ShareArticle(item);
              }
            }, { 
              text: 'Modifier',
              icon: 'create',
              handler: () => {
                this.edite(item);
              }
            },{
              text: 'Dupliquer',
              icon: 'copy',
              handler: () => {
                this.dupliquer(item);
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

    async otherNotParent(item: any){
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Supprimer',
              icon: 'trash',
              handler: () => {
                this.supprimerNotParent(item);
              }
            }, {
              text: 'Partager',
              icon: 'share',
              handler: () => {
                this.ShareArticle(item);
              }
            }, { 
              text: 'Modifier',
              icon: 'create',
              handler: () => {
                this.editeNotParent(item);
              }
            },{
              text: 'Dupliquer',
              icon: 'copy',
              handler: () => {
                this.dupliquer(item);
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


    async otherParent(item: any){
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Partager',
              icon: 'share',
              handler: () => {
                this.ShareArticle(item);
              }
            }, { 
              text: 'Modifier',
              icon: 'create',
              handler: () => {
                this.edite(item);
              }
            },{
              text: 'Dupliquer',
              icon: 'copy',
              handler: () => {
                this.dupliquer(item);
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

    async supprimerNotParent(item : any){
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Cet événement',
              icon: 'ios-backspace',
              handler: () => {
                this.supprimer(item , "current");
              }
            }, { 
              text: 'Cet événement et les événements à venir',
              icon: 'trash',
              handler: () => {
                this.supprimer(item , "currentAndNext");
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
   

    dupliquer(item : any){
        const myModal2 = this.myModal.create('DupliquerPage',{ "event": item, "accountType": "accountType" }, { cssClass: 'style-modal' });
            myModal2.onDidDismiss(data => {
            });
            myModal2.present();
    }

     edite(item : any){
         const myModal2 = this.myModal.create('EditEventPage', { "event": item, "accountType": localStorage.getItem("account_type") }, { cssClass: 'style-modal' });
            myModal2.onDidDismiss(data => {
                this.items = [];
                this.page = 1;
                this.appEvents.publish('agendaAsso:refresh');
                this.appEvents.publish('agenda:refresh');
                this.appGlobals.showHeader = false;
            });
            myModal2.present();
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
        this.appGlobals.currentPageTitle = "Agenda";
        this.appGlobals.currentPageLogo = "md-calendar";
        this.appGlobals.currentPageid = "agenda";
        this.appGlobals.showSearchAgenda = true;
        this.appEvents.publish('updateFooter');
        this.items = [];
        this.page = 1;
        this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'agenda');
    }
   
    ionViewWillLeave() {
        this.loaderShow = true;
        this.appGlobals.showSearchAgenda = false;
    }

    showAgendaBenevole(event) {
        this.appGlobals.currentEventId = event.id;
        if (event.isVolunteer) {
            const myModal2 = this.myModal.create('PopupPage', {"message": "<p>Vous êtes déjà  bénévole  à cet événement.</p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();
        } else {
            this.appGlobals.showBenevoleAgenda = !this.appGlobals.showBenevoleAgenda;
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
                subTitle: 'Vous avez déjà proposé du covoiturage pour cet événement.',
                buttons: ['fermer']
            });
            alert.present();
        }
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
                subTitle: 'Vous avez déjà fait une demande de covoiturage pour cet événement. Voulez-vous la supprimer ?',
                buttons: [{
                    text: 'Non',
                    role: 'cancel',
                    handler: () => {

                    }
                },
                    {
                        text: 'Oui',
                        handler: () => {
                            this.deleteCarpoolDemand(event['id']);
                        }
                    }]
            });
            alert.present();
        }

    }

    deleteCarpoolDemand(id) {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        let result: any;
        this.eventService.deleteEventCarpoolDemand(id).then(data => {
                result = data;
                if (result.success) {
                    for (let ev of this.items) {
                        if (ev.id == id) {
                            ev.alreadyPool = 0;
                            ev.nbCarpoolUsers--;

                            this.cacheService.refreshItem(ev, 'agenda.events');
                            this.updateItemsDates();
                        }
                    }
                }
                loadingPopup.dismiss();
            },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }

    showHidePutAgenda(event) {
        this.appGlobals.showPutAgenda = !this.appGlobals.showPutAgenda;
        this.appGlobals.currentEvent = event;

        let result: any;
        this.eventService.takePart(event.id).then(
            data => {
                result = data;
                if (result.success) {
                    for (let ev of this.items) {
                        if (ev.id == event.id) {
                            ev.isParticipated = true;
                            ev.nbParticipants++;

                            this.cacheService.refreshItem(ev, 'agenda.events');
                            this.updateItemsDates();
                        }
                    }
                }
            },
            err => {
                this.appEvents.publish('http:errors', err);
            }
        );
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

    updateItemsDates() {
        let item = [];
        for (let event of this.items) {
            let dateString = event.day;
            let arraydateString = dateString.split('T');
            let arraydate = arraydateString[0].split('-');
            event.day = arraydate[0] + "-" + arraydate[1] + "-" + arraydate[2] + "T00:00:00";
            item.push(event);
        }
        let g = new GroupitemsPipe();
        this.itemsDates = [];
        let itemsg = g.transform(item, "day");
        for (let ir of itemsg) {
            this.itemsDates.push(ir);
        }
    }

    doInfinite(infiniteScroll) {
        if (this.init) {
            this.init = false;
            infiniteScroll.complete();
        } else if (this.allowInfiniteScroll) {
            this.page += 1;
            this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'agenda', null,false,infiniteScroll);
        } else {
            infiniteScroll.complete();
        }
    }

    doRefreshAgenda(refresher) {
        this.items = [];
        this.page = 1;
        this.loaderShow = true;
        this.cacheService.loadArticles(this.page, this.items, this.events, this.cacheLifeTime,'agenda', null,true,null,refresher);
        this.refreshCommunities();
    }

    cancelParticipation(event) {
        let result: any;
        this.eventService.cancelTakePart(event.id).then(
            data => {
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

                            this.cacheService.refreshItem(ev, 'agenda.events');
                            this.updateItemsDates();
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
            }
        );
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
            const myModal2 = this.myModal.create('PopupPage', {"message": "<p>Vous ne pouvez pas publier.</p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();
        }

    }

    detailsEvent(event, withComments, showParticipant, showVolonteers) {
        this.navCtrl.push(EventDetailsPage, {
            id: event.id,
            event: event,
            title: event.title,
            withComments: withComments,
            showParticipant: showParticipant,
            showVolonteers: showVolonteers
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

    openAssociation(association, name) {
        this.navCtrl.push(AssociationSheetPage, {
            id: association,
            name: name
        })
    }
  
    detailsduplication(id){
        const myModalOptions: ModalOptions = {
            enableBackdropDismiss: false
          };
        const myModal2 = this.myModal.create('PopupEvenDuplicateDetailPage', {
            "parentId": id,
        },myModalOptions);
        myModal2.present();
    }

   

}
 
 

