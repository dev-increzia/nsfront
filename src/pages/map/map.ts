import {Component, ElementRef, ViewChild} from "@angular/core";
import {
    AlertController,
    Events,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    Platform
} from "ionic-angular";
import {AppProvider} from "../../providers/app/app";
import {UserProvider} from "../../providers/user/user";
import {truncate} from "../../pipes/truncate/truncate";
import {GlobalsProvider} from "../../providers/globals/globals";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {

    @ViewChild('map') mapElement: ElementRef;
    public map: any;

    public categoryChecked: boolean;
    public categories: any;
    public currentUser: any;
    public markers: any;
    public toggleCategory: boolean = false;
    public markersArray = [];
    public items = [];
    public works = [];
    private showFilter = false;
    public idHeading : number;
    public community : any;

    constructor(public appGlobals: GlobalsProvider,
        public userService: UserProvider,
        private modal: ModalController,
        public appService: AppProvider,
        public event: Events,
        public serviceEvent: EventsrestProvider,
        private loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public loader: LoadingController,
        public myAlert: AlertController,
        public appEvents: Events,
        public myModal: ModalController,
        platform: Platform,
        public navParams: NavParams) {
        this.idHeading = navParams.get('data');
        this.community = JSON.parse(localStorage.getItem('currentCommunity'));

        this.appGlobals.currentPageTitle = this.community.name;
        this.event.publish('user:current');
        this.currentUser = localStorage.getItem('currentUser');
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        Promise.all([this.appService.getInterestCategories(this.idHeading)]).then(
            data => {
                this.categories = data[0];
                loadingPopup.dismiss();
            },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            }
        );
    }


    ionViewDidLoad() {
        this.loadMap(this.idHeading);
    }

    ionViewWillEnter() {
        this.appGlobals.showHeader = false;

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

    loadMap(id) {
        this.appService.findCommunityLocationByMapHeading(id).then(data => {
            let content = "<h4>Ma Ville</h4>";
            this.centerPosition(parseFloat(data.latitude), parseFloat(data.longitude), content);
        },
            err => {
                this.event.publish('http:errors', err);
            });
    }

    centerPosition(latitude, longitude, content) {
        let latLng = new google.maps.LatLng(latitude, longitude);

        let mapOptions = {
            center: latLng,
            zoom: 5,
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

        this.appService.getWorks(this.idHeading).then(data => {
            this.works = data;
            for (let work of this.works) {
                this.addWorkMarker(work);
            }

        });
    }

    categoriesChange(id, isChecked) {
        if (isChecked) {
            this.items.push(id);
        } else {
            let index: number = this.items.indexOf(id);
            if (index !== -1) {
                this.items.splice(index, 1);
            }
        }
    }

    mapFilter() {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.userService.getMapInterest(this.items).then(data => {
            this.markers = data;
            this.markersArray.forEach(marker => {
                marker.setMap(null);
            });
            this.markersArray = [];
            if (this.markers) {
                this.markers.forEach(interest => {
                    this.markersArray.push(this.addMarker(interest));
                });
            }
            loadingPopup.dismiss();
            this.showFilter = false;
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);

            });
    }

    addMarker(interest) {

        var markerRed = {
            url: "assets/imgs/icons/marker-red.png", // url
            scaledSize: new google.maps.Size(39, 51), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };


        let latLng = new google.maps.LatLng(interest.latitude, interest.longitude);
        var marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            animation: google.maps.Animation.DROP,
            title: interest.title,
            icon: markerRed,

        });
        let content = '<ion-card class="pro-card">' +
            '<ion-row class="row-pro-action-top" no-padding>' +
            '<ion-card-content>' +
            '<img src="' + (typeof interest.image_url !== "undefined" ? interest.image_url : "") + '"(click)="showInterest();"  />' +
            '<ion-card-title class="title">' + interest.title + '</ion-card-title>';
        if (interest.openFrom && interest.openTo) {
            content += '<p class="time-open">Ouvert de ' + interest.openFrom + ' à ' + interest.openTo + '</p>';
        }
        content += '<p>' + new truncate().transform(interest.description) + '</p>' +
            '</ion-card-content>' +
            '<ion-row no-padding>' +
            '<ion-col class="white-background">' +
            '<button id="show' + interest.id + '" class="white-background green-button" ion-button icon-left clear small >' +
            '<ion-icon name="add-circle"></ion-icon>' +
            '<div >Afficher la suite</div>' +
            '</button>' +
            '</ion-col>' +
            '</ion-row>' +
            '</ion-card>';

        let infoWindow = this.addInfoWindow(marker, content);
        // add listener that will capture the click event of the infoWindow
        google.maps.event.addListener(infoWindow, 'domready', () => {
            document.getElementById('show' + interest.id).addEventListener('click', () => {
                this.detailsInterest(interest);
            }, false);
        });

        return marker;
    }

    detailsInterest(interest) {
        const myModal2 = this.modal.create('InterestDetailsPage', { "interest": interest }, { cssClass: 'style-modal' });
        myModal2.present();
    }

    addWorkMarker(work) {

        var markerYellow = {
            url: "assets/imgs/icons/marker-yellow.png", // url
            scaledSize: new google.maps.Size(39, 51), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        let latLng = new google.maps.LatLng(work.latitude, work.longitude);
        var marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            animation: google.maps.Animation.DROP,
            title: work.title,
            icon: markerYellow,

        });
        let content = '<ion-card class="pro-card">' +
            '<ion-row class="row-pro-action-top" no-padding>' +
            '<ion-card-content>' +
            '<ion-card-title class="title">' + work.title + '</ion-card-title>';

        content += '<p>' + new truncate().transform(work.description) + '</p>' +
            '</ion-card-content>' +
            '<ion-row no-padding>' +
            '<ion-col class="white-background">' +
            '</ion-col>' +
            '</ion-row>' +
            '</ion-card>';

        this.addInfoWindow(marker, content);
    }



    toggleCategoryChange() {
        this.showFilter = !this.showFilter;
    }

    goBack() {
        this.navCtrl.pop();
    }
}
