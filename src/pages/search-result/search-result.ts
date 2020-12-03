import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {UserProvider} from "../../providers/user/user";
import {MerchantSheetPage} from "../merchant-sheet/merchant-sheet";
import {AssociationSheetPage} from "../association-sheet/association-sheet";
import {DetailArticlePage} from "../detail-article/detail-article";
import {EventDetailsPage} from "../event-details/event-details";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {CommentProvider} from "../../providers/comment/comment";
import {GoodPlanDetailsPage} from "../good-plan-details/good-plan-details";
/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-search-result',
    templateUrl: 'search-result.html',
})
export class SearchResultPage {

    public searchCriteria: any;
    public result: any;
    public cities = [];
    public currentUser: any;
    public selectedCities = 'all';
    public comment: any;
    public numberComments: number;
    public eventParticipted = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public appGlobals: GlobalsProvider,
        public myAlert: AlertController,
        public serviceEvent: EventsrestProvider,
        public commentService: CommentProvider,
        public loader: LoadingController,
        public appEvents: Events,
        public myModal: ModalController,
        public eventListner: Events,
        public userService: UserProvider) {

        this.appGlobals.currentPageTitle = "Résultat";

        this.appGlobals.currentPageid = "search-result";
        this.searchCriteria = this.navParams.get("criteria");
        this.result = this.navParams.get("result");
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        /*for (let c of this.currentUser.other_cities) {
            this.cities.push(c);
        }
        this.cities.push(this.currentUser.primary_city);
        this.selectedCities.push(this.currentUser.primary_city.id);*/
    }

    filterSearchCities() {
        if (this.searchCriteria.event == false &&
            this.searchCriteria.article == false &&
            this.searchCriteria.account == false &&
            this.searchCriteria.goodplans == false) {
            let errorAlert = this.myAlert.create({
                title: "Erreur",
                subTitle: "Cliquez sur au moins une des 4 icônes groupes/établissements, articles, événements ou bons plans",
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
            this.userService.search(this.searchCriteria, this.selectedCities).then(data => {
                loadingPopup.dismiss();
                this.result = data;
            },
                err => {
                    loadingPopup.dismiss();
                    this.eventListner.publish('http:errors', err);
                });
        }
    }

    quitSearchResult() {
        this.navCtrl.pop();
    }

    // search filter
    searchEvent() {
        this.searchCriteria.event = !this.searchCriteria.event;
        this.filterSearchCities();
    }

    searchGoodPlans() {
        this.searchCriteria.goodplans = !this.searchCriteria.goodplans;
        this.filterSearchCities();
    }

    searchArticle() {
        this.searchCriteria.article = !this.searchCriteria.article;
        this.filterSearchCities();
    }

    searchAccount() {
        this.searchCriteria.account = !this.searchCriteria.account;
        this.filterSearchCities();
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;
        this.appEvents.publish('updateFooter');

    }
    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
    }

    detailsMerchant(merchant) {
        this.navCtrl.push(MerchantSheetPage, {
            id: merchant.id,
            name: merchant.name
        })
    }


    detailsAssociation(association) {
        this.navCtrl.push(AssociationSheetPage, {
            id: association.id,
            name: association.name
        })
    }

    detailsArticle(article) {
        this.navCtrl.push(DetailArticlePage, {
            article: article
        });
    }

    detailsEvent(eventId) {
        this.navCtrl.push(EventDetailsPage, {
            id: eventId
        });
    }

    detailsGoodplan(eventId) {
        this.navCtrl.push(GoodPlanDetailsPage, {
            id: eventId
        });
    }
}
