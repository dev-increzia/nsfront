webpackJsonp([1],{

/***/ 1036:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VolunteersMailPageModule", function() { return VolunteersMailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__volunteers_mail__ = __webpack_require__(1060);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VolunteersMailPageModule = /** @class */ (function () {
    function VolunteersMailPageModule() {
    }
    VolunteersMailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__volunteers_mail__["a" /* VolunteersMailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__volunteers_mail__["a" /* VolunteersMailPage */]),
            ],
        })
    ], VolunteersMailPageModule);
    return VolunteersMailPageModule;
}());

//# sourceMappingURL=volunteers-mail.module.js.map

/***/ }),

/***/ 1060:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VolunteersMailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_volunteers_volunteers__ = __webpack_require__(238);
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
 * Generated class for the VolunteersMailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VolunteersMailPage = /** @class */ (function () {
    function VolunteersMailPage(navCtrl, navParams, view, loader, appEvents, volunteersService, myAlert) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.loader = loader;
        this.appEvents = appEvents;
        this.volunteersService = volunteersService;
        this.myAlert = myAlert;
        this.submited = false;
        this.mailing = {
            objet: '',
            email: ''
        };
        this.selectedVolunteers = this.navParams.get('selectedVolunteers');
        this.account = this.navParams.get('account');
    }
    VolunteersMailPage.prototype.sendVolunteersMail = function (errorValidation) {
        var _this = this;
        this.submited = true;
        if (!errorValidation) {
            var loadingPopup_1 = this.loader.create({});
            // Show the popup
            loadingPopup_1.present();
            this.volunteersService.postAllMails(this.mailing, this.selectedVolunteers, this.account).then(function () {
                loadingPopup_1.dismiss();
                var successAlert = _this.myAlert.create({
                    subTitle: "L'email a été envoyé aux bénévoles.",
                    buttons: [
                        {
                            text: 'Fermer',
                            role: 'cancel',
                            handler: function () {
                                _this.view.dismiss();
                            }
                        }
                    ]
                });
                successAlert.present();
            }, function (err) {
                loadingPopup_1.dismiss();
                _this.appEvents.publish('http:errors', err);
            });
        }
    };
    VolunteersMailPage.prototype.goBack = function () {
        this.view.dismiss();
    };
    VolunteersMailPage.prototype.capitalizeData = function (data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    };
    VolunteersMailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-volunteers-mail',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\volunteers-mail\volunteers-mail.html"*/'<!--\n\n  Generated template for the VolunteersMailPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-row class="header-popin" no-padding>\n\n        <ion-col class="no-padding " text-left>\n\n        </ion-col>\n\n        <ion-col class="no-padding " col-8 text-center>\n\n            <h5 class="primary-color title-popin" no-margin>Envoyer email</h5>\n\n        </ion-col>\n\n        <ion-col class="no-padding " text-right>\n\n            <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="goBack()">\n\n                <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n            </button>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-header>\n\n<ion-content padding>\n\n    <div class="padding-top">\n\n\n\n        <form class="form-send-volunteers-mail" (ngSubmit)="sendVolunteersMail(volunteersMailForm.invalid)"\n\n            #volunteersMailForm="ngForm">\n\n            <ion-grid class="padding-horizontal">\n\n                <ion-row>\n\n                    <ion-col col-12 text-center class="margin-top">\n\n                        <ion-item [class.formError]="object.invalid && (object.dirty || submited || object.touched)">\n\n                            <ion-input name="object" type="text" id="titre" placeholder="Objet du mail *" [(ngModel)]="mailing.objet"\n\n                                #object="ngModel" (change)="capitalizeData($event.target.value, \'object\')" required></ion-input>\n\n                        </ion-item>\n\n                        <div class="error-msg" *ngIf="object.invalid && (object.dirty || submited || object.touched)">\n\n                            <span class="error">Champs objet du mail obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center>\n\n\n\n                        <ion-item [class.formError]="content.invalid && (content.dirty || submited || content.touched)">\n\n                            <ion-textarea name="content" placeholder="Corp du mail *" [(ngModel)]="mailing.email"\n\n                                #content="ngModel" (change)="capitalizeData($event.target.value, \'content\')" required></ion-textarea>\n\n                        </ion-item>\n\n                        <div class="error-msg" *ngIf="content.invalid && (content.dirty || submited || content.touched)">\n\n                            <span class="error">Champs corp du mail obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center>\n\n                        <button ion-button color="primary" type="submit" class="button-publish" round>Envoyer</button>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n        </form>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\volunteers-mail\volunteers-mail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__providers_volunteers_volunteers__["a" /* VolunteersProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], VolunteersMailPage);
    return VolunteersMailPage;
}());

//# sourceMappingURL=volunteers-mail.js.map

/***/ })

});
//# sourceMappingURL=1.js.map