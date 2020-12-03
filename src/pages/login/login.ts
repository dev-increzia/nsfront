import {HomePage} from "./../home/home";
import {Component, OnInit, ViewChild} from "@angular/core";
import {AlertController, Content, Events, LoadingController, NavController, NavParams, Platform} from "ionic-angular";
import "rxjs/Rx";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginProvider} from "../../providers/login/login";
import {NewsPage} from "../../pages/news/news";
import {EmptyNewsPage} from "../../pages/empty-news/empty-news";
import {Storage} from "@ionic/storage";
import {Http} from "@angular/http";
import {UserProvider} from "../../providers/user/user";
import {Push} from "@ionic-native/push";
import {Badge} from "@ionic-native/badge";
import {GlobalsProvider} from "../../providers/globals/globals";
import {AppProvider} from "../../providers/app/app";
import {ForgetPasswordPage} from "../forget-password/forget-password";
import {APP_PACKAGE} from "../../app/config";
import {Market} from "@ionic-native/market";
import {User} from "../../Models/user";
import {CommunityProvider} from "../../providers/community/community";
import {CguPage} from "../cgu/cgu";
import {RgpdPage} from "../rgpd/rgpd";
import { FCM } from '@ionic-native/fcm';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
    @ViewChild(Content) content: Content;
    public deviceToken: any;
    public messageError: any;
    private signInForm: FormGroup;
    private submited = false;
    public loginUser = new User();
    public eventParticipted = [];
    private communities: any;
    private approved: any;
    public finishedEvents = [];

    constructor(public http: Http,
                public navCtrl: NavController,
                public navParams: NavParams,
                public appEvents: Events,
                public userService: UserProvider,
                public appService: AppProvider,
                public serviceCommunity: CommunityProvider,
                public service: LoginProvider,
                private storage: Storage,
                private loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                public platform: Platform,
                public push: Push,
                private fcm: FCM,
                private badge: Badge,
                public market: Market,
                public appGlobals: GlobalsProvider) {
        let communityDeeplink = JSON.parse(localStorage.getItem("communityDeeplink"));          
        localStorage.removeItem('token');
        localStorage.clear();
        localStorage.setItem("communityDeeplink", JSON.stringify(communityDeeplink));
        this.appGlobals.currentPageid = "login";
        if (window.location.search.indexOf("inscription=yes") > -1) {
        }
    }

    ngOnInit() {
        this.signInForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            rememberMe: new FormControl('', []),
        });

    }

    back() {
        this.navCtrl.setRoot(HomePage);
    }

    ionViewWillEnter() {
        this.storage.get('rememberMe').then((rememberMe) => {
            if (rememberMe) {
                this.storage.get('email').then((email) => {
                    this.loginUser.setEmail(email);
                });

                this.storage.get('password').then((password) => {
                    this.loginUser.setPassword(password);
                });
            }
        });
    }

    loginForm(errorValidation) {
        this.submited = true;
        if (!errorValidation) {
            this.storage.set('rememberMe', this.loginUser.getRememberMe());
            if (this.loginUser.getRememberMe()) {
                this.storage.set('email', this.loginUser.getEmail());
                this.storage.set('password', this.loginUser.getPassword());
            }
            let loadingPopup = this.loadingCtrl.create({});
            loadingPopup.present();
            this.service.login(this.loginUser.getEmail(), this.loginUser.getPassword()).then(data => {
                if(data.token){

                    this.appGlobals.token = data.token;
                localStorage.setItem("adminAssociations", JSON.stringify([]));
                localStorage.setItem("adminMerchants", JSON.stringify([]));
                localStorage.setItem("adherentAssociations", JSON.stringify([]));
                localStorage.setItem("adherentMerchants", JSON.stringify([]));
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('refresh_token', data.refresh_token);
                    localStorage.setItem('account_type', 'citoyen');
                    var expiration_date = new Date();
                    expiration_date.setDate(expiration_date.getDate() + 7);
                    localStorage.setItem('expiration_date', expiration_date.toString());
                    if (this.platform.is('core')) {
                        this.appEvents.publish('refreshNotifications');
                    }
                    this.appEvents.publish('admin:associations');
                    this.appEvents.publish('admin:merchants');
                    this.appEvents.publish('member:associations');
                    this.appEvents.publish('member:merchants');
                    Promise.all([this.serviceCommunity.getAllPublicCommunities(), this.serviceCommunity.getAllPrivateCommunities(), this.serviceCommunity.findCurrentUserCommunities()]).then(user => {
                        localStorage.setItem("publicCommunities", JSON.stringify(user[0]));
                        localStorage.setItem("privateCommunities", JSON.stringify(user[1]));
                        localStorage.setItem("allCommunities", JSON.stringify(user[2]));
                        this.approved = user[2];
                        if (this.approved.length != 0) {
                            localStorage.setItem("hasApprovedCommunities", "true");
                        } else {
                            localStorage.setItem("hasApprovedCommunities", "false");
                        }
                        this.appEvents.publish('refreshCommunities');


                    }, err => {
                        console.log(err);
                    });


                    if (!this.platform.is('core')) {
                        this.initPushNotification(this.platform);
                    }
                    if (this.navParams.get('refer')) {
                        this.navCtrl.pop();
                    } else {
                        Promise.all([this.service.currentUserInformation(data.token), this.serviceCommunity.findCurrentUserFollowedCommunities()]).then(datas => {
                            localStorage.setItem("currentUser", JSON.stringify(datas[0]));
                            localStorage.setItem("followedCommunities", JSON.stringify(datas[1]));
                            this.appEvents.publish('refreshCurrentUser');
                            this.appEvents.publish('refreshApprovedCommunities');
                            localStorage.setItem("isLoggedIn", "1");
                            localStorage.setItem('ga', data.ga);
                            loadingPopup.dismiss();
                            this.communities = datas[1];
                            if (this.communities.length != 0) {
                                localStorage.setItem("hasCommunities", "true");
                                this.navCtrl.setRoot(NewsPage);
                            } else {
                                localStorage.setItem("hasCommunities", "false");
                                this.navCtrl.setRoot(EmptyNewsPage);
                            }
                        }, err => {
                            console.log(err);
                            localStorage.clear();
                            this.navCtrl.setRoot(LoginPage);
                        });

                    }
                }
                
                }, err => {
                    loadingPopup.dismiss();
                    if (err.status == 0) {
                        let errorAlert = this.alertCtrl.create({
                            title: 'Erreur',
                            subTitle: "Merci de vérifier votre connexion",
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
                        if (JSON.parse(err._body).message.errorCode == '20') {
                            let errorAlert = this.alertCtrl.create({
                                title: 'Erreur',
                                subTitle: JSON.parse(err._body).message.errorMessage,
                                buttons: [
                                    {
                                        text: 'Fermer',
                                        role: 'cancel',
                                        handler: () => {
                                            localStorage.clear();
                                            //this.navCtrl.setRoot(LoginPage);
                                        }
                                    }
                                ]
                            });
                            errorAlert.present();
                        } else if (JSON.parse(err._body).message.errorCode == '17') {
                            let errorAlert = this.alertCtrl.create({
                                title: 'Erreur',
                                subTitle: JSON.parse(err._body).message.errorMessage,
                                buttons: [
                                    {
                                        text: 'Fermer',
                                        role: 'cancel',
                                        handler: () => {
                                            localStorage.clear();
                                        }
                                    }
                                ]
                            });
                            errorAlert.present();
                        }
                        else {
                            let errorAlert = this.alertCtrl.create({
                                title: 'Erreur',
                                subTitle: "Identifiant ou mot de passe incorrect.",
                                buttons: [
                                    {
                                        text: 'Fermer',
                                        role: 'cancel',
                                        handler: () => {
                                            localStorage.clear();
                                        }
                                    }
                                ]
                            });
                            errorAlert.present();
                        }
                    } else if (err.status == 403) {
                        let errorAlert = this.alertCtrl.create({
                            title: 'Erreur',
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
                        let errorAlert = this.alertCtrl.create({
                            title: 'Erreur',
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
                },
            );
        }
    }

    forgetPassword() {
        this.navCtrl.push(ForgetPasswordPage);
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
              if (data.additionalData.silent == 'on') {
                if (data.additionalData.foreground) {
                    this.appEvents.publish('refreshNotifications');
                }
            } else if (data.additionalData.participantNbre == 'yes') {
                this.finishedEvents.push(data.additionalData.eventId);
                localStorage.setItem("finishedEvents", JSON.stringify(this.finishedEvents));

            }
            else {
                this.badge.increase(1);
                if (data.additionalData.foreground) {
                    if (data.additionalData.eventId) {
                        let label = 'push received-' + data.additionalData.eventId;
                        this.appEvents.publish("googleAnalytics", label);

                    }
                    if (data.additionalData.communityId || data.additionalData.associationId  || data.additionalData.merchantId) {
                        let confirmAlert = this.alertCtrl.create({
                            title: data.title,
                            message: data.message,
                            buttons: [{
                                text: 'Fermer',
                                role: 'cancel'
                            }]
                        });
                        confirmAlert.present();
                    } else {
                        let confirmAlert = this.alertCtrl.create({
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
                        this.finishedEvents.push(data.additionalData.eventId);
                        localStorage.setItem("finishedEvents", JSON.stringify(this.finishedEvents));

                    } else {
                        this.badge.increase(1);
                        if (data.additionalData.eventId) {
                            let label = 'push received-' + data.additionalData.eventId;
                            this.appEvents.publish("googleAnalytics", label);
                        }
                        if (data.additionalData.store == 'on') {
                            this.openMarket();
                        } else {
                            this.navCtrl.push(NewsPage);
                        }
                    }
                }
            }

            });



/*
        const options: PushOptions = {
            android: {
                senderID: '390977445413'
            },
            ios: {
                alert: 'true',
                badge: false,
                sound: 'true'
            },
            windows: {}
        };
        const pushObject: PushObject = this.push.init(options);

        pushObject.on('registration').subscribe((data: any) => {
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
            this.deviceToken = data.registrationId;
            this.userService.deviceToken(data.registrationId, deviceType);
        });

        pushObject.on('notification').subscribe((data: any) => {
            if (data.additionalData.silent == 'on') {
                if (data.additionalData.foreground) {
                    this.appEvents.publish('refreshNotifications');
                }
            } else if (data.additionalData.participantNbre == 'yes') {
                this.finishedEvents.push(data.additionalData.eventId);
                localStorage.setItem("finishedEvents", JSON.stringify(this.finishedEvents));

            }
            else {
                this.badge.increase(1);
                if (data.additionalData.foreground) {
                    if (data.additionalData.eventId) {
                        let label = 'push received-' + data.additionalData.eventId;
                        this.appEvents.publish("googleAnalytics", label);

                    }
                    if (data.additionalData.communityId || data.additionalData.associationId  || data.additionalData.merchantId) {
                        let confirmAlert = this.alertCtrl.create({
                            title: data.title,
                            message: data.message,
                            buttons: [{
                                text: 'Fermer',
                                role: 'cancel'
                            }]
                        });
                        confirmAlert.present();
                    } else {
                        let confirmAlert = this.alertCtrl.create({
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
                        this.finishedEvents.push(data.additionalData.eventId);
                        localStorage.setItem("finishedEvents", JSON.stringify(this.finishedEvents));

                    } else {
                        this.badge.increase(1);
                        if (data.additionalData.eventId) {
                            let label = 'push received-' + data.additionalData.eventId;
                            this.appEvents.publish("googleAnalytics", label);
                        }
                        if (data.additionalData.store == 'on') {
                            this.openMarket();
                        } else {
                            this.navCtrl.push(NewsPage);
                        }
                    }
                }
            }

        });

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));

        */
    }

    checkFocus(element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;
            this.content.scrollTo(0, yOffset, 2000);
        }
    }

    openMarket() {
        this.market.open(APP_PACKAGE);
    }

    cgu() {
        this.navCtrl.push(CguPage);
    }
    rgpd() {
        this.navCtrl.push(RgpdPage);
    }
}
