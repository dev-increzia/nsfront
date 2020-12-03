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
import {CommentProvider} from "../../providers/comment/comment";
import {ArticleProvider} from "../../providers/article/article";
import {GlobalsProvider} from "../../providers/globals/globals";
import {CreateMerchantPage} from "../../pages/create-merchant/create-merchant";
import {NewsPage} from "../../pages/news/news";
import {MySpacePage} from "../../pages/my-space/my-space";
import {AgendaPage} from "../../pages/agenda/agenda";
import {Camera} from "@ionic-native/camera";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {SocialSharing} from "@ionic-native/social-sharing";
import {CacheProvider} from "../../providers/cache/cache"; 
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {File} from "@ionic-native/file";

import { Downloader } from '@ionic-native/downloader';
import {DownloadRequest, NotificationVisibility} from "@ionic-native/downloader";

import { FilesProvider } from "../../providers/files/files";


/**
 * Generated class for the DetailArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-detail-article',
    templateUrl: 'detail-article.html',
})
export class DetailArticlePage {

    @ViewChild(Content) content: Content;
    
    
    public comments: any;
    public commentsItem = [];
    public showComments: any;
    public items = [];
    public numberComments = 0;
    public userId: any;
    public type: any;
    public id: any; 
    toggled: boolean = false;
    toggledReply: boolean = false;
    public restNumbreComment = 0;
    public restNumbreReplie = 0;
    public commentNumber = 0;
    public showEditComment = false;
    public currentArticle: any;
    public articleId: any;
    public contentComment: any;
    public showPush: any;
    public comment = {
        content: '',
        photo: null,
        document: null
    };

    public editComment = {
        id: '',
        content: ''
    };
    public currentUser: any;
    public idUsers: any;
    private showReply = false;
    private reply = {
        comment: null,
        content: '',
        photo: null,
        document: null
    };
    private page: number = 0;
    public comment_allowed: boolean;

    constructor(
        public event: Events,
        public articleService: ArticleProvider,
        public commentService: CommentProvider,
        public navCtrl: NavController,
        private modal: ModalController,
        public navParams: NavParams,
        public appEvents: Events,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        public serviceEvent: EventsrestProvider,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        private camera: Camera,
        public actionSheetCtrl: ActionSheetController,
        public appGlobals: GlobalsProvider,
        public platform: Platform,
        public socialsharing: SocialSharing,
        public cacheService: CacheProvider,
        public file: File,
        private inAppBrowser: InAppBrowser,
        private downloader: Downloader,
        private filesProvider : FilesProvider ) 
    {
        this.appGlobals.showHeader = false;
        this.event.publish('user:current');
        this.idUsers = JSON.parse(localStorage.getItem("tableUser"));
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.showPush = navParams.get('pushNotification');
        this.showComments = navParams.get('showComments');
        this.comment_allowed = navParams.get('allowComment');
        if (navParams.get('article') && this.showComments) {
            this.currentArticle = navParams.get('article');
            this.numberComments = navParams.get('numberComments');
            this.comments = navParams.get('comment');
            for (let com of this.comments) {
                this.commentsItem.push(com);
            }
            this.items.push(this.currentArticle);
            this.articleId = this.currentArticle.id;
            this.countComment();
            this.platform.ready().then(() => {
                let label = 'detail-article__'+this.currentArticle.id;
                this.appEvents.publish("googleAnalytics", label);
            });
        } else if (navParams.get('article') && !this.showComments) {
            this.currentArticle = navParams.get('article');
            this.articleId = this.currentArticle.id;
            this.numberComments = this.currentArticle.nbreComments;
            this.loadArticleComment(this.articleId);
            this.platform.ready().then(() => {
                let label = 'detail-article__'+this.currentArticle.id;
                this.appEvents.publish("googleAnalytics", label);
            });
        } else {
            this.articleId = navParams.get('articleId');
            this.loadArticle(this.articleId);
        }

    }
    handleSelection(event) {
        this.comment.content = this.comment.content + " " + event.char;
      }
      handleReply(event) {
        this.reply.content = this.reply.content + " " + event.char;
      }
    countComment() {
        this.commentNumber = this.commentNumber + this.comments.length;
        for (let com of this.comments) {
            this.restNumbreReplie = this.restNumbreReplie + com.replies.length;
        }
        this.restNumbreComment = this.numberComments - (this.commentNumber + this.restNumbreReplie);
    }

    moreCountComment(comments) {
        this.commentNumber = this.commentNumber + comments.length;
        for (let com of comments) {
            this.restNumbreReplie = this.restNumbreReplie + com.replies.length;
        }
        if(this.numberComments - (this.commentNumber + this.restNumbreReplie) < 0){
            this.restNumbreComment = 0;
        }else{
            this.restNumbreComment = this.numberComments - (this.commentNumber + this.restNumbreReplie);
        }

    }
    dupliquer(item : any){
        
        const myModal2 = this.modal.create('DupliquerArticlePage',{ "article": item, "accountType": "accountType" }, { cssClass: 'style-modal' });
            myModal2.onDidDismiss(data => {
                
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
        if (this.platform.is('cordova')){
            this.socialsharing.shareWithOptions(options).then(data =>{
            }).catch( error =>{
                console.log("Error from sharing"+ error)
            });
        }

    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.currentArticle = this.navParams.get('article');
        this.comment_allowed = this.navParams.get('allowComment');
        if(this.currentArticle && this.currentArticle.type == 'community' && !this.currentArticle.addComments){
            this.appGlobals.showFooter = true;
        }else{
            this.appGlobals.showFooter = false;
        }
        if (this.showComments) {
            this.bottom();
        }
    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
    }

    bottom() {
        this.content.scrollToBottom();
    }
    /**
     * Ajouter commentaire
     */
    addComment() {
        if ((this.comment.content == '') ||
            (this.comment.content == null) ||
            (this.comment.content.length == 0) ||
            (!this.comment.content.replace(/\s/g, '').length)) {
            let errorAlert = this.alertCtrl.create({
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
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            this.commentService.postArticleComment(this.articleId, this.comment).then(data => {
                this.commentsItem = [];
                this.comment.content = null;
                this.comment.photo = null;
                this.comments = data;
                for (let com of this.comments) {
                    this.commentsItem.push(com);
                }
                this.currentArticle.nbreComments++;
                this.numberComments++;
                this.refreshItem(this.currentArticle);
                loadingPopup.dismiss();
                setTimeout(() => {
                    this.content.scrollToBottom();
                });
            },
                err => {
                    loadingPopup.dismiss();
                    this.event.publish('http:errors', err);
                });
        }

    }

    refreshItem(item) {
        this.cacheService.refreshItem(item, 'news.articles');
    }


    /**
     * Afficher alert pour répondre à un commentaire
     */
    showReplyForm(comment) {
        this.showReply = !this.showReply;
        this.reply.comment = comment.id;
    }


    deleteComment(comment) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.commentService.deleteArticleComment(comment.id).then(data => {
                let label = 'commentDeleted-' + comment.id;
                this.event.publish("googleAnalytics", label);
                this.commentsItem = [];
                this.page = 0;
                this.comments = data;
                for (let com of this.comments) {
                    this.commentsItem.push(com);
                }
                this.numberComments--;
                this.currentArticle.nbreComments--;
                this.refreshItem(this.currentArticle);
                loadingPopup.dismiss();
                setTimeout(() => {
                    this.content.scrollToBottom();
                });
                let toast = this.toastCtrl.create({
                    message: 'Commentaire supprimé avec succès.',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            },
            err => {
                this.event.publish('http:errors', err);
            }
        );
    }
    /**
     * supprimer une réponse sur un commentaire
     */
    deleteReplyComment(comment) {
        this.commentService.deleteArticleCommentReply(comment.id).then(data => {
            this.commentsItem = [];
            this.page = 0;
            this.loadComments(this.articleId);
            setTimeout(() => {
                this.content.scrollToBottom();
            });
            let toast = this.toastCtrl.create({
                message: 'Commentaire supprimé avec succès.',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        },
            err => {
                this.event.publish('http:errors', err);
            });
    }

    loadComments(articleId) {

        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.commentService.getCommentsArticlePagination(articleId, this.page).then(data => {
            this.comments = data;
            this.commentsItem = [];
            for (let com of this.comments) {
                this.commentsItem.push(com);
            }
            this.numberComments--;
            this.currentArticle.nbreComments--;
            this.refreshItem(this.currentArticle);
            loadingPopup.dismiss();
        },
            err => {
                this.event.publish('http:errors', err);
            });
    }

    /**
     * Afficher un alert de confirmation de suppression
     */
    deleteConfirmation(comment) {
        let alert = this.alertCtrl.create({
            title: 'Supprimer le commentaire',
            subTitle: 'Voulez-vous vraiment supprimer ce commentaire ?',
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
                        this.deleteComment(comment);
                    }
                }
            ]
        });
        alert.present();
    }

    /**
     * Afficher un alert de confirmation de suppression
     */
    deleteReplyConfirmation(comment) {
        let alert = this.alertCtrl.create({
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
                    handler: data => {
                        this.deleteReplyComment(comment);
                    }
                }
            ]
        });
        alert.present();
    }




    cancelFormEditComment() {
        this.showEditComment = false;
        this.editComment.content = this.contentComment;
    }



    capitalizeData(data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }


    like(article) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.articleService.like(article.id).then(() => {
            article.isLiked = true;
            article.nbLikes++;
            this.refreshItem(article);
            loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            })
    }

    unlike(article) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.articleService.unlike(article.id).then(() => {
            article.isLiked = false;
            article.nbLikes--;
            this.refreshItem(article);
            loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            })
    }


    createMerchant() {
        this.navCtrl.push(CreateMerchantPage);
    }

    news() {
        this.navCtrl.setRoot(NewsPage);
    }

    goBack() {
        if (this.showPush) {
            this.navCtrl.setRoot(NewsPage);
        } else {
            this.navCtrl.pop();
        }
    }

    editArticle(article, accountType, accountId) {
        const myModal2 = this.modal.create('EditPublishPage', { "article": article, "accountType": accountType, "accountId": accountId }, { cssClass: 'style-modal' });
        myModal2.onDidDismiss(data => {
            if (data == true) {
                this.goBack();
            } else {
                this.currentArticle = data;
                this.articleId = this.currentArticle.id;
            }

        });
        myModal2.present();

    }
    mySpace() {
        this.navCtrl.setRoot(MySpacePage);
    }
    agenda() {
        this.navCtrl.setRoot(AgendaPage);
    }
    showMoreComments() {
        this.page++;
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.commentService.getCommentsArticlePagination(this.articleId, this.page).then(data => {
            this.comments = data;
            for (let com of this.comments) {
                this.commentsItem.push(com);
            }
            this.moreCountComment(this.comments);
            loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }


    addReplyComment() {
        if ((this.reply.content == '') ||
            (this.reply.content == null) ||
            (this.reply.content.length == 0) ||
            (!this.reply.content.replace(/\s/g, '').length)) {
            let errorAlert = this.alertCtrl.create({
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
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            this.commentService.postArticleCommentReply(this.reply).then(data => {
                this.page = 0;
                this.reply.content = null;
                this.reply.photo = null;
                this.reply.comment = null;
                this.showReply = false;
                this.commentsItem = [];
                this.commentService.getCommentsArticlePagination(this.articleId, this.page).then(data => {
                    this.comments = data;
                    for (let com of this.comments) {
                        this.commentsItem.push(com);
                    }
                    this.currentArticle.nbreComments++;
                    this.numberComments++;

                    this.refreshItem(this.currentArticle);
                },
                    err => {
                        this.event.publish('http:errors', err);
                    });
                loadingPopup.dismiss();
                setTimeout(() => {
                    this.content.scrollToBottom();
                });
            },
                err => {
                    loadingPopup.dismiss();
                    this.event.publish('http:errors', err);
                });
        }
    }

    loadArticleComment(articleId) {
        this.commentsItem = [];
        this.commentService.getCommentsArticlePagination(articleId, this.page).then(data => {
            this.comments = data;
            for (let com of this.comments) {
                this.commentsItem.push(com);
            }
            this.countComment();
        },
            err => {
                this.event.publish('http:errors', err);
            });

    }

    loadArticle(articleId) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.articleService.getDetailsArticle(articleId).then(data => {
            this.currentArticle = data;
            this.currentArticle.city = this.currentArticle.cityName;
            this.commentsItem = [];
            this.numberComments = this.currentArticle.nbreComments;
                this.platform.ready().then(() => {
                    let label = 'detail-article__'+this.currentArticle.id;
                    this.appEvents.publish("googleAnalytics", label);

                });
            this.commentService.getCommentsArticlePagination(articleId, this.page).then(data => {
                this.comments = data;
                for (let com of this.comments) {
                    this.commentsItem.push(com);
                }
                this.countComment();
                loadingPopup.dismiss();
            },
                err => {
                    this.event.publish('http:errors', err);
                    loadingPopup.dismiss();
                });
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
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
                    this.reply.document = base64;
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
                    
		            if( mimeTypeAllowed ){
		                if(type == 'comment')
		                {
                            this.comment.document = reader.result;

                        } else {
                            this.reply.document = reader.result;
                        }
		            }
		            else {
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


    download(url) {
        let fileName = url.substring(url.lastIndexOf('/')+1);



        this.platform.ready().then(() => {
            this.file.externalRootDirectory + '/Download/'; 
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

    deleteDocument(type) {
        if (type == 'comment') {
            this.comment.document = null;
        } else {
            this.reply.document = null;
        }
    }

}
 
 
 

