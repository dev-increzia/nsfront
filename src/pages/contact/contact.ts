import {Component, ViewChild} from "@angular/core";
import {
    AlertController,
    Content,
    Events,
    LoadingController,
    NavController,
    NavParams,
    Platform
} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppProvider} from "../../providers/app/app";
import {Contact} from "../../Models/contact";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
})
export class ContactPage {
    @ViewChild(Content) content: Content;

    public slideOneForm: FormGroup;

    private currentUser: any;
    private submited = false;
    private contactObj = new Contact();
    public eventParticipted = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public serviceEvent: EventsrestProvider,
        public appGlobals: GlobalsProvider,
        public appService: AppProvider,
        public appEvents: Events,
        public formBuilder: FormBuilder,
        public myAlert: AlertController,
        public loader: LoadingController,
        public platform: Platform) {
        this.appGlobals.showHeader = false;
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.slideOneForm = formBuilder.group({
            'object': ['', Validators.required],
            'description': ['', Validators.required]
        });
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

    contact(errorValidation) {
        this.submited = true;
        if (!errorValidation) {
            let loadingPopup = this.loader.create({});
            // Show the popup
            loadingPopup.present();
            this.appService.postContact(this.contactObj).then(() => {
                loadingPopup.dismiss();
                let successAlert = this.myAlert.create({
                    title: 'Succès',
                    subTitle: 'Votre message a été envoyée avec succès.',
                    buttons: [
                        {
                            text: 'OK',
                            handler: () => {
                                this.goBack();
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

    checkFocus(element) {
        if (this.platform.is('android')) {

            var requiredElement = element.target.offsetParent.parentElement;

            var yOffset = requiredElement.offsetTop;
            this.content.scrollTo(0, yOffset, 2000);
        }
    }




}
