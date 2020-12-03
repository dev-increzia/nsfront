import {Component, ViewChild} from "@angular/core";
import {
    AlertController,
    Events,
    LoadingController,
    ModalController,
    ToastController,
    NavController,
    ActionSheetController,
    NavParams,
    ModalOptions,
    Platform,
    Slides, 
} from "ionic-angular";
import {Camera} from "@ionic-native/camera";
import "rxjs/add/operator/map";
import {ArticleProvider} from "../../providers/article/article";
import {UserProvider} from "../../providers/user/user";
import {GlobalsProvider} from "../../providers/globals/globals";
import {EventsrestProvider} from "../../providers/eventsrest/eventsrest";
import {CreateMerchantPage} from "../../pages/create-merchant/create-merchant";
import {HomePage} from "../home/home";
import {DetailArticlePage} from "../../pages/detail-article/detail-article";
import {CommentProvider} from "../../providers/comment/comment";
import {MerchantSheetPage} from "../merchant-sheet/merchant-sheet";
import {AssociationSheetPage} from "../association-sheet/association-sheet";
import {EventDetailsPage} from "../event-details/event-details";
import {DetailSurveyPage} from "../detail-survey/detail-survey";
import {CacheProvider} from "../../providers/cache/cache";
import {AppProvider} from "../../providers/app/app";
import {File} from "@ionic-native/file";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {CommunityProvider} from "../../providers/community/community";
import { Downloader } from '@ionic-native/downloader';
import {DownloadRequest, NotificationVisibility} from "@ionic-native/downloader";
import {SocialSharing} from "@ionic-native/social-sharing";
import {ModerationPage} from "../../pages/moderation/moderation";
import {Observable} from "rxjs/Observable";





/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-news',
    templateUrl: 'news.html',
})
export class NewsPage {
    @ViewChild(Slides) slides: Slides;
    public articles: any;
    public userImg: any;
    public userFullname: any;
    public items = [];
    private page: number = 1;
    public init = false;
    public associations: any;
    public merchants: any;
    public idUsers: any;
    public currentUser: any;
    public comment = [];
    public numberComments = 0;
    public hasApprovedCommunities = false;
    public showJFilter: any;
    public filterJ: string;
    public pastilles = [];
    public allowInfiniteScroll = true;
    public cacheLifeTime = 3600;
    public communities = [];
    public tableUser = {communities: [],associations: [],merchants: [], users: []};
    public eventParticipted = [];
    private commentEvent = {
        content: '',
        photo: null
    };

    private registredUser = false;
    constructor(public event: Events,
        public platform: Platform,
        private camera: Camera,
        public userService: UserProvider,
        public serviceEvent: EventsrestProvider,
        public navCtrl: NavController,
        private modal: ModalController,
        public navParams: NavParams,
        public actionSheetController: ActionSheetController,
        public service: ArticleProvider,
        public commentService: CommentProvider,
        private loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public appGlobals: GlobalsProvider,
        public socialsharing: SocialSharing,
        public cacheService: CacheProvider,
        public toastCtrl: ToastController,
        public appservice: AppProvider,
        public file: File, 
        private inAppBrowser: InAppBrowser,
        public serviceCommunity: CommunityProvider,
        private downloader: Downloader) {
        this.appGlobals.currentPageid = "news";
        this.event.publish('updateFooter');
        this.registredUser = this.navParams.get("register");
        this.event.publish('loginEvents');
        this.event.publish('getNotifications');
        this.userImg = localStorage.getItem("user_image");
        this.userFullname = localStorage.getItem("user_firstname") + " " + localStorage.getItem("user_lastname");

        this.items = [];
        this.page = 1;
        this.init = true;
        this.showJFilter = true;
        this.filterJ = '';
        this.appGlobals.showHeader = true;
        localStorage.removeItem('selectedJ');
        this.event.publish('closeFilters');
        this.event.publish('resetFilters');
        this.refreshCommunities();
        this.event.publish('refreshApprovedCommunities');
        this.event.publish('refreshCommunities');
        this.event.unsubscribe('news:cache');
        this.event.subscribe('news:cache', data => {
            this.page = data[0];
            this.items = data[1];
            this.articles = data[2];
            this.cacheLifeTime = data[3];
            this.allowInfiniteScroll = !data[2] || data[2] && data[2].length;
        });

        this.event.unsubscribe('news:pastilles:cache');
        this.event.subscribe('news:pastilles:cache', data => {
            this.pastilles = data;
        });
       
        if (localStorage.getItem("token")) {
            this.users();
            this.eventProgress();
            this.getArticles();
            this.getPastillesJ(false, null, null);
            this.event.publish("refreshNotifications");
        } else {
            this.navCtrl.push(HomePage);
        }

        this.event.unsubscribe('news:refresh');
        this.event.subscribe('news:refresh', (loadingPopup) => {
            this.page = 1;
            this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime,'news', null,true);
            console.log("constructor ="+this.page);
            this.getPastillesJ(true, null, null);
            if (loadingPopup) {
                loadingPopup.dismiss();
            }
        });
        Observable.interval(100 * 300).subscribe(x => {
            this.event.publish("news:refresh");
        });
        this.event.unsubscribe('news:refresh:pastilles');
        this.event.subscribe('news:refresh:pastilles', data => {
            this.pastilles = data;
        });
        
            if(localStorage.getItem("communityDeeplink") && localStorage.getItem("communityDeeplink") != "null"){
                    let communityDeeplink = JSON.parse(localStorage.getItem("communityDeeplink"));
                    if(communityDeeplink.isPrivate){
                    let privateCommunities = JSON.parse(localStorage.getItem("privateCommunities"));
                    if(this.filterItems(privateCommunities,communityDeeplink.id)){
                        this.presentAlertPrompt(communityDeeplink.id);
                    }else{
                        this.isFollow("vous êtes déjà inscrit dans la communauté "+communityDeeplink.name);
                    }
                }else{
                    let publicCommunities = JSON.parse(localStorage.getItem("publicCommunities"));
                    console.log("publicCommunities = "+ JSON.stringify(publicCommunities));
                    if(this.filterItems(publicCommunities,communityDeeplink.id)){
                        let communities:any =[];
                        let communitie={
                            id:communityDeeplink.id,
                            type:"public"
                        }
                        communities.push(communitie);
                        this.serviceCommunity.communityAddFollow(communities).then(data => {
                           if(data.code==404){
                            this.alertErreur(data.message,null);
                           }
                           if(data.code==409){
                            this.alertErreur(data.message,null);
                           }
                           if(data.code==412){
                            this.alertErreur(data.message,null);
                           }
                           if(data.code==406){
                            this.alertErreur(data.message,null);
                           }
                           if(data.code==410){
                            this.alertErreur(data.message,null);
                           }
                           if(data.code==200){
                            this.isFollow(data.message);
                            
                           }
                        });

                    }else{
                        this.isFollow("vous êtes déjà inscrit dans la communauté "+communityDeeplink.name);
                    }
                }
            }
        



    }

    async presentAlertPrompt(id : any ) {
        const alert = await this.alertCtrl.create({
          title: 'Entrer votre code!',
          inputs: [
            {
              name: 'code',
              type: 'text',
              placeholder: 'Votre code'
            }
          ],
          buttons: [
            {
              text: 'Anuller',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                localStorage.removeItem('communityDeeplink');
              }
            }, {
              text: 'Valider',
           
              handler: data => {
               
                let communities:any =[];
                let communitie={
                    id:id,
                    type:"private",
                    password:data.code
                }
                communities.push(communitie);
                this.serviceCommunity.communityAddFollow(communities).then(data => {
                   if(data.code==404){
                    this.alertErreur(data.message,null);
                   }
                   if(data.code==409){
                    this.alertErreur(data.message,null);
                   }
                   if(data.code==412){
                    this.alertErreur(data.message,null);
                   }
                   if(data.code==406){
                    this.alertErreur(data.message,id);
                    
                   }
                   if(data.code==410){
                    this.alertErreur(data.message,null);
                   }
                   if(data.code==200){
                    this.isFollow(data.message);
                   }
                });
            }
            }
            
          ]
        });
    
        await alert.present();
      }
  isFollow(message){
  let isFollow = this.alertCtrl.create({
    subTitle: message,
    buttons: [
        {
            text: 'OK',
            handler: () => {
                localStorage.removeItem('communityDeeplink');
            }
        }
    ]
  });
  isFollow.present();
}

alertErreur(message,id){
    let isFollow = this.alertCtrl.create({
      title: "Erreur",
      subTitle: message,
      buttons: [
          {
              text: 'OK',
              handler: () => {
                  if(id != null){
                      this.presentAlertPrompt(id);
                  }
              }
          }
      ]
    });
    isFollow.present();
  }
    filterItems(items,searchTerm) {
     
        let test = false;
        items.forEach(function (data) {
            if(data.id == searchTerm){
                test = true;
                return true;
            }
          });
          return test;

    }



    async moreParent(item: any , type: any , id :any){
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Supprimer',
              icon: 'trash',
              handler: () => {
                this.supprimer(item,item.id,"current");
              }
            }, { 
              text: 'Modifier',
              icon: 'create',
              handler: () => {
                this.editArticle(item,type,id);
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


    async moreNotParent(item: any , type: any , id :any){
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Supprimer',
              icon: 'trash',
              handler: () => {
                this.supprimerNoteParent(item , item.id);
              }
            }, { 
              text: 'Modifier',
              icon: 'create',
              handler: () => {
                this.editeNotParent(item , type , id);
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

    async supprimerNoteParent(item : any , id : any){

        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Cet article',
              icon: 'ios-backspace',
              handler: () => {
                this.supprimer(item , id , "current");
              }
            }, { 
              text: 'Cet article et les articles à venir',
              icon: 'trash',
              handler: () => {
                this.supprimer(item , id , "currentAndNext");
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

   
    async editeNotParent(item : any , type : any , id : any){
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
              text: 'Cet article',
              icon: 'create',
              handler: () => {
                this.editeNoteParentArticle(item , type , id , "current");
              }
            }, { 
              text: 'Cet article et les articles à venir',
              icon: 'ios-create',
              handler: () => {
                this.editeNoteParentArticle(item , type, id, "currentAndNext");
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

    editeNoteParentArticle(item : any, type : any , id : any , mode){
        const myModal2 = this.modal.create('PopupArtDuplicateDetailPage', { "article": item, "accountType": type, "accountId": id ,"mode":mode}, { cssClass: 'style-modal' });
        myModal2.onDidDismiss((data) => {
            if (data == true) {
                this.items = [];
                this.page = 1;
                this.getArticles();
            }
        }); 
        myModal2.present();

    }

  

    supprimer(item : any,id :any , mode : any){
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.service.deleteArticle(id , mode).then(data => {
            this.event.publish('news:refresh');
            loadingPopup.dismiss();
            let toast = this.toastCtrl.create({
                message: 'Article supprimé avec succès',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });

    }

    profile() {
        this.navCtrl.setRoot(CreateMerchantPage);
    }
    users() {
        localStorage.removeItem('tableUser');
        this.event.publish('user:current');
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.associations = JSON.parse(localStorage.getItem("adminAssociations"));
        this.merchants = JSON.parse(localStorage.getItem("adminMerchants"));
        this.communities = JSON.parse(localStorage.getItem("allCommunities"));
        if(Array.isArray(this.communities) && this.communities.length > 0 ){
            for (let community of this.communities){
                if (community["isAdminPublish"]){
                    this.tableUser.communities.push(community.id);
                }
            }
        }
        for (let association of this.associations) {
            this.tableUser.associations.push(association.id);
        }
        for (let merchant of this.merchants) {
            this.tableUser.merchants.push(merchant.id);
        }
        this.tableUser.users.push(this.currentUser.id);
        this.idUsers = this.tableUser;
        localStorage.setItem("tableUser", JSON.stringify(this.tableUser));

 
    }

    ShareArticle(item: any){
        let options = {
            message: item.title+" : "+item.description,
            subject: "NOUS Ensemble",
            image: item.imageURL,
            url: item.imageURL
        };
          /*  this.socialsharing.shareWithOptions(options).then(data =>{
            }).catch( error =>{
                console.log("Error from sharing:"+ error)
            });*/

      
            this.socialsharing
            .canShareVia(
              "www.twitter.com",
              "message",
              "subject",
              item.imageURL,
              item.imageURL
            )
            .then(() => {
              this.socialsharing
                .shareViaTwitter("message", item.imageURL, item.imageURL)
                .catch(err => {
                  console.log("error fadhel");
                });
            })
            .catch(err => {
                console.log("error fadhel = "+err);
            });
    }

    onSuccessSharring(){
    }

    onErrorSharring(){
    }

    detailsArticle(article) {
        
        // ModerationPage
        this.navCtrl.push(DetailArticlePage, {
            article: article
        });
    }

    detailsSurvey(article) {
        this.navCtrl.push(DetailSurveyPage, {
            article: article
        });
    }

    detailsArticleComment(article) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.commentService.getCommentsArticlePagination(article.id, 0).then(data => {
            this.comment = data;
            this.numberComments = article.nbreComments;
            loadingPopup.dismiss();
            this.navCtrl.push(DetailArticlePage, {
                article: article,
                comment: this.comment,
                numberComments: this.numberComments,
                showComments: true,
                allowComment:true
            });
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });

    }

    refreshNbreComments(currentArticle) { 
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.service.getDetailsArticle(currentArticle).then(data => {
            let index = this.items.findIndex(i => i.id == currentArticle);
            if (index != -1) {
                this.items[index].nbreComments = data.nbreComments;
            }
            loadingPopup.dismiss();
        },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            });
    }

    getArticles() { 
        console.log("get article = "+this.page);
        this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime,'news');
    }

    doInfinite(infiniteScroll) {
        if (this.init) {
            this.init = false;
            infiniteScroll.complete();
        }  else if (this.allowInfiniteScroll) {
            this.page += 1;
            this.cacheService.loadArticles(this.page,this.items,this.articles,this.cacheLifeTime,'news',null,false,infiniteScroll);
            console.log("scroll ="+this.page);
            this.event.publish('refreshCommunities');
        }else{
            infiniteScroll.complete();
        }
    }

    showFilterTheme() {
        if (!this.appGlobals.themeFilter) {
            this.appGlobals.themeFilter = true;
        } else {
            this.appGlobals.themeFilter = false;
        }
    }

    ionViewWillEnter() {
        this.appGlobals.showFooter = true;
        this.appGlobals.currentPageid = "news";
        this.event.publish('updateFooter');

        if (this.showJFilter) {
            this.appGlobals.showSearchNews = true;
            this.appGlobals.currentPageTitle = "A la Une";
            this.appGlobals.currentPageLogo = "md-paper";
        }

        switch (this.filterJ) {
            case 'J':
                this.navJ();
                break;

            case 'JB2':
                this.navJB2();
                break;

            case 'JN2':
                this.navJN2();
                break;

            default:
                break;
        }

        this.event.publish('showMenus');
      

    }
    ionViewWillLeave() {
        this.appGlobals.showSearchNews = false;
    }

    openAssociation(association, name) {
        this.navCtrl.push(AssociationSheetPage, {
            id: association,
            name: name
        })
    }


    openMerchant(merchant, name) {
        this.navCtrl.push(MerchantSheetPage, {
            id: merchant,
            name: name
        })
    }

    like(article) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.service.like(article).then(data => {
                let index = this.items.findIndex(i => i.id == article);
                if (index != -1) {
                    this.items[index].isLiked = true;
                    this.items[index].nbLikes++;
                    this.refreshItem(this.items[index]);
                    loadingPopup.dismiss();
                }
            },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            }
        );
    }

    unlike(article) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.service.unlike(article).then(data => {
                let index = this.items.findIndex(i => i.id == article);
                if (index != -1) {
                    this.items[index].isLiked = false;
                    this.items[index].nbLikes--;
                    this.refreshItem(this.items[index]);
                    loadingPopup.dismiss();
                }
            },
            err => {
                loadingPopup.dismiss();
                this.event.publish('http:errors', err);
            }
        );
    }

    refreshItem(item) {
        this.cacheService.refreshItem(item, 'news.articles');
    }

    capitalizeData(data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

    publish() {
        let adminAssociations = JSON.parse(localStorage.getItem("adminAssociations"));
        let adminMerchants = JSON.parse(localStorage.getItem("adminMerchants"));
        let adherentAssociations = JSON.parse(localStorage.getItem("adherentAssociations"));
        let adherentMerchants = JSON.parse(localStorage.getItem("adherentMerchants"));
        if(localStorage.getItem("hasApprovedCommunities") == 'true'){
            this.hasApprovedCommunities = true;
        }else{
            this.hasApprovedCommunities = false;
        }

        if(adherentAssociations.length != 0 || adherentMerchants.length != 0 || adminAssociations.length != 0 || adminMerchants.length != 0  || this.currentUser.role == 'community_su_admin' || this.hasApprovedCommunities){
            const myModal2 = this.modal.create('ChoicePage', {}, {cssClass: 'style-modal choice-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();

        }else{
            const myModal2 = this.modal.create('PopupPage', {"message": "<p>Vous ne pouvez pas publier ! </p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {
            });
            myModal2.present();
        }

    }

    hideConfirmationMessage() {
        this.registredUser = false;
    }

    editArticle(article, accountType, accountId) {
        const myModal2 = this.modal.create('EditPublishPage', { "article": article, "accountType": accountType, "accountId": accountId }, { cssClass: 'style-modal' });
        myModal2.onDidDismiss((data) => {
            if (data == true) {
                this.items = [];
                this.page = 1;
                this.getArticles();
            }
        });
        myModal2.present();

    }

    

    linkTo() {
        this.navCtrl.push(MerchantSheetPage);
    }

    themeFilterClose() {
        this.appGlobals.themeFilter = false;
    }

    detailsEvent(
        eventId,
        title, 
        withComments, 
        moderateEvent, 
        moderateEventSecondary, 
        primaryCommunity, 
        secondaryCommunity,
        associationId
        ) {

            
        if (this.isAllowedEvent(primaryCommunity, moderateEvent) || 
            this.isAllowedEvent(secondaryCommunity, moderateEventSecondary) ||
            this.tableUser.communities.some(x => x === primaryCommunity) ||
            this.tableUser.communities.some(x => x === secondaryCommunity) ||
            this.tableUser.associations.some(x => x === associationId)) {
            this.navCtrl.push(EventDetailsPage, {
                id: eventId,
                title: title,
                withComments: withComments
            });

        } else {

            let errorAlert = this.alertCtrl.create({
                subTitle: 'Cet événement est en attente',
                buttons: [
                    {
                        text: 'Fermer',
                        role: 'cancel',
                        handler: () => {
                        }
                    }
                ]
            });
            errorAlert.present();


        }
    }

    isAllowedEvent(community, moderate) {
        let communities = JSON.parse(localStorage.getItem("followedCommunities"));
        if(community){
            if(communities.filter(item=> item.id == community).length == 0) {
                return false;
            }else {
                if(moderate == 'accepted'){
                    return true;
                }
            }
        }

        return false;
    }


    doRefreshNews(refresher) {
        this.page = 1;
        this.cacheService.loadArticles(this.page,this.items,this.articles,this.cacheLifeTime,'news',null,true,null,refresher);
        console.log("refresh ="+this.page);
        this.getPastillesJ(true, null, refresher);
        this.refreshCommunities();
        this.userService.searchCities('').then(data => {
            this.appGlobals.allCities = data;

        },
            err => {

                this.event.publish('http:errors', err);
            });

    }

    getPastillesJ(refresh, infiniteScroll, refresher) {
        this.cacheService.getCachedData('this.service.getPastilleJCounter()', refresh, 'news:refresh:pastilles', 'news:pastilles', 'news:pastilles:cache', this.cacheLifeTime, null, refresher);
    }

    eventProgress() {
        this.event.publish('user:current');
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

        this.serviceEvent.getEventProgress(this.currentUser.id).then(data => {
            this.eventParticipted = data;

        },
            err => {

                this.event.publish('http:errors', err);
            });
    }

    addPhotoParticipated() {
        if (this.eventParticipted.length == 1) {
            this.takePicture();
        } else {
            const myModal2 = this.modal.create('PopinChoiceEventPage', { "events": this.eventParticipted }, { cssClass: 'style-modal' });
            myModal2.present();
        }
    }

    public refreshCommunities() {

                Promise.all([this.serviceCommunity.findCurrentUserFollowedCommunities()]).then(user => {

                        localStorage.setItem("followedCommunities", JSON.stringify(user[0]));

                        this.event.publish('refreshCommunities');
                        this.event.publish('refreshApprovedCommunities');

                    },
                    err => {

                        this.event.publish('http:errors', err);
                    });


    }



    public takePicture() {
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
            const myModal2 = this.modal.create('EvenCommentPage', { "comment": this.commentEvent, "participation": this.eventParticipted[0].articleId }, { cssClass: 'comment-modal' });
            myModal2.present();




        });
    }

    ionViewDidEnter() {
        this.appGlobals.currentPageid = "news";
        this.event.publish('updateFooter');
    }

    public navJB2() {
        this.appGlobals.showSearchNews = false;
        this.appGlobals.showHeader = false;
        this.appGlobals.currentPageTitle = "Evénements des 2 derniers jours";
        this.showJFilter = false;
        this.filterJ = 'JB2';
        this.event.publish('resetFilters');
        localStorage.setItem('selectedJ', 'JB2');
        this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime, 'news');
        console.log("navjb2 ="+this.page);
    }

    public navJN2() {
        this.appGlobals.showSearchNews = false;
        this.appGlobals.showHeader = false;
        this.appGlobals.currentPageTitle = "Evénements des 2 prochains jours";
        this.showJFilter = false;
        this.filterJ = 'JN2';
        this.event.publish('resetFilters');
        localStorage.setItem('selectedJ', 'JN2');
        this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime, 'news');
        console.log("najjn2 ="+this.page);
    }

    public navJ() {
        this.appGlobals.showSearchNews = false;
        this.appGlobals.showHeader = false;
        this.appGlobals.currentPageTitle = "Événements d'aujourd’hui";
        this.showJFilter = false;
        this.filterJ = 'J';
        this.event.publish('resetFilters');
        localStorage.setItem('selectedJ', 'J');
        this.cacheService.loadArticles(this.page, this.items, this.articles, this.cacheLifeTime, 'news');
        console.log("navj ="+this.page);
    }

    goBack() {
        localStorage.removeItem('selectedJ');
        this.navCtrl.setRoot(NewsPage);
        this.showJFilter = true;
        this.filterJ = '';
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

    getMIMEtype(extn){
        let ext=extn.toLowerCase();
        let MIMETypes={
            'txt' :'text/plain',
            'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'doc' : 'application/msword',
            'pdf' : 'application/pdf',
            'jpg' : 'image/jpeg',
            'bmp' : 'image/bmp',
            'png' : 'image/png',
            'xls' : 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'rtf' : 'application/rtf',
            'ppt' : 'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        }
        return MIMETypes[ext];
    }

    dupliquer(item : any){
        
        const myModal2 = this.modal.create('DupliquerArticlePage',{ "article": item, "accountType": "accountType" }, { cssClass: 'style-modal' });
            myModal2.onDidDismiss(data => {
                
            });
            myModal2.present();

            
    }

        detailsduplication(id){
            const myModalOptions: ModalOptions = {
                enableBackdropDismiss: false
              };
            const myModal2 = this.modal.create('PopupArtDuplicateDetailPage', {
                "parentId": id,
            },myModalOptions);
            myModal2.present();
        }

}
 
 
 
 
 
 
 
 
 
 
 
 
 

