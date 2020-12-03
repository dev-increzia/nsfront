import { Component , ViewChild} from '@angular/core';
import { IonicPage, Slides,NavController,Events,Platform,LoadingController,AlertController, ActionSheetController,NavParams,ViewController ,ModalController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Camera} from "@ionic-native/camera";
import {MediaCapture, MediaFile, CaptureError} from "@ionic-native/media-capture";
import {File} from "@ionic-native/file";
import {ArticleProvider} from "../../providers/article/article";
import * as moment from "moment";
import {GlobalsProvider} from "../../providers/globals/globals";

import { FilesProvider } from "../../providers/files/files";


/**
 * Generated class for the DupliquerArticlePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dupliquer-article',
  templateUrl: 'dupliquer-article.html',
})
export class DupliquerArticlePage {
  @ViewChild(Slides) slides: Slides;
  fromGroup:FormGroup;
  public titre:String =null;
  public recurrence:any =null;
  public nowDate: String = new Date().toISOString();
  public monthly:any =null;
  public weekly:any =null;
  public recursivity_end: String = new Date().toISOString();
  public description:String = null;
  public photoEvnt: any =null;
  public listPhotos = [];
  toggled: boolean = false;
  toggledDes: boolean = false;
  public nbreSlide: number;
  
  public articleDupliquer: any = {
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
	  limit_date : null,
	  period: null,
	  day: null
  };
	public public_At: any = {
	  year: moment().year(),
	  month: moment().month(),
	  day: moment().date(),
	  hour: moment().hour(),
	  minute: moment().minute(),
	  fullDate: moment().format()
  };
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
	  photos: null
  };

  public city: String ;
  public invalidTitre: boolean = false;
  public invalidDesc: boolean = false;
  public invalidCity: boolean = false;
  originArticle: any;
  validRecursivity_end: boolean= false;
  validMonthly: boolean= false;
  validWeekly: boolean= false;
  validRecurrence: boolean= false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private mediaCapture: MediaCapture,
    public modal: ModalController,
    private file: File,
    private ref: Events,
    public globals: GlobalsProvider,
    private loadingCtrl: LoadingController,
    public serviceArticle: ArticleProvider,
    public alertCtrl: AlertController,
    public platform: Platform,
    public formBuilder: FormBuilder,
    private filesProvider : FilesProvider,

    ) {
      this.originArticle = this.navParams.get('article');
      this.articleDupliquer = Object.assign({}, this.originArticle);
      
      console.log(JSON.stringify(this.originArticle));
      if (this.articleDupliquer.imageURL) 
      {
	      console.log(this.articleDupliquer.imageURL);
        this.articleImgs.countPhotos++;
      }
      this.fromGroup = this.formBuilder.group({
        titre:['',Validators.required],
        description:['',Validators.required],
        city:['',Validators.required],
        recurrence:[''],
        monthly:[''],
        weekly:[''],
        recursivity_end:[''],
      });
  }
  
  ionViewDidLoad() {}
  
  handleSelection(event) {
    this.articleDupliquer.title = this.articleDupliquer.title + " " + event.char;
  }
  handleDescription(event) {
    this.articleDupliquer.description = this.articleDupliquer.description + " " + event.char;
  }
  goBack() {
    this.view.dismiss();
    this.articleDupliquer = this.navParams.get('article');
  }

  slideChanged() {
    this.nbreSlide = this.slides.length();
    this.nbreSlide = this.nbreSlide - 1;

}

goToSlide() {
    this.slides.slideTo(this.nbreSlide, 500);
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
			this.articleDupliquer.document = base64;
			this.articleDupliquer.documentUpd = base64;
			this.articleDupliquer.deletedoc = false;
		},
		failure => {
			document.getElementById("fileInput").click(); 
		}
	)
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
            this.articleDupliquer.videoFile = file64;
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
  })
  .then((videoName) => {
    if(this.platform.is('android'))
    {
      videoName = "file://" + videoName;
      let directory = videoName.substring(0, videoName.lastIndexOf("/") + 1 );
	  let fileName  = videoName.substring(videoName.lastIndexOf("/") + 1);
      this.file.readAsDataURL(directory, fileName).then(
      	file64 => {
        this.articleDupliquer.videoFile = file64;
      })
      .catch(error => { console.log("Error : " + error.message ) ; }); 
    }
    else 
    {
    	let directory = videoName.substring(0, videoName.lastIndexOf("/") + 1 );
		let fileName  = videoName.substring(videoName.lastIndexOf("/") + 1);
		this.file.readAsDataURL(directory, fileName).then(
			file64 => {
				this.articleDupliquer.videoFile = file64;
    	});    
    }	
  });
}

deleteDocument() {
  this.articleDupliquer.document= null;
  this.articleDupliquer.deletedoc = true;
}

onFileChange(event) {
  let reader = new FileReader();
  if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(event.target.files);
      console.log(file);
      reader.readAsDataURL(file);
      if(file.size > 5242880)
      {
	      this.filesProvider.generateFileSizeError();
      }
      else
      {
          reader.onload = () => {
	          const mimeTypeAllowed = this.filesProvider.allowedMimeType(reader.result);
	          
              if(mimeTypeAllowed)
              {
                  this.articleDupliquer.documentUpd = reader.result;
                  this.articleDupliquer.deletedoc = false;
              }
              else 
              {
                  this.filesProvider.generateMimeTypeError();
              }
          };
      }

  }
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
      if (!this.articleImgs.articlePhoto && !this.articleDupliquer.imageURL) {
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
      if (!this.articleImgs.articlePhoto && !this.articleDupliquer.imageURL) {
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

public deletePhoto(i, id) {
  if (i == -1) {
      this.articleDupliquer.imageURL = null;
      this.articleImgs.articlePhoto = null;
      this.articleImgs.toDelete = true;
      this.articleImgs.countPhotos--;
  } else if (id) {
      this.articleDupliquer.images[i].url = null;
      this.articleDupliquer.images[i].id = null;
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

  public deleteVideo() 
  {
	    this.articleDupliquer.videoFile = null;
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
      if (type == 'recursivity_end') {
        this.validRecursivity_end = false;
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

  saveArticle(errorValidation){
    if(!errorValidation ){
      if(this.recurrence == null){
          this.validRecurrence = true;
      }else  {
        if(this.recursivity_end == null ){
            this.validRecursivity_end = true;
        }
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
            && !this.validRecursivity_end){
              this.articleDupliquer.period=this.recurrence;
              this.articleDupliquer.limit_date=this.recursivity_end;
              if(this.recurrence == "daily"){
                this.articleDupliquer.day=null;
              }else if(this.recurrence == "weekly"){
                this.articleDupliquer.day=this.weekly;
              }else if(this.recurrence == "monthly"){
                this.articleDupliquer.day=this.monthly;
              }else{
                this.articleDupliquer.day=null;
              }

              let arr = []; 
              let obj={}
              for(let key in this.articleDupliquer.images) {
              if(this.articleDupliquer.images[key].id){
                 obj={
                  id:this.articleDupliquer.images[key].id,
                  url:this.articleDupliquer.images[key].url
                }
                arr.push(obj);
              }
              
              
              }

              if(this.articleDupliquer.imageURL){
                obj={
                  id:this.articleDupliquer.image,
                  url:this.articleDupliquer.imageURL
                }
                arr.push(obj);
              }


          this.articleDupliquer.images=arr;

              if (this.platform.is('core')) {
                this.articleDupliquer.publicAt = this.public_At.year +
                    "-" + this.public_At.month +
                    "-" + this.public_At.day +
                    " " + this.public_At.hour +
                    ":" + this.public_At.minute;
            } else {
                this.articleDupliquer.publicAt = this.globals.IsoToDateString(this.public_At.fullDate);
            }
              let loadingPopup = this.loadingCtrl.create({});
              loadingPopup.present();
              this.serviceArticle.articlesDuplicateNew(this.articleDupliquer, this.articleDupliquer.id,this.articleImgs).then(data => {
              loadingPopup.dismiss();
              let successAlert = this.alertCtrl.create({
              title: 'Succès',
              subTitle: 'Votre article a été dupliqué avec succès.',
              buttons: [
              {
                  text: 'OK',
                  handler: () => {
                    this.view.dismiss();
                    this.ref.publish('news:refresh');
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
    SelectCity() {
      const myModal2 = this.modal.create('SelectCityPage', {}, {cssClass: 'cities-modal'});
      myModal2.onDidDismiss(data => {
          if (data) {
              this.articleDupliquer.city = data.name;
              this.invalidCity = false;
          }
      });
      myModal2.present();
  }

}

