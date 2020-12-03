webpackJsonp([17],{

/***/ 1019:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DupliquerPageModule", function() { return DupliquerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dupliquer__ = __webpack_require__(1041);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_tools_emoji_picker__ = __webpack_require__(565);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DupliquerPageModule = /** @class */ (function () {
    function DupliquerPageModule() {
    }
    DupliquerPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__dupliquer__["a" /* DupliquerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__dupliquer__["a" /* DupliquerPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ionic_tools_emoji_picker__["a" /* EmojiPickerModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__dupliquer__["a" /* DupliquerPage */]
            ]
        })
    ], DupliquerPageModule);
    return DupliquerPageModule;
}());

//# sourceMappingURL=dupliquer.module.js.map

/***/ }),

/***/ 1041:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DupliquerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_article_article__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_media_capture__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_eventsrest_eventsrest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(71);
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
 * Generated class for the DupliquerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DupliquerPage = /** @class */ (function () {
    function DupliquerPage(navCtrl, navParams, view, platform, actionSheetCtrl, camera, modal, serviceArticle, alertCtrl, loadingCtrl, file, service, ref, mediaCapture, formBuilder) {
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
        this.ref = ref;
        this.mediaCapture = mediaCapture;
        this.formBuilder = formBuilder;
        this.titre = null;
        this.description = null;
        this.recurrence = null;
        this.nowDate = new Date().toISOString();
        this.monthly = null;
        this.weekly = null;
        this.recursivity_end = new Date().toISOString();
        this.heur = new Date().toISOString();
        this.push_content = null;
        this.photoEvnt = null;
        this.validMonthly = false;
        this.toggled = false;
        this.toggledDes = false;
        this.validWeekly = false;
        this.validRecurrence = false;
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
            categories: null,
            description: null,
            photo: null,
            price: "Gratuit",
            videoFile: null,
            secondPhoto: null,
            thirdPhoto: null,
            newPhoto: null,
            deletePhoto: false,
            recursivity_end: null,
            heur: null,
            recurivity_period: null,
            recursivity_day: null,
            recursivity_hour: null
        };
        this.originEvent = this.navParams.get('event');
        this.event = Object.assign({}, this.originEvent);
        this.fromGroup = this.formBuilder.group({
            titre: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
            description: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
            city: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
            recurrence: [''],
            monthly: [''],
            weekly: [''],
            recursivity_end: [''],
            heur: [''],
        });
        if (this.event.images) {
            this.eventImgs.countPhotos += this.event.images.length;
        }
    }
    DupliquerPage.prototype.ionViewDidLoad = function () {
    };
    DupliquerPage.prototype.handleSelection = function (event) {
        this.event.title = this.event.title + " " + event.char;
    };
    DupliquerPage.prototype.handleDescription = function (event) {
        this.event.description = this.event.description + " " + event.char;
    };
    DupliquerPage.prototype.deleteEditedPhoto = function (index) {
        if (index == 2) {
            this.eventImgs.eventSecondPhoto = null;
            this.eventImgs.countPhotos--;
        }
        if (index == 3) {
            this.eventImgs.eventThirdPhoto = null;
            this.eventImgs.countPhotos--;
        }
    };
    DupliquerPage.prototype.deletePhoto = function (i, id) {
        if (i == -1) {
            this.event.imageURL = null;
            this.eventImgs.eventPhoto = null;
            this.eventImgs.toDelete = true;
            this.eventImgs.countPhotos--;
        }
        else if (id) {
            this.event.images[i].url = null;
            this.event.images[i].id = null;
        }
        else {
            this.eventImgs.photos.splice(i, 1);
        }
        if (this.event.imageURL == null) {
            if (this.event.images) {
                var num = this.event.images.length - 1;
                while (num >= 0 && this.event.images[num].url == null) {
                    this.deleteAll = false;
                    num--;
                }
            }
        }
    };
    DupliquerPage.prototype.goBack = function () {
        this.view.dismiss();
    };
    DupliquerPage.prototype.slideChanged = function () {
        this.nbreSlide = this.slides.length();
        this.nbreSlide = this.nbreSlide - 1;
    };
    DupliquerPage.prototype.presentActionSheet = function () {
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
    DupliquerPage.prototype.deleteVideo = function () {
        this.event.videoFile = null;
    };
    DupliquerPage.prototype.captureVideo = function () {
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
    DupliquerPage.prototype.loadVideoFromLibrary = function () {
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
    DupliquerPage.prototype.loadImageFromLibrary = function () {
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
    DupliquerPage.prototype.goToSlide = function () {
        this.slides.slideTo(this.nbreSlide, 500);
    };
    DupliquerPage.prototype.takePicture = function () {
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
    DupliquerPage.prototype.deletePhotos = function () {
        this.photoEvnt = null;
    };
    DupliquerPage.prototype.onChange = function (event, type) {
        if (event) {
            if (type == 'recurrence') {
                this.validRecurrence = false;
            }
            if (type == 'weekly') {
                this.validWeekly = false;
            }
            if (type == 'monthly') {
                this.validMonthly = false;
            }
        }
    };
    DupliquerPage.prototype.saveEvent = function (errorValidation) {
        var _this = this;
        if (!errorValidation) {
            if (this.recurrence == null) {
                this.validRecurrence = true;
            }
            else {
                if (this.recurrence == "monthly") {
                    if (this.monthly == null) {
                        this.validMonthly = true;
                    }
                }
                if (this.recurrence == "weekly") {
                    if (this.weekly == null) {
                        this.validWeekly = true;
                    }
                }
                if (!this.validRecurrence
                    && !this.validWeekly
                    && !this.validMonthly) {
                    this.event.recurivity_period = this.recurrence;
                    this.event.recursivity_end = this.recursivity_end;
                    var hourInput = __WEBPACK_IMPORTED_MODULE_4_moment__(this.heur).subtract(1, 'hours').format("HH:mm");
                    this.event.recursivity_hour = hourInput.toString();
                    if (this.recurrence == "daily") {
                        this.event.recursivity_day = null;
                    }
                    else if (this.recurrence == "weekly") {
                        this.event.recursivity_day = this.weekly;
                    }
                    else if (this.recurrence == "monthly") {
                        this.event.recursivity_day = this.monthly;
                    }
                    else {
                        this.event.recursivity_day = null;
                    }
                    var arr = [];
                    var obj = {};
                    for (var key in this.event.images) {
                        if (this.event.images[key].id) {
                            obj = {
                                id: this.event.images[key].id,
                                url: this.event.images[key].url
                            };
                            arr.push(obj);
                        }
                    }
                    this.event.images = arr;
                    var loadingPopup_1 = this.loadingCtrl.create({});
                    loadingPopup_1.present();
                    this.service.eventDuplicateNew(this.event, this.event.id, this.eventImgs).then(function (data) {
                        loadingPopup_1.dismiss();
                        var successAlert = _this.alertCtrl.create({
                            title: 'Succès',
                            subTitle: 'Votre article a été dupliqué avec succès.',
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: function () {
                                        _this.view.dismiss();
                                        _this.ref.publish('agenda:refresh');
                                    }
                                }
                            ]
                        });
                        successAlert.present();
                    }, function (err) {
                        loadingPopup_1.dismiss();
                    });
                }
            }
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
    DupliquerPage.prototype.capitalize = function (event, type) {
        if (event) {
            if (type == 'title') {
                this.invalidTitre = false;
            }
            if (type == 'description') {
                this.invalidDesc = false;
            }
        }
    };
    DupliquerPage.prototype.SelectCity = function () {
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
    ], DupliquerPage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], DupliquerPage.prototype, "content", void 0);
    DupliquerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-dupliquer',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\dupliquer\dupliquer.html"*/'<!--\n\n  Generated template for the PublishPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header> \n\n        <ion-row class="header-popin" no-padding>\n\n            <ion-col class="no-padding " text-left>\n\n                <button ion-button clear small type="button" color="primary" no-margin no-padding>\n\n                    <ion-icon name="ios-create-outline"></ion-icon>\n\n                </button> \n\n            </ion-col>\n\n            <ion-col class="no-padding " text-center>\n\n                <h5 class="primary-color title-popin" no-margin>Dupliquer</h5>\n\n            </ion-col>\n\n            <ion-col class="no-padding " text-right>\n\n                <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="goBack()">\n\n                    <img class="icon-heart" src="assets/imgs/icons/image3.png">\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-header>\n\n\n\n    <ion-content padding>\n\n            <ion-col col-12 text-centre class="padding-top">\n\n            <form [formGroup]="fromGroup" >\n\n              <ion-grid margin-top>\n\n                <ion-row text-center>\n\n                    <ion-col col-12 text-center no-padding>\n\n                        <div>\n\n                            <ion-slides (ionSlideDidChange)="slideChanged()" *ngIf="deleteAll" class="image home-card-slides"\n\n                                loop="true" pager>\n\n                                <ion-slide *ngIf="event.imageURL">\n\n                                    <img data-src="{{event.imageURL}}">\n\n                                    <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(-1, 0);"\n\n                                        *ngIf="event.imageURL || eventImgs.eventPhoto"></ion-icon> \n\n                                </ion-slide>\n\n                                <div *ngFor="let img of event.images; let i = index">\n\n                                    <ion-slide *ngIf="img.url">\n\n\n\n                                        <img src="{{img.url}}" *ngIf="img.url">\n\n                                        <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(i, img.id);"\n\n                                            *ngIf="img.url"></ion-icon>\n\n\n\n                                    </ion-slide>\n\n                                </div>\n\n                                <div *ngFor="let item of eventImgs.photos let i = index">\n\n                                    <ion-slide *ngIf="item">\n\n\n\n                                        <img src="{{item}}" *ngIf="item">\n\n                                        <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(i, \'\');"\n\n                                            *ngIf="item"></ion-icon>\n\n\n\n                                    </ion-slide>\n\n                                </div>\n\n                            </ion-slides>\n\n                        </div>\n\n                        <div *ngIf="event.thirdPhoto;">\n\n                            <div>\n\n                                <img src="{{event.thirdPhoto}}" *ngIf="event.thirdPhoto">\n\n                                <ion-icon name="trash" class="icon-delete" (click)="deletePhoto(3);" *ngIf="event.thirdPhoto"></ion-icon>\n\n                            </div>\n\n\n\n                        </div>\n\n                        <div>\n\n                            <div class="center" *ngIf="eventImgs.eventSecondPhoto">\n\n                                <img src="{{eventImgs.eventSecondPhoto}}" class="width-100" *ngIf="eventImgs.eventSecondPhoto">\n\n                                <ion-icon name="trash" class="icon-delete" (click)="deleteEditedPhoto(2);"></ion-icon>\n\n                            </div>\n\n                            <div class="center" *ngIf="eventImgs.eventThirdPhoto">\n\n                                <img src="{{eventImgs.eventThirdPhoto}}" class="width-100" *ngIf="eventImgs.eventThirdPhoto">\n\n                                <ion-icon name="trash" class="icon-delete" (click)="deleteEditedPhoto(3);"></ion-icon>\n\n                            </div>\n\n\n\n                        </div>\n\n                        <ion-col col-12 text-center>\n\n                            <img class="button-img" src="assets/imgs/icons/button.png" (click)="presentActionSheet()">\n\n                        </ion-col>\n\n                        <div *ngIf="event.videoFile" style="position: relative;">\n\n                                	<img class="button-img" src="assets/imgs/icons/video.png">\n\n                                    <ion-icon name="trash" \n\n                                    	class="icon-delete delete-icon" \n\n                                    	(click)="deleteVideo();"\n\n                                        *ngIf="event.videoFile">\n\n                                    </ion-icon>\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n            </ion-grid>\n\n\n\n            <ion-grid class="margin-top-grid padding-horizontal">\n\n              <ion-list>\n\n\n\n                <ion-col col-12 text-center class="margin-top select-not-ie">\n\n                <ion-item [class.formError]="(fromGroup.controls[\'titre\'].errors?.required && fromGroup.controls[\'titre\'].touched) || invalidTitre ">\n\n                  <ion-input type="text" formControlName="titre" placeholder="Titre" [(ngModel)]="event.title" required (change)="capitalize($event.target.value, \'title\')"></ion-input>\n\n\n\n\n\n                  \n\n\n\n\n\n                </ion-item>\n\n\n\n                <div style="width: 90%;\n\n                text-align: right;">\n\n                    <button style="position: absolute;\n\n                    top: 65%;\n\n                    left: 1%;"ion-button clear icon-only (click)="toggled = !toggled"\n\n                    [(emojiPickerIf)]="toggled" [emojiPickerDirection]="\'top\'"\n\n                    (emojiPickerSelect)="handleSelection($event)">\n\n                    😃\n\n                    </button>\n\n                </div>\n\n\n\n                <div *ngIf="(fromGroup.controls[\'titre\'].errors?.required && fromGroup.controls[\'titre\'].touched) || invalidTitre">\n\n                        <span class="error">Champs titre obligatoire</span>\n\n                </div>\n\n                </ion-col>\n\n                <div style="width: 100%; height: 5px;"></div>\n\n\n\n                <ion-col col-12 text-center class="margin-top select-not-ie">\n\n                <ion-item [class.formError]="(fromGroup.controls[\'description\'].errors?.required && fromGroup.controls[\'description\'].touched) || invalidDesc ">\n\n                    <ion-textarea style="padding-top: 15px;"  formControlName="description"  placeholder="Description" [(ngModel)]="event.description" required (change)="capitalize($event.target.value, \'description\')"></ion-textarea>\n\n                </ion-item >\n\n\n\n                <div style="width: 90%;\n\n                text-align: right;">\n\n                    <button style="position: absolute;\n\n                    top: 75%;\n\n                    left: 1%;" ion-button clear icon-only (click)="toggledDes= !toggledDes"\n\n                    [(emojiPickerIf)]="toggledDes" [emojiPickerDirection]="\'top\'"\n\n                    (emojiPickerSelect)="handleDescription($event)">\n\n                    😃\n\n                    </button>\n\n                </div>\n\n                \n\n                <div *ngIf="(fromGroup.controls[\'description\'].errors?.required && fromGroup.controls[\'description\'].touched) || invalidDesc ">\n\n                        <span class="error">Champs description obligatoire</span>\n\n                </div>\n\n                </ion-col>\n\n                <div style="width: 100%; height: 5px;"></div>\n\n\n\n                <ion-col col-12 text-center class="margin-top select-not-ie">\n\n                    <ion-item class="item-grey no-padding-left" [class.formError]="(fromGroup.controls[\'city\'].errors?.required && fromGroup.controls[\'city\'].touched) || invalidCity ">\n\n                        <ion-input  (click)="SelectCity()" formControlName="city"  readonly autocomplete="off" autocorrect="on"  type="text"  placeholder="Ville" [(ngModel)]="event.cityName"></ion-input>\n\n                    </ion-item>\n\n                    <div *ngIf="(fromGroup.controls[\'city\'].errors?.required && fromGroup.controls[\'city\'].touched) || invalidCity ">\n\n                        <span class="error">Champs ville obligatoire</span>\n\n                    </div>\n\n                    </ion-col>\n\n                     \n\n              </ion-list>\n\n\n\n            <div style ="width: 100%; height: 2px; margin-top: 15px; background-color:#c6c7c5;"></div>\n\n            <p style="color: #00a99d; text-align: center;"> Dupliquer plusieurs fois</p>\n\n          <ion-col col-12 text-center class="margin-top select-not-ie">\n\n           \n\n          <ion-item class="item-grey" [class.formError]="validRecurrence">\n\n            <ion-label text-wrap >Chaque</ion-label>\n\n            <ion-select formControlName="recurrence" [(ngModel)]="recurrence" #C (ionChange)="onChange(C.value,\'recurrence\')" text-wrap>\n\n              <ion-option value="daily">Jour</ion-option>\n\n              <ion-option value="weekly">Semaine</ion-option>\n\n              <ion-option value="monthly">Mois</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <div *ngIf="validRecurrence">\n\n            <span class="error">Champs  obligatoire</span>\n\n          </div>\n\n          </ion-col>\n\n  \n\n          <ion-col col-12 text-center class="margin-top select-not-ie" *ngIf=" recurrence == \'weekly\' ">\n\n          <ion-item  class="item-grey"  [class.formError]="validWeekly ">\n\n            <ion-label text-wrap >Jour</ion-label>\n\n            <ion-select  text-wrap formControlName="weekly" [(ngModel)]="weekly" #C (ionChange)="onChange(C.value,\'weekly\')" >\n\n              <ion-option value="Monday" >Lundi</ion-option>\n\n              <ion-option value="Tuesday">Mardi</ion-option>\n\n              <ion-option value="Wednesday">Mercredi</ion-option>\n\n              <ion-option value="Thursday">Jeudi</ion-option>\n\n              <ion-option value="Friday">Vendredi</ion-option>\n\n              <ion-option value="Saturday">Samedi</ion-option>\n\n              <ion-option value="Sunday">Dimanche</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <div *ngIf="validWeekly">\n\n            <span class="error">Champs  obligatoire</span>\n\n          </div>\n\n          </ion-col>\n\n  \n\n          <ion-col col-12 text-center class="margin-top select-not-ie"  *ngIf=" recurrence == \'monthly\' ">\n\n            <ion-item *ngIf=" recurrence == \'monthly\' "  class="item-grey" [class.formError]="validMonthly" >\n\n            <ion-label text-wrap >Jour</ion-label>\n\n            <ion-select  text-wrap formControlName="monthly" [(ngModel)]="monthly" #C (ionChange)="onChange(C.value,\'monthly\')">\n\n              <ion-option value="1">01</ion-option>\n\n              <ion-option value="2">02</ion-option>\n\n              <ion-option value="3">03</ion-option>\n\n              <ion-option value="4">04</ion-option>\n\n              <ion-option value="5">05</ion-option>\n\n              <ion-option value="6">06</ion-option>\n\n              <ion-option value="7">07</ion-option>\n\n              <ion-option value="8">08</ion-option>\n\n              <ion-option value="9">09</ion-option>\n\n              <ion-option value="10">10</ion-option>\n\n              <ion-option value="11">11</ion-option>\n\n              <ion-option value="12">12</ion-option>\n\n              <ion-option value="13">13</ion-option>\n\n              <ion-option value="14">14</ion-option>\n\n              <ion-option value="15">15</ion-option>\n\n              <ion-option value="16">16</ion-option>\n\n              <ion-option value="17">17</ion-option>\n\n              <ion-option value="18">18</ion-option>\n\n              <ion-option value="19">19</ion-option>\n\n              <ion-option value="20">20</ion-option>\n\n              <ion-option value="21">21</ion-option>\n\n              <ion-option value="22">22</ion-option>\n\n              <ion-option value="23">23</ion-option>\n\n              <ion-option value="24">24</ion-option>\n\n              <ion-option value="25">25</ion-option>\n\n              <ion-option value="26">26</ion-option>\n\n              <ion-option value="27">27</ion-option>\n\n              <ion-option value="28">28</ion-option>\n\n              <ion-option value="29">29</ion-option>\n\n              <ion-option value="30">30</ion-option>\n\n              <ion-option value="31">31</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n  \n\n          <div *ngIf=" validMonthly">\n\n            <span class="error">Champs  obligatoire</span>\n\n          </div> \n\n        </ion-col>\n\n  \n\n        <ion-col col-12 text-center class="margin-top select-not-ie" *ngIf="recurrence != null">\n\n          <ion-item class="item-grey" [class.formError]="!recursivity_end ">\n\n          <ion-label text-wrap >Jusqu\'au</ion-label>\n\n          <ion-datetime class="datetime-text" style="padding-left:15px;" formControlName="recursivity_end"    [(ngModel)]="recursivity_end" \n\n               displayFormat="DD/MM/YYYY" \n\n              min="{{nowDate}}" max="2030-12-31"  pickerFormat="DD-MMMM-YYYY" monthNames="Janvier, Février, Mars, Avril, Mai, Juin, Juillet, Août, Septembre, Octobre, Novembre, Décembre"\n\n              doneText="Ok" cancelText="Annuler">\n\n          </ion-datetime>\n\n        </ion-item>\n\n        \n\n        </ion-col>\n\n        <ion-col col-12 text-center class="margin-top select-not-ie"  *ngIf="recurrence != null">\n\n            <ion-item class="item-grey" [class.formError]="">\n\n            <ion-label text-wrap >Heure</ion-label>\n\n            <ion-datetime class="datetime-text" style="padding-left:15px;" formControlName="heur"  [(ngModel)]="heur" \n\n                 displayFormat="HH:mm" [(ngModel)]="nowDate" \n\n                  pickerFormat="HH:mm" \n\n                doneText="Ok" cancelText="Annuler">\n\n            </ion-datetime>\n\n          </ion-item>\n\n          </ion-col>\n\n              <ion-col col-12 text-center>\n\n              <button ion-button color="primary" (click)="saveEvent(fromGroup.invalid, titre, description)" type="submit" class="button-publish" round>Publier</button>\n\n              </ion-col>\n\n              </ion-grid>\n\n            </form>\n\n        </ion-col>\n\n              \n\n    </ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\dupliquer\dupliquer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_article_article__["a" /* ArticleProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_7__providers_eventsrest_eventsrest__["a" /* EventsrestProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], DupliquerPage);
    return DupliquerPage;
}());

//# sourceMappingURL=dupliquer.js.map

/***/ })

});
//# sourceMappingURL=17.js.map