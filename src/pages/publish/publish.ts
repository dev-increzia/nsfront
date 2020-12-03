import {Component, ViewChild} from "@angular/core";
import {
    ActionSheetController,
    AlertController,
    Content,
    Events,
    IonicPage,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    Platform, 
    Slides,
    ViewController
} from "ionic-angular";
import {FormBuilder} from "@angular/forms";
import {Camera} from "@ionic-native/camera";
import {MediaCapture, MediaFile, CaptureError} from "@ionic-native/media-capture";
import {File} from "@ionic-native/file";
import "rxjs/add/operator/map"; 
import {ArticleProvider} from "../../providers/article/article";
import {UserProvider} from "../../providers/user/user";
import {GlobalsProvider} from "../../providers/globals/globals";
import * as moment from "moment";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {AssociationProvider} from "../../providers/association/association";
import {MerchantProvider} from "../../providers/merchant/merchant";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import {GoodplanrestProvider} from "../../providers/goodplanrest/goodplanrest";
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { DocumentPicker } from '@ionic-native/document-picker';

import { FilesProvider } from "../../providers/files/files";


/**
 * Generated class for the PublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-publish',
    templateUrl: 'publish.html',
})
export class PublishPage {
    @ViewChild(Slides) slides: Slides;

    @ViewChild(Content) content: Content;

    public articles: any;
    public items = [];
    public listPhotos = [];
    public categories: any;
    public userImg: any;
    public userId: any;
    public userFullName: any;
    public minPublicDate: any;
    toggled: boolean = false;
    toggledDes: boolean = false;
    toggledContent:boolean = false;
    public filter: any = {
        city: 'all',
        category: 0
    };

    public document: any;


    public currentUser: any;
    public article = {
        title: "",
        photo: null,
        videoFile: null,
        photos: null,
        document: null,
        secondPhoto: '',
        thirdPhoto: '',
        description: "",
        community: null,
        city: null,
        category: null,
        heading: null,
        event: null,
        group: null,
        private: false,
        push: {
            enabled: false,
            date: new Date( (new Date()).getTime() - (new Date()).getTimezoneOffset() * 60 * 1000 ).toISOString(),
            hour: new Date( (new Date()).getTime() - (new Date()).getTimezoneOffset() * 60 * 1000 ).toISOString(),
            content: ""
        },
        publicAt: {
            year: moment().year(),
            month: moment().month() + 1,
            day: moment().date(),
            hour: moment().hour(),
            minute: moment().minute(),
            fullDate: ""
        }
    };
    private cities: any;
    private linkedCommunities: any;
    private listAccount = [];

    private service: any;
    private years = [];
    private months = [];
    private days = [];
    private hours = [];
    private minutes = [];
    public events = {
        title: null,
        room: false,
        mailForRoom: null,
        address: null,
        city: null,
        categories: null,
        secondCategories: null,
        startDate: {
            year: moment().year(),
            month: moment().month() + 1,
            day: moment().date(),
            hour: moment().hour(),
            minute: moment().minute(),
            fullDate: new Date().toISOString()
        },
        endDate: {
            year: moment().year(),
            month: moment().month() + 1,
            day: moment().date(),
            hour: moment().hour(),
            minute: moment().add('m', 1).minute(),
            fullDate: new Date().toISOString()
        },
        price: "Gratuit",
        description: null,
        photo: null,
        photos: null,
        secondPhoto: null,
        thirdPhoto: null,
        article: null,
        push: {
            enabled: false,
            date: new Date().toISOString(),
            hour: new Date().toISOString(),
            content: ""
        },
        personalized: false,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null,
        ageFrom: null,
        ageTo: null,
        lessThanSix: null,
        betweenSixTwelve: null,
        twelveEighteen: null,
        allChildrens: null,
        newPhoto: null,
        deletePhoto: false,
        private: false,
        secondCommu: null,
        document: null,
    };

    public isSubmitEnabled = true;
    public submited = false;
    public accountType: any;
    public account: any;
    public dateEndError = false;
    public idEvent: any;
    public showEvent: boolean = false;
    private categoryNames = [];
    private secondCategoryNames = [];
    public allCategories: any;
    public allHeadings: any;
    public allSecondCategories: any;
    private moreEvent = false;
    public invalidTitre = false;
    public invalidDesc = false;
    private publicDate = false;
    public nbreSlide: number;
    public disabledCommunity: boolean = false;
    public disabledMerchant: boolean = true;
    public disabledHeading: boolean = true;
    public disabledTheme: boolean = true;
    public disabledDedicated: boolean = true;
    public disabledSecondTheme: boolean = true;
    public surveyDisabled: boolean = false;
    public adminCommunities: any = [];
    public hasSondage: boolean = false;
    public articleActivated: boolean = true;
    evtdescription: string = "";

    constructor(public event: Events,
                public formBuilder: FormBuilder,
                public globals: GlobalsProvider,
                private view: ViewController,
                public actionSheetCtrl: ActionSheetController,
                public userService: UserProvider,
                public appGlobals: GlobalsProvider,
                private camera: Camera,
                public navCtrl: NavController,
                public navParams: NavParams,
                private ga: GoogleAnalytics,
                public articleService: ArticleProvider,
                private loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                public platform: Platform,
                private docPicker: DocumentPicker,
                public serviceEvent: EventsrestProvider,
                public serviceGoodPlan: GoodplanrestProvider,
                public associationService: AssociationProvider,
                private modal: ModalController,
                public merchantService: MerchantProvider,
                private mediaCapture: MediaCapture,
                private file: File,
                private fileChooser: FileChooser,
                private filepath: FilePath,
                private filesProvider:  FilesProvider,
                ) {
        this.cities = this.appGlobals.allCities;
 
        this.userImg = localStorage.getItem("user_image");
        this.userId = localStorage.getItem("user_id");
        this.userFullName = localStorage.getItem("user_firstname") + " " + localStorage.getItem("user_lastname");
        this.event.publish('user:current');
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.accountType = navParams.get('accountType');
        this.account = navParams.get('account');
        this.linkedCommunities = JSON.parse(localStorage.getItem("allCommunities"));
        for (let community of this.linkedCommunities) {
            if (community["isAdminPublish"]) {
                this.adminCommunities.push({
                    categories: community.categories,
                    articleHeading: community.articleHeading,
                    follow: community.follow,
                    id: community.id,
                    img_url: community.img_url,
                    isAdminPublish: community.isAdminPublish,
                    isPrivate: community.isPrivate,
                    name: community.name,
                    cityName: community.cityName,
                    survey: community.activate_survey,
                    article: community.activate_articles
                });
            }
        }

        var currentYear = (new Date()).getFullYear();
        for (let i = currentYear; i <= (new Date()).getFullYear() + 50; i++) {
            this.years.push(i);
        }
        // remplir les mois
        this.months.push({id: 1, name: 'Jan'});
        this.months.push({id: 2, name: 'Fév'});
        this.months.push({id: 3, name: 'Mar'});
        this.months.push({id: 4, name: 'Avr'});
        this.months.push({id: 5, name: 'Mai'});
        this.months.push({id: 6, name: 'Jun'});
        this.months.push({id: 7, name: 'Juil'});
        this.months.push({id: 8, name: 'Aoû'});
        this.months.push({id: 9, name: 'Sep'});
        this.months.push({id: 10, name: 'Oct'});
        this.months.push({id: 11, name: 'Nov'});
        this.months.push({id: 12, name: 'Déc'});

        // remplir les jours
        for (let i = 1; i <= 31; i++) {
            this.days.push(i);
        }

        // remplir les heures
        for (let i = 0; i <= 23; i++) {
            this.hours.push(i);
        }

        // remplir les minutes
        for (let i = 0; i <= 59; i++) {
            this.minutes.push(i);
        }

        if (this.accountType == 'citoyen') {
            let associations = JSON.parse(localStorage.getItem("adherentAssociations"));
            this.listAccount = [];
            for (let association of <any[]>associations) {
                this.listAccount.push({
                    id: association.id,
                    name: association.name,
                    role: association.role,
                    image_url: association.image_url,
                    moderate: association.moderate,
                    category: association.category,
                    type: 'association',
                    community: association.community,
                    categories: association.categories
                });
            }
        }
        else {
            let associations = this.appGlobals.adminAssociations;
            let merchants = this.appGlobals.adminMerchants;
            this.listAccount = [];
            for (let association of <any[]>associations) {
                if (this.accountType == 'association' && (association.role == 'superadmin' || association.role == 'admin') && association.moderate == 'accepted') {
                    this.listAccount.push({
                        id: association.id,
                        address: association.address,
                        name: association.name,
                        role: association.role,
                        image_url: association.image_url,
                        moderate: association.moderate,
                        category: association.category,
                        type: 'association',
                        community: association.community,
                        categories: association.categories,
                        city: association.city
                    });
                }
            }
            for (let merchant of <any[]>merchants) {
                if (this.accountType == 'merchant' && (merchant.role == 'superadmin' || merchant.role == 'admin') && merchant.moderate == 'accepted') {
                    this.listAccount.push({
                        id: merchant.id,
                        name: merchant.name,
                        address: merchant.address,
                        role: merchant.role,
                        image_url: merchant.image_url,
                        moderate: merchant.moderate,
                        category: merchant.category,
                        type: 'merchant',
                        community: merchant.community,
                        categories: merchant.categories,
                        city: merchant.city
                    });
                }
            }
        }
    }
    handleSelection(event) {
        this.article.title = this.article.title + " " + event.char;
      }
      handleDescription(event) {
        this.article.description = this.article.description + " " + event.char;
      }
      handleContent(event) {
        this.evtdescription = this.evtdescription + " " + event.char;
      }
    ionViewWillEnter() {
        let currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes());
        currentDate.setHours(currentDate.getHours() + 1);
        this.article.publicAt.fullDate = currentDate.toISOString();
        this.minPublicDate = currentDate.toISOString();
    }

    ionViewWillLeave() {
        this.globals.showHeader = true;
    }

    getCategories() {
        this.userService.findCategories().then(data => {

                this.allCategories = data;
            },
            err => {
                this.event.publish('http:errors', err);
            });
    }

    onChangeCommuCitoyen() {
        this.article.category = null;
        this.allCategories = [];
        if (!this.disabledCommunity) {
            for (let linkedcommu of this.linkedCommunities) {
                if (this.article.community == linkedcommu["id"]) {
                    for (let category of linkedcommu["categories"]) {
                        if (category['type'] == "Activité groupe / association") {
                            this.allCategories.push({
                                id: category.id,
                                name: category.name,
                                type: category.type
                            });
                        }
                    }
                }
            }
        }
        this.disabledTheme = this.allCategories.length == 0;
    }

    onChangeSecondCommu() {
        this.events.secondCategories = null;
        this.allSecondCategories = [];
        for (let linkedcommu of this.linkedCommunities) {
            if (this.events.secondCommu == linkedcommu["id"]) {
                for (let catego of linkedcommu["categories"]) {
                    if (this.accountType == "association" && catego['type'] == "Activité groupe / association") {
                        this.allSecondCategories.push({
                            id: catego.id,
                            name: catego.name,
                            type: catego.type
                        });
                    }
                    if (this.accountType == "merchant" && catego['type'] == "Thème commerce / partenaire") {
                        this.allSecondCategories.push({
                            id: catego.id,
                            name: catego.name,
                            type: catego.type
                        });
                    }
                }
            }
        }
        this.disabledSecondTheme = this.allSecondCategories.length == 0;
    }

    onChangeCommuAsso(event) {
        this.linkedCommunities = JSON.parse(localStorage.getItem("allCommunities"));
        this.article.category = null;
        this.allCategories = [];
        this.events.secondCategories = null;
        this.allSecondCategories = [];
        let selectedAsso = null;
        for (let account of this.listAccount) {
            if (account["id"] == event) {
                selectedAsso = account;
                break;
            }
        }

        const foundAt = this.linkedCommunities.findIndex(i => i.id == selectedAsso["community"]["id"]);
        if (foundAt != -1) {
            this.linkedCommunities.splice(foundAt, 1);
        }
        if (this.article.group == selectedAsso["id"]) {
            this.events.address = selectedAsso["address"];
            if(selectedAsso["city"]) {
                this.events.city = selectedAsso["city"]["name"];
            }else {
                this.events.city = null;
            }
            for (let catego of selectedAsso["community"]["categories"]) {
                if (this.accountType == "association" && catego['type'] == "Activité groupe / association") {
                    this.allCategories.push({
                        id: catego.id,
                        name: catego.name,
                        type: catego.type
                    });
                }
                if (this.accountType == "merchant" && catego['type'] == "Thème commerce / partenaire") {
                    this.allCategories.push({
                        id: catego.id,
                        name: catego.name,
                        type: catego.type
                    });
                }
            }
            this.article.community = selectedAsso["community"]["id"]
        }
        this.disabledTheme = this.allCategories.length == 0;
        this.disabledSecondTheme = this.allSecondCategories.length == 0;
    }

    onChangeEtablish(event) {
        var myarr = event.split("-");
        this.allCategories = [];

        for (let asso of this.listAccount) {
            if (asso['type'] == 'association' && asso['id'] == myarr[1]) {
                for (let category of asso['community']["categories"]) {
                    if (category['type'] == "Activité groupe / association") {
                        this.allCategories.push({
                            id: category.id,
                            name: category.name,
                            type: category.type
                        });
                    }
                }
            }
        }

    }

    onChangeCommuCommu() {
        this.article.category = null;
        this.article.heading = null;
        this.allCategories = [];
        this.allHeadings = [];
        for (let allCommu of this.adminCommunities) {
            if (this.article.group == allCommu["id"]) {
                this.hasSondage = allCommu['survey'];
                this.articleActivated = allCommu['article'];
                this.events.city = allCommu["cityName"];
                for (let catego of allCommu["categories"]) {
                    if (catego['type'] == "Activité groupe / association") {
                        this.allCategories.push({
                            id: catego.id,
                            name: catego.name,
                            type: catego.type,
                        });
                    }
                }
                if (allCommu["articleHeading"]) {
                    for (let heading of allCommu["articleHeading"]) {
                        this.allHeadings.push({
                            id: heading.id,
                            title: heading.title,
                        });
                    }
                }
                this.article.community = allCommu["id"]
            }

        }
        this.disabledTheme = this.allCategories.length == 0;
        this.disabledDedicated = this.allHeadings.length == 0;

    }

    goToSlide(nbreSlide) {
        this.slides.slideTo(500, nbreSlide);
    }

    saveArticle(errorValidation, title, description) {
        this.submited = true;
        if (!errorValidation) {
            this.isSubmitEnabled = false;
            this.article.city = this.events.city;
            if (this.accountType == 'association' || this.accountType == 'merchant' || this.accountType == 'community') {
                if (this.platform.is('core')) {
                    this.events.startDate.fullDate = this.events.startDate.year +
                        "-" + this.events.startDate.month +
                        "-" + this.events.startDate.day +
                        " " + this.events.startDate.hour +
                        ":" + this.events.startDate.minute;

                    this.events.endDate.fullDate = this.events.endDate.year +
                        "-" + this.events.endDate.month +
                        "-" + this.events.endDate.day +
                        " " + this.events.endDate.hour +
                        ":" + this.events.endDate.minute;
                    this.article.publicAt.fullDate = this.events.endDate.year +
                        "-" + this.article.publicAt.month +
                        "-" + this.article.publicAt.day +
                        " " + this.article.publicAt.hour +
                        ":" + this.article.publicAt.minute;
                } else {
                    this.events.startDate.fullDate = this.globals.IsoToDateString(this.events.startDate.fullDate);
                    this.events.endDate.fullDate = this.globals.IsoToDateString(this.events.endDate.fullDate);
                    this.article.publicAt.fullDate = this.globals.IsoToDateString(this.article.publicAt.fullDate);
                }

                this.isSubmitEnabled = false;
                let loadingPopup = this.loadingCtrl.create({});
                loadingPopup.present();
                if (this.showEvent && (this.accountType == 'association' || this.accountType == 'community')) {
                    this.events.title = this.article.title;
                    this.article.push.content = this.evtdescription;
                    this.events.description = this.article.description;
                    this.events.private = this.article.private;
                    if (this.article.photo) {
                        this.events.photo = this.article.photo;
                    } else {
                        this.events.photo = null;
                    }
                    if (this.article.photos) {
                        this.events.photos = this.article.photos;
                    } else {
                        this.events.photos = null;
                    }
                    this.events.categories = this.article.category;
                    this.article.push.hour = this.globals.IsoToDateString(this.article.push.hour);
                    this.serviceEvent.postEvent(this.accountType, this.article.group, this.events).then(data => {
                        console.log(JSON.stringify(this.article));
                            if (data.success) {
                                this.idEvent = data.id;
                                this.article.event = this.idEvent;
                                this.article.push.content = this.evtdescription;
                                this.articleService.postArticle(this.accountType, this.article.group, this.article).then(data => {
                                        loadingPopup.dismiss();
                                        this.event.publish('association:refresh');
                                        this.event.publish('news:refresh');
                                        let successAlert = this.alertCtrl.create({
                                            title: 'Succès',
                                            subTitle: 'Votre article a été ajouté avec succès.',
                                            buttons: [
                                                {
                                                    text: 'OK',
                                                    handler: () => {
                                                        this.isSubmitEnabled = true;

                                                        this.Close();


                                                    }
                                                }
                                            ]
                                        });
                                        successAlert.present();
                                    },
                                    err => {
                                        this.isSubmitEnabled = true;
                                        loadingPopup.dismiss();
                                        this.event.publish('http:errors', err);
                                    });


                            }
                        },
                        err => {
                            loadingPopup.dismiss();
                            this.isSubmitEnabled = true;
                            this.event.publish('http:errors', err);
                        });

                    this.ga.startTrackerWithId('UA-105582305-1')
                        .then(() => {
                            this.ga.trackEvent('event', 'click', 'createEvent', 1, true);
                            // Tracker is ready
                            // You can now track pages or set additional information such as AppVersion or UserId
                        })
                        .catch();
                    this.ga.startTrackerWithId(localStorage.getItem('ga'))
                        .then(() => {
                            this.ga.trackEvent('event', 'click', 'createEvent', 1, true);
                            // Tracker is ready
                            // You can now track pages or set additional information such as AppVersion or UserId
                        })
                        .catch();
                } else if (this.accountType == "merchant") { //goodPlan
                    console.log(' platform = '+this.platform.is('core'));
                    console.log("this merchant");
                    this.events.push.hour = this.globals.IsoToDateString(this.article.push.hour);
                    this.article.push.content = this.evtdescription;
                    this.events.push.enabled = this.article.push.enabled;
                    this.events.push.date = this.article.push.date;
                    this.events.title = this.article.title;
                    this.events.description = this.article.description;
                    this.events.private = this.article.private;
                    if (this.article.photo) {
                        this.events.photo = this.article.photo;
                    } else {
                        this.events.photo = null;
                    }
                    if (this.article.photos) {
                        this.events.photos = this.article.photos;
                    } else {
                        this.events.photos = null;
                    }
                    this.events.categories = this.article.category;
                    this.events.document = this.article.document;

                     //this.events.article.hour = this.globals.IsoToDateString(this.events.article.hour);


                    this.serviceGoodPlan.postGoodPlan(this.accountType, this.article.group, this.events).then(data => {

                            if (data.success) {
                                loadingPopup.dismiss();
                                let successAlert = this.alertCtrl.create({
                                    title: 'Succès',
                                    subTitle: 'Votre bon plan a été ajouté avec succès.',
                                    buttons: [
                                        {
                                            text: 'OK',
                                            handler: () => {
                                                this.isSubmitEnabled = true;
                                                this.Close();
                                            }
                                        }
                                    ]
                                });
                                successAlert.present();
                            }
                        },
                        err => {
                            loadingPopup.dismiss();
                            this.isSubmitEnabled = true;
                            this.event.publish('http:errors', err);
                        });

                }
                else { 
                    //Add article Citizen or Association or Community
                    this.article.push.content = this.evtdescription;
                    this.articleService.postArticle(this.accountType, this.article.group, this.article).then(data => {
                            this.event.publish('association:refresh');
                            this.event.publish('news:refresh');
                            loadingPopup.dismiss();
                            this.event.publish('association:refresh');
                            let successAlert = this.alertCtrl.create({
                                title: 'Succès',
                                subTitle: 'Votre article a été ajouté avec succès.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        handler: data => {
                                            this.isSubmitEnabled = true;
                                            this.Close();

                                        }
                                    }
                                ]
                            });
                            successAlert.present();
                        },
                        err => {
                            this.isSubmitEnabled = true;
                            loadingPopup.dismiss();
                            this.event.publish('http:errors', err);
                        });

                }


            } else {
                if (this.platform.is('core')) {

                    this.article.publicAt.fullDate = this.article.publicAt.year +
                        "-" + this.article.publicAt.month +
                        "-" + this.article.publicAt.day +
                        " " + this.article.publicAt.hour +
                        ":" + this.article.publicAt.minute;
                } else {
                    // get string date for ws
                    this.article.publicAt.fullDate = this.globals.IsoToDateString(this.article.publicAt.fullDate);
                }
                let loadingPopup = this.loadingCtrl.create({});
                loadingPopup.present();
                this.article.push.content = this.evtdescription;
                this.articleService.postCitoyenArticle(this.currentUser.id, this.article).then(data => {
                        loadingPopup.dismiss();
                        this.items.splice(0, 0, data);
                        this.event.publish('association:refresh');
                        this.event.publish('news:refresh');
                        let successAlert = this.alertCtrl.create({
                            title: 'Succès',
                            subTitle: 'Votre article a été ajouté avec succès.',
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: data => {
                                        this.isSubmitEnabled = true;
                                        this.article = {
                                            title: null,
                                            photo: null,
                                            photos: null,
                                            videoFile: null,
                                            document: null,
                                            secondPhoto: '',
                                            thirdPhoto: '',
                                            push: {
                                                enabled: false,
                                                date: new Date().toISOString(),
                                                hour: new Date().toISOString(),
                                                content: ""
                                            },
                                            description: null,
                                            community: null,
                                            city: null,
                                            category: null,
                                            event: '',
                                            group: null,
                                            private: false,
                                            heading: null,
                                            publicAt: {
                                                year: moment().year(),
                                                month: moment().month() + 1,
                                                day: moment().date(),
                                                hour: moment().hour(),
                                                minute: moment().minute(),
                                                fullDate: moment().format()
                                            }
                                        };
                                        this.Close();
                                    }
                                }
                            ]
                        });

                        successAlert.present();
                    },
                    err => {
                        this.isSubmitEnabled = true;
                        loadingPopup.dismiss();
                        this.event.publish('http:errors', err);
                    });
            }
        }
        else {

            if (title.invalid || title.value == null || title.value == '') {
                this.invalidTitre = true;
            }
            if (description.invalid || description.value == null || description.value == '') {
                this.invalidDesc = true;
            }

        }

    }

    public captureVideo() {
        var options = {duration: 45};
		
        this.mediaCapture.captureVideo(options)
            .then(
                (res: MediaFile[]) => {
	                let video = res[0];
                    let fileName = video.name;
                    let fullPath = video['localURL'];
                    let directory = fullPath.substring(0, fullPath.lastIndexOf("/") + 1);

                    this.file.readAsDataURL(directory, fileName).then(
                        file64 => {
                            this.article.videoFile = file64;
        
                        }
                    ).catch(err => {
                        console.log("ERR : " + err);
                    });
                },
                (err: CaptureError) => {
                    console.log("ERROR");
                }
            ).catch((err: CaptureError) => {
                console.log("VideoERRORVideo : " + err);
            }).catch((err => {
                console.log("VideoERRORVideo22 : " + err);
            }));
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

    public loadVideoFromLibrary() {
		this.camera.getPicture({
            destinationType: this.camera.DestinationType.NATIVE_URI,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            quality: 100,
            mediaType: this.camera.MediaType.VIDEO,
            allowEdit: false
        }).then((videoName) => {
            if (this.platform.is('android')) {
                videoName = "file://" + videoName;

                let directory = videoName.substring(0, videoName.lastIndexOf("/") + 1);
                let fileName = videoName.substring(videoName.lastIndexOf("/") + 1);

                this.file.readAsDataURL(directory, fileName).then(
                    file64 => {
                        this.article.videoFile = file64;

                    }
                ).catch(error => {
                    console.log("Error : " + error.message);
                });
            }
            else {
	            console.log(videoName);
	            
	            let fileData = this.filesProvider.parseFilePath(videoName);
	            console.log("Dir : " + fileData.directory);
	            console.log("File : " + fileData.fileName);
	            
                this.file.readAsDataURL(fileData.directory,fileData.fileName).then(
                    file64 => {
                        this.article.videoFile = file64;

                    }
                ).catch(error => {
                    console.log("Error : " + error.message);
	            });
            }

        });
    }

    public deleteVideo() {

        this.article.videoFile = null;

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
                    text: 'Choisir une vidéo de la bibliothèque',
                    handler: () => {
                        this.loadVideoFromLibrary();
                    }
                },
                {
                    text: 'Prendre une vidéo',
                    handler: () => {
                        this.captureVideo();
                    }
                },
                {
                    text: 'Choisir un document (Pdf, Doc, Docx ...)',
                    handler: () => {
                        this.presentActionSheetDocument();
                    }
                },
                {
                    text: 'Annuler',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
        //this.goToSlide(this.listPhotos.length);
    }

    public presentActionSheetDocument() {
		this.filesProvider.presentFileChooser(
			base64 => {
				this.article.document = base64;
			},
			failure => {
				document.getElementById("fileInput").click(); 
			}
		)
    }

    onFileChange(event) {
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            if(file.size > 5242880){
                this.filesProvider.generateFileSizeError();
            }else{
                reader.onload = () => 
                {
	                const mimeTypeAllowed = this.filesProvider.allowedMimeType(reader.result);
	                
                    if(mimeTypeAllowed){
                        this.article.document = reader.result;

                    }else {
	                    this.filesProvider.generateMimeTypeError();
                    }


                };
            }

        }
    }

    deleteDocument() {

        this.article.document= null;
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
        this.event.publish('news:refresh');
        this.event.publish('agenda:refresh');
        this.view.dismiss('close');
    }


    capitalize(event, type) {
        if (event) {
            if (type == 'title') {
                this.article.title = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'description') {
                this.article.description = event.charAt(0).toUpperCase() + event.slice(1);
            }
        }
    }

    checkDate() {

        var DateStart;
        var DateEnd;
        if (this.platform.is('core')) {
            DateStart = this.events.startDate.year +
                "-" + this.events.startDate.month +
                "-" + this.events.startDate.day +
                " " + this.events.startDate.hour +
                ":" + this.events.startDate.minute;

            DateEnd = this.events.endDate.year +
                "-" + this.events.endDate.month +
                "-" + this.events.endDate.day +
                " " + this.events.endDate.hour +
                ":" + this.events.endDate.minute;
        } else {
            // get string date for ws
            DateStart = this.globals.IsoToDateString(this.events.startDate.fullDate);
            DateEnd = this.globals.IsoToDateString(this.events.endDate.fullDate);
        }
        if ((moment(DateEnd).diff(moment(DateStart)) <= 0)) {
            this.dateEndError = true;
        } else {
            this.dateEndError = false;
        }
    }

    pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    openEvent(e) {
        this.showEvent = e._value;
    }

    removeCategory(category) {
        category = category.toString();
        let stringCategories = [];
        for (let c of this.article.category) {
            stringCategories.push(c.toString());
        }
        const foundAt = stringCategories.findIndex(i => i == category);
        if (foundAt != -1) {
            stringCategories.splice(foundAt, 1);
            this.article.category = stringCategories;
        }
    }

    removeSecondCategory(category) {
        category = category.toString();
        let stringCategories = [];
        for (let c of this.events.secondCategories) {
            stringCategories.push(c.toString());
        }
        const foundAt = stringCategories.findIndex(i => i == category);
        if (foundAt != -1) {
            stringCategories.splice(foundAt, 1);
            this.events.secondCategories = stringCategories;
        }
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

    onChangeSecondCategory(selected) {
        this.secondCategoryNames = [];
        for (let c of selected) {
            let index = this.allSecondCategories.findIndex(i => i.id == c);
            if (index != -1) {
                this.secondCategoryNames.push(this.allSecondCategories[index]);
            }
        }
    }

    onChangePrivate(selected) {
        if (selected.checked) {
            this.disabledCommunity = true;
            this.article.community = null;
            this.disabledMerchant = false;
            if (this.accountType == "citoyen") {
                this.disabledTheme = true;
                this.article.category = null;
                this.allCategories = [];
            }
        }
        else {
            this.disabledCommunity = false;
            if (this.accountType == "citoyen") {
                this.article.group = null;
            }
            this.disabledMerchant = true;
        }
    }

    onChangeHeading(selected) {
        if (selected.checked) {
            this.disabledHeading = false;
        }
        else {
            this.disabledHeading = true;
            this.article.heading = null;
        }
    }

    OnChangeRoom(selected) {
        if (selected.checked) {
            const myModal2 = this.modal.create('PopupAskRoomPage', null, {cssClass: 'style-modal modalRoom'});
            myModal2.onDidDismiss(data => {
                if (data) {
                    this.events.mailForRoom = data;
                }
                else {
                    this.events.mailForRoom = null;
                    this.events.room = false;
                }
            });
            myModal2.present();
        }
        else {
            this.events.mailForRoom = null;
        }
    }

    loadAdress(loadingPopup) {
        if (this.accountType == "association") {
            this.service = this.associationService;

        } else if (this.accountType == "merchant") {
            this.service = this.merchantService;
        }
        this.service.getDetails(this.account.id).then(data => {

                this.events.address = data.address;
                this.events.city = data.city.name;
                loadingPopup.dismiss();
            },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }

    goBack() {
        this.view.dismiss();
    } 

    showMoreEvent() {
        this.moreEvent = !this.moreEvent;
    }

    showMore() {
        this.publicDate = !this.publicDate;
        let currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes());
        currentDate.setHours(currentDate.getHours() + 1);
        this.article.publicAt.fullDate = currentDate.toISOString();
        this.minPublicDate = currentDate.toISOString();
    }

    checkFocus(element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;

            var test = yOffset - 40;
            this.content.scrollTo(0, test, 2000);
        }
    }

    popSondage() {
        if (this.article.group) {
            this.surveyDisabled = false;
            const myModal2 = this.modal.create('SondagePage', {
                "community": this.article.community
            }, {cssClass: 'style-modal'});
            myModal2.onDidDismiss(data => {
                if (data) {
                    this.Close();
                }
            });
            myModal2.present();
        }
        else {
            this.surveyDisabled = true;
        }
    }

    SelectCity() {
        const myModal2 = this.modal.create('SelectCityPage', {}, {cssClass: 'cities-modal'});
        myModal2.onDidDismiss(data => {
            if (data) {
                this.events.city = data.name;
            }
        });
        myModal2.present();
    }
}
