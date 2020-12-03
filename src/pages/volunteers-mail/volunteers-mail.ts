import {Component} from "@angular/core";
import {
    AlertController,
    Events,
    IonicPage,
    LoadingController,
    NavController,
    NavParams,
    ViewController
} from "ionic-angular";
import {VolunteersProvider} from "../../providers/volunteers/volunteers";

/**
 * Generated class for the VolunteersMailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-volunteers-mail',
    templateUrl: 'volunteers-mail.html',
})
export class VolunteersMailPage {

    private submited = false;
    private selectedVolunteers: any;
    private account: any;
    private mailing = {
        objet: '',
        email: ''
    }
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public view: ViewController,
        public loader: LoadingController,
        public appEvents: Events,
        public volunteersService: VolunteersProvider,
        public myAlert: AlertController) {
        this.selectedVolunteers = this.navParams.get('selectedVolunteers');
        this.account = this.navParams.get('account');
    }

    sendVolunteersMail(errorValidation) {

        this.submited = true;
        if (!errorValidation) {
            let loadingPopup = this.loader.create({});
            // Show the popup
            loadingPopup.present();

            this.volunteersService.postAllMails(this.mailing, this.selectedVolunteers, this.account).then(() => {
                loadingPopup.dismiss();
                let successAlert = this.myAlert.create({
                    subTitle: "L'email a été envoyé aux bénévoles.",
                    buttons: [
                        {
                            text: 'Fermer',
                            role: 'cancel',
                            handler: () => {
                                this.view.dismiss();
                            }
                        }
                    ]
                });
                successAlert.present();

            },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                });
        }
    }

    goBack() {
        this.view.dismiss();
    }

    capitalizeData(data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

}
