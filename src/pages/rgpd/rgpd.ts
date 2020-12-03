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
    selector: 'page-rgpd',
    templateUrl: 'rgpd.html',
})
export class RgpdPage {

    public currentUser: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        public appEvents: Events,
        public serviceEvent: EventsrestProvider,
        public appGlobals: GlobalsProvider) {
        this.appGlobals.showHeader = false;
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
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
