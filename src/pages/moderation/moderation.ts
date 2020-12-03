import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events,Platform,AlertController,LoadingController,ModalController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {UserProvider} from "../../providers/user/user";
import {GlobalsProvider} from "../../providers/globals/globals";
import {CommunityProvider} from "../../providers/community/community";
import {EmptyNewsPage} from "../empty-news/empty-news";
import {NewsPage} from "../../pages/news/news";
import {LoginProvider} from "../../providers/login/login";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ModerationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-moderation',
  templateUrl: 'moderation.html',
})
export class ModerationPage {
  fromGroup:FormGroup;
  public moduration: any = {
    email: null,
    lastname:null,
    city:null,
    firstname:null,
    password:null,
    communities:[]
    
  };
  
  public communities: any ={
    
			id:null, 
      type:"public",
			password:null
		
  }
  invalidCity: boolean = false;
  communaute: any;
  invalidPassword: boolean= false;
  invalidEmail: boolean= false;
  invalidFirstname: boolean= false;
  invalidlastname: boolean= false;
  invalidCode: boolean=false;
  approved: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modal: ModalController,
    public serviceUser: UserProvider,
    public loader: LoadingController,
    public myAlert: AlertController,
    public appGlobals: GlobalsProvider,
    public service: LoginProvider,
    public platform: Platform,
    public serviceCommunity: CommunityProvider,
    public appEvents: Events,
    public formBuilder: FormBuilder
    ) {
      this.communaute = this.navParams.get('item');
      console.log("this.communaute = "+JSON.stringify(this.communaute));
      if(this.communaute.isPrivate){
        this.fromGroup = this.formBuilder.group({
          // email:['',Validators.required],
           email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
           city:['',Validators.required],
           lastname:['',Validators.required],
           firstname:['',Validators.required],
           password:['',Validators.required],
           code:['',Validators.required],
         
         });
      }else{
        this.fromGroup = this.formBuilder.group({
          // email:['',Validators.required],
           email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
           city:['',Validators.required],
           lastname:['',Validators.required],
           firstname:['',Validators.required],
           password:['',Validators.required],
        //   code:['',Validators.required],
         
         });
      }
     
     
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModerationPage');
  }
  SelectCity() {
    const myModal2 = this.modal.create('SelectCityPage', {}, {cssClass: 'cities-modal'});
    myModal2.onDidDismiss(data => {
        if (data) {
            this.moduration.city = data.name;
            this.invalidCity = false;
        }
    });
    myModal2.present();
}

capitalize(event, type) {
  if (event) {
    if (type == 'lastname') {
      this.invalidlastname= false;
    }
    if (type == 'firstname') {
      this.invalidFirstname = false;
    }
    if (type == 'email') {
      if(this.moduration.email.indexOf(".") > -1 && this.moduration.email.indexOf("@") > -1 &&
      this.moduration.email.indexOf("@") < this.moduration.email.indexOf(".")
      )
      {
        this.invalidEmail = false;

      }else{
        this.invalidEmail = true;

      }
    }
    
    if (type == 'password') {
      this.invalidPassword = false;
    }

    if(type == 'code'){
      this.invalidCode = false;
    }
   
  }
  
}
alertErreur(message){
  let errorAlert = this.myAlert.create({
    title: "Erreur",
    subTitle: message,
    buttons: [
        {
            text: 'OK',
            handler: () => {
            }
        }
    ]
  });
  errorAlert.present();
}

register(errorValidation){
  if(!errorValidation ){
    let array:any =[];
    this.communities.id=this.communaute.id;
    if(this.communaute.isPrivate){
      this.communities.type="private";
    }
    array.push(this.communities);
    this.moduration.communities=array;
    let loadingPopup = this.loader.create({});
    loadingPopup.present();
    this.serviceUser.registerFollow(this.moduration).then(data => {
      if(data){
        loadingPopup.dismiss();
        if(data.code == 412){
          this.alertErreur(data.message);
        }else
        if(data.code == 404){
          this.alertErreur(data.message);
        }else
        if(data.code == 406){
          this.alertErreur(data.message);
        }else
        if(data.code == 409){
          this.alertErreur(data.message);
        }else
        if(data.code == 410){
          this.alertErreur(data.message);
        }
        else
        if(data.code == 200){
          this.appGlobals.token = data.token;
          localStorage.setItem('token', data.token);
          localStorage.setItem("adminAssociations", JSON.stringify([]));
          localStorage.setItem("adminMerchants", JSON.stringify([]));
          localStorage.setItem("adherentAssociations", JSON.stringify([]));
          localStorage.setItem("adherentMerchants", JSON.stringify([]));
          var expiration_date = new Date();
          expiration_date.setDate(expiration_date.getDate() + 7);
          localStorage.setItem('expiration_date', expiration_date.toString());
          localStorage.setItem('account_type', 'citoyen');
          localStorage.setItem('ga', data.ga);
          if (data.token) {
              localStorage.setItem("currentUser", JSON.stringify(data.user));
              localStorage.setItem("isLoggedIn", "1");
              localStorage.setItem("hasCommunities", "false");
              localStorage.setItem("hasApprovedCommunities", "false");
              let Communities = [];
              localStorage.setItem("allCommunities", JSON.stringify(Communities));
              Promise.all([this.serviceCommunity.getAllPublicCommunities(), this.serviceCommunity.getAllPrivateCommunities(), this.serviceCommunity.findCurrentUserCommunities()]).then(user => {
                localStorage.setItem("publicCommunities", JSON.stringify(user[0]));
                localStorage.setItem("privateCommunities", JSON.stringify(user[1]));
                localStorage.setItem("allCommunities", JSON.stringify(user[2]));
                this.approved = user[2];
                if (this.approved.length != 0) {
                    localStorage.setItem("hasApprovedCommunities", "true");
                } else {
                    localStorage.setItem("hasApprovedCommunities", "false");
                }
                this.appEvents.publish('refreshCommunities');
            });
              Promise.all([this.service.currentUserInformation(data.token), this.serviceCommunity.findCurrentUserFollowedCommunities()]).then(datas => {
                localStorage.setItem("currentUser", JSON.stringify(datas[0]));
                localStorage.setItem("followedCommunities", JSON.stringify(datas[1]));
                this.appEvents.publish('refreshCurrentUser');
                this.appEvents.publish('refreshApprovedCommunities');
                localStorage.setItem("isLoggedIn", "1");
                localStorage.setItem('ga', data.ga);
                loadingPopup.dismiss();
                localStorage.removeItem('communityDeeplink');
                this.communities = datas[1];
                if (this.communities.length != 0) {
                    localStorage.setItem("hasCommunities", "true");
                    this.navCtrl.setRoot(NewsPage);
                } else {
                    localStorage.setItem("hasCommunities", "false");
                    this.navCtrl.setRoot(EmptyNewsPage);
                }

            });
        }
         
      }
    }

      });
  }else{
    if(this.moduration.lastname == null){
      this.invalidlastname = true;
    }
    if(this.moduration.firstname == null){
      this.invalidFirstname = true;
    }
    if(this.moduration.city == null){
      this.invalidCity = true;
    }
    if(this.moduration.password == null){
      this.invalidPassword = true;
    }
    if(this.moduration.email == null){
      this.invalidEmail = true;
    }
    if(this.communaute.isPrivate && this.communities.password==null){
      this.invalidCode = true;
    }
    }
  
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }
}
