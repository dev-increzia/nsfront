import {Component, ViewChild} from '@angular/core';
import {
    ActionSheetController,
    AlertController,
    Content,
    Events,
    LoadingController, 
    ModalController,
    NavController,
    NavParams, Platform, ToastController
} from 'ionic-angular';
import {GlobalsProvider} from "../../providers/globals/globals";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import {Calendar} from "@ionic-native/calendar";
import {CommentProvider} from "../../providers/comment/comment";
import {Camera} from "@ionic-native/camera";
import {SocialSharing} from "@ionic-native/social-sharing";
import {NewsPage} from "../news/news";
import * as moment from "moment";
import {GoodplanrestProvider} from "../../providers/goodplanrest/goodplanrest";
import {CacheProvider} from "../../providers/cache/cache";
import {File} from "@ionic-native/file";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Downloader } from '@ionic-native/downloader';
import {DownloadRequest, NotificationVisibility} from "@ionic-native/downloader";

import { FilesProvider } from "../../providers/files/files";


/**
 * Generated class for the GoodPlanDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-good-plan-details',
  templateUrl: 'good-plan-details.html',
})
export class GoodPlanDetailsPage {

    @ViewChild(Content) content: Content;
    
    private id: number;
    private currentEvent: any;
    private eventComments: any;
    private commentsItems = [];
    private page: number = 0;
    private showComments = false;
    private showParticipants = false;
    private withComments = false;
    private currentUser: any;
    toggled: boolean = false;
    toggledReply: boolean = false;
    private comment = {
        content: '',
        photo: null,
        document: null
    }

    private reply = {
        comment: null,
        content: '',
        photo: null,
        document: null
    }

    private participants: any;
    private showReply = false;

    public numberComments = 0;
    public restNumbreComment = 0;
    public restNumbreReplie = 0;
    public commentNumber = 0;
    public showPush: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public appGlobals: GlobalsProvider,
                public loader: LoadingController,
                public myAlert: AlertController,
                public appEvents: Events,
                public ga: GoogleAnalytics,
                public calendarPlugin: Calendar,
                public myModal: ModalController,
                public goodplanService: GoodplanrestProvider,
                public commentService: CommentProvider,
                private camera: Camera,
                public actionSheetCtrl: ActionSheetController,
                public toast: ToastController,
                public platform: Platform,
                public socialsharing: SocialSharing,
                public cacheService: CacheProvider,
                public file: File,
                private inAppBrowser: InAppBrowser,
                private fileChooser: FileChooser,
                private filepath: FilePath,
                private downloader: Downloader,
                private filesProvider : FilesProvider) 
    {

        this.id = this.navParams.get('id');
        this.appGlobals.onEventDetails = true;
        this.appGlobals.currentPageTitle = this.navParams.get('title');
        this.withComments = this.navParams.get('withComments');
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.showPush = navParams.get('pushNotification');
    }

    ionViewWillEnter() {
        this.appGlobals.showFooter = false;
        this.appGlobals.showHeader = false;
        this.appEvents.publish('updateFooter');
        this.commentsItems = [];
        this.page = 0;
        this.getDetailsGoodPlan();
        if (this.navParams.get('showComment')){
            this.showComments = this.navParams.get('showComment');
            this.commentsItems = this.navParams.get('commentList');
            this.id = this.navParams.get('id');
        }
    }
    handleSelection(event) {
        this.comment.content = this.comment.content + " " + event.char;
      }
      handleReply(event) {
        this.reply.content = this.reply.content + " " + event.char;
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
        this.appGlobals.onEventDetails = false;
    }

    getDetailsGoodPlan() {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.goodplanService.getDetailsGoodPlan(this.id).then(data => {
            this.currentEvent = data;
                this.platform.ready().then(() => {
                    let label = 'detail-article__'+this.currentEvent.id;
                    this.appEvents.publish("googleAnalytics", label);

                });
                this.numberComments = data.nbComments;
                if (this.withComments) {
                    this.showComments = true;
                    this.getEventComments(loadingPopup);
                } else {
                    loadingPopup.dismiss();
                }
            },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }

    like(event) {
        let label = 'participation-' + event.id;
        this.appEvents.publish("googleAnalytics", label);


        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        let result: any;
        this.goodplanService.takePart(event.id).then(data => {
                loadingPopup.dismiss();
                result = data;
                if (result.success) {
                    event.isParticipated = true;
                    event.nbParticipants++;
                    this.numberComments++;
                    this.refreshItem(this.currentEvent);
                    let addToCalendarAlert = this.myAlert.create({
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
        let label = 'cancelParticipation-' + this.currentEvent.id;
        this.appEvents.publish("googleAnalytics", label);

        let loadingPopup = this.loader.create({});
        let result: any;
        loadingPopup.present();
        this.goodplanService.cancelTakePart(event.id).then(data => {
                loadingPopup.dismiss();
                result = data;
                var start = moment(event.startAt).toDate();
                var end = moment(event.endAt).toDate();

                this.calendarPlugin.deleteEvent(event.title, event.place, '', start, end).then(
                    (msg) => { },
                    (err) => { }
                );

                if (result.success) {
                    let successAlert = this.myAlert.create({
                        title: 'Succès,',
                        subTitle: 'Votre annulation a été bien enregistrée.',
                        buttons: [
                            {
                                text: 'OK',
                                handler: () => {
                                    event.isParticipated = false;
                                    event.nbParticipants--;
                                    this.refreshItem(this.currentEvent);
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

    showHideContactBar() {
        this.appGlobals.goodPlanCreatorId = this.currentEvent.id;
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
        let result: any;
        this.goodplanService.takePart(event.id).then(data => {
                result = data;
                if (result.success) {
                    this.currentEvent = data.event;
                }
            },
            err => {
                this.appEvents.publish('http:errors', err);
            })

    }

    cancelParticipation(event) {
        let result: any;

        this.goodplanService.cancelTakePart(event.id).then(data => {
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
                    this.currentEvent = data.event;
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
                            localStorage.setItem("currentGoodPlan", event.id);
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
        this.commentService.getCommentsGoodPlan(this.currentEvent.id, this.page).then(data => {
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

    showHideParticipantsList(currentEvent) {
        if (this.showParticipants == false) {
            this.getParticipants(currentEvent.id);
            this.showComments = false;
            this.showParticipants = true;
        } else {
            this.showParticipants = false;
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
            this.commentService.postCommentsGoodPlan(this.currentEvent.id, this.comment).then(data => {
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
                    this.refreshItem(this.currentEvent);
                },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                });
        }
    }

    refreshItem(item) {
        this.cacheService.refreshItem(item, 'goodplan.events');
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
        this.commentService.deleteGoodPlanComment(comment.id).then(data => {
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
        this.commentService.deleteGoodPlanCommentReply(comment.id).then(data => {
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
            this.commentService.postGoodPlanCommentReply(this.reply.comment, this.reply).then(data => {
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
        this.participants = this.currentEvent.participants;
        this.content.scrollToBottom();
    }

    showMoreComments() {
        this.page++;
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.commentService.getCommentsGoodPlan(this.currentEvent.id, this.page).then(data => {
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
                    text: 'Choisir un document (Pdf, Doc, Docx ...)',
                    handler: () => {
                        this.presentActionSheetDocument(type);
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

    public presentActionSheetDocument(type) {
		this.filesProvider.presentFileChooser(
			base64 => {
				if(type == 'comment') {
                    this.comment.document = base64;
                }else {
                    this.reply.document   = base64;
                }
			},
			failure => {
				document.getElementById("fileInput").click(); 
			}
		)
    }

    onFileChange(event,type) {
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            if(file.size > 5242880)
            {
                this.filesProvider.generateFileSizeError();
            }
            else
            {
                reader.onload = () => {
                    const mimeTypeAllowed = this.filesProvider.allowedMimeType(reader.result);
                    
                    if( mimeTypeAllowed )
                    {
                        if(type == 'comment'){
                            this.comment.document = reader.result;

                        } else {
                            this.reply.document = reader.result;
                        }

                    }else {
                        this.filesProvider.generateMimeTypeError();
                    }


                };
            }

        }
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
                subTitle: 'Vous avez déjà fait une demande de covoiturage pour cet évènement.',
                buttons: ['fermer']
            });
            alert.present();
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

  ionViewDidLoad() {
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
