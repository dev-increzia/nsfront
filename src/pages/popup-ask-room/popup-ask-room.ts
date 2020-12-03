import {Component} from "@angular/core";
import {AlertController, IonicPage, NavParams, ViewController} from "ionic-angular";
import {FormBuilder} from "@angular/forms";
import "rxjs/add/operator/map";

/**
 * Generated class for the PopupAskRoomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-popup-ask-room',
    templateUrl: 'popup-ask-room.html',
})
export class PopupAskRoomPage {

    public mail = {
        description: null,
    };
    public invalidDesc:boolean = false;
    public submited = false;

    constructor(public navParams: NavParams,
                private view: ViewController,
                public alertCtrl: AlertController,
                public formBuilder: FormBuilder) {
    }

    ionViewDidLoad() {
        document.getElementsByClassName('publish-modal')[0].setAttribute('style',"visibility : hidden");
        document.getElementsByClassName('choice-modal')[0].setAttribute('style',"visibility : hidden");
    }
    ionViewWillLeave() {
        document.getElementsByClassName('publish-modal')[0].setAttribute('style',"visibility : visible");
        document.getElementsByClassName('choice-modal')[0].setAttribute('style',"visibility : visible");
    }

    validate() {
        this.view.dismiss(this.mail.description);
    }

    saveRoomEmail(errorValidation,description) {
        this.submited = true;
        if (!errorValidation) {
            this.view.dismiss(this.mail.description);
        }
        else {
            if (description.invalid || description.value == null || description.value == '') {
                this.invalidDesc = true;
            }
        }
    }

    Close() {
        this.view.dismiss();
    }
}
