import {Component, ViewChild} from "@angular/core";
import {
    AlertController,
    Content,
    Events,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    Platform
} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppProvider} from "../../providers/app/app";
import {UserProvider} from "../../providers/user/user";
import {Contact} from "../../Models/contact";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
* Generated class for the ProposePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
    selector: 'page-propose',
    templateUrl: 'propose.html',
})
export class ProposePage {

    @ViewChild(Content) content: Content;

    slideOneForm: FormGroup;

    private submited = false;
    private contactObj = new Contact();
    private categories = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3', 'Catégorie 4'];

    private allSubCategories = [
        ['sous catégorie 1.1', 'sous catégorie 1.2', 'sous catégorie 1.3'],
        ['sous catégorie 2.1', 'sous catégorie 2.2', 'sous catégorie 2.3', 'sous catégorie 2.4'],
        ['sous catégorie 3.1', 'sous catégorie 3.2', 'sous catégorie 3.3'],
        [],
    ];
    private subCategories = [];

    private parentSelected = false;
    public currentUser: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public appGlobals: GlobalsProvider,
        public userService: UserProvider,
        public serviceEvent: EventsrestProvider,
        public appService: AppProvider,
        public appEvents: Events,
        public myModal: ModalController,
        public formBuilder: FormBuilder,
        public myAlert: AlertController,
        public loader: LoadingController,
        public platform: Platform) {
        this.appGlobals.showHeader = false;
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;
        this.appEvents.publish('updateFooter');

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
    selectCategory(selected) {
        if (this.allSubCategories[selected].length > 0) {
            this.parentSelected = true;
            this.subCategories = this.allSubCategories[selected];

        } else {
            this.parentSelected = false;
        }
        this.contactObj.setObject(this.categories[selected])
    }
    selectSubCategory(selected) {
        this.contactObj.setObject(this.contactObj.getObject() + ' - ' + selected)
    }

}
