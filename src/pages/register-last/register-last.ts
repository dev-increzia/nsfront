import {Component, OnInit, ViewChild} from "@angular/core";
import {AlertController, Content, Events, LoadingController, NavController, NavParams, Platform} from "ionic-angular";
import {RegisterFirstPage} from "../register-first/register-first";
import {UserProvider} from "../../providers/user/user";
import {EmptyNewsPage} from "../empty-news/empty-news";
import {NewsPage} from "../news/news";
import {GlobalsProvider} from "../../providers/globals/globals";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {APP_PACKAGE} from "../../app/config";
import {Market} from "@ionic-native/market";
import {Push} from "@ionic-native/push";
import {Badge} from "@ionic-native/badge";
import {CommunityProvider} from "../../providers/community/community";
import { FCM } from '@ionic-native/fcm';
/**
 * Generated class for the RegisterLastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-register-last',
    templateUrl: 'register-last.html',
})
export class RegisterLastPage implements OnInit {
    @ViewChild(Content) content: Content;
    private newUser: any;
    private submited = false;
    private passwordError = false;
    private secondRegisterForm: FormGroup;
    public deviceToken: any;
    public finishedEvents = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loader: LoadingController,
                public myUser: UserProvider,
                public serviceCommunity: CommunityProvider,
                public myAlert: AlertController,
                public appEvents: Events,
                public platform: Platform,
                public push: Push,
                private fcm: FCM,
                private badge: Badge,
                public market: Market,
                public appGlobals: GlobalsProvider) {

        this.newUser = this.navParams.get("newUser");
    }

    ngOnInit() {
        this.secondRegisterForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirm_password: new FormControl('', [Validators.required, this.equalTo('password')])
        });

    }

    registerUser(errorValidation) {
        this.submited = true;
        if (!errorValidation && !this.passwordError) {
            let loadingPopup = this.loader.create({});
            loadingPopup.present();
            this.myUser.register(this.newUser).then(data => {
                    loadingPopup.dismiss();
                    this.appGlobals.token = data.token;
                    localStorage.setItem('token', data.token);
                    localStorage.setItem("adminAssociations", JSON.stringify([]));
                    localStorage.setItem("adminMerchants", JSON.stringify([]));
                    localStorage.setItem("adherentAssociations", JSON.stringify([]));
                    localStorage.setItem("adherentMerchants", JSON.stringify([]));
                    var expiration_date = new Date();
                    expiration_date.setDate(expiration_date.getDate() + 7);
                    localStorage.setItem('expiration_date', expiration_date.toString());
                    localStorage.setItem('account_type', 'citoyen');
                    localStorage.setItem('ga', data.ga);
                    if (!this.platform.is('core')) {
                        this.initPushNotification(this.platform);
                    }
                    if (data.token) {
                        localStorage.setItem("currentUser", JSON.stringify(data.user));
                        localStorage.setItem("isLoggedIn", "1");
                        localStorage.setItem("hasCommunities", "false");
                        localStorage.setItem("hasApprovedCommunities", "false");
                        let Communities = [];
                        localStorage.setItem("allCommunities", JSON.stringify(Communities));

                        Promise.all([this.serviceCommunity.getAllPublicCommunities(), this.serviceCommunity.getAllPrivateCommunities()]).then(user => {
                            localStorage.setItem("publicCommunities", JSON.stringify(user[0]));
                            localStorage.setItem("privateCommunities", JSON.stringify(user[1]));
                            this.appEvents.publish('refreshCommunities');

                        });

                        this.navCtrl.setRoot(EmptyNewsPage, {
                            register: true
                        });

                    } else if (data.warning) {
                        let errorAlert = this.myAlert.create({
                            title: "Erreur",
                            subTitle: data.warning,
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: () => {
                                    }
                                }
                            ]
                        });
                        errorAlert.present();
                    } else {
                        let errorAlert = this.myAlert.create({
                            title: "Erreur",
                            subTitle: "L'adresse mail existe.",
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: () => {
                                    }
                                }
                            ]
                        });
                        errorAlert.present();
                    }
                },
                err => {
                    loadingPopup.dismiss();
                    this.appEvents.publish('http:errors', err);
                });
        }
    }


    registerFirstStepPage() {
        this.navCtrl.push(RegisterFirstPage, {
            newUser: this.newUser
        });
    }

    equalTo(field_name): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let input = control.value;
            let isValid = control.root.value[field_name] == input
            if (!isValid) {
                return {'equalTo': {isValid}}
            } else {
                return null;
            }
            ;
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
            this.myUser.deviceToken(token, deviceType);
        });
        this.fcm.onNotification().subscribe(data => {
            if (data.additionalData.silent == 'on') {
                if (data.additionalData.foreground) {
                    this.appEvents.publish('refreshNotifications');
                }
            } else if (data.additionalData.participantNbre == 'yes') {
                this.finishedEvents = JSON.parse(localStorage.getItem("finishedEvents"));
                this.finishedEvents.push(data.additionalData.eventId);
                localStorage.setItem("finishedEvents", JSON.stringify(this.finishedEvents));
            }
            else {
                this.badge.increase(1);
                if (data.additionalData.foreground) {
                    if (data.additionalData.eventId) {
                        let label = 'pushReceived-' + data.additionalData.eventId;
                        this.appEvents.publish("googleAnalytics", label);
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
    }

    openMarket() {
        this.market.open(APP_PACKAGE);
    }

    checkFocus(element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;
            this.content.scrollTo(0, yOffset, 2000);
        }
    }
}
