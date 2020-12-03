webpackJsonp([2],{

/***/ 1035:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SondagePageModule", function() { return SondagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sondage__ = __webpack_require__(1059);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SondagePageModule = /** @class */ (function () {
    function SondagePageModule() {
    }
    SondagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__sondage__["a" /* SondagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__sondage__["a" /* SondagePage */]),
            ],
        })
    ], SondagePageModule);
    return SondagePageModule;
}());

//# sourceMappingURL=sondage.module.js.map

/***/ }),

/***/ 1059:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SondagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_camera__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_article_article__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_globals_globals__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_eventsrest_eventsrest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_association_association__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_merchant_merchant__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_survey_survey__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_forms__ = __webpack_require__(21);
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
 * Generated class for the PublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SondagePage = /** @class */ (function () {
    function SondagePage(event, formBuilder, globals, view, actionSheetCtrl, userService, camera, navCtrl, navParams, articleService, loadingCtrl, alertCtrl, platform, serviceEvent, associationService, merchantService, surveyService) {
        this.event = event;
        this.formBuilder = formBuilder;
        this.globals = globals;
        this.view = view;
        this.actionSheetCtrl = actionSheetCtrl;
        this.userService = userService;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.articleService = articleService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.serviceEvent = serviceEvent;
        this.associationService = associationService;
        this.merchantService = merchantService;
        this.surveyService = surveyService;
        this.items = [];
        this.listPhotos = [];
        this.filter = {
            city: 'all',
            category: 0
        };
        this.article = {
            title: null,
            photo: null,
            photos: null,
            secondPhoto: '',
            thirdPhoto: '',
            sondage: null,
        };
        this.questionArray = [];
        this.isSubmitEnabled = true;
        this.submited = false;
        this.dateEndError = false;
        this.showEvent = false;
        this.invalidTitre = false;
        this.invalidDesc = false;
        this.invalidQuestion = [];
        this.data = false;
        var loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.communityId = navParams.get('community');
        this.userImg = localStorage.getItem("user_image");
        this.userId = localStorage.getItem("user_id");
        this.userFullName = localStorage.getItem("user_firstname") + " " + localStorage.getItem("user_lastname");
        this.event.publish('user:current');
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.questionArray.push({ 'value': '' });
        this.questionArray.push({ 'value': '' });
        loadingPopup.dismiss();
    }
    SondagePage.prototype.getQuestionArrayData = function () {
        this.data = true;
    };
    SondagePage.prototype.Add = function () {
        this.questionArray.push({ 'value': '', 'error': false });
    };
    SondagePage.prototype.remove = function (value) {
        var index = value - 1;
        this.questionArray.splice(index, 1);
    };
    SondagePage.prototype.ionViewWillLeave = function () {
        this.globals.showHeader = true;
    };
    SondagePage.prototype.goToSlide = function (nbreSlide) {
        this.slides.slideTo(500, nbreSlide);
    };
    SondagePage.prototype.takePicture = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            targetWidth: 600,
            targetHeight: 600,
            allowEdit: true,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG
        }).then(function (imageData) {
            if (!_this.article.photo) {
                _this.article.photo = "data:image/jpeg;base64," + imageData;
            }
            else if (_this.listPhotos.length <= 8) {
                _this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            _this.article.photos = _this.listPhotos;
            _this.slides.slideNext(500);
        });
    };
    SondagePage.prototype.loadImageFromLibrary = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            targetWidth: 600,
            targetHeight: 600,
            allowEdit: true,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG
        }).then(function (imageData) {
            if (!_this.article.photo) {
                _this.article.photo = "data:image/jpeg;base64," + imageData;
            }
            else if (_this.listPhotos.length <= 8) {
                _this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            _this.article.photos = _this.listPhotos;
            _this.slides.slideNext(500);
        });
    };
    SondagePage.prototype.deletePhotos = function (index) {
        this.article.photos.splice(index, 1);
    };
    SondagePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Sélectionner la source d image',
            buttons: [
                {
                    text: 'Choisir une photo de la bibliothèque',
                    handler: function () {
                        _this.loadImageFromLibrary();
                    }
                },
                {
                    text: 'Prendre une photo',
                    handler: function () {
                        _this.takePicture();
                    }
                },
                {
                    text: 'Annuler',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    SondagePage.prototype.deletePhoto = function (index) {
        if (index == 1) {
            this.article.photo = null;
        }
        else if (index == 2) {
            this.article.secondPhoto = null;
        }
        else if (index == 3) {
            this.article.thirdPhoto = null;
        }
    };
    SondagePage.prototype.Close = function () {
        this.view.dismiss('close');
    };
    SondagePage.prototype.capitalize = function (event, type) {
        if (event) {
            if (type == 'title') {
                this.article.title = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'sondage') {
                this.article.sondage = event.charAt(0).toUpperCase() + event.slice(1);
            }
        }
    };
    SondagePage.prototype.openEvent = function (e) {
        this.showEvent = e._value;
    };
    SondagePage.prototype.goBack = function () {
        this.view.dismiss();
    };
    SondagePage.prototype.checkFocus = function (element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;
            var test = yOffset - 40;
            this.content.scrollTo(0, test, 2000);
        }
    };
    SondagePage.prototype.checkChangeArray = function (element) {
        this.questionArray[element]['error'] = !(this.questionArray[element]['value'] && this.questionArray[element]['value'] != "");
    };
    SondagePage.prototype.saveSurvey = function (errorValidation, title, description) {
        var _this = this;
        this.submited = true;
        for (var _i = 0, _a = this.questionArray; _i < _a.length; _i++) {
            var question = _a[_i];
            question['error'] = !(question['value'] && question['value'] != "");
        }
        if (!errorValidation) {
            this.isSubmitEnabled = false;
            var loadingPopup_1 = this.loadingCtrl.create({});
            loadingPopup_1.present();
            this.surveyService.postSurvey(this.currentUser.id, this.article, this.questionArray, this.communityId).then(function (data) {
                loadingPopup_1.dismiss();
                _this.items.splice(0, 0, data);
                var successAlert = _this.alertCtrl.create({
                    title: 'Succès',
                    subTitle: 'Votre sondage a été ajouté avec succès.',
                    buttons: [
                        {
                            text: 'OK',
                            handler: function (data) {
                                _this.Close();
                            }
                        }
                    ]
                });
                successAlert.present();
            }, function (err) {
                console.log(err);
                _this.isSubmitEnabled = true;
                loadingPopup_1.dismiss();
                _this.event.publish('http:errors', err);
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_10__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["y" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["y" /* Slides */])
    ], SondagePage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_10__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["f" /* Content */])
    ], SondagePage.prototype, "content", void 0);
    SondagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_10__angular_core__["Component"])({
            selector: 'page-sondage',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\sondage\sondage.html"*/'<!--\n\n  Generated template for the SondagePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-row class="header-popin" no-padding>\n\n    <ion-col class="no-padding " text-left>\n\n      <button ion-button clear small type="button" color="primary" no-margin no-padding>\n\n        <ion-icon name="ios-create-outline"></ion-icon>\n\n\n\n      </button>\n\n    </ion-col>\n\n    <ion-col class="no-padding " text-center>\n\n      <h5 class="primary-color title-popin" no-margin>Créer un Sondage</h5>\n\n    </ion-col>\n\n    <ion-col class="no-padding " text-right>\n\n      <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="goBack()">\n\n        <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n      </button>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-col col-12 text-centre class="padding-top">\n\n    <form (ngSubmit)="saveSurvey(publishForm.invalid, titre, description)" #publishForm="ngForm">\n\n      <ion-grid class="margin-top-grid">\n\n        <ion-row text-center>\n\n          <ion-col col-12 text-center no-padding class="margin-top">\n\n\n\n            <div>\n\n              <ion-slides class="image home-card-slides" pager>\n\n                <ion-slide *ngIf="article.photo">\n\n                  <img src="{{article.photo}}" *ngIf="article.photo">\n\n\n\n                  <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(1);" *ngIf="article.photo"></ion-icon>\n\n\n\n                </ion-slide>\n\n                <div *ngFor="let item of article.photos; let i = index">\n\n                  <ion-slide *ngIf="item">\n\n\n\n                    <img src="{{item}}" *ngIf="item">\n\n                    <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhotos(i);" *ngIf="item"></ion-icon>\n\n                  </ion-slide>\n\n                </div>\n\n\n\n              </ion-slides>\n\n            </div>\n\n\n\n            <div *ngIf="article.photos && article.photos.length <= 8;">\n\n              <img class="button-img" src="assets/imgs/icons/button.png" (click)="presentActionSheet()">\n\n            </div>\n\n            <div *ngIf="!article.photos">\n\n              <img class="button-img" src="assets/imgs/icons/button.png" (click)="presentActionSheet()">\n\n            </div>\n\n            <!-- <p class="indication" *ngIf="accountType == \'association\' || this.accountType == \'merchant\'">(Jusqu\'à 3 photos)</p> -->\n\n          </ion-col>\n\n\n\n          <ion-col col-12 text-center class="margin-top select-not-ie">\n\n            <ion-item [class.formError]="titre.invalid && (titre.dirty || submited || titre.touched)">\n\n              <ion-input name="titre" type="text" id="titre" placeholder="Intitulé de la question" [(ngModel)]="article.title"\n\n                         #titre="ngModel" (change)="capitalize($event.target.value, \'title\')" (focus)="checkFocus($event)"\n\n                         required></ion-input>\n\n            </ion-item>\n\n            <div class="error-msg" *ngIf="titre.invalid && (titre.dirty || submited || titre.touched)">\n\n              <span class="error">Champs intitulé de la question obligatoire</span>\n\n            </div>\n\n          </ion-col>\n\n\n\n          <ion-col col-12 text-center class="margin-top select-ie">\n\n            <ion-item>\n\n              <ion-input name="titre" type="text" id="titre" placeholder="Intitulé de la question" [(ngModel)]="article.title"\n\n                         #titre="ngModel" (change)="capitalize($event.target.value, \'title\')" (focus)="checkFocus($event)"\n\n                         required></ion-input>\n\n            </ion-item>\n\n            <div class="error-msg" *ngIf="titre.invalid && (titre.dirty || submited || titre.touched)">\n\n              <span class="error">Champs intitulé de la question obligatoire</span>\n\n            </div>\n\n          </ion-col>\n\n\n\n          <ion-col col-12 text-center class="select-not-ie">\n\n            <ion-item [class.formError]="sondage.invalid && (sondage.dirty || submited || sondage.touched)">\n\n              <ion-textarea name="sondage" placeholder="Contexte du sondage" [(ngModel)]="article.sondage"\n\n                #sondage="ngModel" (change)="capitalize($event.target.value, \'sondage\')" (focus)="checkFocus($event)"\n\n                required></ion-textarea>\n\n            </ion-item>\n\n            <div class="error-msg" *ngIf="sondage.invalid && (sondage.dirty || submited || sondage.touched)">\n\n              <span class="error">Champs contexte du sondage obligatoire</span>\n\n            </div>\n\n          </ion-col>\n\n\n\n          <ion-col col-12 text-center class="select-ie">\n\n            <ion-item>\n\n              <ion-textarea name="sondage" placeholder="Contexte du sondage" [(ngModel)]="article.sondage"\n\n                #sondage="ngModel" (change)="capitalize($event.target.value, \'sondage\')" required></ion-textarea>\n\n            </ion-item>\n\n            <div class="error-msg"  *ngIf="sondage.invalid && (sondage.dirty || submited || sondage.touched)">\n\n              <span class="error">Champs contexte du sondage obligatoire</span>\n\n            </div>\n\n          </ion-col>\n\n\n\n          <ion-col col-12 text-center class="margin-top select-not-ie" *ngFor="let att of questionArray; let idx = index">\n\n            <ion-item [class.formError]="questionArray[idx][\'error\']">\n\n              <ion-input name="questionArray[{{idx}}]" type="text" id="questionArray[{{idx}}]" placeholder=\'Intitulé du choix {{idx +1}}\'\n\n                [(ngModel)]="questionArray[idx].value" (change)="checkChangeArray(idx)" required></ion-input>\n\n            </ion-item>\n\n            <img *ngIf="idx>1" (click)="remove(idx)" class="margin-t-10 icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n            <div class="error-msg" *ngIf="questionArray[idx][\'error\']">\n\n              <span class="error">Champs Intitulé du choix {{idx +1}} obligatoire</span>\n\n            </div>\n\n          </ion-col>\n\n\n\n          <ion-col col-12 text-center class="margin-top select-ie" *ngFor="let att of questionArray; let idx = index">\n\n            <ion-item [class.formError]="questionArray[idx][\'error\']">\n\n              <ion-input name="questionArray{{idx}}" type="text" id="questionArray[{{idx}}]" placeholder="Intitulé du choix {{idx +1}}"\n\n                [(ngModel)]="questionArray[idx].value" (change)="checkChangeArray(idx)" required></ion-input>\n\n            </ion-item>\n\n            <img *ngIf="idx>1" (click)="remove(idx)" class="margin-t-10 icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n            <div class="error-msg" *ngIf="questionArray[idx][\'error\']">\n\n              <span class="error">Champs Intitulé du choix {{idx +1}} obligatoire</span>\n\n            </div>\n\n          </ion-col>\n\n\n\n          <ion-col col-12 text-center>\n\n            <img (click)="Add()" class="img-add" src="assets/imgs/icons/add-sondage.png">\n\n          </ion-col>\n\n\n\n          <ion-col col-12 text-center>\n\n            <button ion-button color="primary" type="submit" class="button-sondage" round>Publier</button>\n\n          </ion-col>\n\n\n\n        </ion-row>\n\n      </ion-grid>\n\n    </form>\n\n  </ion-col>\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\sondage\sondage.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_7__providers_survey_survey__["a" /* SurveyProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_11__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_globals_globals__["a" /* GlobalsProvider */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_article_article__["a" /* ArticleProvider */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["x" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__providers_eventsrest_eventsrest__["a" /* EventsrestProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_association_association__["a" /* AssociationProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_merchant_merchant__["a" /* MerchantProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_survey_survey__["a" /* SurveyProvider */]])
    ], SondagePage);
    return SondagePage;
}());

//# sourceMappingURL=sondage.js.map

/***/ })

});
//# sourceMappingURL=2.js.map