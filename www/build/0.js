webpackJsonp([0],{

/***/ 1028:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopinMembershipAssociationPageModule", function() { return PopinMembershipAssociationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popin_membership_association__ = __webpack_require__(1050);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopinMembershipAssociationPageModule = /** @class */ (function () {
    function PopinMembershipAssociationPageModule() {
    }
    PopinMembershipAssociationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__popin_membership_association__["a" /* PopinMembershipAssociationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__popin_membership_association__["a" /* PopinMembershipAssociationPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__popin_membership_association__["a" /* PopinMembershipAssociationPage */]
            ]
        })
    ], PopinMembershipAssociationPageModule);
    return PopinMembershipAssociationPageModule;
}());

//# sourceMappingURL=popin-membership-association.module.js.map

/***/ }),

/***/ 1050:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopinMembershipAssociationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_association_association__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_util_isNumeric__ = __webpack_require__(1051);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_util_isNumeric___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_util_isNumeric__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_globals_globals__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_merchant_merchant__ = __webpack_require__(39);
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
 * Generated class for the PopinMembershipAssociationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PopinMembershipAssociationPage = /** @class */ (function () {
    function PopinMembershipAssociationPage(navCtrl, navParams, view, loadingCtrl, serviceAssociation, modal, merchantService, appEvent, appGloabs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.loadingCtrl = loadingCtrl;
        this.serviceAssociation = serviceAssociation;
        this.modal = modal;
        this.merchantService = merchantService;
        this.appEvent = appEvent;
        this.appGloabs = appGloabs;
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.invalidPhoneNumber = false;
        this.id = navParams.get('id');
        this.phoneNumber = this.currentUser.phone;
    }
    PopinMembershipAssociationPage.prototype.ionViewDidLoad = function () {
    };
    PopinMembershipAssociationPage.prototype.Close = function () {
        this.view.dismiss();
    };
    PopinMembershipAssociationPage.prototype.sendRequest = function () {
        var _this = this;
        var phoneRegexp = /^(33|0)\d{9}$/;
        if (this.phoneNumber == '' || Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_util_isNumeric__["isNumeric"])(this.phoneNumber)) {
            if (phoneRegexp.test(this.phoneNumber)) {
                this.invalidPhoneNumber = false;
                this.view.dismiss();
                var loadingPopup_1 = this.loadingCtrl.create({});
                if (this.appGloabs.isFromMerchant) {
                    this.merchantService.postDemandRequest(this.id, this.phoneNumber).then(function (data) {
                        loadingPopup_1.dismiss();
                        var myModal2 = _this.modal.create('PopupPage', { "message": "<p>C'est parfait. <br> Votre demande d’accès a été envoyée à l’administrateur du commerce / partenaire. </p>" }, { cssClass: 'message-modal' });
                        myModal2.onDidDismiss(function () {
                        });
                        myModal2.present();
                        _this.appGloabs.isFromMerchant = false;
                    }, function (err) {
                        _this.appEvent.publish('http:errors', err);
                        loadingPopup_1.dismiss();
                        _this.appGloabs.isFromMerchant = false;
                    });
                }
                else {
                    this.serviceAssociation.postDemandRequest(this.id, this.phoneNumber).then(function (data) {
                        loadingPopup_1.dismiss();
                        var myModal2 = _this.modal.create('PopupPage', { "message": "<p>C'est parfait. <br> Votre demande d’accès a été envoyée à l’administrateur du Groupe / Association. </p>" }, { cssClass: 'message-modal' });
                        myModal2.onDidDismiss(function () {
                        });
                        myModal2.present();
                    }, function (err) {
                        _this.appEvent.publish('http:errors', err);
                        loadingPopup_1.dismiss();
                    });
                }
            }
            else {
                this.invalidPhoneNumber = true;
            }
        }
        else {
            this.invalidPhoneNumber = true;
        }
    };
    PopinMembershipAssociationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-popin-membership-association',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\popin-membership-association\popin-membership-association.html"*/'<!--\n\n  Generated template for the PasswordCommunityPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-row class="header-popin" no-padding text-center>\n\n    <ion-col class="no-padding " text-center>\n\n      <h5 class="title-popin" no-margin>Demande d\'adhésion</h5>\n\n    </ion-col>\n\n    <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="Close()">\n\n      <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n    </button>\n\n  </ion-row>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-col col-12 text-centre class="padding-top">\n\n    <ion-grid class="margin-top-grid">\n\n      <ion-row text-center>\n\n        <ion-col col-12 text-left text-center="">\n\n\n\n\n\n        </ion-col>\n\n\n\n      </ion-row>\n\n      <ion-row text-center>\n\n        <ion-col col-12 text-left no-padding>\n\n          <p>Un email (avec vos coordonnées) va automatiquement être envoyé à l\'administrateur du groupe/établissement auquel vous demandez à adhérer.</p>\n\n          <p>Vous recevrez une notification lorsqu\'il aura validé votre adhésion.</p>\n\n          <p>Si vous souhaitez qu\'il vous contacte par téléphone, inscrivez le.</p>\n\n\n\n        </ion-col>\n\n\n\n      </ion-row>\n\n\n\n    </ion-grid>\n\n\n\n\n\n    <ion-grid class="padding-horizontal">\n\n\n\n      <ion-row>\n\n\n\n        <ion-col col-12 text-center>\n\n\n\n          <ion-item>\n\n            <ion-input name="titre" type="tel" id="phoneNumber" [(ngModel)]="phoneNumber" placeholder="Numéro de téléphone*"></ion-input>\n\n\n\n          </ion-item>\n\n          <p *ngIf="invalidPhoneNumber"><small style="color: red">Numéro de téléphone invalide. Exemple : 0999999999 ou 33999999999</small></p>\n\n        </ion-col>\n\n\n\n      </ion-row>\n\n    </ion-grid>\n\n    <ion-grid class="padding-horizontal">\n\n\n\n      <ion-row>\n\n\n\n        <ion-col col-12 text-center>\n\n          <button ion-button color="primary" type="submit" class="" (click)="sendRequest()" round>Envoyer la demande</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n\n\n  </ion-col>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\popin-membership-association\popin-membership-association.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_association_association__["a" /* AssociationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_merchant_merchant__["a" /* MerchantProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__providers_globals_globals__["a" /* GlobalsProvider */]])
    ], PopinMembershipAssociationPage);
    return PopinMembershipAssociationPage;
}());

//# sourceMappingURL=popin-membership-association.js.map

/***/ }),

/***/ 1051:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1052));
//# sourceMappingURL=isNumeric.js.map

/***/ }),

/***/ 1052:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var internal_compatibility_1 = __webpack_require__(57);
exports.isNumeric = internal_compatibility_1.isNumeric;
//# sourceMappingURL=isNumeric.js.map

/***/ })

});
//# sourceMappingURL=0.js.map