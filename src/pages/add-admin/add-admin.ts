import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, NavController, NavParams} from "ionic-angular";
import {AssociationProvider} from "../../providers/association/association";
import {MerchantProvider} from "../../providers/merchant/merchant";
import {UserProvider} from "../../providers/user/user";
import {GlobalsProvider} from "../../providers/globals/globals";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
/**
 * Generated class for the AddAdminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-add-admin',
    templateUrl: 'add-admin.html',
})
export class AddAdminPage {
    public invitation: boolean;
    public warning: boolean;
    public email: any;
    public service: any;
    private account: any;
    private role: any;
    public currentUser: any;
    constructor(public event: Events,
        public navCtrl: NavController,
        public navParams: NavParams,
        public serviceEvent: EventsrestProvider,
        public serviceAssociation: AssociationProvider,
        public serviceMerchant: MerchantProvider,
        public serviceUser: UserProvider,
        public alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        public appGlobals: GlobalsProvider) {
        this.invitation = false;
        this.warning = false;
        this.account = this.navParams.get('account')
        this.role = localStorage.getItem('account_role');

    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.event.publish('updateFooter');

    }

    goBack() {
        this.navCtrl.pop();
    }

    addAdmin() {
        this.warning = false;
    }
    addSuperAdmin() {
        this.warning = true;
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    add() {
        this.invitation = false;


        if (!this.validateEmail(this.email)) {
            let errorAlert = this.alertCtrl.create({
                title: "Erreur",
                subTitle: " Veuillez entrer un email valide.",
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
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            if (this.account.type == "association") {
                this.service = this.serviceAssociation;
            } else {
                this.service = this.serviceMerchant;
            }
            if (this.warning) {
                this.service.postSuperAdmin(this.account.id, this.email).then(data => {
                    loadingPopup.dismiss();
                    if (data.error == 'email not exists') {
                        this.invitation = true;
                    } else if (data.error == 'admin exists') {
                        let errorAlert = this.alertCtrl.create({
                            title: "Erreur",
                            subTitle: this.email + ' est déjà un administrateur.',
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
                        localStorage.setItem('account_role', 'admin');
                        this.role = 'admin';
                        let successAlert = this.alertCtrl.create({
                            title: 'succès!',
                            subTitle: 'La modification demandée a été bien prise en compte.',
                            buttons: [
                                {
                                    text: 'Fermer',
                                    role: 'cancel',
                                    handler: () => {
                                        this.email = null;
                                        this.navCtrl.pop();
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


            } else {
                this.service.postAdmin(this.account.id, this.email).then(data => {
                    loadingPopup.dismiss();
                    if (data.error == 'email not exists') {
                        this.invitation = true;
                    } else if (data.error == 'admin exists') {
                        let errorAlert = this.alertCtrl.create({
                            title: "Erreur",
                            subTitle: this.email + ' est déjà un administrateur.',
                            buttons: [
                                {
                                    text: 'Fermer',
                                    role: 'cancel',
                                    handler: () => {
                                        this.navCtrl.pop();
                                    }
                                }
                            ]
                        });
                        errorAlert.present();

                    } else {
                        let successAlert = this.alertCtrl.create({
                            title: 'succès!',
                            subTitle: 'La modification demandée a été bien prise en compte.',
                            buttons: [
                                {
                                    text: 'Fermer',
                                    role: 'cancel',
                                    handler: () => {
                                        this.email = null;
                                        this.navCtrl.pop();
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
    }
    invit() {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.serviceUser.postInvitation(this.email).then(data => {
            loadingPopup.dismiss();
            this.invitation = false;

            let successAlert = this.alertCtrl.create({
                title: 'succès!',
                subTitle: "L'invitation est bien envoyée.",
                buttons: [
                    {
                        text: 'Fermer',
                        role: 'cancel',
                        handler: () => {
                            this.email = null;
                        }
                    }
                ]
            });
            successAlert.present();

        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }



}
