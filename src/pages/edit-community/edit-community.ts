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
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {CommentProvider} from "../../providers/comment/comment";
import {CommunityProvider} from "../../providers/community/community";

/**
 * Generated class for the EditAssociationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-edit-community',
    templateUrl: 'edit-community.html',
})
export class EditCommunityPage {

    @ViewChild(Content) content: Content;

    public myDate;
    public today;
    public lastImage: string = null;
    public loading: Loading;
    public categories = [];
    public cities: any;
    public check: boolean = false;
    public check2: boolean = false;
    public commuId: any;
    public category: any;
    public city: any;
    public community: any;
    public community_photo: any;
    public selectedCategory: any;
    public selectedCity: any;
    public userImg: any;
    public associationPhoto: any = null;
    public toDelete: boolean = false;
    public submited = false;
    private zipCodes = [];
    public validateEmail: boolean = false;
    public currentUser: any;
    private categoryNames = [];
    public allCategories: any;
    public phoneRegexp = /^(33|0)\d{9}$/;


    constructor(public event: Events,
        public navCtrl: NavController,
        public appEvents: Events,
        public navParams: NavParams,
        public userService: UserProvider,
        public service: AssociationProvider,
        public commuService: CommunityProvider,
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
        this.cities = this.appGlobals.allCities;
        for (let city of this.cities) {
            this.zipCodes.push(city.code);
        }
        this.community = navParams.get('account');

        /*for (let category of this.appGlobals.allCategories){
            if (category.type =="Activité groupe / association"){
                this.allCategories.push(category);
            }
        }*/
        this.commuId = navParams.get('accountId');
        //this.selectedCategory = this.community.category.id;
        this.selectedCity = this.community.city;
        this.community_photo = this.community.image_url;

    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.event.publish('updateFooter');


    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
    }


    editCommuForm(errorValidation) {
        let loadingPopup = this.loadingCtrl.create({});
        // Show the popup
        loadingPopup.present();
        this.community.category = this.selectedCategory;
        this.community.city = this.selectedCity;

        this.submited = true;
        if (!errorValidation) {
            if (this.community_photo) {
                if (this.community.image_url == this.community_photo) {
                    this.community.image_url = null;
                }
            }

            this.commuService.put(this.community, this.associationPhoto, this.toDelete).then(data => {
                let linkedCommunities = JSON.parse(localStorage.getItem("allCommunities"));

                for (let key in linkedCommunities) {
                    let value = linkedCommunities[key];
                    if (value.id == this.community.id) {
                        linkedCommunities[key] = this.community;
                        localStorage.setItem("allCommunities",linkedCommunities);
                    }
                }
                /*this.selectedCategory = this.community.category.id;*/
                loadingPopup.dismiss();
                let successAlert = this.alertCtrl.create({
                    title: 'Succès',
                    subTitle: 'Votre compte communauté a été mis à jour avec succès.',
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



    onBlurEmail() {
        this.validateEmail = true;
    }

    onChangeCity(selected) {
        let index = this.cities.findIndex(i => i.id == selected);
        this.community.codePostal = this.cities[index].code;
    }
    onChangeCategory(selected) {
        this.categoryNames = [];
        for (let c of selected) {
            let index = this.allCategories.findIndex(i => i.id == c);
            if (index != -1) {
                this.categoryNames.push(this.allCategories[index]);
            }
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
        this.community.image_url = null;
        this.associationPhoto = null;
        this.toDelete = true;
    }

    capitalize(event, type) {
        if (event) {
            if (type == 'title') {
                this.community.name = event.charAt(0).toUpperCase() + event.slice(1);
            }
        }
    }

    goBack() {
        this.navCtrl.pop();
    }

    checkFocus(element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;
            this.content.scrollTo(0, yOffset, 2000);
        }
    }



}
