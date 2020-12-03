import {Component, ViewChild} from "@angular/core";
import {Content, Events, NavController, NavParams, Platform} from "ionic-angular";
import {RegisterLastPage} from "../register-last/register-last";
import {HomePage} from "../home/home";

/**
 * Generated class for the RegisterFirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-register-first',
    templateUrl: 'register-first.html',
})

export class RegisterFirstPage {
    @ViewChild(Content) content: Content;

    private newUser: any;
    private submited = false;

    constructor(public navCtrl: NavController,
        public platform: Platform,
        public appEvents: Events,
        public navParams: NavParams) {
        this.newUser = this.navParams.get("newUser");

    }
    registerSecondStep(errorValidation) {
        this.submited = true;
        if (!errorValidation) {
            this.navCtrl.push(RegisterLastPage, {
                newUser: this.newUser
            });
        }
    }

    homePage() {
        this.navCtrl.push(HomePage);
    }
    checkFocus(element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;
            this.content.scrollTo(0, yOffset, 2000);
        }
    }
}
