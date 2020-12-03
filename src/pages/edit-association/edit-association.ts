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
    Platform
} from "ionic-angular";
import {AssociationProvider} from "../../providers/association/association";
import {UserProvider} from "../../providers/user/user";
import {Camera} from "@ionic-native/camera";
import {GlobalsProvider} from "../../providers/globals/globals";
import {AppProvider} from "../../providers/app/app";
import {ChangeSuAdminPage} from "../../pages/change-su-admin/change-su-admin";
import {DeleteAccountPage} from "../../pages/delete-account/delete-account";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {CommentProvider} from "../../providers/comment/comment";

/**
 * Generated class for the EditAssociationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-edit-association',
    templateUrl: 'edit-association.html',
})
export class EditAssociationPage {

    @ViewChild(Content) content: Content;

    public myDate;
    public today;
    public lastImage: string = null;
    public loading: Loading;
    public categories = [];
    public cities: any;
    public check: boolean = false;
    public check2: boolean = false;
    public associationId: any;
    public category: any;
    public city: any;
    public association: any;
    public association_photo: any;
    public selectedCategory: any;
    public selectedCity: any;
    public userImg: any;
    public associationPhoto: any = null;
    public toDelete: boolean = false;
    public submited = false;
    public validateEmail: boolean = false;
    public currentUser: any;
    public phoneRegexp = /^(33|0)\d{9}$/;

    constructor(public event: Events,
        public navCtrl: NavController,
        public navParams: NavParams,
        public userService: UserProvider,
        public service: AssociationProvider,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        private camera: Camera,
        public serviceEvent: EventsrestProvider,
        public commentService: CommentProvider,
        public actionSheetCtrl: ActionSheetController,
        public platform: Platform,
        public alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        public appGlobals: GlobalsProvider,
        public appService: AppProvider) {

        this.myDate = new Date().toISOString();
        this.today = new Date().toISOString();
        this.userImg = localStorage.getItem("user_image");

        this.association = navParams.get('account');

        for (let category of this.association['community']['categories']){
            if (category.type =="Activité groupe / association"){
                this.categories.push(category);
            }
        }
        this.associationId = navParams.get('accountId');
        this.selectedCategory = this.association.category.id ? this.association.category.id : this.association.category;
        this.selectedCity = this.association.city.id ? this.association.city.id : this.association.city;
        this.association_photo = this.association.image_url;
        this.cities = this.appGlobals.allCities;

    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.event.publish('updateFooter');

    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
    }


    editAssociationForm(errorValidation) {
        let loadingPopup = this.loadingCtrl.create({});
        // Show the popup
        loadingPopup.present();
        this.association.category = this.selectedCategory;
        this.association.city = this.selectedCity;

        this.submited = true;
        if (!errorValidation) {
            if (this.association_photo) {
                if (this.association.image_url == this.association_photo.image_url) {
                    this.association.image_url = null;
                }
            }

            this.service.put(this.association, this.associationPhoto, this.toDelete).then(data => {
                for (let key in this.appGlobals.adminAssociations) {
                    let value = this.appGlobals.adminAssociations[key];
                    if (value.id == data['association'].id) {
                        this.appGlobals.adminAssociations[key] = data['association'];
                    }
                }
                this.association = data['association'];
                this.selectedCategory = this.association.category.id;
                this.selectedCity = this.association.city.id;
                this.association_photo = this.association.image_url;
                loadingPopup.dismiss();
                let successAlert = this.alertCtrl.create({
                    title: 'Succès',
                    subTitle: 'Votre compte association a été mis à jour avec succès.',
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
        } else {
            var elements = document.getElementsByClassName('ng-invalid');
            var requiredElement = elements[1].parentElement;
            var yOffset = requiredElement.offsetTop;
            this.content.scrollTo(0, yOffset, 2000);
            loadingPopup.dismiss();
        }
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

    onChangeCategory(category) {
        this.selectedCategory = category;
    }

    onBlurEmail() {
        this.validateEmail = true;
    }

    onChangeCity(selected) {
        let index = this.cities.findIndex(i => i.id == selected);
        this.association.codePostal = this.cities[index].code;

    }

    onChangeCode(selected) {
        let index = this.cities.findIndex(i => i.code == selected);
        if (index != -1) {
            this.selectedCity = this.cities[index].id;
        }
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
            // imageData is a base64 encoded string
            this.toDelete = false;
            this.associationPhoto = "data:image/jpeg;base64," + imageData;
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
            this.toDelete = false;
            this.associationPhoto = "data:image/jpeg;base64," + imageData;
        });
    }

    public deletePhoto() {
        this.association.image_url = null;
        this.associationPhoto = null;
        this.toDelete = true;
    }

    capitalize(event, type) {
        if (event) {
            if (type == 'title') {
                this.association.name = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'address') {
                this.association.address = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'timing') {
                this.association.timing = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'description') {
                this.association.description = event.charAt(0).toUpperCase() + event.slice(1);
            }
        }
    }

    goBack() {
        this.navCtrl.pop();
    }
    deleteAccount() {
        let errorAlert = this.alertCtrl.create({
            title: "Supprimer compte",
            subTitle: "Vous êtes sur le point de supprimer votre compte association " + this.association.name + ". Vous pouvez changer le super administrateur de l'association",
            buttons: [
                {
                    text: 'Changer super administrateur',
                    handler: () => {
                        this.navCtrl.push(ChangeSuAdminPage, {
                            account: this.association,
                            type: 'association'
                        })
                    }
                },
                {
                    text: 'Supprimer compte',
                    handler: () => {
                        this.navCtrl.push(DeleteAccountPage, {
                            account: this.association,
                            type: 'association'
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
