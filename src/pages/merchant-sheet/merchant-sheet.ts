import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {EventDetailsPage} from "../event-details/event-details";
import {MerchantProvider} from "../../providers/merchant/merchant";
import {GlobalsProvider} from "../../providers/globals/globals";
import {ArticleProvider} from "../../providers/article/article";
import {DetailArticlePage} from "../detail-article/detail-article";
import {CommentProvider} from "../../providers/comment/comment";
import {NewsPage} from "../../pages/news/news";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
/**
 * Generated class for the CommercialSheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-merchant-sheet',
    templateUrl: 'merchant-sheet.html',
})
export class MerchantSheetPage {

    private id: any;
    private name: any;
    private merchant: any;
    private page: number = 0;
    private articles: any;
    private items = [];
    public comment: any;
    public numberComments = 0;
    public showPush: any;
    public currentUser: any;


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public merchantService: MerchantProvider,
        public serviceEvent: EventsrestProvider,
        public loader: LoadingController,
        public myAlert: AlertController,
        public appEvents: Events,
        public myModal: ModalController,
        public commentService: CommentProvider,
        public appGlobals: GlobalsProvider,
        public articleService: ArticleProvider,
        public alertCtrl: AlertController) {

        this.id = this.navParams.get('id');
        this.name = this.navParams.get('name');
        this.showPush = navParams.get('pushNotification');


    }

    ionViewWillEnter() {
        this.appGlobals.showFooter = true;
        this.appGlobals.showHeader = false;
        this.appEvents.publish('updateFooter');
        this.appGlobals.currentPageTitle = this.name;
        this.appGlobals.currentPageLogo = null;
        this.items = [];
        this.page = 0;
        this.getCurrentMerchantDetails();
    }

    ionViewWillLeave() {
        this.appGlobals.showFooter = true;
    }

    getCurrentMerchantDetails() {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.merchantService.getDetails(this.id).then(data => {
            this.merchant = data;
            this.getMerchantArticle(loadingPopup);
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }

    getMerchantArticle(loadingPopup) {
        this.page = 0;
        this.articleService.findMerchantArticles(this.id, this.page).then(data => {
            this.articles = data;
            for (let article of this.articles) {
                this.items.push(article);
            }
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
        // Show the popup
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

        this.articleService.like(article).then(data => {
                let index = this.items.findIndex(i => i.id == article);
                if (index != -1) {
                    this.items[index].isLiked = true;
                    this.items[index].nbLikes++;
                }
        },
            err => {
                this.appEvents.publish('http:errors', err);
            })
    }

    unlike(article) {

        this.articleService.unlike(article).then(data => {
                let index = this.items.findIndex(i => i.id == article);
                if (index != -1) {
                    this.items[index].isLiked = false;
                    this.items[index].nbLikes--;
                }
        },
            err => {
                this.appEvents.publish('http:errors', err);
            })
    }

    goBack() {
        if (this.showPush) {
            this.navCtrl.setRoot(NewsPage);
        } else {
            this.navCtrl.pop();
        }
    }

    doInfinite(infiniteScroll) {
        this.page += 1;
        this.articleService.findMerchantArticles(this.id, this.page).then(data => {
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

    linkTo() {
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

}
