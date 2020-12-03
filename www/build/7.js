webpackJsonp([7],{

/***/ 1029:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupAskRoomPageModule", function() { return PopupAskRoomPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popup_ask_room__ = __webpack_require__(1053);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopupAskRoomPageModule = /** @class */ (function () {
    function PopupAskRoomPageModule() {
    }
    PopupAskRoomPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__popup_ask_room__["a" /* PopupAskRoomPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__popup_ask_room__["a" /* PopupAskRoomPage */]),
            ]
        })
    ], PopupAskRoomPageModule);
    return PopupAskRoomPageModule;
}());

//# sourceMappingURL=popup-ask-room.module.js.map

/***/ }),

/***/ 1053:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupAskRoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
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
 * Generated class for the PopupAskRoomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PopupAskRoomPage = /** @class */ (function () {
    function PopupAskRoomPage(navParams, view, alertCtrl, formBuilder) {
        this.navParams = navParams;
        this.view = view;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.mail = {
            description: null,
        };
        this.invalidDesc = false;
        this.submited = false;
    }
    PopupAskRoomPage.prototype.ionViewDidLoad = function () {
        document.getElementsByClassName('publish-modal')[0].setAttribute('style', "visibility : hidden");
        document.getElementsByClassName('choice-modal')[0].setAttribute('style', "visibility : hidden");
    };
    PopupAskRoomPage.prototype.ionViewWillLeave = function () {
        document.getElementsByClassName('publish-modal')[0].setAttribute('style', "visibility : visible");
        document.getElementsByClassName('choice-modal')[0].setAttribute('style', "visibility : visible");
    };
    PopupAskRoomPage.prototype.validate = function () {
        this.view.dismiss(this.mail.description);
    };
    PopupAskRoomPage.prototype.saveRoomEmail = function (errorValidation, description) {
        this.submited = true;
        if (!errorValidation) {
            this.view.dismiss(this.mail.description);
        }
        else {
            if (description.invalid || description.value == null || description.value == '') {
                this.invalidDesc = true;
            }
        }
    };
    PopupAskRoomPage.prototype.Close = function () {
        this.view.dismiss();
    };
    PopupAskRoomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-popup-ask-room',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\popup-ask-room\popup-ask-room.html"*/'<!--\n\n  Generated template for the PopupAskRoomPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-row class="header-popin" no-padding>\n\n        <ion-col class="no-padding " text-right>\n\n            <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="Close()">\n\n                <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n            </button>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-header>\n\n<ion-content>\n\n    <ion-grid class="messagePopup">\n\n        <ion-row class="padding-horizontal">\n\n            <ion-col col-12 text-center>\n\n                <p class="greenText">Souhaitez vous demander à reserver une salle ou un terrain mis à disposition par la\n\n                    communauté ?</p>\n\n                <p class="littleText">Rédigez votre message ci-dessous, il sera envoyé à l\'administrateur de la\n\n                    communauté qui vous contactera.</p>\n\n            </ion-col>\n\n            <form (ngSubmit)="saveRoomEmail(publishForm.invalid,description)" #publishForm="ngForm">\n\n                <ion-col col-12 text-center class="select-not-ie">\n\n                    <ion-item class="no-padding-left"\n\n                              [class.formError]="description.invalid && (description.dirty || submited || description.touched)">\n\n                        <ion-textarea [(ngModel)]="mail.description" name="description" placeholder="Ma demande*"\n\n                                      #description="ngModel" required></ion-textarea>\n\n                    </ion-item>\n\n                    <div class="error-msg"\n\n                         *ngIf="description.invalid && (description.dirty || submited || description.touched)">\n\n                        <span class="error">Champs de demande obligatoire</span>\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-12 text-center class="select-ie">\n\n\n\n                    <ion-item class="no-padding-left">\n\n                        <ion-textarea name="description" [(ngModel)]="mail.description" placeholder="Ma demande*"\n\n                                      #description="ngModel"\n\n                                      required></ion-textarea>\n\n                    </ion-item>\n\n                    <div class="error-msg" *ngIf="invalidDesc">\n\n                        <span class="error">Champs de demande obligatoire</span>\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-12 text-center>\n\n                    <button ion-button color="primary" type="submit" class="button-publish" round>\n\n                        Valider\n\n                    </button>\n\n                </ion-col>\n\n            </form>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\popup-ask-room\popup-ask-room.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], PopupAskRoomPage);
    return PopupAskRoomPage;
}());

//# sourceMappingURL=popup-ask-room.js.map

/***/ })

});
//# sourceMappingURL=7.js.map