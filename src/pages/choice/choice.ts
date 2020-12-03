import {Component} from "@angular/core";
import {
    AlertController,
    Events,
    IonicPage,
    ModalController,
    NavController,
    NavParams,
    ViewController
} from "ionic-angular";
import "rxjs/add/operator/map";
import {UserProvider} from "../../providers/user/user";
import {GlobalsProvider} from "../../providers/globals/globals";

/**
 * Generated class for the ChoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-choice',
    templateUrl: 'choice.html',
})
export class ChoicePage {
    public currentUser: any;
    public associations:any;
    public merchants:any;
    public communities:any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userService: UserProvider,
                private view: ViewController,
                public appEvents: Events,
                private modal: ModalController,
                public appGlobals: GlobalsProvider,
                public alertCtrl: AlertController) {
        this.appEvents.publish('admin:associations');
        this.appEvents.publish('admin:merchants');
        this.appEvents.publish('member:associations');
        this.appEvents.publish('member:merchants');
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

    Close() {
        this.view.dismiss();
    }

    popPublish(account, accountType) {
        let associations = this.appGlobals.adminAssociations;
        let merchants = this.appGlobals.adminMerchants;
        this.merchants = [];
        this.associations = [];
        for (let key in associations){
            if (associations[key].moderate == 'accepted') {
                this.associations.push(associations[key]);
            }
        }
        for (let key in merchants){
            if (merchants[key].moderate == 'accepted') {
                this.merchants.push(merchants[key]);
            }
        }
        this.communities = [];
        var allCommunities = JSON.parse(localStorage.getItem("allCommunities"));
        for (let community of allCommunities){
            if (community["isAdminPublish"] && (community['activate_survey'] || community['activate_articles'] )){
                this.communities.push({
                    categories: community.categories,
                    follow: community.follow,
                    id: community.id,
                    img_url: community.img_url,
                    isAdminPublish: community.isAdminPublish,
                    isPrivate: community.isPrivate,
                    name: community.name,
                    survey:community.activate_survey,
                    article:community.activate_articles});
            }
        }
        if(this.associations.length == 0 && account == 'association'){
            const myModal2 = this.modal.create('PopupPage', {"message": "<p> Vous n'avez pas de Groupe / Association ! </p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();

        }else if(this.merchants.length == 0 && account == 'merchant'){
            const myModal2 = this.modal.create('PopupPage', {"message": "<p>Vous n'avez pas de Commerce / Partenaire </p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();

        }
        else if(this.communities.length == 0 && account == 'community'){
            const myModal2 = this.modal.create('PopupPage', {"message": "<p>Vous n'avez pas de <br> communauté ! </p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();

        }else if (account == 'merchant' || account == 'association' || account == 'community' || accountType == 'citoyen' || accountType == 'cityhall' || accountType == 'project' || accountType == 'canteen') {
            const myModal2 = this.modal.create('PublishPage', {
                "account": account,
                "accountType": accountType
            }, {cssClass: 'style-modal publish-modal'});
            myModal2.onDidDismiss(data => {
                if (data) {
                    this.Close();
                }
            });
            myModal2.present();
        } else {
            let errorAlert = this.alertCtrl.create({
                subTitle: 'Votre compte est en attente de validation',
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
    }
}
