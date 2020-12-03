import {Component} from "@angular/core";
import {
    AlertController,
    Events,
    IonicPage,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    ViewController
} from "ionic-angular";
import "rxjs/add/operator/map";
import {CommunityProvider} from "../../providers/community/community";

/**
 * Generated class for the PasswordCommunityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-password-community',
  templateUrl: 'password-community.html',
})
export class PasswordCommunityPage {
  public communityId: any;
  public communityName: any;
  public password = "";
  public falsePassword = false;
  public currentUser = JSON.parse(localStorage.getItem("currentUser"));
  public phoneNumber: any;
  public isDisabled = true;
  public badPhone = false;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    public serviceCommunity: CommunityProvider,
    private modal: ModalController,
    public loadingCtrl: LoadingController,
    public appEvent: Events,
    public alertCtrl: AlertController) {
    this.phoneNumber = this.currentUser.phone;
    if (!this.phoneNumber) {
      this.isDisabled = false;
    }
    this.communityId = navParams.get('id');
    this.communityName = navParams.get('name');
  }

  Close() {
    this.view.dismiss();
  }

  checkPassword() {
    this.falsePassword = false;
    if (this.password != '') {
      let loadingPopup = this.loadingCtrl.create({});
      this.serviceCommunity.postUserPrivateCommunities(this.communityId, this.password).then(data => {
        loadingPopup.dismiss();
        if (data.success) {
          Promise.all([this.serviceCommunity.getAllPrivateCommunities(), this.serviceCommunity.findCurrentUserCommunities()]).then(user => {
            localStorage.setItem("privateCommunities", JSON.stringify(user[0]));
            this.appEvent.publish('refreshCommunities');
            localStorage.setItem("hasApprovedCommunities", "true");
            localStorage.setItem("allCommunities", JSON.stringify(user[1]));
            this.appEvent.publish('refreshApprovedCommunities');
            this.appEvent.publish('refreshCommunities');


          });
          this.view.dismiss();
          const myModal2 = this.modal.create('PopupPage', { "message": "<p>C'est parfait. Bienvenue dans cette communauté ! </p>" }, { cssClass: 'message-modal' });
          myModal2.onDidDismiss(() => {
          });
          myModal2.present();

        } else {

          this.falsePassword = true;
        }

      },
        err => {
          this.appEvent.publish('http:errors', err);
          loadingPopup.dismiss();
        });

    }


  }
  sendRequest() {
    var phoneRegexp = /^(33|0)\d{9}$/;
    if (this.password == '') {
      this.falsePassword = true;
    } else if (this.phoneNumber != '') {
      if (phoneRegexp.test(this.phoneNumber)) {
        this.view.dismiss();
        this.badPhone = false;
        let loadingPopup = this.loadingCtrl.create({});
        this.serviceCommunity.postPasswordRequest(this.communityId, this.phoneNumber).then(data => {
          loadingPopup.dismiss();
          const myModal2 = this.modal.create('PopupPage', { "message": "<p>C'est parfait. Votre demande d’accès a été envoyée à l’administrateur de la communauté. </p>" }, { cssClass: 'message-modal' });
          myModal2.onDidDismiss(() => {
          });
          myModal2.present();
        },
          err => {
            this.appEvent.publish('http:errors', err);
            loadingPopup.dismiss();
          });

      }
      else {
        this.badPhone = true;
      }
    }
    else {
      this.badPhone = true;
    }
  }
}
