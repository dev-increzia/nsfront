import {Component} from "@angular/core";
import {Events, IonicPage, LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the AddParticipantsNbrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-participants-nbre',
  templateUrl: 'add-participants-nbre.html',
})
export class AddParticipantsNbrePage {
  public events: any;
  public editedEvents = [];

  constructor(public navCtrl: NavController,
    public event: Events,
    public navParams: NavParams,
    public loader: LoadingController,
    public serviceEvent: EventsrestProvider,
    private view: ViewController
  ) {
    this.events = JSON.parse(navParams.get('events'));
    this.event.publish('refreshNotifications');

  }

  ionViewDidLoad() {
  }
  close() {
    this.view.dismiss();
  }
  addParticipants() {
    let loadingPopup = this.loader.create({});
    // Show the popup
    loadingPopup.present();
    for (let event of this.events) {
      if (event.participantsNbre != '') {
        this.editedEvents.push(event);
      }
    }
    this.serviceEvent.addParticipantsNbre(this.editedEvents).then(data => {
      localStorage.setItem("finishedEvents", JSON.stringify([]));
      this.event.publish('refreshNotifications');
      this.view.dismiss();
      loadingPopup.dismiss();

    },
      err => {
        this.event.publish('http:errors', err);
        loadingPopup.dismiss();

      });

  }
}
