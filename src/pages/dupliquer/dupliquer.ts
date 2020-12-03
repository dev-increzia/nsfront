import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,Platform,Slides,Content,Events,LoadingController,AlertController, ActionSheetController,NavParams,ViewController,ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Camera} from "@ionic-native/camera";
import * as moment from "moment";
import {ArticleProvider} from "../../providers/article/article";
import {MediaCapture, MediaFile, CaptureError} from "@ionic-native/media-capture";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {File} from "@ionic-native/file";
/** 
 * Generated class for the DupliquerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage() 
@Component({
  selector: 'page-dupliquer',
  templateUrl: 'dupliquer.html',
  
}) 

export class DupliquerPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;
  fromGroup:FormGroup;
  public titre:String =null;
  public description:String = null;
  public recurrence:any =null;
  public nowDate: String = new Date().toISOString();
  public monthly:any =null;
  public weekly:any =null;
  public recursivity_end: String = new Date().toISOString();
  public heur: any = new Date().toISOString();
  public push_content:String = null;
  public photoEvnt: any =null;
  validMonthly: boolean= false;
  toggled: boolean = false;
  toggledDes: boolean = false;
  validWeekly: boolean= false;
  validRecurrence: boolean= false;
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
  categories: null,
  description: null,
  photo: null,
  price: "Gratuit",
  videoFile: null,
  secondPhoto: null,
  thirdPhoto: null,
  newPhoto: null,
  deletePhoto: false,
  recursivity_end:null,
  heur:null,
  recurivity_period:null,
  recursivity_day:null,
  recursivity_hour:null

};


public nbreSlide: number;
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
    private ref: Events,
    private mediaCapture: MediaCapture,
    public formBuilder: FormBuilder
    ) {
      this.originEvent = this.navParams.get('event');
      this.event = Object.assign({}, this.originEvent);
      this.fromGroup = this.formBuilder.group({
        titre:['',Validators.required],
        description:['',Validators.required],
        city:['',Validators.required],
        recurrence:[''],
        monthly:[''],
        weekly:[''],
        recursivity_end:[''], 
        heur:[''],
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
    if (i == -1) {
        this.event.imageURL = null;
        this.eventImgs.eventPhoto = null;
        this.eventImgs.toDelete = true;
        this.eventImgs.countPhotos--;
    } else if (id) {
        this.event.images[i].url = null;
        this.event.images[i].id = null;
    }
    else {
        this.eventImgs.photos.splice(i, 1);
    }
    if (this.event.imageURL == null) {
	    
	    if( this.event.images ) 
	    {
	        var num = this.event.images.length - 1;
	
	        while (num >= 0 && this.event.images[num].url == null) {
	            this.deleteAll = false;
	            num--;
	        }
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
onChange(event,type){
  if(event){
    if (type == 'recurrence') {
      this.validRecurrence = false;
    }
    if (type == 'weekly') {
      this.validWeekly = false;
    }
    if (type == 'monthly') {
      this.validMonthly = false;
    } 
    
  }
  
}
saveEvent(errorValidation){
if(!errorValidation ){
  if(this.recurrence == null){
      this.validRecurrence = true;
  }else  {
      if(this.recurrence == "monthly"){
        if(this.monthly == null){
          this.validMonthly = true;
        }
      }
      if(this.recurrence == "weekly"){
        if(this.weekly == null){
          this.validWeekly = true;
        }
      }
      if(!this.validRecurrence 
        && !this.validWeekly 
        && !this.validMonthly 
        ){
          this.event.recurivity_period=this.recurrence;
          this.event.recursivity_end=this.recursivity_end;
          let hourInput=moment(this.heur).subtract(1,'hours').format("HH:mm");
          this.event.recursivity_hour=hourInput.toString();
          if(this.recurrence == "daily"){
            this.event.recursivity_day=null;
          }else if(this.recurrence == "weekly"){
            this.event.recursivity_day=this.weekly;
          }else if(this.recurrence == "monthly"){
            this.event.recursivity_day=this.monthly;
          }else{
            this.event.recursivity_day=null;
          }
              let arr = []; 
              let obj={}
              for(let key in this.event.images) {
              if(this.event.images[key].id){
                 obj={
                  id:this.event.images[key].id,
                  url:this.event.images[key].url
                }
                arr.push(obj);
              }
              
              }
          this.event.images=arr;
          let loadingPopup = this.loadingCtrl.create({});
          loadingPopup.present();
          this.service.eventDuplicateNew(this.event, this.event.id,this.eventImgs).then(data => {
          loadingPopup.dismiss();
          let successAlert = this.alertCtrl.create({
          title: 'Succès',
          subTitle: 'Votre article a été dupliqué avec succès.',
          buttons: [
          {
              text: 'OK',
              handler: () => {
                this.view.dismiss();
                this.ref.publish('agenda:refresh');
              }
          }
          ]
          });
          successAlert.present();
          },
          err => {
          loadingPopup.dismiss();
          });
      }
  }

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
