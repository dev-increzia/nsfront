import {animate, Component, state, style, transition, trigger, ViewChild} from "@angular/core";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {AlertController, DateTime, Events, LoadingController, ModalController, Nav, Platform} from "ionic-angular";
import {GlobalsProvider} from "../providers/globals/globals";
import {NewsPage} from "../pages/news/news";
import {HomePage} from "../pages/home/home";
import {ModerationPage} from "../pages/moderation/moderation";
import {CreateMerchantPage} from "../pages/create-merchant/create-merchant";
import {UserProvider} from "../providers/user/user";
import {AppProvider} from "../providers/app/app";
import {CommunityProvider} from "../providers/community/community";
import {SearchResultPage} from "../pages/search-result/search-result";
import {AgendaPage} from "../pages/agenda/agenda";
import {MySpacePage} from "../pages/my-space/my-space";
import {Push} from "@ionic-native/push";
import {APP_PACKAGE} from "../app/config";
import {Market} from "@ionic-native/market";
import {Badge} from "@ionic-native/badge";
import {MyTownHallPage} from "../pages/my-town-hall/my-town-hall";
import {Keyboard} from "@ionic-native/keyboard";
import {Observable} from "rxjs/Observable";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import {EventsrestProvider} from "../providers/eventsrest/eventsrest";
import {EmptyNewsPage} from "../pages/empty-news/empty-news";
import {CommunitiesPage} from "../pages/communities/communities";
import {Calendar} from "@ionic-native/calendar";
import * as moment from "moment";
import {GoodPlanPage} from "../pages/good-plan/goodplan";
import {GoodplanrestProvider} from "../providers/goodplanrest/goodplanrest";
import {Renderer2} from '@angular/core';
import { FCM } from '@ionic-native/fcm';
import { Deeplinks } from '@ionic-native/deeplinks';


@Component({
    templateUrl: 'app.html',
    animations: [

        //For the logo
        trigger('flyInTopSlow', [
            state('in', style({
                transform: 'translate3d(0,0,0)'
            })),
            transition('void => *', [
                style({transform: 'translate3d(0,-500px,0'}),
                animate('1000ms ease-in-out')
            ])
        ])
    ]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any;
    public nbreNotifications = 0;
    public associations: any;
    public publicCommunities: any;
    public publicFilterCommunities: any;
    public privateFilterCommunities: any;
    public privateCommunities: any;

    public allCities: any;
    public allThemes = [];
    public allCitiesFilter: any;
    public allThemesFilter = [];
    public followedCommunities: any;
    public allCitiesChecked: boolean = true;
    public allThemesChecked: boolean = true;
    public badPhone: boolean = false;

    private selectedVille = [];
    private selectedTheme = [];

    public merchants: any;
    deviceToken: any;
    public hasApprovedCommunities = false;
    public currentUser: any;
    public phoneNumber: any;
    public isDisabled = true;
    public requiredCarpool = false;
    public rallyPoint:any;
    public requiredRallyPoint = false;
    public rdvHours:any;
    public requiredRdvHours = false;
    public seatedFree:any;
    public requiredSeatedFree = false;

    tableUser = [];
    finishedEvents = [];
    userEvents = [];
    publicChecked = [];
    privateChecked: any;
    privateNameChecked: any;
    showFinished = false;
    searchBar: any = "in";
    benevoleBar: any = "in";
    proposeCarpooling: any = "in";
    needCarpooling: any = "in";
    answerCarpooling:any= "in";
    putAgendaBar: any = "in";
    themeFilter: any = "in";
    villeFilter: any = "in";
    publicSearch: any = "in";
    privateSearch: any = "in";
    public categories: any;
    myFilterDate: any;
    @ViewChild('datePicker')
    datePicker: DateTime;
    public startDate = moment().format("YYYY-MM-DD");


    constructor(public platform: Platform,
                public statusBar: StatusBar,
                splashScreen: SplashScreen,
                private modal: ModalController,
                public loadingCtrl: LoadingController,
                public appGlobals: GlobalsProvider,
                public appEvent: Events,
                public myAlert: AlertController,
                public serviceCommunity: CommunityProvider,
                public serviceEvent: EventsrestProvider,
                public goodPlanService: GoodplanrestProvider,
                public push: Push,
                private fcm: FCM,
                private deeplinks: Deeplinks,
                private badge: Badge,
                public calendarPlugin: Calendar,
                public market: Market,
                public userService: UserProvider,
                public appService: AppProvider,
                private ga: GoogleAnalytics,
                public keyboard: Keyboard,
                private renderer2: Renderer2) {

            let html = document.getElementsByTagName('html').item(0);
            this.keyboard.onKeyboardHide().subscribe(() => {
            this.renderer2.setStyle(html, 'height','101vh')
            });
            this.keyboard.onKeyboardShow().subscribe(() => {
                this.renderer2.setStyle(html, 'height','auto')
            });
            this.appGlobals.currentPageid = "news";
            this.appEvent.publish('updateFooter');
            this.userService.searchCities('').then(data => {
                localStorage.setItem("allCities", JSON.stringify(data));
                this.appGlobals.allCities = data;
                this.allCities = data;
                this.allCitiesFilter = this.appGlobals.allCities;
            });
        if (localStorage.getItem("finishedEvents")) {
            this.finishedEvents = JSON.parse(localStorage.getItem("finishedEvents"));
        } else {
            localStorage.setItem("finishedEvents", JSON.stringify(this.finishedEvents));
        }
        if (localStorage.getItem("hasCommunities") == 'false') {
            this.rootPage = EmptyNewsPage;
        } else if (!localStorage.getItem("token")){
            this.rootPage = HomePage;
        } else {
            this.appGlobals.currentPageid = "news";
            this.appEvent.publish('updateFooter');
            this.rootPage = NewsPage;
        }
        platform.ready().then(() => {
            splashScreen.hide();
            this.appEvent.publish('updateFooter');
            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(false);
            this.ga.startTrackerWithId('UA-105582305-1')
            .then(() => {}).catch(e => {
                if(this.platform.is('android') || this.platform.is('ios'))
            {
                console.log('Error starting GoogleAnalytics == '+ e)
            }
            });
            this.ga.trackView('Home');
            if (!platform.is('core')) {
                this.initPushNotification(platform);
            }
            this.appEvent.subscribe('refreshCurrentUser', () => {
                this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
                this.phoneNumber = this.currentUser.phone;
                if (!this.phoneNumber) {
                    this.isDisabled = false;
                }
            });
            this.appEvent.subscribe('updateFooter', () => {
                this.footer();
            });

            if(localStorage.getItem("token")) {
                this.userService.findCategories().then(data => {
                    localStorage.setItem("allCatego", JSON.stringify(data));
                });
                this.userService.findCurrentUser().then(user => {
                        localStorage.setItem("currentUser", JSON.stringify(user));
                    },
                    err => {
                        this.appEvent.publish('http:errors', err);
                    });
            }
            this.appEvent.subscribe('finishedEvents', () => {
                if (this.userEvents.length > 0) {
                    this.showFinished = true;
                    const myModal = this.modal.create('AddParticipantsNbrePage', {'events': JSON.stringify(this.userEvents)}, {cssClass: 'style-modal'});
                    myModal.onDidDismiss((data) => {
                        this.finishedEvents = [];
                        this.userEvents = [];
                        this.showFinished = false;
                        localStorage.setItem("finishedEvents", JSON.stringify(this.finishedEvents));
                    });
                    myModal.present();
                }
            });
            this.appEvent.subscribe('loginEvents', () => {
                if (localStorage.getItem("finishedEvents")) {
                    var arr = JSON.parse(localStorage.getItem("finishedEvents"));
                    this.finishedEvents = arr.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    });

                    if (this.finishedEvents.length > 0) {
                        this.finished();
                    }
                }
            });
            this.appEvent.subscribe('refreshCommunities', () => {
                this.allThemesFilter = [];
                this.allThemes = [];
                this.publicCommunities = JSON.parse(localStorage.getItem("publicCommunities"));
                this.publicFilterCommunities = this.publicCommunities;
                this.privateCommunities = JSON.parse(localStorage.getItem("privateCommunities"));
                this.privateFilterCommunities = this.privateCommunities;
                if(localStorage.getItem("hasApprovedCommunities") == 'true'){
                    this.hasApprovedCommunities = true;
                }else{
                    this.hasApprovedCommunities = false;
                }
                this.followedCommunities = JSON.parse(localStorage.getItem("followedCommunities"));
                if (this.followedCommunities) {
                    for (let followedCommunity of this.followedCommunities) {
                        for (let theme of followedCommunity["categories"]) {
                            if (this.appGlobals.currentPageid == 'goodplans') {

                                if (theme.type == "Thème commerce / partenaire") {
                                    if(this.allThemesFilter.filter(item=> item.name == theme.name).length == 0)
                                    {
                                        this.allThemesFilter.push(theme);
                                    }

                                }
                            } else {

                                if (theme.type == "Activité groupe / association") {
                                    if(this.allThemesFilter.filter(item=> item.name == theme.name).length == 0)
                                    {
                                        this.allThemesFilter.push(theme);
                                    }
                                }
                            }

                        }

                    }
                }
                for( let theme of this.allThemesFilter){
                    theme.filtered = true;
                }
                this.allThemes = this.allThemesFilter;
                this.appEvent.publish('resetFilters');
            });
            if (localStorage.getItem("token")) {
                this.appEvent.publish('refreshCurrentUser');
                this.appEvent.publish('refreshCommunities');
                this.appEvent.publish('admin:associations');
                this.appEvent.publish('admin:merchants');
                this.appEvent.publish('member:associations');
                this.appEvent.publish('member:merchants');
                Promise.all([this.serviceCommunity.getAllPublicCommunities(), this.serviceCommunity.getAllPrivateCommunities(), this.serviceCommunity.findCurrentUserCommunities()]).then(data => {
                    this.publicCommunities = data[0];
                    this.publicFilterCommunities = data[0];
                    this.privateCommunities = data[1];
                    this.privateFilterCommunities = data[1];
                    localStorage.setItem("allCommunities", JSON.stringify(data[2]));
                });

                if (this.finishedEvents.length > 0) {
                    this.finished();
                }


            }
            this.platform.resume.subscribe((result) => {
                if (!this.showFinished) {
                    if (localStorage.getItem("token")) {
                        if (this.finishedEvents.length > 0) {
                            this.finished();

                        }
                    }
                }

            });

            this.keyboard.hideKeyboardAccessoryBar(false);
            this.keyboard.disableScroll(false);
            if (this.platform.is('core')) {
                this.refreshNotifications();
            }
  
         
        //community following
            
              /*  if (localStorage.getItem("token")) {
                    
                    this.deeplinks.routeWithNavController(this.nav, {
                        '/community/:id': 1,
                        }).subscribe(match => {
                            
                            this.serviceCommunity.getCommunityInformations(match.$args.communauteId).then(data => {
                                localStorage.setItem("communityDeeplink", JSON.stringify(data));
                                this.nav.setRoot(NewsPage, {item: data});
                            });

                        }, nomatch => {
                        console.error('Got a deeplink that didn\'t match', nomatch);
                        });
                }else{*/
                    this.deeplinks.routeWithNavController(this.nav, {
                        '/community/:communauteId': 1,
                        }).subscribe(match => {

                    if (localStorage.getItem("token")) {

                        this.serviceCommunity.getCommunityInformations(match.$args.communauteId).then(data => {
                            localStorage.setItem("communityDeeplink", JSON.stringify(data));
                            this.nav.setRoot(NewsPage, {item: data});
                        });
                    }else{

                        this.serviceCommunity.getCommunityInformations(match.$args.communauteId).then(data => {
                            localStorage.setItem("communityDeeplink", JSON.stringify(data));
                            this.nav.setRoot(ModerationPage, {item: data});
                        });

                    }
                       
                      

                        }, nomatch => {
                        console.error('Got a deeplink that didn\'t match', nomatch);
                        });
              //  }
              


        });
        this.appGlobals.token = localStorage.getItem("token");
        this.appEvent.subscribe('myspace:refresh', () => {
            Promise.all([this.userService.findCurrentUserAssociations(),this.userService.findCurrentUserMerchants(),this.userService.findCurrentUserAdherentAsso(),this.userService.findCurrentUserAdherentMerchant(),this.serviceCommunity.findCurrentUserCommunities()]).then(data => {
                this.appGlobals.adminAssociations = data[0];
                localStorage.setItem("adminAssociations", JSON.stringify(data[0]));
                this.appGlobals.adminAssociations = data[0];
                localStorage.setItem("adminMerchants", JSON.stringify(data[1]));
                this.appGlobals.adminMerchants = data[1];
                localStorage.setItem("adherentAssociations", JSON.stringify(data[2]));
                this.appGlobals.adherentAssociations = data[2];
                localStorage.setItem("adherentMerchants", JSON.stringify(data[3]));
                this.appGlobals.adherentMerchants = data[3];
                localStorage.setItem("allCommunities", JSON.stringify(data[4]));
                this.appEvent.publish('refresh:groups');
            });

        });

        this.appEvent.subscribe('admin:associations', () => {
            Promise.all([this.userService.findCurrentUserAssociations()]).then(data => {
                this.appGlobals.adminAssociations = data[0];
                localStorage.setItem("adminAssociations", JSON.stringify(data[0]));
            });
        });

        this.appEvent.subscribe('admin:merchants', () => {
            Promise.all([this.userService.findCurrentUserMerchants()]).then(data => {
                this.appGlobals.adminMerchants = data[0];
                localStorage.setItem("adminMerchants", JSON.stringify(data[0]));
            });

        });

        this.appEvent.subscribe('member:associations', () => {
            Promise.all([this.userService.findCurrentUserAdherentAsso()]).then(data => {
                this.appGlobals.adherentAssociations = data[0];
                localStorage.setItem("adherentAssociations", JSON.stringify(data[0]));

            });
        });

        this.appEvent.subscribe('member:merchants', () => {
            Promise.all([this.userService.findCurrentUserAdherentMerchant()]).then(data => {
                this.appGlobals.adherentMerchants = data[0];
                localStorage.setItem("adherentMerchants", JSON.stringify(data[0]));
            });

        });

        this.appEvent.subscribe('communities:all', () => {
            Promise.all([this.serviceCommunity.findCurrentUserCommunities()]).then(data => {
                localStorage.setItem("allCommunities", JSON.stringify(data[0]));
            });

        });

        /****** APP EVENTS *****/
        /**
         * Event to handle errors of http request
         */

        this.appEvent.subscribe('http:errors', (err) => {
            if (err.status == 0) {
                let errorAlert = this.myAlert.create({
                    title: "Erreur",
                    subTitle: "Veuillez vérifier votre connexion.",
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
            } else if (err.status == 401) {
                this.logout();
            } else if (err.status == 403) {
                let errorAlert = this.myAlert.create({
                    title: "Erreur",
                    subTitle: "Accès interdit",
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
            } else {
                let errorAlert = this.myAlert.create({
                    title: "Erreur",
                    subTitle: "Une erreur est survenue, veuillez ré-essayer plus tard.",
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
        });

        /**
         * Current User logout
         */
        this.appEvent.subscribe('user:logout', () => {
            this.logout();
        });
        this.appEvent.subscribe('refreshNotifications', () => {
            this.refreshNotifications();
            this.badge.set(this.appGlobals.nbrNotification);
        });
        this.appEvent.subscribe('clean_notifications', (nbre) => {
            this.appGlobals.nbrNotification = nbre;
            localStorage.setItem("count_notifications", String(this.appGlobals.nbrNotification));
            this.badge.set(this.appGlobals.nbrNotification);
        });
        if (platform.is('core') && localStorage.getItem('token')) {
            Observable.interval(1000 * 60).subscribe(x => {
                this.refreshNotifications();
            });
        }
        this.appEvent.unsubscribe('resetFilters');
        this.appEvent.subscribe('resetFilters', () => {
            this.selectedTheme = [];
            this.selectedVille = [];
            this.myFilterDate = undefined;
            this.allCitiesChecked = true;
            this.allThemesChecked = true;
            if (this.allCitiesFilter) {
                for (let city of this.allCitiesFilter) {
                    city.filtered = false;
                }
            }
            if (this.allThemesFilter) {
                for (let theme of this.allThemesFilter) {
                    theme.filtered = false;
                }
            }
            localStorage.removeItem('selectedVille');
            localStorage.removeItem('selectedTheme');
            localStorage.removeItem('selectedDate');
        });

        this.appEvent.unsubscribe('closeFilters');
        this.appEvent.subscribe('closeFilters', () => {
            this.appGlobals.themeFilter = false;
            this.appGlobals.villeFilter = false;
        });

    }


    finished() {
        let i = 1;
        for (let id of this.finishedEvents) {
            this.serviceEvent.getDetailsEvent(id).then(data => {
                    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
                    if (data.creatorId == this.currentUser.id && !data.participantsNbre) {
                        if (this.userEvents.indexOf(data) == -1) {
                            this.userEvents.push(data);
                        }
                    }
                    if (i == this.finishedEvents.length) {
                        this.appEvent.publish('finishedEvents');
                    }
                    i++;

                },
                err => {
                    this.appEvent.publish('http:errors', err);
                });

        }
        return this.userEvents.length;

    }

    /**
     * Logout User
     */

    private logout() {
        if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
            this.userService.deleteDeviceToken(this.deviceToken).then(data => {
            });
        }
        this.nav.setRoot(HomePage);
        localStorage.clear();
        this.appGlobals.currentPageid = null;
        this.appGlobals.currentPageTitle = null;
        this.appGlobals.currentPageLogo = null;
        this.appGlobals.token = null;
    }

    createMerchant() {
        this.nav.push(CreateMerchantPage);
    }

    news() {
        if (localStorage.getItem("hasCommunities") == 'true') {
            this.appGlobals.currentPageid = "news";
            this.appEvent.publish('updateFooter');
            this.nav.setRoot(NewsPage);
        } else {
            this.appGlobals.currentPageid = "news";
            this.nav.setRoot(EmptyNewsPage);
            this.appEvent.publish('updateFooter');
        }
    }

    mySpace() {
        this.appGlobals.currentPageid = "mySpace";
        this.appEvent.publish('updateFooter');
        this.nav.setRoot(MySpacePage);
    }

    agenda() {
        if (localStorage.getItem("hasCommunities") == 'true') {
            this.appGlobals.currentPageid = "agenda";
            this.appEvent.publish('updateFooter');
            this.nav.setRoot(AgendaPage);
        } else {
            this.appGlobals.currentPageid = "news";
            this.appEvent.publish('updateFooter');
            this.nav.setRoot(EmptyNewsPage);
        }
    }

    goodplans() {
        if (localStorage.getItem("hasCommunities") == 'true') {
            this.appGlobals.currentPageid = "goodplans";
            this.appEvent.publish('updateFooter');
            this.nav.setRoot(GoodPlanPage);
        } else {
            this.appGlobals.currentPageid = "news";
            this.appEvent.publish('updateFooter');
            this.nav.setRoot(EmptyNewsPage);
        }
    }

    MyTownHall() {
        if (localStorage.getItem("hasApprovedCommunities") == 'true') {
            this.appGlobals.currentPageid = "MyTownHall";
            this.appEvent.publish('updateFooter');
            this.nav.setRoot(MyTownHallPage);
        } else {
            this.appGlobals.currentPageid = "news";
            this.appEvent.publish('updateFooter');
            this.nav.setRoot(EmptyNewsPage);
        }
    }

    onCancel() {
        this.appGlobals.searchCriteria.theme = null;
    }

    pop_publish() {
        let adminAssociations = JSON.parse(localStorage.getItem("adminAssociations"));
        let adminMerchants = JSON.parse(localStorage.getItem("adminMerchants"));
        let adherentAssociations = JSON.parse(localStorage.getItem("adherentAssociations"));
        let adherentMerchants = JSON.parse(localStorage.getItem("adherentMerchants"));
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

    showHideSearch() {
        this.appGlobals.searchCriteria = {
            key: null,
            theme: null,
            event: false,
            article: false,
            account: false,
            goodplans: false,
            cities: "all"
        };
        if (!this.appGlobals.appSearch) {
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            this.userService.findCategoriesByUser().then(data => {
                this.categories = data;
                loadingPopup.dismiss();
                this.appGlobals.appSearch = true;
            });
        } else {
            this.appGlobals.appSearch = false;
        }
    }

    showHideAgendaBenevole() {
        if (!this.appGlobals.showBenevoleAgenda) {
            this.appGlobals.showBenevoleAgenda = true;
        } else {
            this.appGlobals.showBenevoleAgenda = false;
        }
    }

    showHideContactBar() {
        if (!this.appGlobals.showcontactBar) {
            this.appGlobals.showcontactBar = true;
        } else {
            this.appGlobals.showcontactBar = false;
        }
    }

    showHideProposeCarpooling() {
        if (!this.appGlobals.showproposeCarpooling) {
            this.appGlobals.checkedCarpool = null;
            this.appGlobals.showproposeCarpooling = true;
        } else {
            this.appGlobals.checkedCarpool = null;
            this.appGlobals.showproposeCarpooling = false;
        }
    }

    showHideNeedCarpooling(event) {
        this.appGlobals.currentEvent = event;
        this.appGlobals.checkedCarpool = null;
        this.appGlobals.showNeedCarpooling = !this.appGlobals.showNeedCarpooling;
    }

    showHidePutAgenda() {
        if (!this.appGlobals.showPutAgenda) {
            this.appGlobals.showPutAgenda = true;
        } else {
            this.appGlobals.showPutAgenda = false;
        }
    }

    showHideFilterTheme() {
        this.appGlobals.villeFilter = false;
        if (!this.appGlobals.themeFilter) {
            this.appGlobals.themeFilter = true;
        } else {
            this.appGlobals.themeFilter = false;
        }
        this.appEvent.publish('refreshCommunities');
    }

    showHideFilterVille() {
        this.appGlobals.themeFilter = false;
        if (!this.appGlobals.villeFilter) {
            this.appGlobals.villeFilter = true;
        } else {
            this.appGlobals.villeFilter = false;
        }

        this.allCitiesFilter = this.appGlobals.allCities;
    }

    showHidePrivateSearch() {
        if (!this.appGlobals.privateSearch) {
            this.appGlobals.privateSearch = true;
        } else {
            this.appGlobals.privateSearch = false;
        }

        this.privateCommunities = this.privateFilterCommunities;
        this.privateChecked=0;
    }

    showHidePublicSearch() {
        if (!this.appGlobals.publicSearch) {
            this.appGlobals.publicSearch = true;
        } else {
            this.appGlobals.publicSearch = false;
        }

        this.publicCommunities = this.publicFilterCommunities;
        this.publicChecked = [];
        this.removeUnusedPublicChecked();
    }


    // search filter
    searchEvent() {
        this.appGlobals.searchCriteria.event = !this.appGlobals.searchCriteria.event;
    }

    searchGoodPlans() {
        this.appGlobals.searchCriteria.goodplans = !this.appGlobals.searchCriteria.goodplans;
    }

    searchArticle() {
        this.appGlobals.searchCriteria.article = !this.appGlobals.searchCriteria.article;
    }

    searchAccount() {
        this.appGlobals.searchCriteria.account = !this.appGlobals.searchCriteria.account;
    }

    searchAction() {
        if (!this.appGlobals.searchCriteria.key && !this.appGlobals.searchCriteria.theme) {
            let errorAlert = this.myAlert.create({
                title: "Erreur",
                subTitle: "Il faut renseigner soit un mot clef ou un thème",
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
        } else if (this.appGlobals.searchCriteria.event == false &&
            this.appGlobals.searchCriteria.article == false &&
            this.appGlobals.searchCriteria.account == false &&
            this.appGlobals.searchCriteria.goodplans == false) {
            let errorAlert = this.myAlert.create({
                title: "Erreur",
                subTitle: "Cliquez sur au moins une des 4 icônes groupes/établissements, articles, événements ou bons plans",
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
        } else {
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            let cities = "all";
            this.userService.search(this.appGlobals.searchCriteria, cities).then(data => {
                    loadingPopup.dismiss();
                    this.appGlobals.appSearch = false;
                    this.nav.push(SearchResultPage, {
                        result: data,
                        criteria: this.appGlobals.searchCriteria
                    });
                },
                err => {
                    loadingPopup.dismiss();
                    this.appEvent.publish("http:errors", err);
                });
        }
    }

    initPushNotification(platform) {
        if (!platform.is('cordova')) {
            return;
        }
        this.fcm.subscribeToTopic('nousEnsemble');
        this.fcm.getToken().then(token => {
            var deviceType = "";
            if (platform.is('ios')) {
                deviceType = "ios";
            }
            else if (platform.is('android')) {
                deviceType = "android";
            }
            else if (platform.is('windows')) {
                deviceType = "windows";
            }
            this.deviceToken = token;
            this.userService.deviceToken(token, deviceType);
        });

        this.fcm.onNotification().subscribe(data => {
            this.badge.set(10);
            if (data.wasTapped) {
                this.badge.increase(1);
            }else {
                 this.badge.clear();
            }
           /* this.badge.set(10);
            if (data.additionalData.silent == 'on') {
                if (data.additionalData.foreground) {
                    this.appEvent.publish('refreshNotifications');
                }

                if (data.additionalData.refreshThemes) {
                    this.refreshCommunities();
                }
            }

             else {
                this.badge.increase(1);
                if (data.additionalData.foreground) {
                    if (data.additionalData.eventId) {
                        let label = 'push received-' + data.additionalData.eventId;
                        this.appEvent.publish("googleAnalytics", label);
                    }
                    if (data.additionalData.communityId || data.additionalData.associationId  || data.additionalData.merchantId) {
                        let confirmAlert = this.myAlert.create({
                            title: data.title,
                            message: data.message,
                            buttons: [{
                                text: 'Fermer',
                                role: 'cancel'
                            }]
                        });
                        confirmAlert.present();
                    } else {
                        let confirmAlert = this.myAlert.create({
                            title: data.title,
                            message: data.message,
                            buttons: [{
                                text: 'Fermer',
                                role: 'cancel'
                            }]
                        });
                        confirmAlert.present();

                    }
                } else {
                    if (data.additionalData.participantNbre == 'yes') {
                        this.finishedEvents = JSON.parse(localStorage.getItem("finishedEvents"));
                        this.finishedEvents.push(data.additionalData.eventId);
                        localStorage.setItem("finishedEvents", JSON.stringify(this.finishedEvents));

                    } else {
                        this.badge.increase(1);
                        if (data.additionalData.eventId) {
                            let label = 'push received-' + data.additionalData.eventId;
                            this.appEvent.publish("googleAnalytics", label);
                        }
                        if (data.additionalData.store == 'on') {
                            this.openMarket();
                        } else {
                            this.nav.push(NewsPage);
                        }
                    }

                }
            }*/

            });
    }

    public refreshCommunities() {
        Promise.all([this.serviceCommunity.findCurrentUserFollowedCommunities()]).then(user => {
                localStorage.setItem("followedCommunities", JSON.stringify(user[0]));
                this.appEvent.publish('refreshCommunities');
                this.appEvent.publish('refreshApprovedCommunities');
            },
            err => {
                this.appEvent.publish('http:errors', err);
            });
    }

    openMarket() {
        this.market.open(APP_PACKAGE);
    }

    refreshNotifications() {
        if (localStorage.getItem("token")) {
            this.userService.findCurrentUser().then(data => {
                this.appGlobals.nbrNotification = data.countUnread;
                localStorage.setItem("count_notifications", String(data.countUnread));
                this.appEvent.publish('count_notifications');
            });
        }
    }


    communities() {
        this.appGlobals.currentPageid = "communities";
        this.appGlobals.currentPageTitle = "communities";
        this.appEvent.publish('updateFooter');
        this.nav.setRoot(CommunitiesPage);
    }

    filterVilles(event) {
        let key = event.target.value;
        this.userService.searchCities(key).then(data => {
            this.allCitiesFilter = data;
        });
    }

    filterThemes(event) {
        this.appEvent.publish('refreshCommunities');
        let key = event.target.value;
        if (key && key.trim() !== '') {
            if (this.allThemesFilter) {
                this.allThemesFilter = this.allThemes.filter(function (item) {
                    return item.name.toLowerCase().includes(key.toLowerCase());
                });
            }
        }
    }

    selectVilles(data) {
        if (data.filtered == true) {
            this.selectedVille.push(data);
        } else {
            let newArray = this.selectedVille.filter(function (el) {
                return el.id !== data.id;
            });
            this.selectedVille = newArray;
        }
        this.allCitiesChecked = this.selectedVille.length == 0;
    }

    selectAllVilles(data) {
        this.allCitiesChecked = true;
        this.selectedVille = [];
        for (let city of this.allCitiesFilter) {
            city.filtered = false;
        }
    }

    selectTheme(data) {
        this.allThemesChecked = false;
        if (this.allThemesChecked) {
            for (let theme of this.allThemesFilter) {
                if (theme.name == data.name){
                    this.selectedTheme.push(data);
                    theme.filtered = true;
                }
            }
        }
        else {
            if (data.filtered == true) {
                this.selectedTheme.push(data);
            } else {
                this.selectedTheme = this.selectedTheme.filter(function (el) {
                    return el.id !== data.id;
                });
            }
        }
        this.allThemesChecked = this.selectedTheme.length == 0;
    }

    selectAllThemes() {
        this.selectedTheme = [];
        for (let theme of this.allThemesFilter) {
            theme.filtered = false;
        }
    }

    submitVilles() {
        if (this.selectedVille.length > 5) {
            let myModal2 = this.modal.create('PopupPage', {"message": "<p>Vous ne pouvez sélectionner que 5 villes au maximum ! </p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {});
            myModal2.present();
        } else {
            this.appGlobals.villeFilter = false;
            localStorage.setItem('selectedVille', JSON.stringify(this.selectedVille));
            this.appEvent.publish('news:refresh');
            this.appEvent.publish('agenda:refresh');
            this.appEvent.publish('goodplan:refresh');
        }
    }

    submitThemes() {
        if (this.selectedTheme.length > 5) {
            let myModal2 = this.modal.create('PopupPage', {"message": "<p>Vous ne pouvez sélectionner que 5 thèmes au maximum ! </p>"}, {cssClass: 'message-modal'});
            myModal2.onDidDismiss(() => {});
            myModal2.present();
        } else {
            this.appGlobals.themeFilter = false;
            localStorage.setItem('selectedTheme', JSON.stringify(this.selectedTheme));
            this.appEvent.publish('news:refresh');
            this.appEvent.publish('agenda:refresh');
            this.appEvent.publish('goodplan:refresh');
        }
    }

    resetDatePicker() {
        this.myFilterDate = undefined;
        localStorage.removeItem('selectedDate');
        this.appEvent.publish('agenda:refresh');
        this.appEvent.publish('goodplan:refresh');
        this.datePicker.disabled = true;
    }

    submitDatePicker() {
        this.myFilterDate = this.startDate;
        localStorage.setItem('selectedDate', JSON.stringify(this.myFilterDate));
        this.appEvent.publish('agenda:refresh');
        this.appEvent.publish('goodplan:refresh');
        this.datePicker.disabled = true;
    }

    filterPublicCommunities(event) {
        this.publicCommunities = this.publicFilterCommunities;
        let key = event.target.value;
        if (key && key.trim() !== '') {
            if (this.publicCommunities) {
                this.publicCommunities = this.publicCommunities.filter(function (item) {
                    return item.name.toLowerCase().includes(key.toLowerCase());
                });
            }
        }
        this.removeUnusedPublicChecked();
    }

    removeUnusedPublicChecked() {
        this.publicChecked = this.publicChecked.filter((item) => {
            if (this.publicCommunities.find(currentObject => currentObject.id === item)) {
                return true;
            }
            return false;
        });
    }
    removeUnusedPrivateChecked() {
        const checkIdExistence = idParam => this.privateCommunities.some( ({id}) => id == idParam)
        if(!checkIdExistence(this.privateChecked)){
            this.privateChecked=0;
        }
    }

    filterPrivateCommunities(event) {
        this.privateCommunities = this.privateFilterCommunities;
        let key = event.target.value;
        if (key && key.trim() !== '') {
            if (this.privateCommunities) {
                this.privateCommunities = this.privateCommunities.filter(function (item) {
                    return item.name.toLowerCase().includes(key.toLowerCase());
                });
            }
        }
        this.removeUnusedPrivateChecked();
    }

    publicChange(id, isChecked) {
        if (isChecked) {
            this.publicChecked.push(id);
        } else {
            let index: number = this.publicChecked.indexOf(id);
            if (index !== -1) {
                this.publicChecked.splice(index, 1);
            }
        }
    }

    privateChange(id, name, isChecked) {
        isChecked = true;
        if (isChecked) {
            this.privateChecked = id;
            this.privateNameChecked = name;
        } else {
            this.privateChecked = null;
            this.privateNameChecked = null;
        }
    }

    carpoolChange(id) {
        this.appGlobals.checkedCarpool = id;
        this.requiredCarpool = false;
    }
    carpoolNumberChange() {
        this.requiredCarpool = !this.phoneNumber;
    }

    carpoolAnswer() {
        if (this.appGlobals.checkedCarpool){
            this.requiredCarpool = false;
            this.appGlobals.showNeedCarpooling = false;
            this.appGlobals.showAnswerCarpooling = true;
        }
        else {
            this.requiredCarpool = true;
        }
    }

    carpoolAdd() {
        var phoneRegexp = /^(33|0)\d{9}$/;
        if (this.rallyPoint && this.rdvHours && this.seatedFree && this.phoneNumber && phoneRegexp.test(this.phoneNumber)){
            this.appGlobals.showproposeCarpooling = false;
            this.requiredCarpool = false;
            this.requiredRallyPoint = false;
            this.requiredRdvHours = false;
            this.requiredSeatedFree = false;
            this.appEvent.publish('agenda:carpoolAdd', [this.appGlobals.currentEvent.id, this.phoneNumber, this.rallyPoint, this.rdvHours, this.seatedFree]);
        }
        else {
            if (!this.rallyPoint) {
                this.requiredRallyPoint = true;
            }
            if (!this.rdvHours) {
                this.requiredRdvHours = true;
            }
            if (!this.seatedFree){
                this.requiredSeatedFree = true;
            }
            if (!this.phoneNumber || !phoneRegexp.test(this.phoneNumber)) {
                this.requiredCarpool = true;
            }
        }
    }
    carpoolRallyChange() {
        this.requiredRallyPoint = !this.rallyPoint;
    }
    carpoolRdvHoursChange() {
        this.requiredRdvHours = !this.rdvHours;
    }
    carpoolSeatedChange() {
        this.requiredSeatedFree = !this.seatedFree;
    }
    carpoolPhoneChange() {
        this.requiredCarpool = !this.phoneNumber;
    }

    showHideAnswerCarpooling() {
        if (!this.appGlobals.showAnswerCarpooling) {
            this.appGlobals.showAnswerCarpooling = true;
        } else {
            this.appGlobals.showAnswerCarpooling = false;
        }
    }

    addCarpoolAnswer() {
        var phoneRegexp = /^(33|0)\d{9}$/;
        if (this.phoneNumber) {
            if (phoneRegexp.test(this.phoneNumber)) {
                this.requiredCarpool = false;
                let loadingPopup = this.loadingCtrl.create({});
                loadingPopup.present();
                let result: any;
                this.serviceEvent.addCarpoolAnswer(this.appGlobals.checkedCarpool, this.phoneNumber).then(data => {
                        loadingPopup.dismiss();
                        result = data;
                        if (result.success) {
                            this.appGlobals.showAnswerCarpooling = false;
                            this.appEvent.publish('agenda:refresh');
                        }
                    },
                    err => {
                        loadingPopup.dismiss();
                        this.appEvent.publish('http:errors', err);
                    });
            }
            else{
                this.requiredCarpool = true;
            }
        }
        else {
            this.requiredCarpool = true;
        }
    }

    addPublicCommunities() {
        this.appGlobals.publicSearch = false;
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.serviceCommunity.postUserPublicCommunities(this.publicChecked).then(data => {
                localStorage.setItem("hasApprovedCommunities", "true");
                Promise.all([this.serviceCommunity.getAllPublicCommunities(), this.serviceCommunity.findCurrentUserCommunities()]).then(datas => {
                    this.publicChecked = [];
                    this.publicCommunities = datas[0];
                    this.publicFilterCommunities = datas[0];
                    localStorage.setItem("allCommunities", JSON.stringify(datas[1]));
                    this.appEvent.publish('refreshApprovedCommunities');
                    localStorage.setItem("hasApprovedCommunities", "true");
                    this.appEvent.publish('refreshCommunities');
                }); 
                loadingPopup.dismiss();
                const myModal2 = this.modal.create('PopupPage', {"message": "<p>C'est parfait. Bienvenue dans cette communauté ! </p>"}, {cssClass: 'message-modal'});
                myModal2.onDidDismiss(() => {
                });
                myModal2.present();
            },
            err => {
                this.appEvent.publish('http:errors', err);
                loadingPopup.dismiss();
            });
    }

    addPublicCommunitiesViaDeepLink() {
        this.appGlobals.publicSearch = false;
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.serviceCommunity.postUserPublicCommunities(this.publicChecked).then(data => {
                localStorage.setItem("hasApprovedCommunities", "true");
                Promise.all([this.serviceCommunity.getAllPublicCommunities(), this.serviceCommunity.findCurrentUserCommunities()]).then(datas => {
                    this.publicChecked = [];
                    this.publicCommunities = datas[0];
                    this.publicFilterCommunities = datas[0];
                    localStorage.setItem("allCommunities", JSON.stringify(datas[1]));
                    this.appEvent.publish('refreshApprovedCommunities');
                    localStorage.setItem("hasApprovedCommunities", "true");
                    this.appEvent.publish('refreshCommunities');
                });
                loadingPopup.dismiss();
                const myModal2 = this.modal.create('PopupPage', {"message": "<p>C'est parfait. Bienvenue dans cette communauté ! </p>"}, {cssClass: 'message-modal'});
                myModal2.onDidDismiss(() => {
                });
                myModal2.present();
            },
            err => {
                this.appEvent.publish('http:errors', err);
                loadingPopup.dismiss();
            });
    }

   

    addPrivateCommunities() {
        this.appGlobals.privateSearch = false;
        const myModal = this.modal.create('PasswordCommunityPage', {
            'id': this.privateChecked,
            'name': this.privateNameChecked
        }, {cssClass: 'community-modal'});
        myModal.onDidDismiss((data) => {
        });
        myModal.present();
        this.privateChecked=0;
    }

    showDatePicker() {
        this.datePicker.disabled = false;
        if (this.appGlobals.themeFilter || this.appGlobals.villeFilter){
            this.appGlobals.themeFilter = false;
            this.appGlobals.villeFilter = false;
        }
        this.datePicker.open();
    }

    volunteerContact(){
        var phoneRegexp = /^(33|0)\d{9}$/;
        if (this.phoneNumber) {
            if (!phoneRegexp.test(this.phoneNumber)) {
                this.badPhone = true;
            }
            else {
                this.badPhone = false;
                this.appEvent.publish('agenda:volunteerContact', [this.appGlobals.currentEventId, this.phoneNumber]);
            }
        }
        else {
            this.badPhone = true;
        }
    }

    addAgenda(){
        let event = this.appGlobals.currentEvent;
        let start = moment(event.startAt).toDate();
        let end = moment(event.endAt).toDate();
        this.calendarPlugin.createEvent(event.title, '', '', start, end).then(
            (msg) => {

            },
            (err) => {

            }
        );
        this.appGlobals.showPutAgenda = false;
    }

    googPlanContact(){
        this.goodPlanService.sendDemand(this.appGlobals.goodPlanMessage, this.appGlobals.goodPlanCreatorId).then(
            (msg) => {
                this.appGlobals.showcontactBar = false;
                this.appGlobals.goodPlanMessage = '';
            },
            (err) => {

            }
        );
    }
    footer(){
        if (this.platform.is('core')) {
        } else {
            let footerItems = document.getElementsByClassName('footer-item') as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < footerItems.length; i++) {
                footerItems[i].style.width = "56px";
                footerItems[i].style.height = "56px";
            }
            let activated = document.getElementsByClassName('activated-footer') as HTMLCollectionOf<HTMLElement>;
            if (activated[0]) {
                activated[0].style.width = "70px";
                activated[0].style.height = "70px";
            }
            if(this.appGlobals.currentPageid != "goodplans" &&
                this.appGlobals.currentPageid != "mySpace" &&
                this.appGlobals.currentPageid != "MyTownHall" &&
                this.appGlobals.currentPageid != "news" &&
                this.appGlobals.currentPageid != "agenda"){
                for (let i = 0; i < footerItems.length; i++) {
                    footerItems[i].style.width = "56px";
                    footerItems[i].style.height = "56px";
                }
            }
        }
    }
}