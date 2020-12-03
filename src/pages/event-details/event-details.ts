import {Component, ViewChild} from "@angular/core";
import {
    ActionSheetController,
    AlertController,
    Content,
    Events,
    LoadingController,
    ModalController,
    NavController,
    NavParams, Platform,
    ToastController
} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import * as moment from "moment";
import {Calendar} from "@ionic-native/calendar";
import {CommentProvider} from "../../providers/comment/comment";
import {NewsPage} from "../../pages/news/news";
import {Camera} from "@ionic-native/camera";
import {SocialSharing} from "@ionic-native/social-sharing";
import {CacheProvider} from "../../providers/cache/cache";
import {ArticleProvider} from "../../providers/article/article";
/**
 * Generated class for the EventDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-event-details',
    templateUrl: 'event-details.html',
})
export class EventDetailsPage {
    @ViewChild(Content) content: Content;
    private id: number;
    private currentEvent: any;
    private eventComments: any;
    private commentsItems = [];
    private page: number = 0;
    private showComments = false;
    private showParticipants = false;
    private showVolonteers = false;
    private withComments = false;
    private currentUser: any;
    private comment = {
        content: '',
        photo: null
    };
    private reply = {
        comment: null,
        content: '',
        photo: null
    };
    adminAssociations: any;
    private participants = [];
    private volonteers = [];
    private showReply = false;
    public numberComments = 0;
    public restNumbreComment = 0;
    public restNumbreReplie = 0;
    public commentNumber = 0;
    public showPush: any;
    public currentEventSupprimer: any = {};
    private items = [];
    newData: any;
    public isCreatorEvent: boolean = false;
    constructor(public navCtrl: NavController,
        public navParams: NavParams, 
        public appGlobals: GlobalsProvider,
        public loader: LoadingController,
        public myAlert: AlertController,
        public appEvents: Events,
        public ga: GoogleAnalytics,
        public calendarPlugin: Calendar,
        public serviceEvent: EventsrestProvider,
        public myModal: ModalController,
        public eventService: EventsrestProvider,
        public commentService: CommentProvider,
        private camera: Camera,
        public actionSheetCtrl: ActionSheetController,
        public toast: ToastController,
        public platform: Platform,
        public serviceArticle: ArticleProvider,
        public socialsharing: SocialSharing,
        public cacheService: CacheProvider) {

        this.id = this.navParams.get('id');
        this.appGlobals.onEventDetails = true;
        this.appGlobals.currentPageTitle = this.navParams.get('title');
        this.withComments = this.navParams.get('withComments');
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.showPush = navParams.get('pushNotification');
        this.adminAssociations =JSON.parse(localStorage.getItem("adminAssociations"));
        this.currentEvent = navParams.get('event');
        this.newData= navParams.get('event');   
        this.isCreatorEvent=this.creatorExists(this.currentEvent.creatorId);

    }

    edite(item : any){
        let data = this.newData
        const myModal2 = this.myModal.create('EditEventPage', { "event": data, "accountType": localStorage.getItem("account_type") }, { cssClass: 'style-modal' });
        myModal2.onDidDismiss(data => {
            this.items = [];
            this.page = 1;
            this.appEvents.publish('agendaAsso:refresh');
            this.appEvents.publish('agenda:refresh');
            this.appGlobals.showHeader = false;
        });
        myModal2.present();
    }

    async supprimer(item : any){
        this.currentEventSupprimer = Object.assign({}, item);
        const alert = await this.myAlert.create({
            message: 'L\'événement sera supprimé definitivement',
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
                this.eventService.getArticleId(this.currentEventSupprimer.id).then(data => {
                    this.serviceArticle.deleteArticle(data,"current").then(data => {
                    },
                        err => {
                            console.log(err);
                        });

                 }, err => {
                     console.log(err);
                });
                this.eventService.delete(this.currentEventSupprimer.id,"current").then(data => {
                    if(data){
                        this.appEvents.publish('agenda:refresh');
                        this.appEvents.publish('news:refresh');
                        loadingPopup.dismiss();
                        this.navCtrl.setRoot(NewsPage);
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

    async other(item: any){
        const actionSheet = await this.actionSheetCtrl.create({
            buttons: [{
              text: 'Supprimer',
              icon: 'trash',
              handler: () => {
                this.supprimer(item);
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
            },  {
              text: 'Annuler',
              icon: 'close',
              role: 'cancel',
              handler: () => {
              }
            }]
          });
          await actionSheet.present();
    }

    ionViewWillEnter() { 
        this.appGlobals.showFooter = true;
        this.appGlobals.showHeader = false;
        this.commentsItems = [];
        this.page = 0;
        this.appEvents.publish('updateFooter');
        //this.getDetailsEvents();
        if (this.navParams.get('showParticipant')){
            this.showHideParticipantsList();
        }
        if (this.navParams.get('showVolonteers')){
            this.showHideVolonteersList()
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

    countComment() {
        this.commentNumber = this.commentNumber + this.eventComments.length;
        for (let com of this.eventComments) {
            this.restNumbreReplie = this.restNumbreReplie + com.replies.length;
        }
        this.restNumbreComment = this.numberComments - (this.commentNumber + this.restNumbreReplie);
    }

    moreCountComment(comments) {
        this.commentNumber = this.commentNumber + comments.length;
        for (let com of comments) {
            this.restNumbreReplie = this.restNumbreReplie + com.replies.length;
        }
        this.restNumbreComment = this.numberComments - (this.commentNumber + this.restNumbreReplie);
    }

    goBack() { 
        if (this.showPush) {
            this.navCtrl.setRoot(NewsPage);
        } else {
            this.navCtrl.pop();
        }
    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
        this.appGlobals.onEventDetails = false;
    }

    getDetailsEvents() {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();

        this.eventService.getDetailsEvent(this.id).then(data => {
            this.currentEvent = data;
                if (this.withComments) {
                    this.showComments = true;
                    this.getEventComments(loadingPopup);
                } else {
                    loadingPopup.dismiss();
                }

                this.platform.ready().then(() => {
                    let label = 'detail-event-for__'+this.currentEvent.id;
                    this.appEvents.publish("googleAnalytics", label);
                });
            },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            }
        );
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
                            localStorage.setItem("currentEvent", event.id);
                            const modalVolunteers = this.myModal.create('ParticpatelaststepPage', { "id": event.id }, { cssClass: 'style-modal' });
                            modalVolunteers.present();
                        }
                    }
                ]
            });
            benevoleAlert.present();
        }
    }

    getEventComments(loadingPopup) {
        this.commentService.getCommentsEvent(this.currentEvent.id, this.page).then(data => {
            this.eventComments = data;
            for (let com of this.eventComments) {
                this.commentsItems.push(com);
            }

            loadingPopup.dismiss();
            setTimeout(() => {
                this.content.scrollToBottom();
                this.countComment();
            });
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }

    showHideComments() {
        this.commentsItems = [];
        this.page = 0;
        if (this.showComments == false) {
            let loadingPopup = this.loader.create({});
            loadingPopup.present();
            this.getEventComments(loadingPopup);
            this.showParticipants = false;
            this.showComments = true;
        } else {
            this.showComments = false;
        }
    }

    showHideParticipantsList() {
        if (this.showParticipants == false) {
            this.getParticipants(this.id);
            this.showComments = false;
            this.showVolonteers = false;
            this.showParticipants = true;
        } else {
            this.showParticipants = false;
        }
    }

    showHideVolonteersList() {
        if (this.showVolonteers == false) {
            this.getVolonteers(this.id);
            this.showComments = false;
            this.showParticipants = false;
            this.showVolonteers = true;
        } else {
            this.showVolonteers = false;
        }
    }

    addComment() {

        if ((this.comment.content == '') || (this.comment.content == null) || (this.comment.content.length == 0) || (!this.comment.content.replace(/\s/g, '').length)) {
            let errorAlert = this.myAlert.create({
                title: "Erreur",
                subTitle: "Vous devez entrer votre commentaire",
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
        } else {
            let loadingPopup = this.loader.create({});
            loadingPopup.present();
            this.commentService.postEventComment(this.currentEvent.id, this.comment).then(data => {
                this.commentsItems = [];
                this.page = 0;
                this.comment.content = null;
                this.comment.photo = null;
                this.eventComments = data;
                for (let com of this.eventComments) {
                    this.commentsItems.push(com);
                }
                this.currentEvent.nbComments++;
                this.numberComments++;
                loadingPopup.dismiss();
                setTimeout(() => {
                    this.content.scrollToBottom();
                });
            },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                });
        }
    }

    deleteConfirmation(comment) {
        let alert = this.myAlert.create({
            title: 'Supprimer le commentaire',
            subTitle: 'Voulez-vous vraiment supprimer ce commentaire',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'OK',
                    handler: () => {
                        this.deleteComment(comment);
                    }
                }
            ]
        });
        alert.present();
    }

    deleteComment(comment) {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.commentService.deleteEventComment(comment.id).then(data => {
            let label = 'commentDeleted-' + comment.id;
            this.appEvents.publish("googleAnalytics", label);

            this.commentsItems = [];
            this.page = 0;
            this.comment.content = null;
            this.eventComments = data;
            for (let com of this.eventComments) {
                this.commentsItems.push(com);
            }
            this.currentEvent.nbComments--;
            this.numberComments--;
            loadingPopup.dismiss();
            setTimeout(() => {
                this.content.scrollToBottom();
            });
            let toast = this.toast.create({
                message: 'Commentaire supprimé avec succès.',
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

    deleteReplyConfirmation(comment) {
        let alert = this.myAlert.create({
            title: 'Supprimer le commentaire',
            subTitle: 'Voulez-vous vraiment supprimer ce commentaire',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'OK',
                    handler: () => {
                        this.deleteReplyComment(comment);
                    }
                }
            ]
        });
        alert.present();
    }

    deleteReplyComment(comment) {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.commentService.deleteEventCommentReply(comment.id).then(data => {
            this.commentsItems = [];
            this.page = 0;
            this.comment.content = null;
            this.eventComments = data;
            for (let com of this.eventComments) {
                this.commentsItems.push(com);
            }
            this.currentEvent.nbComments--;
            this.numberComments--;
            loadingPopup.dismiss();
            setTimeout(() => {
                this.content.scrollToBottom();
            });
            let toast = this.toast.create({
                message: 'Commentaire supprimé avec succès.',
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

    showReplyForm(comment) {
        this.showReply = !this.showReply;
        this.reply.comment = comment.id;
    }

    addReplyComment() {
        if ((this.reply.content == '') || (this.reply.content == null) || (this.reply.content.length == 0) || (!this.reply.content.replace(/\s/g, '').length)) {
            let errorAlert = this.myAlert.create({
                title: "Erreur",
                subTitle: "Vous devez entrer votre commentaire",
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
        } else {
            let loadingPopup = this.loader.create({});
            loadingPopup.present();
            this.commentService.postEventCommentReply(this.reply).then(data => {
                this.commentsItems = [];
                this.page = 0;
                this.reply.content = null;
                this.reply.comment = null;
                this.reply.photo = null;
                this.showReply = false;
                this.eventComments = data;

                for (let com of this.eventComments) {
                    this.commentsItems.push(com);
                }
                this.currentEvent.nbComments++;
                this.numberComments++;
                loadingPopup.dismiss();
                setTimeout(() => {
                    this.content.scrollToBottom();
                });
            },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                });
        }
    }

    getParticipants(id) {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.eventService.getEventParticipants(id).then(data => {
            this.participants = data.slice().reverse();;
            if(this.participants.length <0){
                this.showParticipants = false;
            }
            loadingPopup.dismiss();
            setTimeout(() => {
                this.content.scrollToBottom();
            });
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }

    getVolonteers(id) {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.eventService.getEventBenevole(id).then(data => {
                this.volonteers = data;
                if(this.volonteers.length < 0){
                    this.showVolonteers = false;
                }
                loadingPopup.dismiss();
                setTimeout(() => {
                    this.content.scrollToBottom();
                });
            },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }

    showMoreComments() {
        this.page++;
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.commentService.getCommentsEvent(this.currentEvent.id, this.page).then(data => {
            this.eventComments = data;
            this.moreCountComment(this.eventComments);
            for (let com of this.eventComments) {
                this.commentsItems.push(com);
            }

            loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }
    public presentActionSheet(type) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Sélectionner la source d image',
            buttons: [
                {
                    text: 'Choisir une photo de la bibliothèque',
                    handler: () => {
                        this.loadImageFromLibrary(type);
                    }
                },
                {
                    text: 'Prendre une photo',
                    handler: () => {
                        this.takePicture(type);
                    }
                },
                {
                    text: 'Annuler',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

    public takePicture(type) {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            targetWidth: 600,
            targetHeight: 600,
            allowEdit: true,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG
        }).then((imageData) => {
            if (type == 'comment') {
                this.comment.photo = "data:image/jpeg;base64," + imageData;
            } else {
                this.reply.photo = "data:image/jpeg;base64," + imageData;
            }
        });
    }

    public loadImageFromLibrary(type) {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            targetWidth: 600,
            targetHeight: 600,
            allowEdit: true,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG
        }).then((imageData) => {
            if (type == 'comment') {
                this.comment.photo = "data:image/jpeg;base64," + imageData;
            } else {
                this.reply.photo = "data:image/jpeg;base64," + imageData;
            }
        });
    }

    public deletePhoto(type) {
        if (type == 'comment') {
            this.comment.photo = null;
        } else {
            this.reply.photo = null;
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
                subTitle: 'Vous avez déjà fait une demande de covoiturage pour cet évènement.  Voulez-vous la supprimer ?',
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

                    this.currentEvent.alreadyPool = 0;
                    this.currentEvent.nbCarpoolUsers--;
                    this.appEvents.publish('agenda:refresh');

                }
                loadingPopup.dismiss();

            },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
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

 dupliquer(item : any){
        const myModal2 = this.myModal.create('DupliquerPage',{ "event": item, "accountType": "accountType" }, { cssClass: 'style-modal' });
            myModal2.onDidDismiss(data => {
            });
            myModal2.present();
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

    showAgendaBenevole(event) {
        this.appGlobals.currentEventId = event.id;

        if(this.currentEvent.isVolunteer){
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
            this.currentEvent.isVolunteer = true;
            this.currentEvent.nbVolunteers++;
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
                    this.currentEvent.isParticipated = false;
                    this.currentEvent.nbParticipants--;
                    if(this.currentEvent.nbParticipants == 0){
                        this.showParticipants = false;
                        this.participants = [];
                    }
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

    showHidePutAgenda(event) {

        this.appGlobals.showPutAgenda = !this.appGlobals.showPutAgenda;
        this.appGlobals.currentEvent = event;

        this.eventService.takePart(event.id).then(
            result => {
                if (result.success) {
                    this.currentEvent.isParticipated = true;
                    this.currentEvent.nbParticipants++;
                    this.appEvents.publish('agenda:refresh');
                }
            },
            err => {
                this.appEvents.publish('http:errors', err);
            }
        );

    }

}
