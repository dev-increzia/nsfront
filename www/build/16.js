webpackJsonp([16],{

/***/ 1020:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditEventPageModule", function() { return EditEventPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_event__ = __webpack_require__(1042);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_tools_emoji_picker__ = __webpack_require__(565);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EditEventPageModule = /** @class */ (function () {
    function EditEventPageModule() {
    }
    EditEventPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__edit_event__["a" /* EditEventPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__edit_event__["a" /* EditEventPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ionic_tools_emoji_picker__["a" /* EmojiPickerModule */]
            ],
        })
    ], EditEventPageModule);
    return EditEventPageModule;
}());

//# sourceMappingURL=edit-event.module.js.map

/***/ }),

/***/ 1042:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_media_capture__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_eventsrest_eventsrest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_user__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_globals_globals__ = __webpack_require__(8);
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
 * Generated class for the EditEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditEventPage = /** @class */ (function () {
    function EditEventPage(event, globals, service, navCtrl, navParams, formBuilder, camera, view, actionSheetCtrl, toastCtrl, platform, loadingCtrl, alertCtrl, userService, mediaCapture, file, myModal) {
        var _this = this;
        this.event = event;
        this.globals = globals;
        this.service = service;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.view = view;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.mediaCapture = mediaCapture;
        this.file = file;
        this.myModal = myModal;
        this.lastImage = null;
        this.categoryNames = [];
        this.categoryIds = [];
        this.listPhotos = [];
        this.toggled = false;
        this.toggledDes = false;
        this.toggledDesPush = false;
        this.allCategories = [];
        this.dateNow = new Date().toISOString();
        this.currentEvent = {
            title: null,
            room: null,
            address: null,
            postalcode: null,
            city: null,
            categories: null,
            startDate: {
                year: __WEBPACK_IMPORTED_MODULE_9_moment__().year(),
                month: __WEBPACK_IMPORTED_MODULE_9_moment__().month() + 1,
                day: __WEBPACK_IMPORTED_MODULE_9_moment__().date(),
                hour: __WEBPACK_IMPORTED_MODULE_9_moment__().hour(),
                minute: __WEBPACK_IMPORTED_MODULE_9_moment__().minute(),
                fullDate: __WEBPACK_IMPORTED_MODULE_9_moment__().format()
            },
            endDate: {
                year: __WEBPACK_IMPORTED_MODULE_9_moment__().year(),
                month: __WEBPACK_IMPORTED_MODULE_9_moment__().month() + 1,
                day: __WEBPACK_IMPORTED_MODULE_9_moment__().date(),
                hour: __WEBPACK_IMPORTED_MODULE_9_moment__().hour(),
                minute: __WEBPACK_IMPORTED_MODULE_9_moment__().add('m', 1).minute(),
                fullDate: __WEBPACK_IMPORTED_MODULE_9_moment__().add('m', 1).format()
            },
            price: "Gratuit",
            description: null,
            reservationUrl: null,
            photo: null,
            videoFile: null,
            secondPhoto: null,
            thirdPhoto: null,
            reservation: null,
            article: null,
            push: {
                enabled: false,
                date: __WEBPACK_IMPORTED_MODULE_9_moment__().format(),
                hour: __WEBPACK_IMPORTED_MODULE_9_moment__().format(),
                content: null
            },
            volunteer: false,
            personalized: false,
            monday: null,
            tuesday: null,
            wednesday: null,
            thursday: null,
            friday: null,
            saturday: null,
            sunday: null,
            agefrom: null,
            ageto: null,
            lessthansix: null,
            betweensixtwelve: null,
            twelveeighteen: null,
            allchildrens: null,
            newPhoto: null,
            deletePhoto: false
        };
        this.eventPhoto = null;
        this.toDelete = false;
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
        this.submited = false;
        this.cities = [];
        this.deleteAll = true;
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.cities = this.globals.allCities;
        this.originEvent = this.navParams.get('event');
        this.accountType = navParams.get('accountType');
        this.currentEvent = Object.assign({}, this.originEvent);
        this.accountType = navParams.get('accountType');
        var catTmp = JSON.parse(localStorage.getItem("adminAssociations")).find(function (x) { return x.id == _this.currentEvent.creatorId; }).community.categories;
        for (var _i = 0, catTmp_1 = catTmp; _i < catTmp_1.length; _i++) {
            var cat = catTmp_1[_i];
            if (cat.type == 'Activité groupe / association') {
                this.allCategories.push(cat);
            }
        }
        if (this.currentEvent.push.enabled) {
            this.currentEvent.push.date = (this.currentEvent.push.date).split('+')[0] + 'Z';
        }
        if (this.currentEvent.images) {
            this.eventImgs.countPhotos += this.currentEvent.images.length;
        }
        if (this.currentEvent.categories) {
            for (var _a = 0, _b = this.currentEvent.categories; _a < _b.length; _a++) {
                var cat = _b[_a];
                this.categoryNames.push(cat);
                this.categoryIds.push(cat.id);
            }
            this.currentEvent.categories = this.categoryIds;
        }
    }
    EditEventPage.prototype.handleSelection = function (event) {
        this.currentEvent.title = this.currentEvent.title + " " + event.char;
    };
    EditEventPage.prototype.handleDescription = function (event) {
        this.currentEvent.description = this.currentEvent.description + " " + event.char;
    };
    EditEventPage.prototype.handleDescriptionPush = function (event) {
        this.currentEvent.push.content = this.currentEvent.push.content + " " + event.char;
    };
    EditEventPage.prototype.editEvent = function (errorValidation) {
        var _this = this;
        this.submited = true;
        if (!errorValidation) {
            var loadingPopup_1 = this.loadingCtrl.create({});
            loadingPopup_1.present();
            this.service.putEvent(this.currentEvent.id, this.currentEvent, false, "association", this.eventImgs).then(function (data) {
                loadingPopup_1.dismiss();
                if (data.success) {
                    var successAlert = _this.alertCtrl.create({
                        title: 'Succès',
                        subTitle: 'Votre événement a été mis à jour avec succès.',
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
    };
    EditEventPage.prototype.Close = function () {
        this.view.dismiss(true);
    };
    EditEventPage.prototype.goBack = function () {
        this.currentEvent = Object.assign({}, this.originEvent);
        this.view.dismiss(this.currentEvent);
    };
    EditEventPage.prototype.checkFocus = function (element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;
            this.content.scrollTo(0, yOffset, 2000);
        }
    };
    EditEventPage.prototype.onChangeCategory = function (selected) {
        this.categoryNames = [];
        var _loop_1 = function (c) {
            var index = this_1.allCategories.findIndex(function (i) { return i.id == c; });
            if (index != -1) {
                this_1.categoryNames.push(this_1.allCategories[index]);
            }
        };
        var this_1 = this;
        for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
            var c = selected_1[_i];
            _loop_1(c);
        }
    };
    EditEventPage.prototype.removeCategory = function (category) {
        category = category.toString();
        var stringCategories = [];
        for (var _i = 0, _a = this.currentEvent.categories; _i < _a.length; _i++) {
            var c = _a[_i];
            stringCategories.push(c.toString());
        }
        var foundAt = stringCategories.findIndex(function (i) { return i == category; });
        if (foundAt != -1) {
            stringCategories.splice(foundAt, 1);
            this.currentEvent.categories = stringCategories;
        }
    };
    EditEventPage.prototype.capitalize = function (event, type) {
        if (event) {
            if (type == 'title') {
                this.currentEvent.title = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'description') {
                this.currentEvent.description = event.charAt(0).toUpperCase() + event.slice(1);
            }
        }
    };
    EditEventPage.prototype.presentActionSheet = function () {
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
    EditEventPage.prototype.captureVideo = function () {
        var _this = this;
        var options = { duration: 45 };
        this.mediaCapture.captureVideo(options)
            .then(function (res) {
            var video = res[0];
            var fileName = video.name;
            var fullPath = video['localURL'];
            var directory = fullPath.substring(0, fullPath.lastIndexOf("/") + 1);
            _this.file.readAsDataURL(directory, fileName).then(function (file64) {
                _this.currentEvent.videoFile = file64;
            }).catch(function (err) {
                console.log("ERR : " + err);
            });
        }, function (err) {
            console.log("ERROR");
        });
    };
    EditEventPage.prototype.loadVideoFromLibrary = function () {
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
                    _this.currentEvent.videoFile = file64;
                }).catch(function (error) { console.log("Error : " + error.message); });
            }
            else {
                var directory = videoName.substring(0, videoName.lastIndexOf("/") + 1);
                var fileName = videoName.substring(videoName.lastIndexOf("/") + 1);
                _this.file.readAsDataURL(directory, fileName).then(function (file64) {
                    _this.currentEvent.videoFile = file64;
                });
            }
        });
    };
    EditEventPage.prototype.deleteVideo = function () {
        this.currentEvent.videoFile = null;
    };
    EditEventPage.prototype.takePicture = function () {
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
            if (!_this.eventImgs.eventPhoto && !_this.currentEvent.imageURL) {
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
    EditEventPage.prototype.loadImageFromLibrary = function () {
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
            if (!_this.eventImgs.eventPhoto && !_this.currentEvent.imageURL) {
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
    EditEventPage.prototype.deletePhoto = function (i, id) {
        if (i == -1) {
            this.currentEvent.imageURL = null;
            this.eventImgs.eventPhoto = null;
            this.eventImgs.toDelete = true;
            this.eventImgs.countPhotos--;
        }
        else if (id) {
            this.currentEvent.images[i].url = null;
        }
        else {
            this.eventImgs.photos.splice(i, 1);
        }
        if (this.currentEvent.imageURL == null) {
            var num = this.currentEvent.images.length - 1;
            while (num >= 0 && this.currentEvent.images[num].url == null) {
                this.deleteAll = false;
                num--;
            }
        }
    };
    EditEventPage.prototype.deleteEditedPhoto = function (index) {
        if (index == 2) {
            this.eventImgs.eventSecondPhoto = null;
            this.eventImgs.countPhotos--;
        }
        if (index == 3) {
            this.eventImgs.eventThirdPhoto = null;
            this.eventImgs.countPhotos--;
        }
    };
    EditEventPage.prototype.goToSlide = function () {
        this.slides.slideTo(this.nbreSlide, 500);
    };
    EditEventPage.prototype.slideChanged = function () {
        this.nbreSlide = this.slides.length();
        this.nbreSlide = this.nbreSlide - 1;
    };
    EditEventPage.prototype.SelectCity = function () {
        var _this = this;
        var myModal2 = this.myModal.create('SelectCityPage', {}, { cssClass: 'cities-modal' });
        myModal2.onDidDismiss(function (data) {
            if (data) {
                _this.currentEvent.cityName = data.name;
            }
        });
        myModal2.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* Slides */])
    ], EditEventPage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], EditEventPage.prototype, "content", void 0);
    EditEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-edit-event',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\edit-event\edit-event.html"*/'<!--\n\n  Generated template for the PublishPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-row class="header-popin" no-padding>\n\n        <ion-col class="no-padding " text-left>\n\n            <button ion-button clear small type="button" color="primary" no-margin no-padding>\n\n                <ion-icon name="ios-create-outline"></ion-icon>\n\n            </button>\n\n        </ion-col>\n\n        <ion-col class="no-padding " text-center>\n\n            <h5 class="primary-color title-popin" no-margin>Publier</h5>\n\n        </ion-col>\n\n        <ion-col class="no-padding " text-right>\n\n            <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="goBack()">\n\n                <img class="icon-heart" src="assets/imgs/icons/image3.png">\n\n\n\n            </button>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-header>\n\n<ion-content padding>\n\n    <ion-col col-12 text-centre class="padding-top">\n\n        <form  #publishArticleForm="ngForm">\n\n            <ion-grid margin-top>\n\n                <ion-row text-center>\n\n                    <ion-col col-12 text-center no-padding>\n\n                        <div>\n\n                            <ion-slides (ionSlideDidChange)="slideChanged()" *ngIf="deleteAll" class="image home-card-slides"\n\n                                loop="true" pager>\n\n                                <ion-slide *ngIf="currentEvent.imageURL">\n\n                                    <img data-src="{{currentEvent.imageURL}}">\n\n                                    <!--<img src="{{articleImgs.articlePhoto}}" *ngIf="articleImgs.articlePhoto">-->\n\n                                    <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(-1, 0);"\n\n                                        *ngIf="currentEvent.imageURL || eventImgs.eventPhoto"></ion-icon>\n\n\n\n                                </ion-slide>\n\n                                <div *ngFor="let img of currentEvent.images; let i = index">\n\n                                    <ion-slide *ngIf="img.url">\n\n\n\n                                        <img src="{{img.url}}" *ngIf="img.url">\n\n                                        <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(i, img.id);"\n\n                                            *ngIf="img.url"></ion-icon>\n\n\n\n                                    </ion-slide>\n\n                                </div>\n\n                                <div *ngFor="let item of eventImgs.photos let i = index">\n\n                                    <ion-slide *ngIf="item">\n\n\n\n                                        <img src="{{item}}" *ngIf="item">\n\n                                        <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(i, \'\');"\n\n                                            *ngIf="item"></ion-icon>\n\n\n\n                                    </ion-slide>\n\n                                </div>\n\n                            </ion-slides>\n\n                        </div>\n\n                        <div *ngIf="currentEvent.thirdPhoto;">\n\n                            <div>\n\n                                <img src="{{currentEvent.thirdPhoto}}" *ngIf="currentEvent.thirdPhoto">\n\n                                <ion-icon name="trash" class="icon-delete" (click)="deletePhoto(3);" *ngIf="currentEvent.thirdPhoto"></ion-icon>\n\n                            </div>\n\n\n\n                        </div>\n\n                        <div>\n\n                            <div class="center" *ngIf="eventImgs.eventSecondPhoto">\n\n                                <img src="{{eventImgs.eventSecondPhoto}}" class="width-100" *ngIf="eventImgs.eventSecondPhoto">\n\n                                <ion-icon name="trash" class="icon-delete" (click)="deleteEditedPhoto(2);"></ion-icon>\n\n                            </div>\n\n                            <div class="center" *ngIf="eventImgs.eventThirdPhoto">\n\n                                <img src="{{eventImgs.eventThirdPhoto}}" class="width-100" *ngIf="eventImgs.eventThirdPhoto">\n\n                                <ion-icon name="trash" class="icon-delete" (click)="deleteEditedPhoto(3);"></ion-icon>\n\n                            </div>\n\n\n\n                        </div>\n\n                        <ion-col col-12 text-center>\n\n                            <!--  <button ion-button class="button-pic" color="grey-color" type="button" round (click)="presentActionSheet()">Photo</button>-->\n\n                            <img class="button-img" src="assets/imgs/icons/button.png" (click)="presentActionSheet()">\n\n                        </ion-col>\n\n                        <div *ngIf="currentEvent.videoFile" style="position: relative;">\n\n                                	<img class="button-img" src="assets/imgs/icons/video.png">\n\n                                    <ion-icon name="trash" \n\n                                    	class="icon-delete delete-icon" \n\n                                    	(click)="deleteVideo();"\n\n                                        *ngIf="currentEvent.videoFile">\n\n                                    </ion-icon>\n\n                        </div>\n\n                    </ion-col>\n\n                    <!-- <p class="indication" *ngIf="accountType == \'association\' || this.accountType == \'merchant\'">(Jusqu\'à 3 photos)</p> -->\n\n                </ion-row>\n\n\n\n            </ion-grid>\n\n            <ion-grid class="padding-horizontal">\n\n\n\n                <ion-row>\n\n                    <ion-col col-12 text-center class="margin-top">\n\n\n\n                        <ion-item [class.formError]="titre.invalid && (titre.dirty || submited || titre.touched)">\n\n                            <ion-input name="titre" type="text" id="titre" placeholder="Titre" (focus)="checkFocus($event)"\n\n                                [(ngModel)]="currentEvent.title" #titre="ngModel" (change)="capitalize($event.target.value, \'title\')"\n\n                                required></ion-input>\n\n                        </ion-item>\n\n\n\n                        <div style="width: 90%;\n\n                        text-align: right;">\n\n                            <button style="position: absolute;\n\n                            top: 70%;\n\n                            left: 1%;" ion-button clear icon-only (click)="toggled = !toggled"\n\n                            [(emojiPickerIf)]="toggled" [emojiPickerDirection]="\'top\'"\n\n                            (emojiPickerSelect)="handleSelection($event)">\n\n                            😃\n\n                            </button>\n\n                        </div>\n\n\n\n                        <div class="error-msg" *ngIf="titre.invalid && (titre.dirty || submited || titre.touched)">\n\n                            <span class="error">Champs titre obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <div style="width: 100%; height: 30px;"></div>\n\n\n\n                    <ion-col col-12 text-center>\n\n\n\n                        <ion-item [class.formError]="description.invalid && (description.dirty || submited || description.touched)">\n\n                            <ion-textarea name="description" style="padding-top: 15px;" placeholder="Description" (focus)="checkFocus($event)"\n\n                                [(ngModel)]="currentEvent.description" #description="ngModel" (change)="capitalize($event.target.value, \'description\')"\n\n                                required></ion-textarea>\n\n                        </ion-item>\n\n\n\n                        <div style="width: 90%;\n\n                        text-align: right;">\n\n                        <button style="position: absolute;\n\n                        top: 85%;\n\n                        left: 1%;" ion-button clear icon-only (click)="toggledDes= !toggledDes"\n\n                        [(emojiPickerIf)]="toggledDes" [emojiPickerDirection]="\'top\'"\n\n                        (emojiPickerSelect)="handleDescription($event)">\n\n                        😃\n\n                        </button>\n\n                        </div>\n\n\n\n                        <div class="error-msg" *ngIf="description.invalid && (description.dirty || submited || description.touched)">\n\n                            <span class="error">Champs description obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <div style="width: 100%; height: 20px;"></div>\n\n\n\n                    <ion-col col-12 text-center>\n\n                        <ion-col col-12 class="no-pading-bottom" text-center>\n\n                            <ion-item class="item-grey select-not-ie " [class.formError]="category.invalid && (category.dirty || submited || category.touched)">\n\n                                <ion-select class="select-white" placeholder="Catégories" name="category" submitText="Ok"\n\n                                    cancelText="Annuler" multiple="true" [(ngModel)]="currentEvent.categories"\n\n                                    #category="ngModel" (ionChange)="onChangeCategory($event)" required>\n\n                                    <ion-option *ngFor="let category of allCategories" value={{category.id}}>{{category.name}}</ion-option>\n\n                                </ion-select>\n\n                            </ion-item>\n\n                            <ion-col style="padding: 0;" class="item-grey select-ie" [class.formError]="category.invalid && (category.dirty || submited || category.touched)">\n\n                                <select class="select-white input-select-ie select-multiple-ie" placeholder="Catégories"\n\n                                    name="category" multiple [(ngModel)]="currentEvent.categories" #category="ngModel"\n\n                                    required>\n\n                                    <option *ngFor="let category of allCategories" value={{category.id}} (click)="onChangeCategory($event)">{{category.name}}</option>\n\n                                </select>\n\n                            </ion-col>\n\n                            <div class="form-category">\n\n                                <div class="tags">\n\n                                    <div *ngFor="let category of categoryNames"><a>{{category.name}} <span (click)="removeCategory(category.id)">x</span></a></div>\n\n                                </div>\n\n                            </div>\n\n                            <div class="error-msg" *ngIf="category.invalid && (category.dirty || submited || category.touched)">\n\n                                <span class="error">Champs catégorie obligatoire</span>\n\n                            </div>\n\n                        </ion-col>\n\n                    </ion-col> \n\n                    <ion-col col-12 text-center>\n\n                        <ion-item class="item-grey" no-padding>\n\n                            <ion-label class="toggle-label" no-padding>\n\n                                <div class="div-event without-icon">Envoyer une notification</div>\n\n                            </ion-label>\n\n                            <ion-toggle class="no-padding" [(ngModel)]="currentEvent.push.enabled" name="event"\n\n                                        checked="false" no-padding></ion-toggle>\n\n                        </ion-item> \n\n                    </ion-col>\n\n                    <div *ngIf="currentEvent.push.enabled" col-12 text-center>\n\n\n\n                        <div class="form-item">\n\n                            <ion-item class="item-grey" [class.formError]="push_date.invalid && (push_date.dirty || submited || push_date.touched)">\n\n                                <ion-datetime #push_date="ngModel" name="push_date" placeholder="Date*" min="2017-08-31" minuteValues="0,5,10,15,20,25,30,35,40,45,50,55"\n\n                                              max="2030-12-31" displayFormat="DD/MM/YYYY HH:mm" pickerFormat="DD-MMMM-YYYY HH:mm"\n\n                                              name="push_date" [(ngModel)]="currentEvent.push.date ? currentEvent.push.date : dateNow " monthNames="Janvier, Février, Mars, Avril, Mai, Juin, Juillet, Août, Septembre, Octobre, Novembre, Décembre"\n\n                                              doneText="Ok" cancelText="Annuler" required>\n\n\n\n                                </ion-datetime>\n\n\n\n                            </ion-item>\n\n                            <div class="error-msg" *ngIf="push_date.invalid && (push_date.dirty || submited || push_date.touched)">\n\n                                <span class="error">Champs date obligatoire.</span>\n\n                            </div>\n\n                        </div>\n\n\n\n                        <div class="form-item">\n\n                            <ion-col col-12 text-center>\n\n                                <ion-item class="textAreaInput" style="padding-top: 15px;" [class.formError]="push_content.invalid && (push_content.dirty || submited || push_content.touched)">\n\n                                    <ion-textarea (change)="capitalize($event.target.value)" #push_content="ngModel"\n\n                                                  [(ngModel)]="currentEvent.push.content" class="form-input-text" name="push_content"\n\n                                                  maxlength="140" type="text" id="title"  placeholder="Description*..."\n\n                                                  required></ion-textarea>\n\n                                </ion-item>\n\n\n\n                                <div style="width: 100%;\n\n                                text-align: left;">\n\n                                <button style="position: absolute;\n\n                                top: 75%;\n\n                                " ion-button clear icon-only (click)="toggledDesPush= !toggledDesPush"\n\n                                [(emojiPickerIf)]="toggledDesPush" [emojiPickerDirection]="\'top\'"\n\n                                (emojiPickerSelect)="handleDescriptionPush($event)">\n\n                                😃\n\n                                </button>\n\n                                </div>\n\n\n\n                                <div class="error-msg" *ngIf="push_content.invalid && (push_content.dirty || submited || push_content.touched)">\n\n                                    <span class="error">Champs description obligatoire</span>\n\n                                </div>\n\n                            </ion-col>\n\n                        </div>\n\n                    </div>\n\n                    <div style="width: 100%; height: 20px;"></div>\n\n\n\n                    <ion-col col-12 text-center class="item-grey select-not-ie no-padding-left" [class.formError]="city.invalid && (city.dirty || submited || city.touched)">\n\n                        <ion-item class="item-grey no-padding-left" [class.formError]="city.invalid && (city.dirty || submited || city.touched)">\n\n                            <ion-input (click)="SelectCity()"   readonly autocomplete="off" autocorrect="on" name="city" type="text" id="city" placeholder="Ville" [(ngModel)]="currentEvent.cityName"\n\n                                       #city="ngModel" required></ion-input>\n\n                        </ion-item>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center>\n\n                        <button (click)="editEvent(publishArticleForm.invalid)" ion-button color="primary" type="submit" class="button-publish" round>Modifier</button>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n        </form>\n\n    </ion-col>\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\edit-event\edit-event.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_10__providers_globals_globals__["a" /* GlobalsProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_eventsrest_eventsrest__["a" /* EventsrestProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["z" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ModalController */]])
    ], EditEventPage);
    return EditEventPage;
}());

//# sourceMappingURL=edit-event.js.map

/***/ })

});
//# sourceMappingURL=16.js.map