import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {EventDetailsPage} from "../event-details/event-details";
import {AssociationProvider} from "../../providers/association/association";
import {GlobalsProvider} from "../../providers/globals/globals";
import {ArticleProvider} from "../../providers/article/article";
import {DetailArticlePage} from "../detail-article/detail-article";
import {CommentProvider} from "../../providers/comment/comment";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {CacheProvider} from "../../providers/cache/cache";
/**
 * Generated class for the CommercialSheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-association-sheet',
    templateUrl: 'association-sheet.html',
})
export class AssociationSheetPage {

    private id: any;
    private name: any;
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



    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public associationService: AssociationProvider,
        public loader: LoadingController,
        public appEvents: Events,
        public appGlobals: GlobalsProvider,
        public articleService: ArticleProvider,
        public commentService: CommentProvider,
        private modal: ModalController,
        public serviceEvent: EventsrestProvider,
        public event: Events,
        public cacheService: CacheProvider,) {
        this.id = this.navParams.get('id');
        this.name = this.navParams.get('name');
        this.showPush = navParams.get('pushNotification');
        this.associationId = this.navParams.get('id');
        this.page = 1;
    }

    ionViewWillEnter() {
        this.appGlobals.showFooter = true;
        this.appGlobals.showHeader = false;
        this.appGlobals.currentPageTitle = this.name;
        this.appGlobals.currentPageLogo = null;
        this.appEvents.publish('updateFooter');
        this.items = [];
        this.page = 1;
        this.getCurrentAssociationDetails();
    }

    ionViewWillLeave() {
        this.page = 1;
        this.items = [];
        this.appGlobals.showFooter = true;
        this.appGlobals.showHeader = true;
    }

    ionViewDidEnter() {
        if(this.appGlobals.currentPageid == "agenda"){
            this.appGlobals.currentPageid = "agenda";
        }else{
            this.appGlobals.currentPageid = "news";
        }
        this.event.publish('updateFooter');
    }

    getCurrentAssociationDetails() {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.associationService.getDetails(this.id).then(data => {
            this.association = data;
            this.getAssociationArticle(loadingPopup);
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }

    getAssociationArticle(loadingPopup) {
        let page = 1;
        this.articleService.findAssociationArticles(this.associationId, page).then(data => {
            this.articles = data[0];

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

    detailsArticleComment(article) {
        let loadingPopup = this.loader.create({});
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
                this.appEvents.publish('http:errors', err);
            });
    }

    like(article) {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.articleService.like(article).then(data => {
                let index = this.items.findIndex(i => i.id == article);
                if (index != -1) {
                    this.items[index].isLiked = true;
                    this.items[index].nbLikes++;
                }
                
        loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            })
    }

    unlike(article) {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.articleService.unlike(article).then(data => {
                let index = this.items.findIndex(i => i.id == article);
                if (index != -1) {
                    this.items[index].isLiked = false;
                    this.items[index].nbLikes--;
                }
                loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            })
    }

    goBack() {
            this.navCtrl.pop();
    }

    doInfinite(infiniteScroll) {
        if(this.allowInfiniteScroll == false) {
            infiniteScroll.complete();

        }else{
            this.page += 1;
            this.articleService.findAssociationArticles(this.id, this.page).then(data => {
                    if(data[0].length == 0){
                        this.allowInfiniteScroll = false;
                        infiniteScroll.complete();
                    }else {
                        this.articles = data[0];
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

    linkto() {
        this.navCtrl.push(EventDetailsPage);
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

    showMembershipPopUp(id)
    {
        const myModal2 = this.modal.create('PopinMembershipAssociationPage', {id:id}, {cssClass: 'style-modal choice-modal'});
        myModal2.onDidDismiss(() => {
        });
        myModal2.present();
    }
}
