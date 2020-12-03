import {Component} from '@angular/core';
import {AlertController, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GlobalsProvider} from "../../providers/globals/globals";
import {AssociationProvider} from "../../providers/association/association";
import {MerchantProvider} from "../../providers/merchant/merchant";

/**
 * Generated class for the AdherentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-adherent',
    templateUrl: 'adherent.html',
})
export class AdherentPage {

    adherentList: any[] = [];
    public account: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public appGlobals: GlobalsProvider,
                public associaltionProvider: AssociationProvider,
                public merchantProvider: MerchantProvider,
                private loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                public event: Events) {
    }

    ionViewDidLoad() {
    }

    ionViewWillLoad() {
        this.account = this.navParams.get('account');
        this.getAdherentsList();
    }

    acceptMemberShip(adherent,type) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        if(type == 'association'){
            this.associaltionProvider.AcceptMemberShip(this.account.id, adherent.user_id).then(data => {
                this.getAdherentsList();
                loadingPopup.dismiss();
            }, error => {
                console.log(error);
            });
        }else{
            this.merchantProvider.AcceptMemberShip(this.account.id, adherent.user_id).then(data => {
                this.getAdherentsList();
                loadingPopup.dismiss();
            }, error => {
                console.log(error);
            });
        }

    }

    deleteMemberShip(adherent, type) {
        let alert = this.alertCtrl.create({
            title: 'Supprimer cet adhérent',
            subTitle: 'Voulez-vous vraiment supprimer cet adhérent ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'OK',
                    handler: data => {
                        let loadingPopup = this.loadingCtrl.create({});
                        loadingPopup.present();
                        if(type == 'association'){
                            this.associaltionProvider.DeleteMemberShip(this.account.id, adherent.user_id).then(data => {
                                this.getAdherentsList();
                                loadingPopup.dismiss();
                            }, error => {
                                console.log(error);
                            });
                        }else{
                            this.merchantProvider.DeleteMemberShip(this.account.id, adherent.user_id).then(data => {
                                this.getAdherentsList();
                                loadingPopup.dismiss();
                            }, error => {
                                console.log(error);
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    refuseMemberShip(adherent, type) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        if(type == 'association') {
            this.associaltionProvider.RefuseMemberShip(this.account.id, adherent.user_id).then(data => {
                loadingPopup.dismiss();
                this.getAdherentsList();
            }, error => {
                console.log(error);
            });
        }
        else{
            this.merchantProvider.RefuseMemberShip(this.account.id, adherent.user_id).then(data => {
                loadingPopup.dismiss();
                this.getAdherentsList();
            }, error => {
                console.log(error);
            });
        }
    }

    goBack() {
        this.navCtrl.pop();
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
    }

    getAdherentsList() {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        if (this.account.type == 'association') {
            this.associaltionProvider.getMemberShipDemands(this.account.id).then(data => {
                this.adherentList = data;
                loadingPopup.dismiss();
            }, error => {

            });
        } else {
                this.merchantProvider.getMemberShipDemands(this.account.id).then(data => {
                    this.adherentList = data;
                    loadingPopup.dismiss();
                }, error => {

                });
        }
    }

}
