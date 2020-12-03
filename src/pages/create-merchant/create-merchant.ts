import {MerchantProvider} from "../../providers/merchant/merchant";
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
    Platform,
    ToastController
} from "ionic-angular";
import {UserProvider} from "../../providers/user/user";
import {Camera} from "@ionic-native/camera";
import {GlobalsProvider} from "../../providers/globals/globals";
import {AppProvider} from "../../providers/app/app";
import {MySpacePage} from "../my-space/my-space";
import {Merchant} from "../../Models/merchant";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
/**
 * Generated class for the CreateMerchantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-create-merchant',
    templateUrl: 'create-merchant.html',
})
export class CreateMerchantPage {

    @ViewChild(Content) content: Content;
    public myDate;
    public today;
    public lastImage: string = null;
    public loading: Loading;
    public categories: any;
    public cities: any;
    public check: boolean = false;
    public check2: boolean = false;
    public userImg: any;
    public validateEmail: boolean = false;
    public submited = false;
    public checkSiret: boolean;
    public erreurSiret: boolean = false;
    private merchant = new Merchant();
    private linkedCommunities: any;
    public allCategories= [];
    public disabledTheme:boolean = true;
    public currentUser: any;
    public phoneRegexp = /^(33|0)\d{9}$/;


    constructor(public event: Events,
                public navCtrl: NavController,
                public userService: UserProvider,
                public service: MerchantProvider,
                private camera: Camera,
                public serviceEvent: EventsrestProvider,
                public actionSheetCtrl: ActionSheetController,
                public toastCtrl: ToastController,
                public platform: Platform,
                public loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                public appGlobals: GlobalsProvider,
                private modal: ModalController,
                public appService: AppProvider) {
        this.appGlobals.showHeader = false;
        this.appGlobals.currentPageTitle = "Créer mon commerce/ partenaire";
        this.linkedCommunities = JSON.parse(localStorage.getItem("allCommunities"));

        this.myDate = new Date().toISOString();
        this.today = new Date().toISOString();
        this.userImg = localStorage.getItem("account_photo");

        this.userService.findCategories().then(data => {
            this.categories = data;
        });

        this.cities = this.appGlobals.allCities;


    }

    ionViewDidLoad() {
        this.appGlobals.currentPageTitle = "Créer mon commerce/ partenaire";
        this.appGlobals.currentPageid = "mySpace";
        this.event.publish('updateFooter');


    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
    }


    logEvent(e) {
        this.check = e._value;
    }

    addMerchantForm(errorValidation) {
        this.submited = true;
        new Promise(resolve => {
            this.service.chekedSiret(0, this.merchant.getSiret()).then(data => {
                this.checkSiret = data;
                if (!errorValidation && !this.checkSiret && this.check) {
                    let loadingPopup = this.loadingCtrl.create({});
                    loadingPopup.present();
                    this.service.post(this.merchant).then(data => {
                            loadingPopup.dismiss();
                            let successAlert = this.alertCtrl.create({
                                title: 'Succès',
                                subTitle: 'Le compte de votre commerce/partenaire a été créé avec succès',
                                buttons: [
                                    {
                                        text: 'OK',
                                        handler: () => {
                                            this.event.publish('admin:merchants');
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
                    if (this.checkSiret == true) {
                        this.erreurSiret = true;
                    } else {
                        this.erreurSiret = false;
                    }
                    var elements = document.getElementsByClassName('formError');
                    if(elements.length>0){
                        var requiredElement = elements[0].parentElement;
                        var yOffset = requiredElement.offsetTop;
                        this.content.scrollTo(0, yOffset, 2000);
                    }
                }
            });
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
            this.merchant.setPhoto("data:image/jpeg;base64," + imageData);
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
            this.merchant.setPhoto("data:image/jpeg;base64," + imageData);
        });
    }

    public deletePhoto() {
        this.merchant.setPhoto(null);
    }


    capitalize(event, type) {
        if (event) {
            if (type == 'title') {
                this.merchant.setName(event.charAt(0).toUpperCase() + event.slice(1));
            }
            if (type == 'address') {
                this.merchant.setAddress(event.charAt(0).toUpperCase() + event.slice(1));
            }
            if (type == 'timing') {
                this.merchant.setTiming(event.charAt(0).toUpperCase() + event.slice(1));
            }
            if (type == 'description') {
                this.merchant.setDescription(event.charAt(0).toUpperCase() + event.slice(1));
            }
        }
    }

    onBlurEmail() {
        this.validateEmail = true;
    }

    onChangeCity(selected) {
        let index = this.cities.findIndex(i => i.name === selected);
        this.merchant.setCodePostal(this.cities[index].code);
    }

    onChangeCode(selected) {
        let index = this.cities.findIndex(i => i.code == selected);
        if (index != -1) {
            this.merchant.setCity(this.cities[index].name);
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
        this.merchant.setCategory(null) ;
        for (let linkedcommu of this.linkedCommunities){
            if (this.merchant.getCommunity() == linkedcommu["id"]){
                categories = linkedcommu["categories"];
            }
        }
        for (let category of categories){
            if (category.type =="Thème commerce / partenaire"){
                this.allCategories.push(category);
            }
        }
        this.disabledTheme = this.allCategories.length == 0;
    }

    SelectCity() {
        const myModal2 = this.modal.create('SelectCityPage', {}, {cssClass: 'cities-modal'});
        myModal2.onDidDismiss(data => {
            if(data){
                this.merchant.setCity(data.name);
            }
        });
        myModal2.present();
    }



}
