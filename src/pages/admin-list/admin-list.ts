import {Component} from "@angular/core";
import {
    AlertController,
    Events,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    ViewController
} from "ionic-angular";
import {AssociationProvider} from "../../providers/association/association";
import {MerchantProvider} from "../../providers/merchant/merchant";
import {GlobalsProvider} from "../../providers/globals/globals";
import {AddAdminPage} from "../add-admin/add-admin";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {CommunityProvider} from "../../providers/community/community";

/**
 * Generated class for the AdminListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-admin-list',
    templateUrl: 'admin-list.html',
})
export class AdminListPage {
    public admins: any;
    public selected = [];
    public selectAll = false;
    public service: any;
    public items = [];
    private page: number = 1;
    private account;
    public adminDelete = [];
    public currentUser: any;
    constructor(public event: Events,
        public alertCtrl: AlertController,
        public serviceEvent: EventsrestProvider,
        private modal: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private view: ViewController,
        public serviceAssociation: AssociationProvider,
        public serviceCommunity: CommunityProvider,
        public serviceMerchant: MerchantProvider,
        private loadingCtrl: LoadingController,
        private appGlobals: GlobalsProvider) {
        this.account = this.navParams.get('account');
        this.selected = [];
        if (this.account.type == 'association') {
            this.service = serviceAssociation;
        }
        else if(this.account.type == 'community') {
            this.service = serviceCommunity;
        }else {
            this.service = serviceMerchant;
        }


    }
    getAdmins() {
        this.loadAdmins();
    }

    loadAdmins() {
        let loadingPopup = this.loadingCtrl.create({});
        // Show the popup
        loadingPopup.present();


        this.service.getAdmins(this.account.id, this.page).then(data => {
            this.admins = data;
            for (let admin of this.admins) {
                this.items.push(admin);
            }

            loadingPopup.dismiss();

        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }

    doInfinite(infiniteScroll) {
        this.page += 1;
        this.service.getAdmins(this.account.id, this.page).then(data => {
            this.admins = data;
            for (let admin of this.admins) {
                this.items.push(admin);
            }
            infiniteScroll.complete();
        },
            err => {
                infiniteScroll.complete();
            });
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.items = [];
        this.page = 1;
        this.getAdmins();
        this.event.publish('updateFooter');

    }

    goBack() {
        this.navCtrl.pop();
    }

    open() {
        const addModal = this.modal.create('AddSelectedAdminPage');
        addModal.present();
    }


    clickAdmin(admin) {
        const foundAt = this.selected.indexOf(admin);
        if (foundAt >= 0) {
            this.selected.splice(foundAt, 1);
        } else {
            this.selected.push(admin);
        }

        localStorage.setItem('admins', this.selected.join());

    }
    checkAll() {
        if (this.selectAll == false) {
            this.selectAll = true;
            this.selected = [];
            for (let admin of this.admins) {
                this.selected.push(admin.id);

            }
            localStorage.setItem('admins', this.selected.join());

        } else {
            this.selectAll = false;
            this.selected = [];

        }
    }

    addAdmin() {
        this.navCtrl.push(AddAdminPage, {
            account: this.account
        })
    }

    deleteAccountConfirmation(admin) {
        this.adminDelete.push(admin.id);

        let confirmationAlert = this.alertCtrl.create({
            title: "Confirmation",
            subTitle: "Êtes-vous sûr de vouloir supprimer ce compte.",
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.delete(admin.id);
                    }
                },
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                    }
                }

            ]
        });
        confirmationAlert.present();
    }

    delete(idDelete) {

        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();

        this.service.deleteAdmin(this.account.id, idDelete).then(data => {
            loadingPopup.dismiss();

            let successAlert = this.alertCtrl.create({
                subTitle: "L'administrateur est supprimé avec succès.",
                buttons: [
                    {
                        text: 'Fermer',
                        role: 'cancel',
                        handler: () => {
                            this.view.dismiss();
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
