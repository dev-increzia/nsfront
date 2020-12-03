import {AssociationProvider} from "../../providers/association/association";
import {Component, ViewChild} from "@angular/core";
import {
    ActionSheetController,
    AlertController,
    Content,
    Events,
    Loading,
    ModalController,
    LoadingController,
    NavController,
    NavParams,
    Platform,
    ToastController
} from "ionic-angular";
import {UserProvider} from "../../providers/user/user";
import {Camera} from "@ionic-native/camera";
import {GlobalsProvider} from "../../providers/globals/globals";
import {AppProvider} from "../../providers/app/app";
import {MySpacePage} from "../my-space/my-space";
import {Association} from "../../Models/association";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
/**
/**
 * Generated class for the CreateAssociationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-create-association',
    templateUrl: 'create-association.html',
})
export class CreateAssociationPage {

    @ViewChild(Content) content: Content;


    myDate;
    today;
    public lastImage: string = null;
    public loading: Loading;
    public categories: any;
    public cities: any;
    public check: boolean = false;
    public check2: boolean = false;
    public userImg: any;
    public validateEmail: boolean = false;
    public submited = false;
    public showCondition: boolean = false;
    private association = new Association();
    public eventParticipted = [];
    private linkedCommunities: any;
    public allCategories= [];
    public disabledTheme:boolean = true;
    public phoneRegexp = /^(33|0)\d{9}$/;


    public currentUser: any;

    constructor(public event: Events,
        public navCtrl: NavController,
        public navParams: NavParams,
        public userService: UserProvider,
        public service: AssociationProvider,
        private camera: Camera,
        public serviceEvent: EventsrestProvider,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        private modal: ModalController,
        public alertCtrl: AlertController,
        public appGlobals: GlobalsProvider,
        public appService: AppProvider) {
        this.linkedCommunities = JSON.parse(localStorage.getItem("allCommunities"));
        this.myDate = new Date().toISOString();
        this.today = new Date().toISOString();
        this.userImg = localStorage.getItem("account_photo");

        this.userImg = localStorage.getItem("account_photo");

        this.userService.findCategories().then(data => {
            this.categories = data;
        });
        this.cities = this.appGlobals.allCities;
        this.event.publish('updateFooter');

    }

    ionViewDidLoad() {
        this.appGlobals.currentPageTitle = "Créer mon groupe/ association";

    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.currentPageid = "mySpace";

    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
    }

    logEvent(e) {
        this.check = e._value;
    }

    addAssociationForm(errorValidation) {
        this.submited = true;
        if (!errorValidation && this.check) {

            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            this.service.post(this.association).then(data => {
                loadingPopup.dismiss();


                let successAlert = this.alertCtrl.create({
                    title: 'Succès',
                    subTitle: 'Le compte de votre groupe/association a été créé avec succès',
                    buttons: [
                        {
                            text: 'OK',
                            handler: data => {
                                this.event.publish('user:table');
                                this.navCtrl.setRoot(MySpacePage);
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

            if (this.check == false) {
                this.showCondition = true;

            } else {
                this.showCondition = false;

            }
            var elements = document.getElementsByClassName('ng-invalid');
            var requiredElement = elements[1].parentElement;
            var yOffset = requiredElement.offsetTop;
            this.content.scrollTo(0, yOffset, 2000);
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
            this.association.setPhoto("data:image/jpeg;base64," + imageData);
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
            this.association.setPhoto("data:image/jpeg;base64," + imageData);
        });
    }

    public deletePhoto() {
        this.association.setPhoto(null);
    }


    capitalize(event, type) {
        if (event) {
            if (type == 'title') {
                this.association.setName(event.charAt(0).toUpperCase() + event.slice(1));
            }
            if (type == 'address') {
                this.association.setAddress(event.charAt(0).toUpperCase() + event.slice(1));
            }
            if (type == 'timing') {
                this.association.setTiming(event.charAt(0).toUpperCase() + event.slice(1));
            }
            if (type == 'description') {
                this.association.setDescription(event.charAt(0).toUpperCase() + event.slice(1));
            }
        }
    }

    onBlurEmail() {
        this.validateEmail = true;
    }

    onChangeCity(selected) {
        let index = this.cities.findIndex(i => i.name === selected);
        this.association.setCodePostal(this.cities[index].code);
    }

    onChangeCode(selected) {
        let index = this.cities.findIndex(i => i.code == selected);
        if (index != -1) {
            this.association.setCity(this.cities[index].name);
        }
    }

    capitalizeData(data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
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

    onChangeCommunity(){
        let categories = [];
        this.allCategories = [];
        this.association.setCategory(null) ;
            for (let linkedcommu of this.linkedCommunities){
                if (this.association.getCommunity() == linkedcommu["id"]){
                    categories = linkedcommu["categories"];
                }
            }
        for (let category of categories){
            if (category.type =="Activité groupe / association"){
                this.allCategories.push(category);
            }
        }
        this.disabledTheme = this.allCategories.length == 0;
    }
    SelectCity() {
        const myModal2 = this.modal.create('SelectCityPage', {}, {cssClass: 'cities-modal'});
        myModal2.onDidDismiss(data => {
            if(data){
                this.association.setCity(data.name);
            }
        });
        myModal2.present();
    }


}
