import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {UserProvider} from "../../providers/user/user";
import {NumberPage} from "../../pages/number/number";
import {AssociationListPage} from "../../pages/association-list/association-list";
import {MerchantListPage} from "../../pages/merchant-list/merchant-list";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
/**
 * Generated class for the NumberCategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-number-category',
    templateUrl: 'number-category.html',
})
export class NumberCategoryPage {

    private categories: any;
    public currentUser: any;
    public idHeading : number;
    public community : any;
    public pageTitle : string;
    constructor(public event: Events,
        public globals: GlobalsProvider,
        public navCtrl: NavController,
        public serviceEvent: EventsrestProvider,
        public navParams: NavParams,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        public userService: UserProvider,
        private loadingCtrl: LoadingController) {
        this.globals.currentPageTitle = "Acteurs locaux";
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.idHeading = navParams.get('data');
        this.pageTitle = navParams.get('name');
        this.community = JSON.parse(localStorage.getItem('currentCommunity'));
        this.userService.findLocalActor(this.idHeading).then(data => {
            this.categories = data;
            loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }

    deciedAction(item) {
        if(item.name == 'Groupes/Associations')
        {
            this.associationsList(this.community);
        }else if(item.name == 'Commerces/Partenaires'){
            this.merchantsList(this.community);
        }else {
            this.showNumbers(item);
        }
    }

    showNumbers(item) {
        this.navCtrl.push(NumberPage, {
            category: item,
            categories: this.categories
        });
    }

    ionViewWillEnter() {
        this.globals.currentPageTitle = "Acteurs locaux";
        this.globals.showHeader = false;

    }

    associationsList(community) {
        this.navCtrl.push(AssociationListPage, {
            community: community
        });
    }

    merchantsList(community) {
        this.navCtrl.push(MerchantListPage, {
            community: community
        });
    }

    goBack() {
        this.navCtrl.pop();
    }
}
