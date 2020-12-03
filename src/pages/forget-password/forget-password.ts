import {Component, OnInit} from "@angular/core";
import {AlertController, Events, LoadingController, NavController, NavParams} from "ionic-angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-forget-password',
    templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage implements OnInit {

    private user = {
        email: null,
    }
    private forgetPasswordForm: FormGroup;
    private submited = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loader: LoadingController,
        public appEvents: Events,
        public alert: AlertController,
        public eventListner: Events,
        public myUser: UserProvider) {
    }

    ngOnInit() {
        this.forgetPasswordForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email])
        });
    }

    resetForgetedPassword(errorValidation) {
        this.submited = true;
        if (!errorValidation) {
            let loadingPopup = this.loader.create({});
            loadingPopup.present();
            this.myUser.forgetPassword(this.user.email).then(data => {
                loadingPopup.dismiss();
                if (data.success) {
                    let successAlert = this.alert.create({
                        title: 'Succès',
                        subTitle: 'Votre nouveau mot de passe est envoyé à votre adresse mail.',
                        buttons: [
                            {
                                text: 'OK',
                                handler: () => {
                                    this.user.email = null;
                                    this.navCtrl.push(HomePage);
                                }

                            }

                        ]
                    });
                    successAlert.present();
                } else {
                    let errorAlert = this.alert.create({
                        title: "Erreur",
                        subTitle: "Il n'existe pas de compte pour cet e-mail.",
                        buttons: [
                            {
                                text: 'OK',
                                handler: () => {
                                    this.user.email = null;

                                }

                            }

                        ]
                    });
                    errorAlert.present();
                }
            },
                err => {
                    this.eventListner.publish("http:errors", err);
                });
        }
    }

    loginPage() {
        this.navCtrl.push(LoginPage);
    }
}
