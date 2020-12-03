webpackJsonp([6],{

/***/ 1031:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupEvenDuplicateDetailPageModule", function() { return PopupEvenDuplicateDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popup_even_duplicate_detail__ = __webpack_require__(1055);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_tools_emoji_picker__ = __webpack_require__(565);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PopupEvenDuplicateDetailPageModule = /** @class */ (function () {
    function PopupEvenDuplicateDetailPageModule() {
    }
    PopupEvenDuplicateDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__popup_even_duplicate_detail__["a" /* PopupEvenDuplicateDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__popup_even_duplicate_detail__["a" /* PopupEvenDuplicateDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ionic_tools_emoji_picker__["a" /* EmojiPickerModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__popup_even_duplicate_detail__["a" /* PopupEvenDuplicateDetailPage */]
            ]
        })
    ], PopupEvenDuplicateDetailPageModule);
    return PopupEvenDuplicateDetailPageModule;
}());

//# sourceMappingURL=popup-even-duplicate-detail.module.js.map

/***/ }),

/***/ 1055:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupEvenDuplicateDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_article_article__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_media_capture__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_eventsrest_eventsrest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(71);
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
 * Generated class for the PopupEvenDuplicateDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PopupEvenDuplicateDetailPage = /** @class */ (function () {
    function PopupEvenDuplicateDetailPage(navCtrl, navParams, view, platform, actionSheetCtrl, camera, modal, serviceArticle, alertCtrl, loadingCtrl, file, service, mediaCapture, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.platform = platform;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.modal = modal;
        this.serviceArticle = serviceArticle;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.file = file;
        this.service = service;
        this.mediaCapture = mediaCapture;
        this.formBuilder = formBuilder;
        this.titre = null;
        this.description = null;
        this.photoEvnt = null;
        this.validMonthly = false;
        this.validWeekly = false;
        this.validRecurrence = false;
        this.toggled = false;
        this.toggledDes = false;
        this.listPhotos = [];
        this.invalidTitre = false;
        this.invalidDesc = false;
        this.invalidCity = false;
        this.city = null;
        this.deleteAll = true;
        this.eventImgs = {
            countPhotos: 0,
            eventPhoto: null,
            toDelete: false,
            eventSecondPhoto: null,
            toDeleteSecond: false,
            secondId: null,
            eventThirdPhoto: null,
            toDeleteThird: false,
            thirdId: null,
            photos: null
        };
        this.event = {
            title: null,
            city: null,
            description: null,
            photo: null,
            price: "Gratuit",
            videoFile: null,
            secondPhoto: null,
            thirdPhoto: null,
            newPhoto: null,
            deletePhoto: false,
            mode: null
        };
        this.originEvent = this.navParams.get('event');
        this.mode = this.navParams.get('mode');
        this.event = Object.assign({}, this.originEvent);
        this.fromGroup = this.formBuilder.group({
            titre: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
            description: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
            city: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
        });
        if (this.event.images) {
            this.eventImgs.countPhotos += this.event.images.length;
        }
    }
    PopupEvenDuplicateDetailPage.prototype.ionViewDidLoad = function () {
    };
    PopupEvenDuplicateDetailPage.prototype.handleSelection = function (event) {
        this.event.title = this.event.title + " " + event.char;
    };
    PopupEvenDuplicateDetailPage.prototype.handleDescription = function (event) {
        this.event.description = this.event.description + " " + event.char;
    };
    PopupEvenDuplicateDetailPage.prototype.deleteEditedPhoto = function (index) {
        if (index == 2) {
            this.eventImgs.eventSecondPhoto = null;
            this.eventImgs.countPhotos--;
        }
        if (index == 3) {
            this.eventImgs.eventThirdPhoto = null;
            this.eventImgs.countPhotos--;
        }
    };
    PopupEvenDuplicateDetailPage.prototype.deletePhoto = function (i, id) {
        console.log("DELETE " + i + " / ID : " + id);
        if (i == -1) {
            this.event.imageURL = null;
            this.eventImgs.eventPhoto = null;
            this.eventImgs.toDelete = true;
            this.eventImgs.countPhotos--;
        }
        else if (id) {
            this.event.images[i].url = null;
        }
        else {
            this.eventImgs.photos.splice(i, 1);
        }
        if (this.event.imageURL == null) {
            console.log("pass");
            console.log(JSON.stringify(this.event));
            console.log(JSON.stringify(this.eventImgs));
            if (this.event.images) {
                var num = this.event.images.length - 1;
                while (num >= 0 && this.event.images[num].url == null) {
                    this.deleteAll = false;
                    num--;
                }
            }
            else {
                this.deleteAll = false;
            }
        }
    };
    PopupEvenDuplicateDetailPage.prototype.goBack = function () {
        this.view.dismiss();
    };
    PopupEvenDuplicateDetailPage.prototype.slideChanged = function () {
        this.nbreSlide = this.slides.length();
        this.nbreSlide = this.nbreSlide - 1;
    };
    PopupEvenDuplicateDetailPage.prototype.presentActionSheet = function () {
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
                    text: 'Choisir une vidéo de la bibliothèque',
                    handler: function () {
                        _this.loadVideoFromLibrary();
                    }
                },
                {
                    text: 'Prendre une vidéo',
                    handler: function () {
                        _this.captureVideo();
                    }
                },
                {
                    text: 'Annuler',
                    role: 'cancel'
                }
            ]
        });
        this.deleteAll = true;
        actionSheet.present();
    };
    PopupEvenDuplicateDetailPage.prototype.deleteVideo = function () {
        this.event.videoFile = null;
    };
    PopupEvenDuplicateDetailPage.prototype.captureVideo = function () {
        var _this = this;
        var options = { duration: 45 };
        this.mediaCapture.captureVideo(options)
            .then(function (res) {
            var video = res[0];
            var fileName = video.name;
            var fullPath = video['localURL'];
            var directory = fullPath.substring(0, fullPath.lastIndexOf("/") + 1);
            _this.file.readAsDataURL(directory, fileName).then(function (file64) {
                _this.event.videoFile = file64;
            }).catch(function (err) {
                console.log("ERR : " + err);
            });
        }, function (err) {
            console.log("ERROR");
        });
    };
    PopupEvenDuplicateDetailPage.prototype.loadVideoFromLibrary = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            mediaType: this.camera.MediaType.VIDEO
        }).then(function (videoName) {
            if (_this.platform.is('android')) {
                videoName = "file://" + videoName;
                var directory = videoName.substring(0, videoName.lastIndexOf("/") + 1);
                var fileName = videoName.substring(videoName.lastIndexOf("/") + 1);
                _this.file.readAsDataURL(directory, fileName).then(function (file64) {
                    _this.event.videoFile = file64;
                }).catch(function (error) { console.log("Error : " + error.message); });
            }
            else {
                var directory = videoName.substring(0, videoName.lastIndexOf("/") + 1);
                var fileName = videoName.substring(videoName.lastIndexOf("/") + 1);
                _this.file.readAsDataURL(directory, fileName).then(function (file64) {
                    _this.event.videoFile = file64;
                });
            }
        });
    };
    PopupEvenDuplicateDetailPage.prototype.loadImageFromLibrary = function () {
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
            if (!_this.eventImgs.eventPhoto && !_this.event.imageURL) {
                _this.eventImgs.eventPhoto = "data:image/jpeg;base64," + imageData;
                _this.eventImgs.toDelete = false;
                _this.eventImgs.countPhotos++;
            }
            else {
                _this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            _this.eventImgs.photos = _this.listPhotos;
            _this.goToSlide();
        });
    };
    PopupEvenDuplicateDetailPage.prototype.goToSlide = function () {
        this.slides.slideTo(this.nbreSlide, 500);
    };
    PopupEvenDuplicateDetailPage.prototype.takePicture = function () {
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
            if (!_this.eventImgs.eventPhoto && !_this.event.imageURL) {
                _this.eventImgs.eventPhoto = "data:image/jpeg;base64," + imageData;
                _this.eventImgs.toDelete = false;
                _this.eventImgs.countPhotos++;
            }
            else {
                _this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            _this.eventImgs.photos = _this.listPhotos;
            _this.goToSlide();
        });
    };
    PopupEvenDuplicateDetailPage.prototype.deletePhotos = function () {
        this.photoEvnt = null;
    };
    PopupEvenDuplicateDetailPage.prototype.saveEvent = function (errorValidation) {
        var _this = this;
        if (!errorValidation) {
            this.event.mode = this.mode;
            var loadingPopup_1 = this.loadingCtrl.create({});
            loadingPopup_1.present();
            this.service.putEvent(this.event.id, this.event, false, "association", this.eventImgs).then(function (data) {
                loadingPopup_1.dismiss();
                if (data.success) {
                    var successAlert = _this.alertCtrl.create({
                        title: 'Succès',
                        subTitle: 'Votre événement a été mis à jour avec succès.',
                        buttons: [
                            {
                                text: 'OK',
                                handler: function (data) {
                                    _this.goBack();
                                }
                            }
                        ]
                    });
                    successAlert.present();
                }
            }, function (err) {
                loadingPopup_1.dismiss();
                if (err.status == 0) {
                    var errorAlert = _this.alertCtrl.create({
                        title: "Erreur",
                        subTitle: "Veuillez vérifier votre connexion.",
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
                else if (err.status == 401) {
                    var errorAlert = _this.alertCtrl.create({
                        title: "Erreur",
                        subTitle: "Session expirée",
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
                else if (err.status == 403) {
                    var errorAlert = _this.alertCtrl.create({
                        title: "Erreur",
                        subTitle: "Accès interdit",
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
                else {
                    var errorAlert = _this.alertCtrl.create({
                        title: "Erreur",
                        subTitle: "Une erreur est survenue, veuillez ré-essayer plus tard.",
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
            });
        }
        else {
            if (this.titre == null) {
                this.invalidTitre = true;
            }
            if (this.description == null) {
                this.invalidDesc = true;
            }
            if (this.city == null) {
                this.invalidCity = true;
            }
        }
    };
    PopupEvenDuplicateDetailPage.prototype.capitalize = function (event, type) {
        if (event) {
            if (type == 'title') {
                this.invalidTitre = false;
            }
            if (type == 'description') {
                this.invalidDesc = false;
            }
        }
    };
    PopupEvenDuplicateDetailPage.prototype.SelectCity = function () {
        var _this = this;
        var myModal2 = this.modal.create('SelectCityPage', {}, { cssClass: 'cities-modal' });
        myModal2.onDidDismiss(function (data) {
            if (data) {
                _this.event.cityName = data.name;
                _this.invalidCity = false;
            }
        });
        myModal2.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* Slides */])
    ], PopupEvenDuplicateDetailPage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], PopupEvenDuplicateDetailPage.prototype, "content", void 0);
    PopupEvenDuplicateDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-popup-even-duplicate-detail',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\popup-even-duplicate-detail\popup-even-duplicate-detail.html"*/'<!--\n\n  Generated template for the PublishPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n--> \n\n<ion-header> \n\n  <ion-row class="header-popin" no-padding>\n\n      <ion-col class="no-padding " text-left>\n\n          <button ion-button clear small type="button" color="primary" no-margin no-padding>\n\n              <ion-icon name="ios-create-outline"></ion-icon>\n\n          </button> \n\n      </ion-col>\n\n      <ion-col class="no-padding " text-center>\n\n          <h5 class="primary-color title-popin" no-margin>Modifier</h5>\n\n      </ion-col>\n\n      <ion-col class="no-padding " text-right>\n\n          <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="goBack()">\n\n              <img class="icon-heart" src="assets/imgs/icons/image3.png">\n\n          </button>\n\n      </ion-col>\n\n  </ion-row>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n      <ion-col col-12 text-centre class="padding-top">\n\n      <form [formGroup]="fromGroup">\n\n        <ion-grid margin-top>\n\n          <ion-row text-center>\n\n              <ion-col col-12 text-center no-padding>\n\n                  <div>\n\n                      <ion-slides (ionSlideDidChange)="slideChanged()" *ngIf="deleteAll" class="image home-card-slides"\n\n                          loop="true" pager>\n\n                          <ion-slide *ngIf="event.imageURL">\n\n                              <img data-src="{{event.imageURL}}">\n\n                              <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(-1, 0);"\n\n                                  *ngIf="event.imageURL || eventImgs.eventPhoto"></ion-icon> \n\n                          </ion-slide>\n\n                          <div *ngFor="let img of event.images; let i = index">\n\n                              <ion-slide *ngIf="img.url">\n\n                                  <img src="{{img.url}}" *ngIf="img.url">\n\n                                  <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(i, img.id);"\n\n                                      *ngIf="img.url"></ion-icon>\n\n\n\n                              </ion-slide>\n\n                          </div>\n\n                          <div *ngFor="let item of eventImgs.photos let i = index">\n\n                              <ion-slide *ngIf="item">\n\n\n\n                                  <img src="{{item}}" *ngIf="item">\n\n                                  <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(i, \'\');"\n\n                                      *ngIf="item"></ion-icon>\n\n\n\n                              </ion-slide>\n\n                          </div>\n\n                      </ion-slides>\n\n                  </div>\n\n                  <div *ngIf="event.thirdPhoto;">\n\n                      <div>\n\n                          <img src="{{event.thirdPhoto}}" *ngIf="event.thirdPhoto">\n\n                          <ion-icon name="trash" class="icon-delete" (click)="deletePhoto(3);" *ngIf="event.thirdPhoto"></ion-icon>\n\n                      </div>\n\n\n\n                  </div>\n\n                  <div>\n\n                      <div class="center" *ngIf="eventImgs.eventSecondPhoto">\n\n                          <img src="{{eventImgs.eventSecondPhoto}}" class="width-100" *ngIf="eventImgs.eventSecondPhoto">\n\n                          <ion-icon name="trash" class="icon-delete" (click)="deleteEditedPhoto(2);"></ion-icon>\n\n                      </div>\n\n                      <div class="center" *ngIf="eventImgs.eventThirdPhoto">\n\n                          <img src="{{eventImgs.eventThirdPhoto}}" class="width-100" *ngIf="eventImgs.eventThirdPhoto">\n\n                          <ion-icon name="trash" class="icon-delete" (click)="deleteEditedPhoto(3);"></ion-icon>\n\n                      </div>\n\n\n\n                  </div>\n\n                  <ion-col col-12 text-center>\n\n                      <img class="button-img" src="assets/imgs/icons/button.png" (click)="presentActionSheet()">\n\n                  </ion-col>\n\n                  <div *ngIf="event.videoFile" style="position: relative;">\n\n                            <img class="button-img" src="assets/imgs/icons/video.png">\n\n                              <ion-icon name="trash" \n\n                                class="icon-delete delete-icon" \n\n                                (click)="deleteVideo();"\n\n                                  *ngIf="event.videoFile">\n\n                              </ion-icon>\n\n                  </div>\n\n              </ion-col>\n\n          </ion-row>\n\n\n\n      </ion-grid>\n\n      <ion-grid class="margin-top-grid padding-horizontal">\n\n        <ion-list>\n\n\n\n          <ion-col col-12 text-center class="margin-top select-not-ie">\n\n          <ion-item [class.formError]="(fromGroup.controls[\'titre\'].errors?.required && fromGroup.controls[\'titre\'].touched) || invalidTitre ">\n\n            <ion-input type="text" formControlName="titre" placeholder="Titre" [(ngModel)]="event.title" required (change)="capitalize($event.target.value, \'title\')"></ion-input>\n\n          </ion-item>\n\n\n\n          <div style="width: 90%;\n\n          text-align: right;">\n\n              <button style="position: absolute;\n\n              top: 65%;\n\n              left: 1%;" ion-button clear icon-only (click)="toggled = !toggled"\n\n              [(emojiPickerIf)]="toggled" [emojiPickerDirection]="\'top\'"\n\n              (emojiPickerSelect)="handleSelection($event)">\n\n              😃\n\n              </button>\n\n          </div>\n\n\n\n          <div *ngIf="(fromGroup.controls[\'titre\'].errors?.required && fromGroup.controls[\'titre\'].touched) || invalidTitre">\n\n                  <span class="error">Champs titre obligatoire</span>\n\n          </div>\n\n          </ion-col>\n\n          <div style="width: 100%; height: 5px;"></div>\n\n\n\n          <ion-col col-12 text-center class="margin-top select-not-ie">\n\n          <ion-item style="padding-top: 15px;" [class.formError]="(fromGroup.controls[\'description\'].errors?.required && fromGroup.controls[\'description\'].touched) || invalidDesc ">\n\n              <ion-textarea  formControlName="description"  placeholder="Description" [(ngModel)]="event.description" required (change)="capitalize($event.target.value, \'description\')"></ion-textarea>\n\n          </ion-item >\n\n\n\n          <div style="width: 90%;\n\n          text-align: right;">\n\n              <button style="position: absolute;\n\n              top: 75%;\n\n              left: 1%;" ion-button clear icon-only (click)="toggledDes= !toggledDes"\n\n              [(emojiPickerIf)]="toggledDes" [emojiPickerDirection]="\'top\'"\n\n              (emojiPickerSelect)="handleDescription($event)">\n\n              😃\n\n              </button>\n\n          </div>\n\n          <div *ngIf="(fromGroup.controls[\'description\'].errors?.required && fromGroup.controls[\'description\'].touched) || invalidDesc ">\n\n                  <span class="error">Champs description obligatoire</span>\n\n          </div>\n\n          </ion-col>\n\n          <div style="width: 100%; height: 5px;"></div>\n\n\n\n          <ion-col col-12 text-center class="margin-top select-not-ie">\n\n              <ion-item class="item-grey no-padding-left" [class.formError]="(fromGroup.controls[\'city\'].errors?.required && fromGroup.controls[\'city\'].touched) || invalidCity ">\n\n                  <ion-input  (click)="SelectCity()" formControlName="city"  readonly autocomplete="off" autocorrect="on"  type="text"  placeholder="Ville" [(ngModel)]="event.cityName"></ion-input>\n\n              </ion-item>\n\n              <div *ngIf="(fromGroup.controls[\'city\'].errors?.required && fromGroup.controls[\'city\'].touched) || invalidCity ">\n\n                  <span class="error">Champs ville obligatoire</span>\n\n              </div>\n\n              </ion-col>\n\n               \n\n        </ion-list>\n\n        <ion-col col-12 text-center>\n\n        <button ion-button color="primary" type="submit" (click)="saveEvent(fromGroup.invalid, titre, description)" class="button-publish" round>Publier</button>\n\n        </ion-col>\n\n\n\n        </ion-grid>\n\n      </form>\n\n      \n\n      \n\n  </ion-col>\n\n        \n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\popup-even-duplicate-detail\popup-even-duplicate-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_article_article__["a" /* ArticleProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_6__providers_eventsrest_eventsrest__["a" /* EventsrestProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], PopupEvenDuplicateDetailPage);
    return PopupEvenDuplicateDetailPage;
}());

//# sourceMappingURL=popup-even-duplicate-detail.js.map

/***/ })

});
//# sourceMappingURL=6.js.map