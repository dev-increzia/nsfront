import {Component, ViewChild} from "@angular/core";
import {
    ActionSheetController,
    AlertController,
    Content,
    Events,
    IonicPage,
    Loading,
    LoadingController,
    NavController,
    ModalController,
    NavParams, 
    Platform,
    Slides,
    ToastController,
    ViewController
} from "ionic-angular";
import {Camera} from "@ionic-native/camera";
import {MediaCapture, MediaFile, CaptureError} from "@ionic-native/media-capture";
import {File} from "@ionic-native/file";
import {ArticleProvider} from "../../providers/article/article";
import {UserProvider} from "../../providers/user/user";
import {FormBuilder} from "@angular/forms";
import "rxjs/add/operator/map";
import {GlobalsProvider} from "../../providers/globals/globals";
import * as moment from "moment";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {AssociationProvider} from "../../providers/association/association";
import {MerchantProvider} from "../../providers/merchant/merchant";

import { FilesProvider } from "../../providers/files/files";

/**
 * Generated class for the EditPublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-edit-publish',
    templateUrl: 'edit-publish.html',
})
export class EditPublishPage {
    @ViewChild(Slides) slides: Slides;
    @ViewChild(Content) content: Content;

    lastImage: string = null;
    loading: Loading;
    private categoryNames = [];
    listPhotos = [];
    public allCategories = [];
    public accountId: any;
    public accountImg: any;
    public userImg: any;
    public allHeadings: any;
    public disabledDedicated: boolean = true;
    public disabledHeading: boolean = true;
    public activateHeader: boolean = false;
    toggled: boolean = false;
    toggledDes: boolean = false; 
    toggledDesPush: boolean = false;
    public currentArticle: any = {
        title: '',
        videoFile: null,
        imageURL: '',
        images: '',
        documentUpd: null,
        deletedoc: false,
        description: '',
        category: null,
        publicAt: '',
        city: null,
        mode:"current",
        push: {
            enabled: false,
            date: moment().format(),
            hour: moment().format(),
            content: null
        },
    };
    public public_At: any = {
        year: moment().year(),
        month: moment().month(),
        day: moment().date(),
        hour: moment().hour(),
        minute: moment().minute(),
        fullDate: moment().format()
    };
    public originArticle: any;
    public articlePhoto: any = null;
    public toDelete: boolean = false;
    public articleImgs = {
        countPhotos: 0,
        articlePhoto: null,
        toDelete: false,
        articleSecondPhoto: null,
        toDeleteSecond: false,
        secondId: null,
        articleThirdPhoto: null,
        toDeleteThird: false,
        thirdId: null,
        photos: null,
        push: {
            enabled: false,
            date: moment().format(),
            hour: moment().format(),
            content: null
        },
    };
    public articleCategories: any;
    public submited = false;
    public currentUser: any;
    public accountType: any;
    public cities;
    public nbreSlide: number;
    private publicDate = false;
    private years = [];
    private months = [];
    private days = [];
    private hours = [];
    private minutes = [];
    public events = {
        title: null,
        room: null,
        address: null,
        codePostal: null,
        city: null,
        categories: null,
        startDate: {
            year: moment().year(),
            month: moment().month() + 1,
            day: moment().date(),
            hour: moment().hour(),
            minute: moment().minute(),
            fullDate: moment().format()
        },
        endDate: {
            year: moment().year(),
            month: moment().month() + 1,
            day: moment().date(),
            hour: moment().hour(),
            minute: moment().add('m', 1).minute(),
            fullDate: moment().add('m', 1).format()
        },
        price: "Gratuit",
        description: null,
        reservationUrl: null,
        photo: null,
        secondPhoto: null,
        thirdPhoto: null,
        reservation: null,
        article: null,
        push: {
            enabled: false,
            date: moment().format(),
            hour: moment().format(),
            content: null
        },
        volunteer: false,
        personalized: false,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null,
        agefrom: null,
        ageto: null,
        lessthansix: null,
        betweensixtwelve: null,
        twelveeighteen: null,
        allchildrens: null,
        newPhoto: null,
        deletePhoto: false
    };
    public isSubmitEnabled = true;
    public account: any;
    public dateEndError = false;
    public idEvent: any;
    public showEvent: boolean = false;
    public invalidTitre = false;
    public invalidDesc = false;
    public disabledTheme: boolean = true;
    public disabledCommunity: boolean = false;
    private linkedCommunities: any;
    private listAccount = [];
    public disabledMerchant: boolean = true;
    public associations: any;
    public merchants: any;
    eventPrivate: { private: any; };
    public userEvents = [];

    constructor(public event: Events,
        public serviceArticle: ArticleProvider,
        public navCtrl: NavController,
        private navParams: NavParams,
        public formBuilder: FormBuilder,
        private camera: Camera,
        private view: ViewController,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public globals: GlobalsProvider,
        public serviceEvent: EventsrestProvider,
        public userService: UserProvider,
        public associationService: AssociationProvider,
        public merchantService: MerchantProvider,
        public appGlobals: GlobalsProvider,
        private mediaCapture: MediaCapture,
        private modal: ModalController,
        private file : File,
        private filesProvider : FilesProvider,
        ) {

        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.originArticle = this.navParams.get('article');
        this.currentArticle = Object.assign({}, this.originArticle);
        this.accountType = navParams.get('accountType');
        this.accountId = navParams.get('accountId');
        this.events.city = this.originArticle.city;
        this.linkedCommunities = JSON.parse(localStorage.getItem("allCommunities"));
        this.cities = JSON.parse(localStorage.getItem("allCities"));
        console.log('this.currentArticle = '+JSON.stringify(this.currentArticle));
        if(this.currentArticle.push.enabled){
            this.currentArticle.push.date = (this.currentArticle.push.date).split('+')[0]+'Z';
        }
        if (this.currentArticle.merchantId) {
            this.currentArticle.group = "merchant-" + this.currentArticle.merchantId;
        }
        if (this.accountType == "user") {
            if (this.currentArticle.associationId) {
                this.currentArticle.group = "association-" + this.currentArticle.associationId;
            }
            let categoriesId = [];
            for (let category of this.currentArticle.categories) {
                categoriesId.push(category.id);
            }
            this.currentArticle.category = categoriesId;
            if (this.currentArticle.community) {
                for (let linkedcommu of this.linkedCommunities) {
                    if (this.currentArticle.community == linkedcommu["id"]) {
                        this.allCategories = linkedcommu["categories"];
                    }
                }
            }
        } else {
            if (this.currentArticle.associationId) {
                this.currentArticle.group = this.currentArticle.associationId;
            }
        }

        if (this.currentArticle.imageURL) {
            this.articleImgs.countPhotos++;
        }
        if (this.currentArticle.private) {
            this.disabledMerchant = false;
            this.disabledTheme = true;
            this.disabledCommunity = true;
        } else {
            this.disabledMerchant = true;
            this.disabledTheme = false;
            this.disabledCommunity = false;
        }
        var currentYear = (new Date()).getFullYear();
        for (let i = currentYear; i <= (new Date()).getFullYear() + 50; i++) {
            this.years.push(i);
        }
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

        if (this.accountType == 'user') {
            this.associations = JSON.parse(localStorage.getItem("adherentAssociations"));
            this.merchants = JSON.parse(localStorage.getItem("adherentMerchants"));
            this.listAccount = [];
            for (let association of this.associations) {
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
            for (let merchant of this.merchants) {
                this.listAccount.push({
                    id: merchant.id,
                    name: merchant.name,
                    role: merchant.role,
                    image_url: merchant.image_url,
                    moderate: merchant.moderate,
                    category: merchant.category,
                    type: 'merchant'
                });
            }
        } else if (this.accountType == 'association') {
            let associations = JSON.parse(localStorage.getItem("adminAssociations"));
            this.listAccount = [];
            for (let association of <any[]> associations) {
                if (this.accountType == 'association' && (association.role == 'superadmin' || association.role == 'admin')) {
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
            let categoriesId = [];
            for (let category of this.currentArticle.categories) {
                categoriesId.push(category.id);
            }
            this.currentArticle.category = categoriesId;

            let selectedAsso = null;

            for (let account of this.listAccount) {
                if (account["id"] == this.currentArticle.associationId) {
                    selectedAsso = account;
                    break;
                }
            }
            if (this.currentArticle.group == selectedAsso["id"]) {
                for (let catego of selectedAsso["community"]["categories"]) {
                    if (this.accountType == "association" && catego['type'] == "Activité groupe / association") {
                        this.allCategories.push({
                            id: catego.id,
                            name: catego.name,
                            type: catego.type
                        });
                    }

                }
            }

        }
        else {
            let communities = [];
            var allCommunities = JSON.parse(localStorage.getItem("allCommunities"));
            for (let community of allCommunities) {
                if (community["isAdminPublish"]) {
                    communities.push({
                        categories: community.categories,
                        articleHeading: community.articleHeading,
                        follow: community.follow,
                        id: community.id,
                        img_url: community.img_url,
                        isAdminPublish: community.isAdminPublish,
                        isPrivate: community.isPrivate,
                        name: community.name,
                        survey: community.activate_survey,
                        article: community.activate_articles
                    });
                }
            }
            this.listAccount = [];
            let categoriesId = [];
            for (let category of this.currentArticle.categories) {
                categoriesId.push(category.id);
            }
            this.currentArticle.category = categoriesId;
            let selectedCommu = null;
            for (let account of communities) {
                if (account["id"] == this.currentArticle.communityId) {
                    selectedCommu = account;
                    break;
                }
            }
            for (let catego of selectedCommu["categories"]) {
                if (catego['type'] == "Activité groupe / association") {
                    this.allCategories.push({
                        id: catego.id,
                        name: catego.name,
                        type: catego.type
                    });
                }
            }

            this.allHeadings = [];
            if (selectedCommu["articleHeading"]) {
                for (let heading of selectedCommu["articleHeading"]) {
                    this.allHeadings.push({
                        id: heading.id,
                        title: heading.title,
                    });
                }
            }
            if (this.currentArticle.heading) {
                this.activateHeader = true;
                this.disabledHeading = false;
            }
            this.disabledDedicated = this.allHeadings.length == 0;

        }

       
       



    }
    handleSelection(event) {
        this.currentArticle.title = this.currentArticle.title + " " + event.char;
      }
      handleDescription(event) {
        this.currentArticle.description = this.currentArticle.description + " " + event.char;
      }
      handleDescriptionPush(event) {
        this.currentArticle.push.content = this.currentArticle.push.content + " " + event.char;
      }
    onChangeHeading(selected) {
        if (selected.checked) {
            this.disabledHeading = false;
        }
        else {
            this.disabledHeading = true;
            this.currentArticle.heading = null;
        }
    }

    slideChanged() {
        this.nbreSlide = this.slides.length();
        this.nbreSlide = this.nbreSlide - 1;

    }

    goToSlide() {
        this.slides.slideTo(this.nbreSlide, 500);
    }

    editArticleForm(errorValidation, title, description) {
        console.log("currentArticle = "+this.currentArticle.push.date);
        this.submited = true;
        if (!errorValidation) {
            this.currentArticle.city = this.events.city;
            if (this.accountType != "association" || (this.accountType == "association" && this.currentArticle.categories)) {
                if (this.publicDate) {
                    if (this.platform.is('core')) {
                        this.currentArticle.publicAt = this.public_At.year +
                            "-" + this.public_At.month +
                            "-" + this.public_At.day +
                            " " + this.public_At.hour +
                            ":" + this.public_At.minute;
                    } else {
                        this.currentArticle.publicAt = this.globals.IsoToDateString(this.public_At.fullDate);
                    }
                }
                this.originArticle = this.currentArticle;
                let loadingPopup = this.loadingCtrl.create({});
                loadingPopup.present();
                if (this.currentArticle.type == "association" || this.currentArticle.type == "merchant") {
                    this.isSubmitEnabled = false;
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
                    } else {
                        // get string date for ws
                        this.events.startDate.fullDate = this.globals.IsoToDateString(this.events.startDate.fullDate);
                        this.events.endDate.fullDate = this.globals.IsoToDateString(this.events.endDate.fullDate);
                    }

                    this.isSubmitEnabled = false;

                    // Add event
                    if (this.showEvent) {
                        this.events.title = this.currentArticle.title;
                        this.events.description = this.currentArticle.description;
                        if (this.articleImgs.articlePhoto) {
                            this.events.photo = this.articleImgs.articlePhoto;
                        } else {
                            this.events.photo = null;
                        }
                        if (this.articleImgs.articleSecondPhoto) {
                            this.events.secondPhoto = this.articleImgs.articleSecondPhoto;
                        } else {
                            this.events.secondPhoto = null;
                        }
                        if (this.articleImgs.articleThirdPhoto) {
                            this.events.thirdPhoto = this.articleImgs.articleThirdPhoto;
                        } else {
                            this.events.thirdPhoto = null;
                        }
                        this.events.categories = this.currentArticle.categories;
                       // this.events.push.hour = this.globals.IsoToDateString(this.events.push.hour);
                        this.serviceEvent.postEvent(this.accountType, this.accountId, this.events).then(data => {
                            if (data.success) {
                                this.idEvent = data.id;
                                this.currentArticle.event = this.idEvent;
                                
                                this.serviceArticle.putArticle(this.currentArticle, this.articleImgs).then(data => {
                                    loadingPopup.dismiss();
                                    if (data.success) {
                                        let successAlert = this.alertCtrl.create({
                                            title: 'Succès',
                                            subTitle: 'Votre article a été mis à jour avec succès.',
                                            buttons: [
                                                {
                                                    text: 'OK',
                                                    handler: data => {
                                                        this.event.publish('news:refresh');
                                                        this.view.dismiss(true);
                                                    }
                                                }
                                            ]
                                        });
                                        successAlert.present();
                                    }
                                },
                                    err => {
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
                    } else {
                        //Add article
                        
                        this.serviceArticle.putArticle(this.currentArticle, this.articleImgs).then(data => {
                            this.serviceEvent.getDetailsEvent(this.currentArticle.event).then(data => {
                                this.userEvents.push(data);
                                this.serviceEvent.editEvent(this.currentArticle.event, this.currentArticle.private).then(data => {
                                    if(data){
                                    }
                                 }, err => {
                                     console.log(err);
                                  });
                            }, err => {
                               console.log(err);
                            });
                            loadingPopup.dismiss();
                            let successAlert = this.alertCtrl.create({
                                title: 'Succès',
                                subTitle: 'Votre article a été ajouté avec succès.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        handler: data => {
                                            this.event.publish('news:refresh');
                                            this.view.dismiss(true);
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
                    this.currentArticle.push.enabled=this.currentArticle.push.enabled;
                    this.currentArticle.push.date=this.globals.IsoToDateString(this.currentArticle.push.date);
                    this.currentArticle.push.content=this.currentArticle.push.content;
                    this.currentArticle.push.hour = this.currentArticle.push.date;
                    console.log(" this.currentArticle.push.hour ="+  this.currentArticle.push.hour );
                    this.serviceArticle.putCitoyenArticle(this.currentArticle, this.articleImgs).then(data => {
                        loadingPopup.dismiss();
                        if (data) {
                            let successAlert = this.alertCtrl.create({
                                title: 'Succès',
                                subTitle: 'Votre article a été mis à jour avec succès.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        handler: data => {
                                            this.event.publish('news:refresh');
                                            this.view.dismiss(true);
                                        }
                                    }
                                ]
                            });
                            successAlert.present();

                        }
                    },
                        err => {
                            loadingPopup.dismiss();
                            this.event.publish('http:errors', err);
                        });
                }

            }

        } else {

            if (title.invalid || title.value == null || title.value == '') {
                this.invalidTitre = true;
            }
            if (description.invalid || description.value == null || description.value == '') {
                this.invalidDesc = true;
            }

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
    }


    public presentActionSheetDocument() {
	    this.filesProvider.presentFileChooser(
			base64 => {
				this.currentArticle.documentUpd = base64;
                this.currentArticle.deletedoc = false;
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
            if(file.size > 5242880)
            {
                this.filesProvider.generateFileSizeError();
            }
            else
            {
                reader.onload = () => {
	                const mimeTypeAllowed = this.filesProvider.allowedMimeType(reader.result);
	                
                    if( mimeTypeAllowed )
                    {
                        this.currentArticle.documentUpd = reader.result;
                        this.currentArticle.deletedoc = false;
                    }
                    else 
                    {
                        this.filesProvider.generateMimeTypeError();
                    }
                };
            }

        }
    }



public captureVideo() {
		var options = { duration: 45 };
		this.mediaCapture.captureVideo(options)
			.then(
				(res: MediaFile[]) => {
					let video  	  = res[0];
					let fileName  = video.name;
					let fullPath  = video['localURL'];
					let directory = fullPath.substring(0, fullPath.lastIndexOf("/") + 1 );
					this.file.readAsDataURL(directory, fileName).then(
						file64 => {
							this.currentArticle.videoFile = file64;
						}	
					).catch(err => {
						console.log("ERR : "+err);
					});
				},
				(err : CaptureError) => {
					console.log("ERROR");
				}
			);
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
            if (!this.articleImgs.articlePhoto && !this.currentArticle.imageURL) {
                this.articleImgs.articlePhoto = "data:image/jpeg;base64," + imageData;
                this.articleImgs.toDelete = false;
                this.articleImgs.countPhotos++;
            } else {
                this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            this.articleImgs.photos = this.listPhotos;
            this.goToSlide();
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
            if (!this.articleImgs.articlePhoto && !this.currentArticle.imageURL) {
                this.articleImgs.articlePhoto = "data:image/jpeg;base64," + imageData;
                this.articleImgs.toDelete = false;
                this.articleImgs.countPhotos++;
            } else {
                this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            this.articleImgs.photos = this.listPhotos;
            this.goToSlide();
        });
    }
    
    public loadVideoFromLibrary() {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            mediaType: this.camera.MediaType.VIDEO
        }).then((videoName) => {
	        if(this.platform.is('android'))
	        {
		        videoName = "file://" + videoName;
		        let directory = videoName.substring(0, videoName.lastIndexOf("/") + 1 );
				let fileName  = videoName.substring(videoName.lastIndexOf("/") + 1);
		        this.file.readAsDataURL(directory, fileName).then(
						file64 => {
							this.currentArticle.videoFile = file64;
						}	
				).catch(error => { console.log("Error : " + error.message ) ; }); 
	        }
	        else 
	        {
	    		let directory = videoName.substring(0, videoName.lastIndexOf("/") + 1 );
				let fileName  = videoName.substring(videoName.lastIndexOf("/") + 1);
				this.file.readAsDataURL(directory, fileName).then(
					file64 => {
						this.currentArticle.videoFile = file64;
						
					}	
				);    
	        }	
        });
    }

    Close() {
        this.event.publish('news:refresh');
        this.view.dismiss(true);
    }
    
    
    public deleteVideo() 
    {
	    this.currentArticle.videoFile = null;
	}


    public deletePhoto(i, id) {
        if (i == -1) {
            this.currentArticle.imageURL = null;
            this.articleImgs.articlePhoto = null;
            this.articleImgs.toDelete = true;
            this.articleImgs.countPhotos--;
        } else if (id) {
            this.currentArticle.images[i].url = null;
        }
        else {
            this.articleImgs.photos.splice(i, 1);
        }
    }

    public deleteEditedPhoto(index) {
        if (index == 2) {
            this.articleImgs.articleSecondPhoto = null;
            this.articleImgs.countPhotos--;
        }
        if (index == 3) {
            this.articleImgs.articleThirdPhoto = null;
            this.articleImgs.countPhotos--;
        }
    }

    capitalize(event, type) {
        if (event) {
            if (type == 'title') {
                this.currentArticle.title = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'description') {
                this.currentArticle.description = event.charAt(0).toUpperCase() + event.slice(1);
            }
        }
    }

    removeCategory(category) {
        category = category.toString();
        let stringCategories = [];
        for (let c of this.currentArticle.categories) {
            stringCategories.push(c.toString());
        }
        const foundAt = stringCategories.findIndex(i => i == category);
        if (foundAt != -1) {
            stringCategories.splice(foundAt, 1);
            this.currentArticle.categories = stringCategories;
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

    goBack() {
        this.currentArticle = Object.assign({}, this.originArticle);
        this.view.dismiss(this.currentArticle);
    }

    checkFocus(element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;
            var test = yOffset - 40;
            this.content.scrollTo(0, test, 2000);
        }
    }

    pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    onChangeCity(selected) {
        let index = this.cities.findIndex(i => i.name === selected);
        this.events.codePostal = this.cities[index].code;
    }

    onChangeCode(selected) {
        let index = this.cities.findIndex(i => i.code == selected);
        if (index != -1) {
            this.events.city = this.cities[index].name;
        }
    }

    onChangePrivate(selected) {
        if (selected.checked) {
            this.disabledCommunity = true;
            this.currentArticle.community = null;
            this.disabledMerchant = false;
            if (this.accountType == "user") {
                this.disabledTheme = true;
                this.currentArticle.category = null;
                this.allCategories = [];
            }
        }
        else {
            this.disabledCommunity = false;
            if (this.accountType == "user") {
                this.currentArticle.group = null;
            }
            this.disabledMerchant = true;
        }
    }
    delete() { 
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.serviceArticle.deleteArticle(this.currentArticle.id,"current").then(data => {
            this.event.publish('news:refresh');
            loadingPopup.dismiss();
            this.currentArticle = Object.assign({}, this.originArticle);
            this.view.dismiss(this.currentArticle);
            let toast = this.toastCtrl.create({
                message: 'Article supprimé avec succès',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }
    SelectCity() {
        const myModal2 = this.modal.create('SelectCityPage', {}, {cssClass: 'cities-modal'});
        myModal2.onDidDismiss(data => {
            if(data){
                this.events.city = data.name;
            }
        });
        myModal2.present();
    }

    deleteDocument() {
        this.currentArticle.document= null;
        this.currentArticle.deletedoc = true;
    }

}
