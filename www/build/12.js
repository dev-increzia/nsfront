webpackJsonp([12],{

/***/ 1024:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterestDetailsPageModule", function() { return InterestDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interest_details__ = __webpack_require__(1046);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InterestDetailsPageModule = /** @class */ (function () {
    function InterestDetailsPageModule() {
    }
    InterestDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__interest_details__["a" /* InterestDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__interest_details__["a" /* InterestDetailsPage */]),
            ],
        })
    ], InterestDetailsPageModule);
    return InterestDetailsPageModule;
}());

//# sourceMappingURL=interest-details.module.js.map

/***/ }),

/***/ 1046:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InterestDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(239);
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
 * Generated class for the InterestDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InterestDetailsPage = /** @class */ (function () {
    function InterestDetailsPage(callNumber, navCtrl, navParams, view) {
        this.callNumber = callNumber;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.interest = navParams.get("interest");
    }
    InterestDetailsPage.prototype.close = function () {
        this.view.dismiss();
    };
    InterestDetailsPage.prototype.call = function (number) {
        this.callNumber.callNumber(number, true);
    };
    InterestDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-interest-details',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\interest-details\interest-details.html"*/'<!--\n\n  Generated template for the BasicPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-row class="header-popin" no-padding>\n\n        <ion-col class="no-padding " text-left>\n\n        </ion-col>\n\n        <ion-col class="no-padding " text-center>\n\n            <h5 class="primary-color title-popin" no-margin>Détail</h5>\n\n        </ion-col>\n\n        <ion-col class="no-padding " text-right>\n\n            <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="close()">\n\n                <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n            </button>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <div class="padding-top">\n\n        <ion-grid class="margin-top-grid">\n\n            <ion-row>\n\n                <ion-col col-12 text-center>\n\n                    <img src="{{interest.image_url}}" class="assoc_logo float-left">\n\n                </ion-col>\n\n                <ion-col col-12 class="float-col-8">\n\n                    <span class="assoc_title"><strong> Titre :</strong> </span> <span class="categs float-left">{{interest.title}}</span>\n\n                    <div class="clear"></div>\n\n                    <span class="assoc_title"><strong> Catégorie : </strong></span> <span class="categs float-left">{{interest.category.name}}</span>\n\n                </ion-col>\n\n\n\n\n\n            </ion-row>\n\n        </ion-grid>\n\n        <hr>\n\n        <ion-col col-12>\n\n            <div class="clear"></div>\n\n            <span class="champs horaires" *ngIf="interest.openFrom"><strong>Horaires :</strong></span> <span class="g_details"\n\n                *ngIf="interest.openFrom">De &nbsp;{{interest.openFrom}} &nbsp;À &nbsp; {{interest.openTo}}</span>\n\n            <div class="clear"></div>\n\n            <span class="champs horaires" *ngIf="interest.address"><strong>Adresse :</strong></span> <span class="g_details">{{interest.address}}</span>\n\n            <div class="clear"></div>\n\n            <span class="champs horaires" *ngIf="interest.email"><strong>Email :</strong></span> <span class="g_details">{{interest.email}}</span>\n\n            <div class="clear"></div>\n\n            <span class="champs horaires" *ngIf="interest.phone"><strong>Télephone :</strong></span> <span class="g_details"\n\n                (click)="call(interest.phone)"><span class="phone">{{interest.phone}}</span></span>\n\n            <div class="clear"></div>\n\n            <span class="champs horaires" *ngIf="interest.description"><strong>Description : </strong></span> <span\n\n                class="g_details">{{interest.description}}</span>\n\n            <div class="clear"></div>\n\n        </ion-col>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\interest-details\interest-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */]])
    ], InterestDetailsPage);
    return InterestDetailsPage;
}());

//# sourceMappingURL=interest-details.js.map

/***/ })

});
//# sourceMappingURL=12.js.map