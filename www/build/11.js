webpackJsonp([11],{

/***/ 1025:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordCommunityPageModule", function() { return PasswordCommunityPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__password_community__ = __webpack_require__(1047);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PasswordCommunityPageModule = /** @class */ (function () {
    function PasswordCommunityPageModule() {
    }
    PasswordCommunityPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__password_community__["a" /* PasswordCommunityPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__password_community__["a" /* PasswordCommunityPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__password_community__["a" /* PasswordCommunityPage */]
            ]
        })
    ], PasswordCommunityPageModule);
    return PasswordCommunityPageModule;
}());

//# sourceMappingURL=password-community.module.js.map

/***/ }),

/***/ 1047:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordCommunityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_community_community__ = __webpack_require__(40);
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
 * Generated class for the PasswordCommunityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PasswordCommunityPage = /** @class */ (function () {
    function PasswordCommunityPage(navCtrl, navParams, view, serviceCommunity, modal, loadingCtrl, appEvent, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.serviceCommunity = serviceCommunity;
        this.modal = modal;
        this.loadingCtrl = loadingCtrl;
        this.appEvent = appEvent;
        this.alertCtrl = alertCtrl;
        this.password = "";
        this.falsePassword = false;
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.isDisabled = true;
        this.badPhone = false;
        this.phoneNumber = this.currentUser.phone;
        if (!this.phoneNumber) {
            this.isDisabled = false;
        }
        this.communityId = navParams.get('id');
        this.communityName = navParams.get('name');
    }
    PasswordCommunityPage.prototype.Close = function () {
        this.view.dismiss();
    };
    PasswordCommunityPage.prototype.checkPassword = function () {
        var _this = this;
        this.falsePassword = false;
        if (this.password != '') {
            var loadingPopup_1 = this.loadingCtrl.create({});
            this.serviceCommunity.postUserPrivateCommunities(this.communityId, this.password).then(function (data) {
                loadingPopup_1.dismiss();
                if (data.success) {
                    Promise.all([_this.serviceCommunity.getAllPrivateCommunities(), _this.serviceCommunity.findCurrentUserCommunities()]).then(function (user) {
                        localStorage.setItem("privateCommunities", JSON.stringify(user[0]));
                        _this.appEvent.publish('refreshCommunities');
                        localStorage.setItem("hasApprovedCommunities", "true");
                        localStorage.setItem("allCommunities", JSON.stringify(user[1]));
                        _this.appEvent.publish('refreshApprovedCommunities');
                        _this.appEvent.publish('refreshCommunities');
                    });
                    _this.view.dismiss();
                    var myModal2 = _this.modal.create('PopupPage', { "message": "<p>C'est parfait. Bienvenue dans cette communauté ! </p>" }, { cssClass: 'message-modal' });
                    myModal2.onDidDismiss(function () {
                    });
                    myModal2.present();
                }
                else {
                    _this.falsePassword = true;
                }
            }, function (err) {
                _this.appEvent.publish('http:errors', err);
                loadingPopup_1.dismiss();
            });
        }
    };
    PasswordCommunityPage.prototype.sendRequest = function () {
        var _this = this;
        var phoneRegexp = /^(33|0)\d{9}$/;
        if (this.password == '') {
            this.falsePassword = true;
        }
        else if (this.phoneNumber != '') {
            if (phoneRegexp.test(this.phoneNumber)) {
                this.view.dismiss();
                this.badPhone = false;
                var loadingPopup_2 = this.loadingCtrl.create({});
                this.serviceCommunity.postPasswordRequest(this.communityId, this.phoneNumber).then(function (data) {
                    loadingPopup_2.dismiss();
                    var myModal2 = _this.modal.create('PopupPage', { "message": "<p>C'est parfait. Votre demande d’accès a été envoyée à l’administrateur de la communauté. </p>" }, { cssClass: 'message-modal' });
                    myModal2.onDidDismiss(function () {
                    });
                    myModal2.present();
                }, function (err) {
                    _this.appEvent.publish('http:errors', err);
                    loadingPopup_2.dismiss();
                });
            }
            else {
                this.badPhone = true;
            }
        }
        else {
            this.badPhone = true;
        }
    };
    PasswordCommunityPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-password-community',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\password-community\password-community.html"*/'<!--\n\n  Generated template for the PasswordCommunityPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-row class="header-popin" no-padding text-center>\n\n    <ion-col class="no-padding " text-center>\n\n      <h5 class="title-popin" no-margin>{{communityName}}</h5>\n\n    </ion-col>\n\n      <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="Close()">\n\n        <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n      </button>\n\n  </ion-row>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-col col-12 text-centre class="padding-top">\n\n    <ion-grid class="margin-top-grid">\n\n      <ion-row text-center>\n\n        <ion-col col-12 text-left no-padding>\n\n          <p>Afin d\'accèder à la communauté saisissez le mot de passe qui vous a été envoyé par email</p>\n\n\n\n        </ion-col>\n\n\n\n      </ion-row>\n\n\n\n    </ion-grid>\n\n\n\n    <ion-grid class="padding-horizontal">\n\n\n\n      <ion-row>\n\n\n\n        <ion-col col-10 text-center>\n\n\n\n          <ion-item>\n\n            <ion-input name="titre" type="password" id="password" [(ngModel)]="password" placeholder="Mot de passe*"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-2 text-center>\n\n          <ion-fab>\n\n            <button ion-fab mini (click)="checkPassword()">OK</button>\n\n          </ion-fab>\n\n\n\n        </ion-col>\n\n\n\n      </ion-row>\n\n\n\n    </ion-grid>\n\n    <ion-grid>\n\n      <p class="error" *ngIf="falsePassword">Votre mot de passe est erroné. <br> Remplissez le formulaire ci-dessous. </p>\n\n\n\n      <ion-row text-center>\n\n        <ion-col col-12 text-left no-padding>\n\n\n\n          <p >Vous n\'avez pas de mot de passe? <br> Faites une demande d\'accès pour recevoir un mot de passe ! </p>\n\n\n\n        </ion-col>\n\n\n\n      </ion-row>\n\n\n\n    </ion-grid>\n\n    <ion-grid class="padding-horizontal">\n\n\n\n      <ion-row>\n\n\n\n        <ion-col col-10 text-center>\n\n\n\n          <ion-item>\n\n            <ion-input name="titre" type="tel" id="phoneNumber"  disabled="{{isDisabled}}" [(ngModel)]="phoneNumber" placeholder="Numéro de téléphone*"></ion-input>\n\n          </ion-item>\n\n          <p *ngIf="badPhone" class="badPhone">Le numéro n\'est pas valide. Exemple : 0999999999 ou 33999999999</p>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n    <ion-grid class="padding-horizontal">\n\n\n\n      <ion-row>\n\n\n\n        <ion-col col-12 text-center>\n\n          <button ion-button color="primary" type="submit" class="" (click)="sendRequest()" round>Envoyer la demande</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n\n\n  </ion-col>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\password-community\password-community.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_community_community__["a" /* CommunityProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], PasswordCommunityPage);
    return PasswordCommunityPage;
}());

//# sourceMappingURL=password-community.js.map

/***/ })

});
//# sourceMappingURL=11.js.map