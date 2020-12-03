import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,Platform,Slides,Content,LoadingController,AlertController, ActionSheetController,NavParams,ViewController,ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Camera} from "@ionic-native/camera";
import {ArticleProvider} from "../../providers/article/article";
import {MediaCapture, MediaFile, CaptureError} from "@ionic-native/media-capture";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {File} from "@ionic-native/file";

/** 
 * Generated class for the PopupEvenDuplicateDetailPage page.
 * 
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popup-even-duplicate-detail',
  templateUrl: 'popup-even-duplicate-detail.html',
})
export class PopupEvenDuplicateDetailPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;
  fromGroup:FormGroup;
  public titre:String =null;
  public description:String = null;
  public photoEvnt: any =null;
  validMonthly: boolean= false;
  validWeekly: boolean= false;
  validRecurrence: boolean= false;
  toggled: boolean = false;
  toggledDes: boolean = false;
  public listPhotos = [];
  public invalidTitre: boolean = false;
  public invalidDesc: boolean = false;
  public invalidCity: boolean = false;
  public city: String =null;
  originEvent: any;
  private deleteAll = true;
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
public event: any = {
  title: null,
  city: null,
  description: null,
  photo: null,
  price: "Gratuit",
  videoFile: null,
  secondPhoto: null,
  thirdPhoto: null,
  newPhoto: null,
  deletePhoto: false,
  mode:null
};

public nbreSlide: number;
  mode: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public modal: ModalController,
    public serviceArticle: ArticleProvider,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private file : File, 
    public service: EventsrestProvider,
    private mediaCapture: MediaCapture,
    public formBuilder: FormBuilder
    ) {
      this.originEvent = this.navParams.get('event');
      this.mode = this.navParams.get('mode');
      this.event = Object.assign({}, this.originEvent);
      this.fromGroup = this.formBuilder.group({
        titre:['',Validators.required],
        description:['',Validators.required],
        city:['',Validators.required],
      });

      if (this.event.images) {
        this.eventImgs.countPhotos += this.event.images.length;
    }
  }
  
  ionViewDidLoad() {
  }
  handleSelection(event) {
    this.event.title = this.event.title + " " + event.char;
  }
  handleDescription(event) {
    this.event.description = this.event.description + " " + event.char;
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
  public deletePhoto(i, id) {
	  console.log("DELETE " + i + " / ID : "+id);
    if (i == -1) {
        this.event.imageURL = null;
        this.eventImgs.eventPhoto = null;
        this.eventImgs.toDelete = true;
        this.eventImgs.countPhotos--;
    } else if (id) {
        this.event.images[i].url = null;
    }
    else {
        this.eventImgs.photos.splice(i, 1);
    }
    if (this.event.imageURL == null) {
	    console.log("pass");
	    console.log(JSON.stringify(this.event));
	    console.log(JSON.stringify(this.eventImgs));
	    if( this.event.images )
	    {
	        var num = this.event.images.length - 1;
	
	        while (num >= 0 && this.event.images[num].url == null) {
	            this.deleteAll = false;
	            num--;
	        }
        }
        else
		{
			this.deleteAll = false;
		}
    }
}
  goBack() {
    this.view.dismiss();
  }
  slideChanged() {
    this.nbreSlide = this.slides.length();
    this.nbreSlide = this.nbreSlide - 1;
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
public deleteVideo() 
{
    this.event.videoFile = null;
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
            this.event.videoFile = file64;
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
        this.event.videoFile = file64;
      }	
  ).catch(error => { console.log("Error : " + error.message ) ; }); 
    }
    else 
    {
    let directory = videoName.substring(0, videoName.lastIndexOf("/") + 1 );
  let fileName  = videoName.substring(videoName.lastIndexOf("/") + 1);
  this.file.readAsDataURL(directory, fileName).then(
    file64 => {
      this.event.videoFile = file64;
    }	
  );    
    }
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
      if (!this.eventImgs.eventPhoto && !this.event.imageURL) {
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
goToSlide() {
  this.slides.slideTo(this.nbreSlide, 500);
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
      if (!this.eventImgs.eventPhoto && !this.event.imageURL) {
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

public deletePhotos() {
  this.photoEvnt=null;
}

saveEvent(errorValidation){
if(!errorValidation ){
  this.event.mode=this.mode;
  let loadingPopup = this.loadingCtrl.create({});
  loadingPopup.present();
  this.service.putEvent(this.event.id, this.event, false, "association", this.eventImgs).then(data => {
      loadingPopup.dismiss();
      if (data.success) {
          let successAlert = this.alertCtrl.create({
              title: 'Succès',
              subTitle: 'Votre événement a été mis à jour avec succès.',
              buttons: [
                  {
                      text: 'OK',
                      handler: data => {

                          this.goBack();
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
}else{
  if(this.titre == null){
    this.invalidTitre = true;
  }
  if(this.description == null){
    this.invalidDesc = true;
  }
  if(this.city == null){
    this.invalidCity = true;
  }
  }
  }

  capitalize(event, type) {
    if (event) {
      if (type == 'title') {
        this.invalidTitre = false;
      }
      if (type == 'description') {
        this.invalidDesc = false;
      }
    }
  }

  SelectCity() {
    const myModal2 = this.modal.create('SelectCityPage', {}, {cssClass: 'cities-modal'});
    myModal2.onDidDismiss(data => {
        if (data) {
            this.event.cityName = data.name;
            this.invalidCity = false;
        }
    });
    myModal2.present();
}
}
