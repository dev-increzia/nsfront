webpackJsonp([10],{

/***/ 1026:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopEditEventPageModule", function() { return PopEditEventPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pop_edit_event__ = __webpack_require__(1048);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopEditEventPageModule = /** @class */ (function () {
    function PopEditEventPageModule() {
    }
    PopEditEventPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__pop_edit_event__["a" /* PopEditEventPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__pop_edit_event__["a" /* PopEditEventPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__pop_edit_event__["a" /* PopEditEventPage */]
            ]
        })
    ], PopEditEventPageModule);
    return PopEditEventPageModule;
}());

//# sourceMappingURL=pop-edit-event.module.js.map

/***/ }),

/***/ 1048:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopEditEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
 * Generated class for the PopEditEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PopEditEventPage = /** @class */ (function () {
    function PopEditEventPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PopEditEventPage.prototype.ionViewDidLoad = function () {
    };
    PopEditEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pop-edit-event',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\pop-edit-event\pop-edit-event.html"*/'<!--\n\n  Generated template for the PopEditEventPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-row class="header-popin" no-padding>\n\n      <ion-col class="no-padding " text-left>\n\n          <button ion-button clear small type="button" color="primary" no-margin no-padding>\n\n              <ion-icon name="ios-create-outline"></ion-icon>\n\n\n\n          </button>\n\n      </ion-col>\n\n      <ion-col class="no-padding " text-center>\n\n          <h5 class="primary-color title-popin" no-margin>Publier</h5>\n\n      </ion-col>\n\n      <ion-col class="no-padding " text-right>\n\n          <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="goBack()">\n\n              <img class="icon-heart" src="assets/imgs/icons/image3.png">\n\n\n\n          </button>\n\n      </ion-col>\n\n  </ion-row>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\pop-edit-event\pop-edit-event.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */]])
    ], PopEditEventPage);
    return PopEditEventPage;
}());

//# sourceMappingURL=pop-edit-event.js.map

/***/ })

});
//# sourceMappingURL=10.js.map