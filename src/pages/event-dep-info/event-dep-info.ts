import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController,LoadingController,AlertController,ActionSheetController, NavParams } from 'ionic-angular';
import {ArticleProvider} from "../../providers/article/article";
import {AgendaPage} from "../../pages/agenda/agenda";
/**
 * Generated class for the EventDepInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-dep-info',
  templateUrl: 'event-dep-info.html',
})
export class EventDepInfoPage {
  id: any;
  public event :any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public myModal: ModalController,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public loader: LoadingController,
    public serviceArticle: ArticleProvider,
    ) {
    this.event = this.navParams.get('event');
    this.id = this.navParams.get('id');
  }
 
  ionViewDidLoad() {
  } 

  goBack() { 
        this.navCtrl.pop();
  }

  async other(item: any){
    const actionSheet = await this.actionSheetController.create({
        buttons: [{
          text: 'Supprimer',
          icon: 'trash',
          handler: () => {
            this.supprimer(item);
          }
        }, {
          text: 'Partager',
          icon: 'share',
          handler: () => {
            this.ShareArticle(item);
          }
        }, { 
          text: 'Modifier',
          icon: 'create',
          handler: () => {
            this.edite(item);
          }
        },{
          text: 'Dupliquer',
          icon: 'copy',
          handler: () => {
            this.dupliquer(item);
          }
        }, {
          text: 'Annuler',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }]
      });
      await actionSheet.present();
  }
  
  async supprimer(data : any){
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Cet événement',
        icon: 'remove',
        handler: () => {
          this.supprimerEvet(data);
        }
      }, {
        text: 'Tous les événements à venir',
        icon: 'remove-circle',
        handler: () => {
          this.supprimerEvetVenir(data);
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  
  
  }
  async supprimerEvet(data : any){
    const alert = await this.alertController.create({
      message: 'L\'événement  sera supprimé definitivement',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Valider',
          handler: () => {
            
            let loadingPopup = this.loader.create({});
            loadingPopup.present();
            this.serviceArticle.deleteEventDuplicate((data.id).toString()).then(data => {
            if(data.success == true){
            loadingPopup.dismiss();
             this.navCtrl.setRoot(AgendaPage);
            }
  
            },
            err => {
            console.log(err);
            });
  
            
          }
        }
      ]
    });
  
    await alert.present();
  
  }
  
  async supprimerEvetVenir(data : any){
    
    const alert = await this.alertController.create({
      message: 'Les événements  sera supprimé definitivement',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Valider',
          handler: () => {
          }
        }
      ]
    });
  
    await alert.present();
  
  }

ShareArticle(data : any){
}

edite(data : any){
}

dupliquer(data : any){
  
  let item={
    id:data.id_parent,
    startAt:data.start_at,
    endAt:data.end_at,
  }
    const myModal2 = this.myModal.create('DupliquerPage',{ "event": item, "accountType": "accountType" }, { cssClass: 'style-modal' });
    myModal2.onDidDismiss(data => {
      
    });
    myModal2.present();
  
  }

}
