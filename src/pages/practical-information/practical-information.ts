import {Component, ElementRef, ViewChild} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {CityProjectsPage} from "../../pages/city-projects/city-projects";
import {ContactPage} from "../../pages/contact/contact";
import {HelpPage} from "../../pages/help/help";
import {NumberCategoryPage} from "../number-category/number-category";
import {MapPage} from "../map/map";
import {UserProvider} from "../../providers/user/user";
import {Geolocation} from "@ionic-native/geolocation";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the PracticalInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@Component({
    selector: 'page-practical-information',
    templateUrl: 'practical-information.html',
})

export class PracticalInformationPage {
    public rootPage: any = CityProjectsPage;
    @ViewChild('map') mapElement: ElementRef;
    public map: any;
    public currentUser: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public appGlobals: GlobalsProvider,
        public serviceEvent: EventsrestProvider,
        public userService: UserProvider,
        public loader: LoadingController,
        public myAlert: AlertController,
        public myModal: ModalController,
        public appEvents: Events,
        public geolocation: Geolocation) {
        this.appGlobals.showHeader = false;
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;
        this.appGlobals.showFooter = true;
        this.appEvents.publish('updateFooter');

    }

    ionViewWillLeave() {
        this.appGlobals.showHeader = true;
        this.appGlobals.showFooter = true;
    }

    contact() {
        this.navCtrl.setRoot(ContactPage);
    }

    help() {
        this.navCtrl.setRoot(HelpPage);
    }

    goBack() {
        this.navCtrl.pop();
    }

    numbers() {
        this.navCtrl.push(NumberCategoryPage);
    }

    linkTo() {
        this.navCtrl.push(ContactPage);
    }

    linksTo() {
        this.navCtrl.push(HelpPage);
    }

    aLinkTo() {
        this.navCtrl.push(CityProjectsPage);
    }

    mapAction() {
        this.navCtrl.push(MapPage);
    }

    loadMap() {
        this.userService.findCurrentUser().then(data => {
            let content = "<h4>Ma Ville</h4>";
            this.centerPosition(parseFloat(data.cityhall.city.latitude), parseFloat(data.cityhall.city.longitude), content);
        },
            err => {
                this.appEvents.publish('http:errors', err);
            });
    }

    centerPosition(latitude, longitude, content) {
        let latLng = new google.maps.LatLng(latitude, longitude);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        // add markers
        var markerGreen = {
            url: "assets/imgs/icons/marker-green.png", // url
            scaledSize: new google.maps.Size(39, 51), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };


        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter(),
            icon: markerGreen,
        });
        this.addInfoWindow(marker, content);
    }

    addInfoWindow(marker, content) {
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
        return infoWindow;
    }
}
