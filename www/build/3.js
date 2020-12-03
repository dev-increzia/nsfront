webpackJsonp([3],{

/***/ 1034:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectCityPageModule", function() { return SelectCityPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_city__ = __webpack_require__(1058);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SelectCityPageModule = /** @class */ (function () {
    function SelectCityPageModule() {
    }
    SelectCityPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__select_city__["a" /* SelectCityPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__select_city__["a" /* SelectCityPage */]),
            ],
        })
    ], SelectCityPageModule);
    return SelectCityPageModule;
}());

//# sourceMappingURL=select-city.module.js.map

/***/ }),

/***/ 1058:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectCityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_globals_globals__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
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
 * Generated class for the PopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SelectCityPage = /** @class */ (function () {
    function SelectCityPage(navCtrl, navParams, view, appGlobals, alertCtrl, userService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.appGlobals = appGlobals;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.allCities = this.appGlobals.allCities;
        this.allCitiesFilter = this.appGlobals.allCities;
    }
    SelectCityPage.prototype.filterVilles = function (event) {
        var _this = this;
        var key = event.target.value;
        this.userService.searchCities(key).then(function (data) {
            _this.allCitiesFilter = data;
        });
    };
    SelectCityPage.prototype.Close = function () {
        this.view.dismiss();
    };
    SelectCityPage.prototype.selectCity = function (city) {
        this.selectedCity = city;
    };
    SelectCityPage.prototype.validate = function () {
        this.view.dismiss(this.selectedCity);
    };
    SelectCityPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-select-city',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\select-city\select-city.html"*/'<!--\n\n  Generated template for the PopupPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n\n\n<ion-content>\n\n    <ion-col col-12 text-centre class="padding-top">\n\n\n\n        <ion-grid class="margin-top-grid padding-horizontal"> \n\n            <ion-row>\n\n                <ion-col col-12 no-padding>\n\n                    <div class="close-btn" (click)="Close()" float-end>\n\n                        <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-12 text-left>\n\n                    <ion-grid>\n\n                        <ion-row>\n\n                            <ion-col col-1 text-center>\n\n                                <ion-icon class="search-search search-icon" name="md-search"></ion-icon>\n\n                            </ion-col>\n\n                            <ion-col col-8>\n\n                                <ion-item text-center class="search-input">\n\n                                    <ion-input  text-capitalize type="text" id="key" name="key" placeholder="Rechercher" (input)="filterVilles($event)" ></ion-input>\n\n                                </ion-item>\n\n                            </ion-col>\n\n                        </ion-row>\n\n                        <ion-row> \n\n                            <ion-col col-12>\n\n                                <ion-list radio-group class="listScrolled">\n\n                                    <ion-item *ngFor="let city of allCitiesFilter">\n\n                                        <ion-label>{{city.name}} ({{city.code}})</ion-label>\n\n                                        <ion-radio name="cityRadio" (click)="selectCity(city)"></ion-radio>\n\n                                    </ion-item>\n\n                                </ion-list>\n\n                            </ion-col>\n\n                            <ion-col col-12 text-center>\n\n                                <button  ion-button color="primary" type="button" (click)=validate() class="button-publish" round>Valider</button>\n\n                            </ion-col>\n\n                        </ion-row>\n\n                    </ion-grid>\n\n                </ion-col>\n\n            </ion-row>\n\n\n\n        </ion-grid>\n\n    </ion-col>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\select-city\select-city.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_globals_globals__["a" /* GlobalsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */]])
    ], SelectCityPage);
    return SelectCityPage;
}());

//# sourceMappingURL=select-city.js.map

/***/ })

});
//# sourceMappingURL=3.js.map