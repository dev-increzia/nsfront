import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-cgu',
    templateUrl: 'cgu.html',
})
export class CguPage {

    public currentUser: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        public appEvents: Events,
        public serviceEvent: EventsrestProvider,
        public appGlobals: GlobalsProvider) {
        this.appGlobals.showHeader = true;
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
    }

    goBack() {
        this.navCtrl.pop();
    }
}
