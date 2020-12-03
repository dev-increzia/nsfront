import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {VolunteersProvider} from "../../providers/volunteers/volunteers";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
/**
 * Generated class for the VolunteersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-volunteers',
    templateUrl: 'volunteers.html',
})
export class VolunteersPage {

    private volunteers: any;
    private account: any;
    private selected = [];
    private selectAll = false;
    public currentUser: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public serviceEvent: EventsrestProvider,
        public appGlobals: GlobalsProvider,
        public volunteersService: VolunteersProvider,
        public loader: LoadingController,
        public myAlert: AlertController,
        public appEvents: Events,
        public myModal: ModalController) {
        this.account = this.navParams.get('account');
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.getVolunteers();
    }

    getVolunteers() {
        this.volunteers = this.account.volunteers;
    }

    deleteVolunteers(id) {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.volunteersService.deleteVolunteer(id).then(data => {
                for (let key in this.appGlobals.adminAssociations) {
                    let value = this.appGlobals.adminAssociations[key];
                    if (value.id == data['association'].id) {
                       this.appGlobals.adminAssociations[key]['volunteers'] = data['association']['volunteers'];
                    }
                }
                this.account = data['association'];
                this.volunteers = this.account.volunteers;
                loadingPopup.dismiss();
            },
            err => {
                loadingPopup.dismiss(this.account);
                this.appEvents.publish('http:errors', err);
            });
    }

    checkUncheckAll() {
        if (this.selectAll == true) {
            this.selected = [];
            for (let volunteer of this.volunteers) {
                this.selected.push(volunteer.id);
            }
        } else {
            this.selectAll = false;
            this.selected = [];
        }
    }

    checkUncheckItem(id) {
        const foundAt = this.selected.indexOf(id);
        if (foundAt >= 0) {
            this.selected.splice(foundAt, 1);
            this.selectAll = false;
        } else {
            this.selected.push(id);
        }
    }

    sendEmail() {
        const volunteersMailModal = this.myModal.create('VolunteersMailPage', { "selectedVolunteers": this.selected, "account": this.account }, { cssClass: 'style-modal' });
        volunteersMailModal.present();
    }

    goBack() {
        this.navCtrl.pop();
    }

}
