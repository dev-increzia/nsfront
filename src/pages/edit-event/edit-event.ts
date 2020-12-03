import {Component, ViewChild} from "@angular/core";
import {
    ActionSheetController,
    AlertController,
    Content,
    Events,
    IonicPage,
    Loading,
    LoadingController, ModalController,
    NavController,
    NavParams,
    Platform,
    Slides,
    ToastController,
    ViewController
} from "ionic-angular";
import {Camera} from "@ionic-native/camera";
import {MediaCapture, MediaFile, CaptureError} from "@ionic-native/media-capture";
import {File} from "@ionic-native/file";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {UserProvider} from "../../providers/user/user";
import {FormBuilder} from "@angular/forms";
import "rxjs/add/operator/map";
import * as moment from "moment";
import {GlobalsProvider} from "../../providers/globals/globals";

/**
 * Generated class for the EditEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-edit-event',
    templateUrl: 'edit-event.html',
})
export class EditEventPage {
    @ViewChild(Slides) slides: Slides;
    @ViewChild(Content) content: Content;
    public lastImage: string = null;
    public loading: Loading;
    private categoryNames = [];
    private categoryIds = [];
    public listPhotos = [];
    toggled: boolean = false;
    toggledDes: boolean = false;
    toggledDesPush: boolean = false;

    public nbreSlide: number;
    public allCategories = [];
    public accountId: any;
    public accountImg: any;
    public userImg: any;
    public dateNow = new Date().toISOString();
    public currentEvent: any = {
        title: null,
        room: null,
        address: null,
        postalcode: null,
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
        videoFile: null,
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
    public originEvent: any;
    public eventPhoto: any = null;
    public toDelete: boolean = false;
    public eventImgs = {
        countPhotos: 0,
        eventPhoto: null,
        toDelete: false,
        eventSecondPhoto: null,
        toDeleteSecond: false,
        secondId: null,
        eventThirdPhoto: null,
        toDeleteThird: false,
        thirdId: null,
        photos: null

    };
    public eventCategories: any;
    public submited = false;
    public currentUser: any;
    public accountType: any;
    public cities = [];
    private deleteAll = true;
    constructor(public event: Events,
        public globals: GlobalsProvider,
        public service: EventsrestProvider,
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
        public userService: UserProvider,
        private mediaCapture: MediaCapture,
        private file : File, 
        public myModal: ModalController,) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.cities = this.globals.allCities;
        this.originEvent = this.navParams.get('event');
        this.accountType = navParams.get('accountType');
        this.currentEvent = Object.assign({}, this.originEvent);
        this.accountType = navParams.get('accountType');
        let catTmp = JSON.parse(localStorage.getItem("adminAssociations")).find(x => x.id == this.currentEvent.creatorId).community.categories;
        for(let cat of catTmp){
            if(cat.type == 'Activité groupe / association')
            {
                this.allCategories.push(cat);
            }
        }
        if(this.currentEvent.push.enabled){
            this.currentEvent.push.date = (this.currentEvent.push.date).split('+')[0]+'Z';
        }
        if (this.currentEvent.images) {
            this.eventImgs.countPhotos += this.currentEvent.images.length;
        }
        if (this.currentEvent.categories) {
            for (let cat of this.currentEvent.categories) {
                this.categoryNames.push(cat);
                this.categoryIds.push(cat.id);
            }
            this.currentEvent.categories = this.categoryIds;
        }
    }
    handleSelection(event) {
        this.currentEvent.title = this.currentEvent.title + " " + event.char;
      }
      handleDescription(event) {
        this.currentEvent.description = this.currentEvent.description + " " + event.char;
      }
      handleDescriptionPush(event) {
        this.currentEvent.push.content = this.currentEvent.push.content + " " + event.char;
      }
    editEvent(errorValidation) {
        this.submited = true;
        if (!errorValidation) {
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            this.service.putEvent(this.currentEvent.id, this.currentEvent, false, "association", this.eventImgs).then(data => {
                loadingPopup.dismiss();
                if (data.success) {
                    let successAlert = this.alertCtrl.create({
                        title: 'Succès',
                        subTitle: 'Votre événement a été mis à jour avec succès.',
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
                }
            },
                err => {
                    loadingPopup.dismiss();

                    if (err.status == 0) {
                        let errorAlert = this.alertCtrl.create({
                            title: "Erreur",
                            subTitle: "Veuillez vérifier votre connexion.",
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
                    } else if (err.status == 401) {
                        let errorAlert = this.alertCtrl.create({
                            title: "Erreur",
                            subTitle: "Session expirée",
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
                    } else if (err.status == 403) {
                        let errorAlert = this.alertCtrl.create({
                            title: "Erreur",
                            subTitle: "Accès interdit",
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
                    } else {
                        let errorAlert = this.alertCtrl.create({
                            title: "Erreur",
                            subTitle: "Une erreur est survenue, veuillez ré-essayer plus tard.",
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
                    }
                });
        }
    }


    Close() {
        this.view.dismiss(true);
    }

    goBack() {
        this.currentEvent = Object.assign({}, this.originEvent);
        this.view.dismiss(this.currentEvent);
    }

    checkFocus(element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;
            this.content.scrollTo(0, yOffset, 2000);
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

    removeCategory(category) {
        category = category.toString();
        let stringCategories = [];
        for (let c of this.currentEvent.categories) {
            stringCategories.push(c.toString());
        }
        const foundAt = stringCategories.findIndex(i => i == category);
        if (foundAt != -1) {
            stringCategories.splice(foundAt, 1);
            this.currentEvent.categories = stringCategories;
        }
    }
    capitalize(event, type) {
        if (event) {
            if (type == 'title') {
                this.currentEvent.title = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'description') {
                this.currentEvent.description = event.charAt(0).toUpperCase() + event.slice(1);
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
                    text: 'Annuler',
                    role: 'cancel'
                }
            ]
        });
        this.deleteAll = true;
        actionSheet.present();
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
							this.currentEvent.videoFile = file64;
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
							this.currentEvent.videoFile = file64;
						}	
				).catch(error => { console.log("Error : " + error.message ) ; }); 
	        }
	        else 
	        {
	    		let directory = videoName.substring(0, videoName.lastIndexOf("/") + 1 );
				let fileName  = videoName.substring(videoName.lastIndexOf("/") + 1);
				this.file.readAsDataURL(directory, fileName).then(
					file64 => {
						this.currentEvent.videoFile = file64;
					}	
				);    
	        }
        });
    }
    
    
    public deleteVideo() 
    {
        this.currentEvent.videoFile = null;
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
            if (!this.eventImgs.eventPhoto && !this.currentEvent.imageURL) {
                this.eventImgs.eventPhoto = "data:image/jpeg;base64," + imageData;
                this.eventImgs.toDelete = false;
                this.eventImgs.countPhotos++;
            } else {
                this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            this.eventImgs.photos = this.listPhotos;
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
            if (!this.eventImgs.eventPhoto && !this.currentEvent.imageURL) {
                this.eventImgs.eventPhoto = "data:image/jpeg;base64," + imageData;
                this.eventImgs.toDelete = false;
                this.eventImgs.countPhotos++;
            } else {
                this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            this.eventImgs.photos = this.listPhotos;
            this.goToSlide();

        });
    }
    public deletePhoto(i, id) {
        if (i == -1) {
            this.currentEvent.imageURL = null;
            this.eventImgs.eventPhoto = null;
            this.eventImgs.toDelete = true;
            this.eventImgs.countPhotos--;
        } else if (id) {
            this.currentEvent.images[i].url = null;
        }
        else {
            this.eventImgs.photos.splice(i, 1);
        }
        if (this.currentEvent.imageURL == null) {
            var num = this.currentEvent.images.length - 1;

            while (num >= 0 && this.currentEvent.images[num].url == null) {
                this.deleteAll = false;
                num--;
            }
        }
    }

    public deleteEditedPhoto(index) {
        if (index == 2) {
            this.eventImgs.eventSecondPhoto = null;
            this.eventImgs.countPhotos--;
        }
        if (index == 3) {
            this.eventImgs.eventThirdPhoto = null;
            this.eventImgs.countPhotos--;
        }
    }

    goToSlide() {
        this.slides.slideTo(this.nbreSlide, 500);
    }

    slideChanged() {
        this.nbreSlide = this.slides.length();
        this.nbreSlide = this.nbreSlide - 1;
    }

    SelectCity() {
        const myModal2 = this.myModal.create('SelectCityPage', {}, {cssClass: 'cities-modal'});
        myModal2.onDidDismiss(data => {
            if(data){
                this.currentEvent.cityName = data.name;
            }
        });
        myModal2.present();
    }

}
