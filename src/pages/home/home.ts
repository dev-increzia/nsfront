import {Component} from "@angular/core";
import {
    ActionSheetController,
    AlertController,
    Events,
    LoadingController,
    NavController,
    ModalController,
    Platform,
    ToastController
} from "ionic-angular";
import {FormBuilder} from "@angular/forms";
import {Http} from "@angular/http";
import {LoginPage} from "../login/login";
import {RegisterFirstPage} from "../register-first/register-first";
import {Push} from "@ionic-native/push";
import {User} from "../../Models/user";
import {GlobalsProvider} from "../../providers/globals/globals";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    private newUser = new User();

    constructor(public event: Events,
        public http: Http,
        public navCtrl: NavController,
        public formBuilder: FormBuilder,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public push: Push,
        public myModal: ModalController,
        public appGlobals: GlobalsProvider) {

    }

    LoginPage() { 
        this.navCtrl.push(LoginPage);
    }

    registerPageForward() {
        this.navCtrl.push(RegisterFirstPage, {
            newUser: this.newUser
        });
    }
    SelectCity() {
        const myModal2 = this.myModal.create('SelectCityPage', {}, {cssClass: 'cities-modal'});
        myModal2.onDidDismiss(data => {
            if(data){
                this.newUser.setCity(data.name);
                this.registerPageForward();
            }
        });
        myModal2.present();
    }}
