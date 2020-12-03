import {Component} from "@angular/core";
import {
    AlertController,
    Events,
    IonicPage,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    ViewController
} from "ionic-angular";
import "rxjs/add/operator/map";
import {UserProvider} from "../../providers/user/user";
import {Camera} from "@ionic-native/camera";
import {CommentProvider} from "../../providers/comment/comment";

/**
 * Generated class for the PopinChoiceEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-popin-choice-event',
    templateUrl: 'popin-choice-event.html',
})
export class PopinChoiceEventPage {

    private commentEvent = {
        content: '',
        photo: null
    }
    public Events: any;

    constructor(public event: Events,
        private camera: Camera,
        public userService: UserProvider,
        public navCtrl: NavController,
        private modal: ModalController,
        public navParams: NavParams,
        public commentService: CommentProvider,
        private loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private view: ViewController, ) {
        this.Events = navParams.get('events');
    }

    Close() {
        this.view.dismiss();
    }

    addPhotoParticipated(id) {
        this.takePicture(id);
    }

    addComment(id) {
        let loadingPopup = this.loadingCtrl.create({});
        // Show the popup
        loadingPopup.present();
        this.commentService.postEventComment(id, this.commentEvent).then(data => {

            loadingPopup.dismiss();

        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }

    public takePicture(id) {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            targetWidth: 600,
            targetHeight: 600,
            allowEdit: true,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG
        }).then((imageData) => {
            this.commentEvent.photo = "data:image/jpeg;base64," + imageData;
            const myModal2 = this.modal.create('EvenCommentPage', { "comment": this.commentEvent, "participation": id }, { cssClass: 'comment-modal' });
            myModal2.present();

        });
    }

}
