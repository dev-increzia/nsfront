import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {UserProvider} from "../../providers/user/user";
import {NumberPage} from "../../pages/number/number";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the EmergencyPhonesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
    selector: 'page-emergency-phones',
    templateUrl: 'emergency-phones.html',
})
export class EmergencyPhonesPage {
    public emergency: any;
    private currentUser: any;

    constructor(public event: Events,
        public globals: GlobalsProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        public appEvents: Events,
        public serviceEvent: EventsrestProvider,
        public userService: UserProvider,
        public alertCtrl: AlertController) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.emergency = navParams.get('numbers');

    }

    ionViewWillEnter() {
        this.globals.currentPageTitle = "Acteurs locaux";
        this.globals.showHeader = false;
        this.event.publish('updateFooter');

    }


    goBack() {
        this.navCtrl.pop();
    }

    showNumbers(item) {
        this.navCtrl.push(NumberPage, {
            emergencyPhones: item
        });
    }
}
