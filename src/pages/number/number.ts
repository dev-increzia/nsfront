import {Component} from "@angular/core";
import {AlertController, Events, LoadingController, ModalController, NavController,ToastController, Platform,NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {UserProvider} from "../../providers/user/user";
import {CallNumber} from "@ionic-native/call-number";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {File} from "@ionic-native/file";
import { Downloader } from '@ionic-native/downloader';
import {DownloadRequest, NotificationVisibility} from "@ionic-native/downloader";

/**
 * Generated class for the NumberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-number',
    templateUrl: 'number.html',
})
export class NumberPage {
    public categories: any;
    public filter: any = {
        category: 0
    };
    private selectedCategory: any;
    public numbers: any;
    public emergencyPhones: any;
    public title: any;
    public currentUser: any;

    constructor(private callNumber: CallNumber,
        public event: Events,
        public globals: GlobalsProvider,
        public navCtrl: NavController,
        public serviceEvent: EventsrestProvider,
        public navParams: NavParams,
        public loader: LoadingController,
        public myAlert: AlertController,
        public appEvents: Events,
        public myModal: ModalController,
        public userService: UserProvider,
        private loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public platform: Platform,
        public file: File,
        private inAppBrowser: InAppBrowser,
        public toastCtrl: ToastController,
        private downloader: Downloader) {
        this.selectedCategory = this.navParams.get("category");
        this.categories = this.navParams.get("categories");
        this.emergencyPhones = this.navParams.get("emergencyPhones");
        if (this.selectedCategory) {
            this.title = this.selectedCategory.name;
            this.filter.category = this.selectedCategory.id;
            this.getNumbers(this.selectedCategory.id);
        }

    }

    filterChange(selectedValue: any) {
        let index = this.categories.findIndex(e => e.id == selectedValue);
        if (index !== -1) {

            this.title = this.categories[index].name;
        }
        this.getNumbers(selectedValue);
    }

    getNumbers(id) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.userService.getNumbers(id).then(data => {
            this.numbers = data;
            loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }


    call(number) {
        this.callNumber.callNumber(number, true);
    }

    goBack() {
        this.navCtrl.pop();
    }

    download(url) {
        let fileName = url.substring(url.lastIndexOf('/')+1);

        this.platform.ready().then(() => {
            if(this.platform.is('android')) {
                let request: DownloadRequest = {
                    uri: url,
                    title: 'Nous Ensemble',
                    description: fileName,
                    mimeType: '',
                    visibleInDownloadsUi: true,
                    notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
                    destinationInExternalFilesDir: {
                        dirType: 'Downloads',
                        subPath: fileName
                    }
                };


                this.downloader.download(request)
                    .then((location: string) => console.log('File downloaded at:'+location))
                    .catch((error: any) => console.error(error));
            }else{
                let target = "_system";
                this.inAppBrowser.create(url,target,"location=no,enableViewportScale=yes");
            }


        });
    }

}
