import {CommentProvider} from "../../providers/comment/comment";
import {Component} from "@angular/core";
import {
    ActionSheetController,
    AlertController,
    Events,
    IonicPage,
    LoadingController,
    NavController,
    NavParams,
    Platform,
    ViewController
} from "ionic-angular";


/**
 * Generated class for the EvenCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-even-comment',
    templateUrl: 'even-comment.html',
})
export class EvenCommentPage {
    private comment = {
        content: '',
        photo: null
    }
    private eventComment: any;
    private participation: any;

    constructor(public event: Events,
        public navCtrl: NavController,
        private navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public platform: Platform,
        public commentService: CommentProvider,
        private view: ViewController,
        public loader: LoadingController,
        public alertCtrl: AlertController
    ) {
        this.eventComment = this.navParams.get('comment');
        this.participation = this.navParams.get('participation');
        this.comment = Object.assign({}, this.eventComment);
    }

    ionViewDidLoad() {
    }

    capitalize(event) {
        if (event) {
            this.comment.content = event.charAt(0).toUpperCase() + event.slice(1);
        }
    }
    goBack() {
        this.comment = Object.assign({}, this.eventComment);
        this.view.dismiss();


    }
    commentForm() {
        let loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.commentService.postArticleComment(this.participation, this.comment).then(data => {
            loadingPopup.dismiss();
            let successAlert = this.alertCtrl.create({
                title: 'Succès',
                subTitle: 'Votre Commentaire a été ajouté avec succès.',
                buttons: [
                    {
                        text: 'OK',
                        handler: data => {
                            this.Close();
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
    Close() {
        this.view.dismiss(true);

    }

}
