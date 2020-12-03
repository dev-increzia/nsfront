import {Component, ViewChild} from "@angular/core";
import {
    ActionSheetController,
    AlertController,
    Content,
    Events,
    Loading,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    Platform,
    ToastController
} from "ionic-angular";
import {MerchantProvider} from "../../providers/merchant/merchant";
import {UserProvider} from "../../providers/user/user";
import {Camera} from "@ionic-native/camera";
import {GlobalsProvider} from "../../providers/globals/globals";
import {ChangeSuAdminPage} from "../../pages/change-su-admin/change-su-admin";
import {DeleteAccountPage} from "../../pages/delete-account/delete-account";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the EditMerchantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-edit-merchant',
    templateUrl: 'edit-merchant.html',
})
export class EditMerchantPage {

    @ViewChild(Content) content: Content;

    myDate;
    today;
    lastImage: string = null;
    loading: Loading;
    categories = [];
    cities: any;
    public merchantId: any;
    public category: any;
    public city: any;
    public merchant: any;
    public merchant_photo: any;
    public selectedCategory: any;
    public selectedCity: any;
    public userImg: any;
    public checkSiret: boolean;
    public erreurSiret: boolean = false;
    public merchantPhoto: any = null;
    public toDelete: boolean = false;
    public submited = false;
    public validateEmail: boolean = false;
    public currentUser: any;
    public phoneRegexp = /^(33|0)\d{9}$/;


    constructor(public event: Events,
        public navCtrl: NavController,
        public navParams: NavParams,
        public userService: UserProvider,
        public service: MerchantProvider,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        private camera: Camera,
        public serviceEvent: EventsrestProvider,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        public platform: Platform,
        public alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        public appGlobals: GlobalsProvider) {
        this.myDate = new Date().toISOString();
        this.today = new Date().toISOString();
        this.userImg = localStorage.getItem("user_image");
        this.merchantId = navParams.get('accountId');
        this.cities = this.appGlobals.allCities;
        this.merchant = navParams.get('account');
        this.merchant_photo = this.merchant.image_url;
        for (let category of this.merchant['community']['categories']){
            if (category.type =="Thème commerce / partenaire"){
                this.categories.push(category);
            }
        }
        this.selectedCategory = this.merchant.category.id ? this.merchant.category.id : this.merchant.category;
        this.selectedCity = this.merchant.city.id ? this.merchant.city.id : this.merchant.city;
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.event.publish('updateFooter');
    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
    }

    editMerchantForm(errorValidation) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.service.chekedSiret(this.merchantId, this.merchant.siret).then(data => {
            this.checkSiret = data;
            this.merchant.category = this.selectedCategory;
            this.merchant.city = this.selectedCity;
            this.submited = true;
            if (!errorValidation && !this.checkSiret) {
                if (this.merchant_photo) {
                    if (this.merchant.image_url == this.merchant_photo.image_url) {
                        this.merchant.image_url = null;
                    }
                }
                new Promise(resolve => {
                    this.service.put(this.merchant, this.merchantPhoto, this.toDelete).then(data => {
                            for (let key in this.appGlobals.adminMerchants) {
                                let value = this.appGlobals.adminMerchants[key];
                                if (value.id == data['merchant'].id) {
                                    this.appGlobals.adminMerchants[key] = data['merchant'];
                                }
                            }
                            this.merchant = data['merchant'];
                            this.selectedCategory = this.merchant.category.id;
                            this.selectedCity = this.merchant.city.id;
                            this.merchant_photo = this.merchant.image_url;
                            loadingPopup.dismiss();
                            let successAlert = this.alertCtrl.create({
                                title: 'Succès',
                                subTitle: 'Votre compte commerçant a été mis à jour avec succès.',
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
                            this.event.publish('http:errors', err);
                        });
                });
            } else {
                if (this.checkSiret == true) {
                    this.erreurSiret = true;
                } else {
                    this.erreurSiret = false;
                }
                var elements = document.getElementsByClassName('ng-invalid');
                var requiredElement = elements[1].parentElement;
                var yOffset = requiredElement.offsetTop;
                this.content.scrollTo(0, yOffset, 2000);
                loadingPopup.dismiss();
            }
        });
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
            this.toDelete = false;
            this.merchantPhoto = "data:image/jpeg;base64," + imageData;
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
            this.toDelete = false;
            this.merchantPhoto = "data:image/jpeg;base64," + imageData;
        });
    }

    public deletePhoto() {
        this.merchant.image_url = null;
        this.merchantPhoto = null;
        this.toDelete = true;
    }

    capitalize(event, type) {
        if (event) {
            if (type == 'title') {
                this.merchant.name = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'address') {
                this.merchant.address = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'timing') {
                this.merchant.timing = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'description') {
                this.merchant.description = event.charAt(0).toUpperCase() + event.slice(1);
            }
        }
    }

    onChangeCategory(category) {
        this.selectedCategory = category;
    }

    onBlurEmail() {
        this.validateEmail = true;
    }

    onChangeCity(selected) {
        let index = this.cities.findIndex(i => i.id == selected);
        this.merchant.codePostal = this.cities[index].code;

    }
    onChangeCode(selected) {
        let index = this.cities.findIndex(i => i.code == selected);
        if (index != -1) {
            this.selectedCity = this.cities[index].id;
        }
    }

    goBack() {
        this.navCtrl.pop();
    }

    deleteAccount() {
        let errorAlert = this.alertCtrl.create({
            title: "Supprimer compte",
            subTitle: "Vous êtes sur le point de supprimer votre compte commerçant " + this.merchant.name + ". Vous pouvez changer le super administrateur de l'association",
            buttons: [
                {
                    text: 'Changer super administrateur',
                    handler: () => {
                        this.navCtrl.push(ChangeSuAdminPage, {
                            account: this.merchant,
                            type: 'merchant'
                        })
                    }
                },
                {
                    text: 'Supprimer compte',
                    handler: () => {
                        this.navCtrl.push(DeleteAccountPage, {
                            account: this.merchant,
                            type: 'merchant'
                        });
                    }
                },

                {
                    text: 'Fermer',
                    role: 'cancel'
                }

            ]
        });
        errorAlert.present();
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
                this.selectedCity = data.id;
            }
        });
        myModal2.present();
    }

    getCityIdFromName(id: string){
        let result: number = -1;
        for (let element of this.cities){
            if (element.id === id || element.name === id){
                return element;
            }
        }
        return result;
    }

    getCategoriesFromNameOrIdentifier(selectedCategories){
        let result: number = -1;
        for (let element of this.categories){
            if (element.id === selectedCategories || element.name === selectedCategories){
                return element;
            }
        }
        return result;
    }
}
