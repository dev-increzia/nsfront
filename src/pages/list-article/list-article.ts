import {Component} from "@angular/core";
import {
    AlertController,
    Events,
    LoadingController,
    ActionSheetController,
    ModalController,
    NavController,
    NavParams,
    ToastController
} from "ionic-angular";
import {ArticleProvider} from "../../providers/article/article";
import {CommentProvider} from "../../providers/comment/comment";
import {DetailArticlePage} from "../../pages/detail-article/detail-article";
import {MerchantSheetPage} from "../merchant-sheet/merchant-sheet";
import {AssociationSheetPage} from "../association-sheet/association-sheet";
import {GlobalsProvider} from "../../providers/globals/globals";
import {EventDetailsPage} from "../event-details/event-details";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {CacheProvider} from "../../providers/cache/cache";
import {SocialSharing} from "@ionic-native/social-sharing";
import {DetailSurveyPage} from "../detail-survey/detail-survey";

/**
 * Generated class for the ListArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-list-article',
    templateUrl: 'list-article.html',
})
export class ListArticlePage {

    public shownGroup = null;
    public currentPageTitle: any;
    public state: null;
    public items = [];
    private page: number = 0;
    private init = false;

    public account: any;
    public associationId: any;
    public accountImg: any;
    public articles: any;
    public repSucces: any = {
        success: false
    };

    public merchantId: any;
    public merchantImg: any;

    public currentUser: any;
    public comment = [];
    public numberComments = 0;
    public cacheLifeTime = 3600;
    private allowInfiniteScroll = true;
    public survey :boolean = false;

    constructor(public commentService: CommentProvider,
        public toastCtrl: ToastController,
        private modal: ModalController,
        public event: Events,
        public appEvents: Events,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        public serviceEvent: EventsrestProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public articleService: ArticleProvider,
        private loadingCtrl: LoadingController,
        public actionSheetController: ActionSheetController,
        public appGlobals: GlobalsProvider,
        public alertCtrl: AlertController,
        public cacheService: CacheProvider,

        public socialsharing: SocialSharing) {
        this.appGlobals.showHeader = false;
        this.account = navParams.get('account');
        this.survey = navParams.get('survey');
        if (this.account.type == 'association' || this.account.type == 'community') {
            this.associationId = this.account.id;
            this.accountImg = this.account.image_url;
            this.page = 1;

            this.event.unsubscribe('association:cache');
            this.event.subscribe('association:cache', data => {
                this.page = data[0];
                this.items = data[1];
                this.articles = data[2];
                this.cacheLifeTime = data[3];
                this.allowInfiniteScroll = !data[2] || data[2] && data[2].length;
            });

            this.event.unsubscribe('association:refresh');
            this.event.subscribe('association:refresh', () => {
                this.page = 1;
                if (this.account.type == 'association') {
                    this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime, 'association', this.account, true);
                }
                else if(this.account.type == 'community'){
                    if( navParams.get('survey')){
                        this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime, 'surveyArticle', this.account, true);
                    }
                    else {
                        this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime, 'communityArticle', this.account, true);
                    }
                }
            });
        }
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;
        this.items = [];
        this.page = 1;
        this.init = true;
        this.getArticles();
        this.appEvents.publish('updateFooter');
        this.appGlobals.onNegativeTopSearch = true;

    }
    ionViewWillLeave(){
        this.appGlobals.onNegativeTopSearch = false;
    }
    ionViewDidEnter() {
        this.appEvents.publish('updateFooter');
    }
    public homePage() {
    }

    detailsSurvey(article) {
        this.navCtrl.push(DetailSurveyPage, {
            article: article
        });
    }

    Open(id) {
        localStorage.setItem("currentArticle", id);
        const myModal2 = this.modal.create('DetailsArticlePage');
        myModal2.present();
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

    showToastWithCloseButton(id) {
        const toast = this.toastCtrl.create({
            message: 'Vous avez modifié l\'état de cet article',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    }
    async deleteArticleNotParent(item : any ){

        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Cet article',
              icon: 'ios-backspace',
              handler: () => {
                this.deleteArticleAlert(item);
              }
            }, { 
              text: 'Cet article et les articles à venir',
              icon: 'trash',
              handler: () => {
                this.deleteArticleAlertCild(item , 'currentAndNext');
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

    deleteArticleAlert(article) {
        let alert = this.alertCtrl.create({
            title: 'Supprimer Article',
            subTitle: 'Voulez-vous vraiment supprimer cet article?',
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
                        this.deleteArticle(article,'current');
                    }
                }
            ]
        });
        alert.present();
    }

    deleteArticleAlertCild(article,model) {
        let alert = this.alertCtrl.create({
            title: 'Supprimer Article',
            subTitle: 'Voulez-vous vraiment supprimer cet article et les article à venir?',
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
                        this.deleteArticle(article,model);
                    }
                }
            ]
        });
        alert.present();
    }

    deleteArticle(article,mode) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.articleService.deleteArticle(article.id,mode).then(data => {
                this.event.publish('association:refresh');
                this.event.publish('news:refresh');
            loadingPopup.dismiss();
            let toast = this.toastCtrl.create({
                message: 'Article supprimé avec succès',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }

    addArticle(account) {
        const myModal2 = this.modal.create('PublishPage', { "account": account, "accountType": account.type }, { cssClass: 'style-modal  publish-modal' });
        myModal2.onDidDismiss(data => {
            this.items = [];
            this.page = 1;
            this.getArticles();
            this.appGlobals.showHeader = false;

        });
        myModal2.present();
    }


    updateStatusArticle(article) {
        if (article.enabled) {
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            article.enabled = true;
            this.articleService.activateArticle(article.id).then(data => {
                    this.event.publish('association:refresh');
                    this.event.publish('news:refresh');
                loadingPopup.dismiss();
                let toast = this.toastCtrl.create({
                    message: 'Article activé avec succès',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            },
                err => {
                    loadingPopup.dismiss();
                    this.event.publish('http:errors', err);
                });
        } else {
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            article.enabled = false;
            this.articleService.desactivateArticle(article.id).then(data => {
                    this.event.publish('association:refresh');
                    this.event.publish('news:refresh');
                loadingPopup.dismiss();
                let toast = this.toastCtrl.create({
                    message: 'Article désactiver avec succès',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            },
                err => {
                    loadingPopup.dismiss();
                    this.event.publish('http:errors', err);
                });
        }
    }

    getArticles() {
        if (this.account.type == 'association') {
            this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime,'association',this.account);
        }
        else if(this.account.type == 'community'){
            if( this.navParams.get('survey')){
                this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime,'surveyArticle',this.account);
            }
            else {
                this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime,'communityArticle',this.account);
            }
        }
    }
    loadArticles() {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        if (this.account.type == 'association') {
            this.articleService.findAssociationArticles(this.associationId, this.page).then(data => {
                this.articles = data;
                for (let article of this.articles) {
                    this.items.push(article);
                }
                loadingPopup.dismiss();
            },
                err => {
                    loadingPopup.dismiss();
                    this.event.publish('http:errors', err);
                });

        } else if (this.account.type == 'merchant') {
            this.articleService.findMerchantArticles(this.merchantId, this.page).then(data => {
                this.articles = data;
                for (let article of this.articles) {
                    this.items.push(article);
                }

                loadingPopup.dismiss();
            },
                err => {
                    loadingPopup.dismiss();
                    this.event.publish('http:errors', err);
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
                this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime,'association',this.account,false,infiniteScroll);
            }
            else if(this.account.type == 'community'){
                if( this.navParams.get('survey')){
                    this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime,'surveyArticle',this.account,false,infiniteScroll);
                }
                else {
                    this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime,'communityArticle',this.account,false,infiniteScroll);
                }
            }
            else if (this.account.type == 'merchant') {
                this.articleService.findMerchantArticles(this.merchantId, this.page).then(data => {
                        this.articles = data;
                        for (let article of this.articles) {
                            this.items.push(article);
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
    comments(article) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();

        return new Promise(resolve => {
            this.commentService.markCommentsArticleAsRead(article.id).then(data => {
                article.unread_comments = 0;
                loadingPopup.dismiss();
            },
                err => {
                    loadingPopup.dismiss();
                    this.event.publish('http:errors', err);
                });
        });

    }

    detailsArticle(article) {
        this.navCtrl.push(DetailArticlePage, {
            article: article
        });
    }

    detailsArticleComment(article) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.commentService.getCommentsArticlePagination(article.id, 0).then(data => {
            this.comment = data;
            this.numberComments = article.nbreComments;
            loadingPopup.dismiss();
            this.navCtrl.push(DetailArticlePage, {
                article: article,
                comment: this.comment,
                numberComments: this.numberComments,
                showComments: true
            });
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });

    }
    refreshNbreComments(currentArticle) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.articleService.getDetailsArticle(currentArticle).then(data => {
            let index = this.items.findIndex(i => i.id == currentArticle);
            if (index != -1) {
                this.items[index].nbreComments = data.nbreComments;
            }
            loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }

    openAssociation(association, name) {
        this.navCtrl.push(AssociationSheetPage, {
            id: association,
            name: name
        })
    }

    openMerchant(merchant, name) {
        this.navCtrl.push(MerchantSheetPage, {
            id: merchant,
            name: name
        })
    }

    like(article) {

        this.articleService.like(article).then(data => {
                let index = this.items.findIndex(i => i.id == article);
                if (index != -1) {
                    this.items[index].isLiked = true;
                    this.items[index].nbLikes++;
                }
            this.event.publish('association:refresh');
            this.event.publish('news:refresh');
        },
            err => {
                this.event.publish('http:errors', err);
            })
    }

    unlike(article) {

        this.articleService.unlike(article).then(data => {
                let index = this.items.findIndex(i => i.id == article);
                if (index != -1) {
                    this.items[index].isLiked = false;
                    this.items[index].nbLikes--;
                }
            this.event.publish('association:refresh');
            this.event.publish('news:refresh');
        },
            err => {
                this.event.publish('http:errors', err);
            })
    }



    capitalizeData(data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

    publish() {

    }

    editArticle(article) {
        const myModal2 = this.modal.create('EditPublishPage', { "article": article, "accountType": this.account.type, "accountId": this.account.id }, { cssClass: 'style-modal' });
        myModal2.onDidDismiss(data => {
            this.items = [];
            this.page = 1;
            this.getArticles();
            this.appGlobals.showHeader = false;
        });
        myModal2.present();

    }
    async editArticleNotParent(item : any ){
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Cet article',
              icon: 'create',
              handler: () => {
                this.editeNoteParentArticle(item , "current");
              }
            }, { 
              text: 'Cet article et les articles à venir',
              icon: 'ios-create',
              handler: () => {
                this.editeNoteParentArticle(item , "currentAndNext");
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
    editeNoteParentArticle(item : any, mode){
        const myModal2 = this.modal.create('PopupArtDuplicateDetailPage', { "article": item, "accountType": this.account.type, "accountId": this.account.id ,"mode":mode}, { cssClass: 'style-modal' });
        myModal2.onDidDismiss((data) => {
            if (data == true) {
                this.items = [];
                this.page = 1;
                this.getArticles();
            }
        }); 
        myModal2.present();

    }

    linkTo() {
        this.navCtrl.push(MerchantSheetPage);
    }

    goBack() {
        this.navCtrl.pop();
    }

    detailsEvent(eventId, title, withComments, moderateEvent) {
        if (moderateEvent == 'wait') {
            let errorAlert = this.alertCtrl.create({
                subTitle: 'Cet événement est en attente',
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

            this.navCtrl.push(EventDetailsPage, {
                id: eventId,
                title: title,
                withComments: withComments
            });
        }
    }

    ShareArticle(item: any){
        let options = {
            message: item.title+" : "+item.description,
            subject: "NOUS Ensemble",
            image: item.imageURL,
            url: item.imageURL
        };
        this.socialsharing.shareWithOptions(options).then(data =>{
        }).catch( error =>{
            console.log("Error from sharing"+ error)
        });

    }
    doRefreshNews(refresher) {
        this.page = 1;
        if (this.account.type == 'association') {
            this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime,'association',this.account,true,null,refresher);
        }
        else if(this.account.type == 'community'){
            if( this.navParams.get('survey')){
                this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime,'surveyArticle',this.account,true,null,refresher);
            }
            else {
                this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime,'communityArticle',this.account,true,null,refresher);
            }
        }

    }
}
