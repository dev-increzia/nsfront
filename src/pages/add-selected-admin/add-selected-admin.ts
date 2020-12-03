import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams, ViewController} from "ionic-angular";

/**
 * Generated class for the AddSelectedAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-selected-admin',
    templateUrl: 'add-selected-admin.html',
})
export class AddSelectedAdminPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    }

    closeModal() {
        this.view.dismiss();
    }
}
