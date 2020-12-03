webpackJsonp([19],{

/***/ 1017:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChoicePageModule", function() { return ChoicePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__choice__ = __webpack_require__(1039);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChoicePageModule = /** @class */ (function () {
    function ChoicePageModule() {
    }
    ChoicePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__choice__["a" /* ChoicePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__choice__["a" /* ChoicePage */]),
            ],
        })
    ], ChoicePageModule);
    return ChoicePageModule;
}());

//# sourceMappingURL=choice.module.js.map

/***/ }),

/***/ 1039:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChoicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_globals_globals__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ChoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChoicePage = /** @class */ (function () {
    function ChoicePage(navCtrl, navParams, userService, view, appEvents, modal, appGlobals, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.view = view;
        this.appEvents = appEvents;
        this.modal = modal;
        this.appGlobals = appGlobals;
        this.alertCtrl = alertCtrl;
        this.appEvents.publish('admin:associations');
        this.appEvents.publish('admin:merchants');
        this.appEvents.publish('member:associations');
        this.appEvents.publish('member:merchants');
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
    ChoicePage.prototype.Close = function () {
        this.view.dismiss();
    };
    ChoicePage.prototype.popPublish = function (account, accountType) {
        var _this = this;
        var associations = this.appGlobals.adminAssociations;
        var merchants = this.appGlobals.adminMerchants;
        this.merchants = [];
        this.associations = [];
        for (var key in associations) {
            if (associations[key].moderate == 'accepted') {
                this.associations.push(associations[key]);
            }
        }
        for (var key in merchants) {
            if (merchants[key].moderate == 'accepted') {
                this.merchants.push(merchants[key]);
            }
        }
        this.communities = [];
        var allCommunities = JSON.parse(localStorage.getItem("allCommunities"));
        for (var _i = 0, allCommunities_1 = allCommunities; _i < allCommunities_1.length; _i++) {
            var community = allCommunities_1[_i];
            if (community["isAdminPublish"] && (community['activate_survey'] || community['activate_articles'])) {
                this.communities.push({
                    categories: community.categories,
                    follow: community.follow,
                    id: community.id,
                    img_url: community.img_url,
                    isAdminPublish: community.isAdminPublish,
                    isPrivate: community.isPrivate,
                    name: community.name,
                    survey: community.activate_survey,
                    article: community.activate_articles
                });
            }
        }
        if (this.associations.length == 0 && account == 'association') {
            var myModal2 = this.modal.create('PopupPage', { "message": "<p> Vous n'avez pas de Groupe / Association ! </p>" }, { cssClass: 'message-modal' });
            myModal2.onDidDismiss(function () {
            });
            myModal2.present();
        }
        else if (this.merchants.length == 0 && account == 'merchant') {
            var myModal2 = this.modal.create('PopupPage', { "message": "<p>Vous n'avez pas de Commerce / Partenaire </p>" }, { cssClass: 'message-modal' });
            myModal2.onDidDismiss(function () {
            });
            myModal2.present();
        }
        else if (this.communities.length == 0 && account == 'community') {
            var myModal2 = this.modal.create('PopupPage', { "message": "<p>Vous n'avez pas de <br> communauté ! </p>" }, { cssClass: 'message-modal' });
            myModal2.onDidDismiss(function () {
            });
            myModal2.present();
        }
        else if (account == 'merchant' || account == 'association' || account == 'community' || accountType == 'citoyen' || accountType == 'cityhall' || accountType == 'project' || accountType == 'canteen') {
            var myModal2 = this.modal.create('PublishPage', {
                "account": account,
                "accountType": accountType
            }, { cssClass: 'style-modal publish-modal' });
            myModal2.onDidDismiss(function (data) {
                if (data) {
                    _this.Close();
                }
            });
            myModal2.present();
        }
        else {
            var errorAlert = this.alertCtrl.create({
                subTitle: 'Votre compte est en attente de validation',
                buttons: [
                    {
                        text: 'Fermer',
                        role: 'cancel',
                        handler: function () {
                        }
                    }
                ]
            });
            errorAlert.present();
        }
    };
    ChoicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-choice',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\choice\choice.html"*/'<!--\n\n  Generated template for the ChoicePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n\n\n<ion-content>\n\n    <ion-grid class="no-padding ">\n\n        <ion-row>\n\n            <ion-col col-12 no-padding>\n\n                <div class="close-btn" (click)="Close()" float-end>\n\n                    <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n                </div>\n\n            </ion-col>\n\n            <ion-col col-12 text-center>\n\n                <h6 text-left class="wishPublish">\n\n                    Souhaitez vous publier\n\n                    <br> En tant que :\n\n\n\n                </h6>\n\n            </ion-col>\n\n            <ion-col col-12 text-center>\n\n                <button ion-button color="white-color" round class="button-white" text-capitalize no-padding (click)="popPublish(currentUser, \'citoyen\')">\n\n                    <div class="block-image"><img src="assets/imgs/icons/user.png" class="user-img" *ngIf="!currentUser.image_url">\n\n                        <img class="user-img" src="{{currentUser.image_url}}" *ngIf="currentUser.image_url"></div>\n\n                    <div class="block-name">{{currentUser.firstname}} {{currentUser.lastname}}</div>\n\n                    <div class="block-icon">\n\n                        <ion-icon name="ios-arrow-forward"></ion-icon>\n\n                    </div>\n\n                </button>\n\n            </ion-col>\n\n            <ion-col col-12 text-center>\n\n                <button ion-button color="white-color" round class="button-white only-text" text-capitalize no-padding\n\n                    (click)="popPublish(\'association\', \'association\')">\n\n                    <!-- <div class="block-image"><img src="assets/imgs/icons/user_default.png" class="user-img" *ngIf="!association.image_url">\n\n                        <img class="user-img" src="{{association.image_url}}" *ngIf="association.image_url"></div> -->\n\n                    <div class="block-name">Administrateur de <br />groupe / association</div>\n\n                    <div class="block-icon">\n\n                        <ion-icon name="ios-arrow-forward"></ion-icon>\n\n                    </div>\n\n                </button>\n\n            </ion-col>\n\n            <ion-col col-12 text-center>\n\n                <button ion-button color="white-color" round class="button-white only-text" text-capitalize no-padding\n\n                    (click)="popPublish(\'merchant\', \'merchant\')">\n\n                    <!-- <div class="block-image">   <img src="assets/imgs/icons/user_default.png" class="user-img" *ngIf="!merchant.image_url">\n\n                        <img class="user-img" src="{{merchant.image_url}}" *ngIf="merchant.image_url"></div> -->\n\n                    <div class="block-name">Administrateur de <br />commerce / partenaire</div>\n\n                    <div class="block-icon">\n\n                        <ion-icon name="ios-arrow-forward"></ion-icon>\n\n                    </div>\n\n                </button>\n\n            </ion-col>\n\n            <ion-col col-12 text-center>\n\n                <button ion-button color="white-color" round class="button-white only-text" text-capitalize no-padding\n\n                        (click)="popPublish(\'community\', \'community\')">\n\n                    <!-- <div class="block-image">   <img src="assets/imgs/icons/user_default.png" class="user-img" *ngIf="!merchant.image_url">\n\n                        <img class="user-img" src="{{merchant.image_url}}" *ngIf="merchant.image_url"></div> -->\n\n                    <div class="block-name">Administrateur de <br />communauté</div>\n\n                    <div class="block-icon">\n\n                        <ion-icon name="ios-arrow-forward"></ion-icon>\n\n                    </div>\n\n                </button>\n\n            </ion-col>\n\n            <!--<ion-col col-12 text-center *ngIf="currentUser.role == \'cityhall\'">-->\n\n                <!--<button ion-button color="white-color" round class="button-white only-text" text-capitalize no-padding-->\n\n                    <!--(click)="popPublish(currentUser, \'cityhall\')">-->\n\n                    <!--&lt;!&ndash; <div class="block-image">   <img src="assets/imgs/icons/user_default.png" class="user-img" *ngIf="!currentUser.cityhall.image_url">-->\n\n                        <!--<img class="user-img" src="{{currentUser.cityhall.image_url}}" *ngIf="currentUser.cityhall.image_url"></div> &ndash;&gt;-->\n\n                    <!--<div class="block-name">Administrateur de <br />{{currentUser.cityhall.name}}</div>-->\n\n                    <!--<div class="block-icon">-->\n\n                        <!--<ion-icon name="ios-arrow-forward"></ion-icon>-->\n\n                    <!--</div>-->\n\n                <!--</button>-->\n\n            <!--</ion-col>-->\n\n            <!--<ion-col col-12 *ngIf="currentUser.role == \'cityhall\'" text-center>-->\n\n                <!--<h6 text-left class="wishPublish">-->\n\n                    <!--Souhaitez vous publier-->\n\n                    <!--<br> Dans :-->\n\n\n\n                <!--</h6>-->\n\n            <!--</ion-col>-->\n\n            <!--<ion-col col-12 text-center *ngIf="currentUser.role == \'cityhall\'">-->\n\n                <!--<button ion-button color="white-color" round class="button-white" text-capitalize no-padding (click)="popPublish(currentUser, \'project\')">-->\n\n                    <!--<div class="block-image"><img src="assets/imgs/icons/user_default.png" class="user-img" *ngIf="!currentUser.cityhall.image_url">-->\n\n                        <!--<img class="user-img" src="{{currentUser.cityhall.image_url}}" *ngIf="currentUser.cityhall.image_url">-->\n\n                    <!--</div>-->\n\n                    <!--<div class="block-name">Grands projets de ma ville</div>-->\n\n                    <!--<div class="block-icon">-->\n\n                        <!--<ion-icon name="ios-arrow-forward"></ion-icon>-->\n\n                    <!--</div>-->\n\n                <!--</button>-->\n\n            <!--</ion-col>-->\n\n            <!--<ion-col col-12 text-center *ngIf="currentUser.role == \'cityhall\'">-->\n\n                <!--<button ion-button color="white-color" round class="button-white" text-capitalize no-padding (click)="popPublish(currentUser, \'canteen\')">-->\n\n                    <!--<div class="block-image"><img src="assets/imgs/icons/user_default.png" class="user-img" *ngIf="!currentUser.cityhall.image_url">-->\n\n                        <!--<img class="user-img" src="{{currentUser.cityhall.image_url}}" *ngIf="currentUser.cityhall.image_url"></div>-->\n\n                    <!--<div class="block-name">Menus des cantines</div>-->\n\n                    <!--<div class="block-icon">-->\n\n                        <!--<ion-icon name="ios-arrow-forward"></ion-icon>-->\n\n                    <!--</div>-->\n\n                <!--</button>-->\n\n            <!--</ion-col>-->\n\n        </ion-row>\n\n    </ion-grid>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\choice\choice.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_globals_globals__["a" /* GlobalsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ChoicePage);
    return ChoicePage;
}());

//# sourceMappingURL=choice.js.map

/***/ })

});
//# sourceMappingURL=19.js.map