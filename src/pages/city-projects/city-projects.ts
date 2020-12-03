import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {ArticleProvider} from "../../providers/article/article";
import {CommentProvider} from "../../providers/comment/comment";
import {DetailArticlePage} from "../../pages/detail-article/detail-article";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the CityProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-city-projects',
    templateUrl: 'city-projects.html',
})
export class CityProjectsPage {

    private items = [];
    private page: number = 1;
    private articles: any;
    private city = [];
    private currentUser: any;
    private cities = [];
    public comment = [];
    public numberComments = 0;
    public eventParticipted = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public appGlobals: GlobalsProvider,
        public loader: LoadingController,
        public appEvents: Events,
        public serviceEvent: EventsrestProvider,
        public commentService: CommentProvider,
        private modal: ModalController,
        public alertCtrl: AlertController,
        public articleService: ArticleProvider) {
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;
        this.appEvents.publish('updateFooter');
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.cities = [];
        if (this.currentUser.other_cities) {
            for (let c of this.currentUser.other_cities) {
                this.cities.push(c);
            }
        }
        this.cities.push(this.currentUser.primary_city);
        this.city = this.currentUser.primary_city.id;
        this.getCityHallArticles();
    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
    }

    goBack() {
        this.navCtrl.pop();
    }

    getCityHallArticles() {
        let loadingPopup = this.loader.create({});
        loadingPopup.present()
        this.items = [];
        this.page = 1;
        this.articleService.findCityHallWallArticles(this.city, this.page).then(data => {
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

    doInfinite(infiniteScroll) {
        this.page += 1;
        this.articleService.findCityHallWallArticles(this.city, this.page).then(data => {
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

    doRefresh(refresher) {
        this.page = 1;
        this.articleService.findCityHallWallArticles(this.city, this.page).then(data => {
            this.items = [];
            this.articles = data;
            for (let article of this.articles) {
                this.items.push(article);
            }
            refresher.complete();
        },
            err => {
                this.appEvents.publish('http:errors', err);
                refresher.complete();
            });
    }

    filterCities() {
        this.getCityHallArticles();
    }

    like(article) {

        this.articleService.like(article).then(() => {
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

        this.articleService.unlike(article).then(() => {
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
    refreshNbreComments(currentArticle) {
        let loadingPopup = this.loader.create({});
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
                this.appEvents.publish('http:errors', err);
            });
    }
    editArticle(article, accountType, accountId) {
        const myModal2 = this.modal.create('EditPublishPage', { "article": article, "accountType": accountType, "accountId": accountId }, { cssClass: 'style-modal' });
        myModal2.onDidDismiss((data) => {
            if (data == true) {
                this.items = [];
                this.page = 1;
                this.getCityHallArticles();
            }
        });
        myModal2.present();

    }


}
