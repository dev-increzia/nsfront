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
import {GlobalsProvider} from "../../providers/globals/globals";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppProvider} from "../../providers/app/app";
import {UserProvider} from "../../providers/user/user";
import {Contact} from "../../Models/contact";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {Camera} from "@ionic-native/camera";

import { FilesProvider } from "../../providers/files/files";


/**
 * Generated class for the ReprotProblemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-reprot-problem',
    templateUrl: 'reprot-problem.html',
})
export class ReprotProblemPage {
    @ViewChild(Content) content: Content;

    public slideOneForm: FormGroup;
    public currentUser: any;
    private submited = false;
    private contactObj = new Contact();
    public community : any;
    public idHeading : number;
    public objects = [];
    
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public appGlobals: GlobalsProvider,
        public userService: UserProvider,
        public appService: AppProvider,
        public appEvents: Events,
        public serviceEvent: EventsrestProvider,
        public myModal: ModalController,
        public formBuilder: FormBuilder,
        public myAlert: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public loader: LoadingController,
        public platform: Platform,
        private loadingCtrl: LoadingController,
        private camera: Camera,
        private filesProvider : FilesProvider
        ) {

        this.idHeading = navParams.get('data');
        this.community = JSON.parse(localStorage.getItem('currentCommunity'));
        this.appGlobals.showHeader = false;
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.slideOneForm = formBuilder.group({
            'object': ['', Validators.required],
            'description': ['', Validators.required]
        });
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();

        Promise.all([this.appService.getObjects(this.idHeading)]).then(
            data => {
                this.objects = data[0];
                loadingPopup.dismiss();
            },
            err => {
                loadingPopup.dismiss();

            }
        );
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;

    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
    }

    goBack() {
        this.navCtrl.pop();
    }

    contact(errorValidation) {
        this.submited = true;
        if (!errorValidation) {
            let loadingPopup = this.loader.create({});
            // Show the popup
            loadingPopup.present();
            this.contactObj.setDescription(this.contactObj.description);
            this.appService.postContact(this.contactObj).then(() => {
                loadingPopup.dismiss();
                let successAlert = this.myAlert.create({
                    title: 'Succès',
                    subTitle: 'Votre message a été envoyé avec succès.',
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
                    this.appEvents.publish('http:errors', err);
                });
        }
    }

    checkFocus(element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
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
				this.contactObj.document = base64;
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
                reader.onload = () => {
                    const mimeTypeAllowed = this.filesProvider.allowedMimeType(reader.result);
                    
		            if( mimeTypeAllowed )
                    {
                        this.contactObj.document = reader.result;
                    }
                    else 
                    {
                        this.filesProvider.generateMimeTypeError();                    
                    }


                };
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
            this.contactObj.setPhoto("data:image/jpeg;base64," + imageData);
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
            this.contactObj.setPhoto("data:image/jpeg;base64," + imageData);
        });
    }
    public deletePhoto() {
        this.contactObj.setPhoto(null);
    }
}
