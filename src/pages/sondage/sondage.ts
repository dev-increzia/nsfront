import {Camera} from "@ionic-native/camera";
import {ArticleProvider} from "../../providers/article/article";
import {UserProvider} from "../../providers/user/user";
import {GlobalsProvider} from "../../providers/globals/globals";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {AssociationProvider} from "../../providers/association/association";
import {MerchantProvider} from "../../providers/merchant/merchant";
import {SurveyProvider} from "../../providers/survey/survey";
import {
    ActionSheetController,
    AlertController,
    Content,
    Events,
    IonicPage,
    LoadingController,
    NavController,
    NavParams,
    Platform,
    Slides,
    ViewController
} from "ionic-angular";
import "rxjs/add/operator/map";
import {Component, ViewChild} from "@angular/core";
import {FormBuilder} from "@angular/forms";
/**
 * Generated class for the PublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-sondage',
    templateUrl: 'sondage.html',
    providers: [SurveyProvider]
})
export class SondagePage {
    @ViewChild(Slides) slides: Slides;

    @ViewChild(Content) content: Content;

    public articles: any;
    public items = [];
    public listPhotos = [];
    public categories: any;
    public userImg: any;
    public userId: any;
    public userFullName: any;
    public filter: any = {
        city: 'all',
        category: 0
    };
    public currentUser: any;
    public article = {
        title: null,
        photo: null,
        photos: null,
        secondPhoto: '',
        thirdPhoto: '',
        sondage: null,
    };
    public communityId:any;
    public questionArray: any = [];

    public isSubmitEnabled = true;
    public submited = false;
    public accountType: any;
    public account: any;
    public dateEndError = false;
    public idEvent: any;
    public showEvent: boolean = false;
    public allCategories: any;
    public invalidTitre = false;
    public invalidDesc = false;
    public invalidQuestion = [];
    public nbreSlide: number;
    public data = false;

    constructor(public event: Events,
                public formBuilder: FormBuilder,
                public globals: GlobalsProvider,
                private view: ViewController,
                public actionSheetCtrl: ActionSheetController,
                public userService: UserProvider,
                private camera: Camera,
                public navCtrl: NavController,
                public navParams: NavParams,
                public articleService: ArticleProvider,
                private loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                public platform: Platform,
                public serviceEvent: EventsrestProvider,
                public associationService: AssociationProvider,
                public merchantService: MerchantProvider,
                public surveyService: SurveyProvider) {

        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.communityId = navParams.get('community');
        this.userImg = localStorage.getItem("user_image");
        this.userId = localStorage.getItem("user_id");
        this.userFullName = localStorage.getItem("user_firstname") + " " + localStorage.getItem("user_lastname");
        this.event.publish('user:current');
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.questionArray.push({'value': ''});
        this.questionArray.push({'value': ''});
        loadingPopup.dismiss();
    }

    getQuestionArrayData() {
        this.data = true;
    }

    Add() {
        this.questionArray.push({'value': '','error': false});
    }
    remove(value) {
        var index = value-1;
        this.questionArray.splice(index, 1);
    }

    ionViewWillLeave() {
        this.globals.showHeader = true;
    }

    goToSlide(nbreSlide) {
        this.slides.slideTo(500, nbreSlide);
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
            if (!this.article.photo) {
                this.article.photo = "data:image/jpeg;base64," + imageData;
            } else if (this.listPhotos.length <= 8) {
                this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            this.article.photos = this.listPhotos;
            this.slides.slideNext(500);
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
            if (!this.article.photo) {
                this.article.photo = "data:image/jpeg;base64," + imageData;
            } else if (this.listPhotos.length <= 8) {
                this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            this.article.photos = this.listPhotos;
            this.slides.slideNext(500);
        });
    }

    public deletePhotos(index) {

        this.article.photos.splice(index, 1);

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

    public deletePhoto(index) {
        if (index == 1) {
            this.article.photo = null;
        } else if (index == 2) {
            this.article.secondPhoto = null;
        } else if (index == 3) {
            this.article.thirdPhoto = null;
        }
    }

    Close() {
        this.view.dismiss('close');
    }


    capitalize(event, type) {
        if (event) {
            if (type == 'title') {
                this.article.title = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'sondage') {
                this.article.sondage = event.charAt(0).toUpperCase() + event.slice(1);
            }
        }
    }

    openEvent(e) {
        this.showEvent = e._value;
    }

    goBack() {
        this.view.dismiss();
    }

    checkFocus(element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;

            var test = yOffset - 40;
            this.content.scrollTo(0, test, 2000);
        }
    }
    checkChangeArray(element){
        this.questionArray[element]['error'] = !( this.questionArray[element]['value'] &&  this.questionArray[element]['value'] != "");
    }

    saveSurvey(errorValidation, title, description) {
        this.submited = true;
        for (let question of this.questionArray){
            question['error'] = !(question['value'] && question['value'] != "");
        }

        if (!errorValidation) {
            this.isSubmitEnabled = false;

            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            this.surveyService.postSurvey(this.currentUser.id, this.article, this.questionArray,this.communityId).then(data => {
                    loadingPopup.dismiss();
                    this.items.splice(0, 0, data);
                    let successAlert = this.alertCtrl.create({
                        title: 'Succès',
                        subTitle: 'Votre sondage a été ajouté avec succès.',
                        buttons: [
                            {
                                text: 'OK',
                                handler: data => {
                                    this.Close();
                                }
                            }
                        ]
                    });

                    successAlert.present();
                },
                err => {
                    console.log(err);
                    this.isSubmitEnabled = true;
                    loadingPopup.dismiss();
                    this.event.publish('http:errors', err);
                });
        }

    }

}
