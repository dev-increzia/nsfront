import {Component, ViewChild} from "@angular/core";
import {
    ActionSheetController,
    AlertController,
    Content,
    Events,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    Platform
} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppProvider} from "../../providers/app/app";
import {UserProvider} from "../../providers/user/user";
import {GlobalsProvider} from "../../providers/globals/globals";
import {DeleteCitzenAccountFirstPage} from "../../pages/delete-citzen-account-first/delete-citzen-account-first";
import {DeleteCitzenAccountLastPage} from "../../pages/delete-citzen-account-last/delete-citzen-account-last";
import {User} from "../../Models/user";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {Camera} from "@ionic-native/camera";

/**
 * Generated class for the ParameterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-parameter',
    templateUrl: 'parameter.html',
})
export class ParameterPage {

    @ViewChild(Content) content: Content;

    private changePassword = false;
    public slideOneForm: FormGroup;
    public show_password: boolean = false;
    public show_password_verification: boolean = false;
    public show2_password_verification: boolean = false;
    public show_password_actual: boolean = false;
    public show_erreur_password: boolean = false;
    public show_erreur_password_verification: boolean = false;
    private userAssociationsMerchants = [];
    public phoneRegexp = /^(33|0)\d{9}$/;

    public noChildren: any;
    public cities = [];
    public interests = [];
    public secondaryCities = []
    public intercomCities: any;
    public validateEmail: boolean = false;
    public submited = false;
    public currentUser = JSON.parse(localStorage.getItem("currentUser"));

    private user = new User();
    private yearsArray = [];

    constructor(public navCtrl: NavController,
        public formBuilder: FormBuilder,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public appService: AppProvider,
        public appGlobals: GlobalsProvider,
        public serviceEvent: EventsrestProvider,
        public myUser: UserProvider,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        public appEvents: Events,
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public platform: Platform,
        private camera: Camera, ) {

        this.user.getCurrent(this.currentUser);
        let i = 1930;
        while (i <= 2010) {
            this.yearsArray.push(i++);
        }

        this.cities = this.appGlobals.allCities;
        this.noChildren = true;

        this.slideOneForm = formBuilder.group({
            'password_actual': ['', Validators.required],
            'password': ['', Validators.required],
            'password_verification': ['', Validators.required]
        });
    }

    editForm(errorValidation) {
        this.submited = true;

        if (!errorValidation) {
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            this.myUser.put(this.user).then(data => {
                if (data.error) {
                    loadingPopup.dismiss();
                    var errorMsg = data.error;
                    let errorAlert = this.alertCtrl.create({
                        title: 'Oups ! ',
                        subTitle: errorMsg,
                        buttons: [
                            {
                                text: 'Fermer',
                                role: 'cancel',
                                handler: () => {
                                }
                            }
                        ]
                    });
                    errorAlert.present();
                } else if (data.success) {
                    if (data.user.city != this.currentUser.city) {
                        let label = 'cityChanged-' + this.currentUser.id;
                        this.appEvents.publish("googleAnalytics", label);

                    }

                    localStorage.setItem("currentUser", JSON.stringify(data.user));
                    loadingPopup.dismiss();

                    let successAlert = this.alertCtrl.create({
                        title: 'Succès',
                        subTitle: 'Votre compte a été modifié avec succès.',
                        buttons: [
                            {
                                text: 'OK',
                                handler: () => {

                                }
                            }
                        ]
                    });
                    successAlert.present();
                }
            },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                });
        } else {

            var elements = document.getElementsByClassName('ng-invalid');
            var requiredElement = elements[1].parentElement;
            var yOffset = requiredElement.offsetTop;
            this.content.scrollTo(0, yOffset, 2000);
        }
    }

    capitalize(event, type) {
        if (event) {
            if (type == 'firstname') {
                this.user.setFirstName(event.charAt(0).toUpperCase() + event.slice(1));
            }
            if (type == 'lastname') {
                this.user.setLastname(event.charAt(0).toUpperCase() + event.slice(1));
            }
        }
    }
    onChangeCity(selected) {

    }
    onBlurEmail() {
        this.validateEmail = true;
    }

    capitalizeData(data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

    hideEditPassword() {
        this.changePassword = false;
    }
    showEditPassword() {
        this.changePassword = true;
    }
    dataPassword = {
        actual_password: '',
        password: '',
        password_verification: ''
    }
    numbrePassword(event, type) {
        if (event) {
            if (type == 'password') {
                if (event.length < 6) {
                    this.show_erreur_password = true;
                } else {
                    this.show_erreur_password = false;
                }
            }
            if (type == 'password_verification') {
                if (event.length < 6) {
                    this.show_erreur_password_verification = true;
                } else {
                    this.show_erreur_password_verification = false;
                }
            }
        }
    }

    passwordForm() {
        if ((!this.slideOneForm.valid) || ((this.dataPassword.password && this.dataPassword.password_verification) && (this.dataPassword.password != this.dataPassword.password_verification))) {
            if ((this.dataPassword.actual_password == null) || (this.dataPassword.actual_password == '')) {
                this.show_password_actual = true;
            } else {
                this.show_password_actual = false;
            }
            if ((this.dataPassword.password == null) || (this.dataPassword.password == '')) {
                this.show_password = true;
            } else {
                this.show_password = false;
            }
            if ((this.dataPassword.password_verification == null) || (this.dataPassword.password_verification == '')) {
                this.show_password_verification = true;
            } else {
                this.show_password_verification = false;
            }
            if (this.dataPassword.password != this.dataPassword.password_verification) {
                this.show2_password_verification = true;
            } else {
                this.show2_password_verification = false;
            }
        } else if (this.dataPassword.password.length < 6 || this.dataPassword.password_verification.length < 6) {
        } else {
            let loadingPopup = this.loadingCtrl.create({});
            // Show the popup
            loadingPopup.present();
            this.myUser.putPassword(this.dataPassword).then(data => {
                loadingPopup.dismiss();
                if (data.success) {
                    let successAlert = this.alertCtrl.create({
                        title: 'Succès',
                        subTitle: 'Votre mot de passe a été modifié.',
                        buttons: [
                            {
                                text: 'OK',
                                handler: () => {

                                    this.slideOneForm.reset();
                                    this.show2_password_verification = false;
                                    this.show_password_verification = false;
                                    this.show_password = false;
                                    this.show_password_actual = false;

                                }
                            }

                        ]
                    });
                    successAlert.present();
                } else {
                    let errorAlert = this.alertCtrl.create({
                        title: "Erreur",
                        subTitle: 'Votre mot de passe est incorrecte.',
                        buttons: [
                            {
                                text: 'OK',
                                handler: data => {
                                    this.slideOneForm.reset();
                                }

                            }

                        ]
                    });
                    errorAlert.present();
                }
            },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                });
        }
    }
    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;
    }

    goBack() {
        this.navCtrl.pop();
    }
    deleteCitzenAccount() {
        this.getAssociationsMerchants();
    }
    getAssociationsMerchants() {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.myUser.getAssociationsMerchants().then(data => {
            if (data.length == 0) {
                this.navCtrl.push(DeleteCitzenAccountLastPage);
            } else {
                //associations
                if (data.associations) {
                    for (let association of data.associations) {
                        let item = {
                            id: association.id,
                            name: association.name,
                            type: 'association',
                            suAdmin: ''
                        }
                        this.userAssociationsMerchants.push(item);
                    }
                }
                // commerçants
                if (data.merchants) {
                    for (let merchant of data.merchants) {
                        let item = {
                            id: merchant.id,
                            name: merchant.name,
                            type: 'merchant',
                            suAdmin: ''
                        }
                        this.userAssociationsMerchants.push(item);
                    }
                }
                this.navCtrl.push(DeleteCitzenAccountFirstPage, {
                    items: this.userAssociationsMerchants
                });
            }
            loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }

    public deletePhoto() {
        this.user.setImageUrl(null);
    }
    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Sélectionner la source d image',
            buttons: [
                {
                    text: 'Choisir une photo de la bibliothèque',
                    handler: () => {
                        this.loadImageFromLibrary();
                    }
                },
                {
                    text: 'Prendre une photo',
                    handler: () => {
                        this.takePicture();
                    }
                },
                {
                    text: 'Annuler',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }
    public takePicture() {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            targetWidth: 600,
            targetHeight: 600,
            allowEdit: true,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG
        }).then((imageData) => {
            this.user.setImageUrl("data:image/jpeg;base64," + imageData);
            this.performChangePicture();
        });
    }

    public loadImageFromLibrary() {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            targetWidth: 600,
            targetHeight: 600,
            allowEdit: true,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.user.setImageUrl("data:image/jpeg;base64," + imageData);
            this.performChangePicture();
        });
    }
    public performChangePicture() {
        let loadingPopup = this.loadingCtrl.create({});
        // Show the popup
        loadingPopup.present();
        this.myUser.putProfilePicture(this.user.getImageUrl()).then(data => {
            loadingPopup.dismiss();
            if (data.success) {
                let successAlert = this.alertCtrl.create({
                    title: 'Succès',
                    subTitle: 'Votre photo de profile a été mis à jour avec succès.',
                    buttons: [
                        {
                            text: 'OK',
                            role: 'cancel',
                            handler: () => {

                            }
                        }
                    ]
                });
                successAlert.present();
            }
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }
    checkFocus(element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;
            this.content.scrollTo(0, yOffset, 2000);
        }
    }
    SelectCity() {
        const myModal2 = this.myModal.create('SelectCityPage', {}, {cssClass: 'cities-modal'});
        myModal2.onDidDismiss(data => {
            if(data){
                this.user.setCity(data.name);
            }
        });
        myModal2.present();
    }
}
