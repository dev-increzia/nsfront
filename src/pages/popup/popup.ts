import {Component} from "@angular/core";
import {AlertController, IonicPage, NavController, NavParams, ViewController} from "ionic-angular";
import "rxjs/add/operator/map";
/**
 * Generated class for the PopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-popup',
    templateUrl: 'popup.html',
})
export class PopupPage {
    public message: any;


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private view: ViewController,
        public alertCtrl: AlertController) {

        this.message = navParams.get('message');
    }

    Close() {
        this.view.dismiss();
    }

}
