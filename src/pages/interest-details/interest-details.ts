import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams, ViewController} from "ionic-angular";
import {CallNumber} from "@ionic-native/call-number";

/**
 * Generated class for the InterestDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-interest-details',
    templateUrl: 'interest-details.html',
})
export class InterestDetailsPage {

    public interest: any;
    constructor(private callNumber: CallNumber,
        public navCtrl: NavController,
        public navParams: NavParams,
        private view: ViewController) {

        this.interest = navParams.get("interest");
    }

    close() {
        this.view.dismiss();
    }

    call(number) {
        this.callNumber.callNumber(number, true);
    }
}
