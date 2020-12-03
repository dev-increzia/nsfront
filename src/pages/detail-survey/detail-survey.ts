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
import {NewsPage} from "../../pages/news/news";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {SocialSharing} from "@ionic-native/social-sharing";
import {SurveyProvider} from "../../providers/survey/survey";

/**
 * Generated class for the DetailArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-detail-survey',
    templateUrl: 'detail-survey.html',
    providers: [SurveyProvider]
})
export class DetailSurveyPage {

    @ViewChild(Content) content: Content;
    public items = [];
    public userId: any;
    public type: any;
    public id: any;
    public currentArticle: any;
    public articleId: any;
    public showPush: any;

    public currentUser: any;
    public idUsers: any;

    constructor(
        public event: Events,
        public articleService: ArticleProvider,
        public commentService: CommentProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        public surveyService: SurveyProvider,
        public serviceEvent: EventsrestProvider,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public appGlobals: GlobalsProvider,
        public platform: Platform,
        public socialsharing: SocialSharing) {
        this.appGlobals.showHeader = false;
        this.event.publish('user:current');
        this.idUsers = JSON.parse(localStorage.getItem("tableUser"));
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.showPush = navParams.get('pushNotification');
        if (navParams.get('article')) {
            this.currentArticle = navParams.get('article');
            this.articleId = this.currentArticle.id;
        } else {
            this.articleId = navParams.get('articleId');
        }

    }


    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.currentArticle = this.navParams.get('article');
        this.appGlobals.showFooter = true;
        this.event.publish('updateFooter');

    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
    }

    capitalizeData(data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

    news() {
        this.navCtrl.setRoot(NewsPage);
    }

    choiceSelected(id,questionAnswer) {
        if (!questionAnswer) {
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            let result: any;
            this.surveyService.postAnswerSurvey(id,this.currentArticle).then(data => {
                    loadingPopup.dismiss();
                    result = data;
                    if (result.success) {
                        this.currentArticle = JSON.parse(result.article);
                        this.event.publish('news:refresh');
                    }
                },
                err => {
                    loadingPopup.dismiss();
                    this.event.publish('http:errors', err);
                });
        }
    }

    goBack() {
        if (this.showPush) {
            this.navCtrl.setRoot(NewsPage);
        } else {
            this.navCtrl.pop();
        }
    }
}
