import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {AssociationProvider} from "../../providers/association/association";
import {AssociationSheetPage} from "../association-sheet/association-sheet";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
/**
 * Generated class for the AssociationListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-association-list',
    templateUrl: 'association-list.html',
})
export class AssociationListPage {

    public associations = [];
    private page: number = 1;
    public currentUser: any;
    public community : any;

    constructor(public event: Events,
        public serviceEvent: EventsrestProvider,
        public globals: GlobalsProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public assoiationService: AssociationProvider,
        private loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {

        this.globals.currentPageTitle = "Associations";
        this.community = JSON.parse(localStorage.getItem('currentCommunity'));
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.assoiationService.getAllAssociationsByCommunity(this.page, this.community.id).then(data => {
            for (let assoc of data) {
                this.associations.push(assoc);
            }
            loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }

    doInfinite(infiniteScroll) {
        this.page += 1;
        this.assoiationService.getAllAssociationsByCities(this.page).then(data => {
            for (let assoc of data) {
                this.associations.push(assoc);
            }
            infiniteScroll.complete();
        },
            err => {
                infiniteScroll.complete();
            });
    }

    openAssociation(association, name) {
        this.navCtrl.push(AssociationSheetPage, {
            id: association,
            name: name
        })
    }
    capitalizeData(data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

    ionViewWillEnter() {
        this.globals.currentPageTitle = "Acteurs locaux";
        this.globals.showHeader = false;
        this.globals.showFooter = true;
        this.event.publish('updateFooter');

    }

    goBack() {
        this.navCtrl.pop();
    }





}
