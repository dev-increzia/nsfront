import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {GroupitemsPipe} from "../../pipes/groupitems/groupitems";
import {EventDetailsPage} from "../event-details/event-details";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import {Calendar} from "@ionic-native/calendar";
import * as moment from "moment";

/**
 * Generated class for the ButalsoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-butalso',
    templateUrl: 'butalso.html',
})
export class ButAlsoPage {

    private page: number = 1;
    private events: any;
    private items = [];
    private itemsDates = [];
    private itemsg = [];
    public eventParticipted = [];
    public currentUser: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public appGlobals: GlobalsProvider,
        public eventService: EventsrestProvider,
        public ga: GoogleAnalytics,
        public calendarPlugin: Calendar,
        public loader: LoadingController,
        public appEvents: Events,
        public myAlert: AlertController,
        public myModal: ModalController,
    ) {
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.page = 1;
        this.items = [];
        this.getMaisAussiEvents();
    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
    }

    getMaisAussiEvents() {
        this.loadEvents();
    }

    loadEvents() {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        return new Promise(() => {
            this.eventService.findAllByInterestPage(this.page).then(data => {
                this.events = data;
                for (let event of this.events) {
                    let dateString = event.startAt;
                    let arrayDateString = dateString.split('T');
                    let arrayDate = arrayDateString[0].split('-');
                    event.datstart = arrayDate[0] + "-" + arrayDate[1] + "-" + arrayDate[2] + "T00:00:00";
                    this.items.push(event);
                }

                let g = new GroupitemsPipe();
                this.itemsDates = [];

                this.itemsg = g.transform(this.items, "startAt");
                for (let ir of this.itemsg) {
                    this.itemsDates.push(ir);
                }

                loadingPopup.dismiss();
            }, err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
        });
    }

    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this.page += 1;
            this.loadEvents();
            infiniteScroll.complete();
        }, 500);
    }

    goBack() {
        this.navCtrl.pop();
    }

    detailsEvent(event, withComments) {
        this.navCtrl.push(EventDetailsPage, {
            id: event.id,
            title: event.title,
            withComments: withComments
        });
    }

    like(event) {
        let label = 'participation';
        this.appEvents.publish("googleAnalytics", label);

        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        let result: any;
        this.eventService.takePart(event.id).then(data => {
            loadingPopup.dismiss();
            result = data;
            if (result.success) {
                for (let ev of this.items) {
                    if (ev.id == event.id) {
                        ev.isLiked = true;
                        ev.nbParticipants++;
                    }
                }
                let addToCalendarAlert = this.myAlert.create({
                    title: '',
                    subTitle: 'Voulez-vous ajouter cet évènement à votre agenda?',
                    buttons: [
                        {
                            text: 'Non',
                            role: 'cancel',
                            handler: () => {
                                this.showNeedVolunteerPopup(event);
                            }
                        },
                        {
                            text: 'Oui',
                            handler: () => {
                                var start = moment(event.startAt).toDate();
                                var end = moment(event.endAt).toDate();
                                this.calendarPlugin.createEvent(event.title, event.place, event.description, start, end).then(
                                    (msg) => { },
                                    (err) => { }
                                );
                                this.showNeedVolunteerPopup(event);
                            }
                        }
                    ]
                });
                addToCalendarAlert.present();
            }
        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            })
    }

    unlike(event) {
        let label = 'cancel participation';
        this.appEvents.publish("googleAnalytics", label);

        let loadingPopup = this.loader.create({});
        let result: any;
        loadingPopup.present();
        this.eventService.cancelTakePart(event.id).then(data => {
            loadingPopup.dismiss();
            result = data;
            var start = moment(event.startAt).toDate();
            var end = moment(event.endAt).toDate();

            this.calendarPlugin.deleteEvent(event.title, event.place, '', start, end).then(
                (msg) => { },
                (err) => { }
            );

            if (result.success) {
                let successAlert = this.myAlert.create({
                    title: 'Succès,',
                    subTitle: 'Votre annulation a été bien enregistrée.',
                    buttons: [
                        {
                            text: 'OK',
                            handler: () => {
                                for (let ev of this.items) {
                                    if (ev.id == event.id) {
                                        ev.isLiked = false;
                                        ev.nbParticipants--;
                                    }
                                }
                            }
                        }
                    ]
                });
                successAlert.present();
            }

        },
            err => {
                loadingPopup.dismiss();
                this.appEvents.publish('http:errors', err);
            });
    }

    showNeedVolunteerPopup(event) {
        if (event.needVolunteer) {
            let benevoleAlert = this.myAlert.create({
                title: '',
                subTitle: 'Voulez-vous être bénévole à cet évènement?',
                buttons: [
                    {
                        text: 'Non',
                        role: 'cancel',
                        handler: () => {

                        }
                    },
                    {
                        text: 'Oui',
                        handler: () => {
                            let label = 'volunteer';
                            this.appEvents.publish("googleAnalytics", label);
                            const modalVolunteers = this.myModal.create('ParticpatelaststepPage', { "id": event.id }, { cssClass: 'style-modal' });
                            modalVolunteers.present();
                        }
                    }
                ]
            });
            benevoleAlert.present();
        }
    }


}
