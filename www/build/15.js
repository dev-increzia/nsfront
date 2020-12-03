webpackJsonp([15],{

/***/ 1021:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditPublishPageModule", function() { return EditPublishPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_publish__ = __webpack_require__(1043);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_tools_emoji_picker__ = __webpack_require__(565);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EditPublishPageModule = /** @class */ (function () {
    function EditPublishPageModule() {
    }
    EditPublishPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__edit_publish__["a" /* EditPublishPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__edit_publish__["a" /* EditPublishPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ionic_tools_emoji_picker__["a" /* EmojiPickerModule */]
            ],
        })
    ], EditPublishPageModule);
    return EditPublishPageModule;
}());

//# sourceMappingURL=edit-publish.module.js.map

/***/ }),

/***/ 1043:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPublishPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_media_capture__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_article_article__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_user__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_globals_globals__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_eventsrest_eventsrest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_association_association__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_merchant_merchant__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_files_files__ = __webpack_require__(108);
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
 * Generated class for the EditPublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditPublishPage = /** @class */ (function () {
    function EditPublishPage(event, serviceArticle, navCtrl, navParams, formBuilder, camera, view, actionSheetCtrl, toastCtrl, platform, loadingCtrl, alertCtrl, globals, serviceEvent, userService, associationService, merchantService, appGlobals, mediaCapture, modal, file, filesProvider) {
        this.event = event;
        this.serviceArticle = serviceArticle;
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
        this.globals = globals;
        this.serviceEvent = serviceEvent;
        this.userService = userService;
        this.associationService = associationService;
        this.merchantService = merchantService;
        this.appGlobals = appGlobals;
        this.mediaCapture = mediaCapture;
        this.modal = modal;
        this.file = file;
        this.filesProvider = filesProvider;
        this.lastImage = null;
        this.categoryNames = [];
        this.listPhotos = [];
        this.allCategories = [];
        this.disabledDedicated = true;
        this.disabledHeading = true;
        this.activateHeader = false;
        this.toggled = false;
        this.toggledDes = false;
        this.toggledDesPush = false;
        this.currentArticle = {
            title: '',
            videoFile: null,
            imageURL: '',
            images: '',
            documentUpd: null,
            deletedoc: false,
            description: '',
            category: null,
            publicAt: '',
            city: null,
            mode: "current",
            push: {
                enabled: false,
                date: __WEBPACK_IMPORTED_MODULE_10_moment__().format(),
                hour: __WEBPACK_IMPORTED_MODULE_10_moment__().format(),
                content: null
            },
        };
        this.public_At = {
            year: __WEBPACK_IMPORTED_MODULE_10_moment__().year(),
            month: __WEBPACK_IMPORTED_MODULE_10_moment__().month(),
            day: __WEBPACK_IMPORTED_MODULE_10_moment__().date(),
            hour: __WEBPACK_IMPORTED_MODULE_10_moment__().hour(),
            minute: __WEBPACK_IMPORTED_MODULE_10_moment__().minute(),
            fullDate: __WEBPACK_IMPORTED_MODULE_10_moment__().format()
        };
        this.articlePhoto = null;
        this.toDelete = false;
        this.articleImgs = {
            countPhotos: 0,
            articlePhoto: null,
            toDelete: false,
            articleSecondPhoto: null,
            toDeleteSecond: false,
            secondId: null,
            articleThirdPhoto: null,
            toDeleteThird: false,
            thirdId: null,
            photos: null,
            push: {
                enabled: false,
                date: __WEBPACK_IMPORTED_MODULE_10_moment__().format(),
                hour: __WEBPACK_IMPORTED_MODULE_10_moment__().format(),
                content: null
            },
        };
        this.submited = false;
        this.publicDate = false;
        this.years = [];
        this.months = [];
        this.days = [];
        this.hours = [];
        this.minutes = [];
        this.events = {
            title: null,
            room: null,
            address: null,
            codePostal: null,
            city: null,
            categories: null,
            startDate: {
                year: __WEBPACK_IMPORTED_MODULE_10_moment__().year(),
                month: __WEBPACK_IMPORTED_MODULE_10_moment__().month() + 1,
                day: __WEBPACK_IMPORTED_MODULE_10_moment__().date(),
                hour: __WEBPACK_IMPORTED_MODULE_10_moment__().hour(),
                minute: __WEBPACK_IMPORTED_MODULE_10_moment__().minute(),
                fullDate: __WEBPACK_IMPORTED_MODULE_10_moment__().format()
            },
            endDate: {
                year: __WEBPACK_IMPORTED_MODULE_10_moment__().year(),
                month: __WEBPACK_IMPORTED_MODULE_10_moment__().month() + 1,
                day: __WEBPACK_IMPORTED_MODULE_10_moment__().date(),
                hour: __WEBPACK_IMPORTED_MODULE_10_moment__().hour(),
                minute: __WEBPACK_IMPORTED_MODULE_10_moment__().add('m', 1).minute(),
                fullDate: __WEBPACK_IMPORTED_MODULE_10_moment__().add('m', 1).format()
            },
            price: "Gratuit",
            description: null,
            reservationUrl: null,
            photo: null,
            secondPhoto: null,
            thirdPhoto: null,
            reservation: null,
            article: null,
            push: {
                enabled: false,
                date: __WEBPACK_IMPORTED_MODULE_10_moment__().format(),
                hour: __WEBPACK_IMPORTED_MODULE_10_moment__().format(),
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
        this.isSubmitEnabled = true;
        this.dateEndError = false;
        this.showEvent = false;
        this.invalidTitre = false;
        this.invalidDesc = false;
        this.disabledTheme = true;
        this.disabledCommunity = false;
        this.listAccount = [];
        this.disabledMerchant = true;
        this.userEvents = [];
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.originArticle = this.navParams.get('article');
        this.currentArticle = Object.assign({}, this.originArticle);
        this.accountType = navParams.get('accountType');
        this.accountId = navParams.get('accountId');
        this.events.city = this.originArticle.city;
        this.linkedCommunities = JSON.parse(localStorage.getItem("allCommunities"));
        this.cities = JSON.parse(localStorage.getItem("allCities"));
        console.log('this.currentArticle = ' + JSON.stringify(this.currentArticle));
        if (this.currentArticle.push.enabled) {
            this.currentArticle.push.date = (this.currentArticle.push.date).split('+')[0] + 'Z';
        }
        if (this.currentArticle.merchantId) {
            this.currentArticle.group = "merchant-" + this.currentArticle.merchantId;
        }
        if (this.accountType == "user") {
            if (this.currentArticle.associationId) {
                this.currentArticle.group = "association-" + this.currentArticle.associationId;
            }
            var categoriesId = [];
            for (var _i = 0, _a = this.currentArticle.categories; _i < _a.length; _i++) {
                var category = _a[_i];
                categoriesId.push(category.id);
            }
            this.currentArticle.category = categoriesId;
            if (this.currentArticle.community) {
                for (var _b = 0, _c = this.linkedCommunities; _b < _c.length; _b++) {
                    var linkedcommu = _c[_b];
                    if (this.currentArticle.community == linkedcommu["id"]) {
                        this.allCategories = linkedcommu["categories"];
                    }
                }
            }
        }
        else {
            if (this.currentArticle.associationId) {
                this.currentArticle.group = this.currentArticle.associationId;
            }
        }
        if (this.currentArticle.imageURL) {
            this.articleImgs.countPhotos++;
        }
        if (this.currentArticle.private) {
            this.disabledMerchant = false;
            this.disabledTheme = true;
            this.disabledCommunity = true;
        }
        else {
            this.disabledMerchant = true;
            this.disabledTheme = false;
            this.disabledCommunity = false;
        }
        var currentYear = (new Date()).getFullYear();
        for (var i = currentYear; i <= (new Date()).getFullYear() + 50; i++) {
            this.years.push(i);
        }
        this.months.push({ id: 1, name: 'Jan' });
        this.months.push({ id: 2, name: 'Fév' });
        this.months.push({ id: 3, name: 'Mar' });
        this.months.push({ id: 4, name: 'Avr' });
        this.months.push({ id: 5, name: 'Mai' });
        this.months.push({ id: 6, name: 'Jun' });
        this.months.push({ id: 7, name: 'Juil' });
        this.months.push({ id: 8, name: 'Aoû' });
        this.months.push({ id: 9, name: 'Sep' });
        this.months.push({ id: 10, name: 'Oct' });
        this.months.push({ id: 11, name: 'Nov' });
        this.months.push({ id: 12, name: 'Déc' });
        // remplir les jours
        for (var i = 1; i <= 31; i++) {
            this.days.push(i);
        }
        // remplir les heures
        for (var i = 0; i <= 23; i++) {
            this.hours.push(i);
        }
        // remplir les minutes
        for (var i = 0; i <= 59; i++) {
            this.minutes.push(i);
        }
        if (this.accountType == 'user') {
            this.associations = JSON.parse(localStorage.getItem("adherentAssociations"));
            this.merchants = JSON.parse(localStorage.getItem("adherentMerchants"));
            this.listAccount = [];
            for (var _d = 0, _e = this.associations; _d < _e.length; _d++) {
                var association = _e[_d];
                this.listAccount.push({
                    id: association.id,
                    name: association.name,
                    role: association.role,
                    image_url: association.image_url,
                    moderate: association.moderate,
                    category: association.category,
                    type: 'association',
                    community: association.community,
                    categories: association.categories
                });
            }
            for (var _f = 0, _g = this.merchants; _f < _g.length; _f++) {
                var merchant = _g[_f];
                this.listAccount.push({
                    id: merchant.id,
                    name: merchant.name,
                    role: merchant.role,
                    image_url: merchant.image_url,
                    moderate: merchant.moderate,
                    category: merchant.category,
                    type: 'merchant'
                });
            }
        }
        else if (this.accountType == 'association') {
            var associations = JSON.parse(localStorage.getItem("adminAssociations"));
            this.listAccount = [];
            for (var _h = 0, _j = associations; _h < _j.length; _h++) {
                var association = _j[_h];
                if (this.accountType == 'association' && (association.role == 'superadmin' || association.role == 'admin')) {
                    this.listAccount.push({
                        id: association.id,
                        address: association.address,
                        name: association.name,
                        role: association.role,
                        image_url: association.image_url,
                        moderate: association.moderate,
                        category: association.category,
                        type: 'association',
                        community: association.community,
                        categories: association.categories,
                        city: association.city
                    });
                }
            }
            var categoriesId = [];
            for (var _k = 0, _l = this.currentArticle.categories; _k < _l.length; _k++) {
                var category = _l[_k];
                categoriesId.push(category.id);
            }
            this.currentArticle.category = categoriesId;
            var selectedAsso = null;
            for (var _m = 0, _o = this.listAccount; _m < _o.length; _m++) {
                var account = _o[_m];
                if (account["id"] == this.currentArticle.associationId) {
                    selectedAsso = account;
                    break;
                }
            }
            if (this.currentArticle.group == selectedAsso["id"]) {
                for (var _p = 0, _q = selectedAsso["community"]["categories"]; _p < _q.length; _p++) {
                    var catego = _q[_p];
                    if (this.accountType == "association" && catego['type'] == "Activité groupe / association") {
                        this.allCategories.push({
                            id: catego.id,
                            name: catego.name,
                            type: catego.type
                        });
                    }
                }
            }
        }
        else {
            var communities = [];
            var allCommunities = JSON.parse(localStorage.getItem("allCommunities"));
            for (var _r = 0, allCommunities_1 = allCommunities; _r < allCommunities_1.length; _r++) {
                var community = allCommunities_1[_r];
                if (community["isAdminPublish"]) {
                    communities.push({
                        categories: community.categories,
                        articleHeading: community.articleHeading,
                        follow: community.follow,
                        id: community.id,
                        img_url: community.img_url,
                        isAdminPublish: community.isAdminPublish,
                        isPrivate: community.isPrivate,
                        name: community.name,
                        survey: community.activate_survey,
                        article: community.activate_articles
                    });
                }
            }
            this.listAccount = [];
            var categoriesId = [];
            for (var _s = 0, _t = this.currentArticle.categories; _s < _t.length; _s++) {
                var category = _t[_s];
                categoriesId.push(category.id);
            }
            this.currentArticle.category = categoriesId;
            var selectedCommu = null;
            for (var _u = 0, communities_1 = communities; _u < communities_1.length; _u++) {
                var account = communities_1[_u];
                if (account["id"] == this.currentArticle.communityId) {
                    selectedCommu = account;
                    break;
                }
            }
            for (var _v = 0, _w = selectedCommu["categories"]; _v < _w.length; _v++) {
                var catego = _w[_v];
                if (catego['type'] == "Activité groupe / association") {
                    this.allCategories.push({
                        id: catego.id,
                        name: catego.name,
                        type: catego.type
                    });
                }
            }
            this.allHeadings = [];
            if (selectedCommu["articleHeading"]) {
                for (var _x = 0, _y = selectedCommu["articleHeading"]; _x < _y.length; _x++) {
                    var heading = _y[_x];
                    this.allHeadings.push({
                        id: heading.id,
                        title: heading.title,
                    });
                }
            }
            if (this.currentArticle.heading) {
                this.activateHeader = true;
                this.disabledHeading = false;
            }
            this.disabledDedicated = this.allHeadings.length == 0;
        }
    }
    EditPublishPage.prototype.handleSelection = function (event) {
        this.currentArticle.title = this.currentArticle.title + " " + event.char;
    };
    EditPublishPage.prototype.handleDescription = function (event) {
        this.currentArticle.description = this.currentArticle.description + " " + event.char;
    };
    EditPublishPage.prototype.handleDescriptionPush = function (event) {
        this.currentArticle.push.content = this.currentArticle.push.content + " " + event.char;
    };
    EditPublishPage.prototype.onChangeHeading = function (selected) {
        if (selected.checked) {
            this.disabledHeading = false;
        }
        else {
            this.disabledHeading = true;
            this.currentArticle.heading = null;
        }
    };
    EditPublishPage.prototype.slideChanged = function () {
        this.nbreSlide = this.slides.length();
        this.nbreSlide = this.nbreSlide - 1;
    };
    EditPublishPage.prototype.goToSlide = function () {
        this.slides.slideTo(this.nbreSlide, 500);
    };
    EditPublishPage.prototype.editArticleForm = function (errorValidation, title, description) {
        var _this = this;
        console.log("currentArticle = " + this.currentArticle.push.date);
        this.submited = true;
        if (!errorValidation) {
            this.currentArticle.city = this.events.city;
            if (this.accountType != "association" || (this.accountType == "association" && this.currentArticle.categories)) {
                if (this.publicDate) {
                    if (this.platform.is('core')) {
                        this.currentArticle.publicAt = this.public_At.year +
                            "-" + this.public_At.month +
                            "-" + this.public_At.day +
                            " " + this.public_At.hour +
                            ":" + this.public_At.minute;
                    }
                    else {
                        this.currentArticle.publicAt = this.globals.IsoToDateString(this.public_At.fullDate);
                    }
                }
                this.originArticle = this.currentArticle;
                var loadingPopup_1 = this.loadingCtrl.create({});
                loadingPopup_1.present();
                if (this.currentArticle.type == "association" || this.currentArticle.type == "merchant") {
                    this.isSubmitEnabled = false;
                    if (this.platform.is('core')) {
                        this.events.startDate.fullDate = this.events.startDate.year +
                            "-" + this.events.startDate.month +
                            "-" + this.events.startDate.day +
                            " " + this.events.startDate.hour +
                            ":" + this.events.startDate.minute;
                        this.events.endDate.fullDate = this.events.endDate.year +
                            "-" + this.events.endDate.month +
                            "-" + this.events.endDate.day +
                            " " + this.events.endDate.hour +
                            ":" + this.events.endDate.minute;
                    }
                    else {
                        // get string date for ws
                        this.events.startDate.fullDate = this.globals.IsoToDateString(this.events.startDate.fullDate);
                        this.events.endDate.fullDate = this.globals.IsoToDateString(this.events.endDate.fullDate);
                    }
                    this.isSubmitEnabled = false;
                    // Add event
                    if (this.showEvent) {
                        this.events.title = this.currentArticle.title;
                        this.events.description = this.currentArticle.description;
                        if (this.articleImgs.articlePhoto) {
                            this.events.photo = this.articleImgs.articlePhoto;
                        }
                        else {
                            this.events.photo = null;
                        }
                        if (this.articleImgs.articleSecondPhoto) {
                            this.events.secondPhoto = this.articleImgs.articleSecondPhoto;
                        }
                        else {
                            this.events.secondPhoto = null;
                        }
                        if (this.articleImgs.articleThirdPhoto) {
                            this.events.thirdPhoto = this.articleImgs.articleThirdPhoto;
                        }
                        else {
                            this.events.thirdPhoto = null;
                        }
                        this.events.categories = this.currentArticle.categories;
                        // this.events.push.hour = this.globals.IsoToDateString(this.events.push.hour);
                        this.serviceEvent.postEvent(this.accountType, this.accountId, this.events).then(function (data) {
                            if (data.success) {
                                _this.idEvent = data.id;
                                _this.currentArticle.event = _this.idEvent;
                                _this.serviceArticle.putArticle(_this.currentArticle, _this.articleImgs).then(function (data) {
                                    loadingPopup_1.dismiss();
                                    if (data.success) {
                                        var successAlert = _this.alertCtrl.create({
                                            title: 'Succès',
                                            subTitle: 'Votre article a été mis à jour avec succès.',
                                            buttons: [
                                                {
                                                    text: 'OK',
                                                    handler: function (data) {
                                                        _this.event.publish('news:refresh');
                                                        _this.view.dismiss(true);
                                                    }
                                                }
                                            ]
                                        });
                                        successAlert.present();
                                    }
                                }, function (err) {
                                    loadingPopup_1.dismiss();
                                    _this.event.publish('http:errors', err);
                                });
                            }
                        }, function (err) {
                            loadingPopup_1.dismiss();
                            _this.isSubmitEnabled = true;
                            _this.event.publish('http:errors', err);
                        });
                    }
                    else {
                        //Add article
                        this.serviceArticle.putArticle(this.currentArticle, this.articleImgs).then(function (data) {
                            _this.serviceEvent.getDetailsEvent(_this.currentArticle.event).then(function (data) {
                                _this.userEvents.push(data);
                                _this.serviceEvent.editEvent(_this.currentArticle.event, _this.currentArticle.private).then(function (data) {
                                    if (data) {
                                    }
                                }, function (err) {
                                    console.log(err);
                                });
                            }, function (err) {
                                console.log(err);
                            });
                            loadingPopup_1.dismiss();
                            var successAlert = _this.alertCtrl.create({
                                title: 'Succès',
                                subTitle: 'Votre article a été ajouté avec succès.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        handler: function (data) {
                                            _this.event.publish('news:refresh');
                                            _this.view.dismiss(true);
                                        }
                                    }
                                ]
                            });
                            successAlert.present();
                        }, function (err) {
                            _this.isSubmitEnabled = true;
                            loadingPopup_1.dismiss();
                            _this.event.publish('http:errors', err);
                        });
                    }
                }
                else {
                    this.currentArticle.push.enabled = this.currentArticle.push.enabled;
                    this.currentArticle.push.date = this.globals.IsoToDateString(this.currentArticle.push.date);
                    this.currentArticle.push.content = this.currentArticle.push.content;
                    this.currentArticle.push.hour = this.currentArticle.push.date;
                    console.log(" this.currentArticle.push.hour =" + this.currentArticle.push.hour);
                    this.serviceArticle.putCitoyenArticle(this.currentArticle, this.articleImgs).then(function (data) {
                        loadingPopup_1.dismiss();
                        if (data) {
                            var successAlert = _this.alertCtrl.create({
                                title: 'Succès',
                                subTitle: 'Votre article a été mis à jour avec succès.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        handler: function (data) {
                                            _this.event.publish('news:refresh');
                                            _this.view.dismiss(true);
                                        }
                                    }
                                ]
                            });
                            successAlert.present();
                        }
                    }, function (err) {
                        loadingPopup_1.dismiss();
                        _this.event.publish('http:errors', err);
                    });
                }
            }
        }
        else {
            if (title.invalid || title.value == null || title.value == '') {
                this.invalidTitre = true;
            }
            if (description.invalid || description.value == null || description.value == '') {
                this.invalidDesc = true;
            }
        }
    };
    EditPublishPage.prototype.presentActionSheet = function () {
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
                    text: 'Choisir un document (Pdf, Doc, Docx ...)',
                    handler: function () {
                        _this.presentActionSheetDocument();
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
    EditPublishPage.prototype.presentActionSheetDocument = function () {
        var _this = this;
        this.filesProvider.presentFileChooser(function (base64) {
            _this.currentArticle.documentUpd = base64;
            _this.currentArticle.deletedoc = false;
        }, function (failure) {
            document.getElementById("fileInput").click();
        });
    };
    EditPublishPage.prototype.onFileChange = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            var file = event.target.files[0];
            reader.readAsDataURL(file);
            if (file.size > 5242880) {
                this.filesProvider.generateFileSizeError();
            }
            else {
                reader.onload = function () {
                    var mimeTypeAllowed = _this.filesProvider.allowedMimeType(reader.result);
                    if (mimeTypeAllowed) {
                        _this.currentArticle.documentUpd = reader.result;
                        _this.currentArticle.deletedoc = false;
                    }
                    else {
                        _this.filesProvider.generateMimeTypeError();
                    }
                };
            }
        }
    };
    EditPublishPage.prototype.captureVideo = function () {
        var _this = this;
        var options = { duration: 45 };
        this.mediaCapture.captureVideo(options)
            .then(function (res) {
            var video = res[0];
            var fileName = video.name;
            var fullPath = video['localURL'];
            var directory = fullPath.substring(0, fullPath.lastIndexOf("/") + 1);
            _this.file.readAsDataURL(directory, fileName).then(function (file64) {
                _this.currentArticle.videoFile = file64;
            }).catch(function (err) {
                console.log("ERR : " + err);
            });
        }, function (err) {
            console.log("ERROR");
        });
    };
    EditPublishPage.prototype.takePicture = function () {
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
            if (!_this.articleImgs.articlePhoto && !_this.currentArticle.imageURL) {
                _this.articleImgs.articlePhoto = "data:image/jpeg;base64," + imageData;
                _this.articleImgs.toDelete = false;
                _this.articleImgs.countPhotos++;
            }
            else {
                _this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            _this.articleImgs.photos = _this.listPhotos;
            _this.goToSlide();
        });
    };
    EditPublishPage.prototype.loadImageFromLibrary = function () {
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
            if (!_this.articleImgs.articlePhoto && !_this.currentArticle.imageURL) {
                _this.articleImgs.articlePhoto = "data:image/jpeg;base64," + imageData;
                _this.articleImgs.toDelete = false;
                _this.articleImgs.countPhotos++;
            }
            else {
                _this.listPhotos.push("data:image/jpeg;base64," + imageData);
            }
            _this.articleImgs.photos = _this.listPhotos;
            _this.goToSlide();
        });
    };
    EditPublishPage.prototype.loadVideoFromLibrary = function () {
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
                    _this.currentArticle.videoFile = file64;
                }).catch(function (error) { console.log("Error : " + error.message); });
            }
            else {
                var directory = videoName.substring(0, videoName.lastIndexOf("/") + 1);
                var fileName = videoName.substring(videoName.lastIndexOf("/") + 1);
                _this.file.readAsDataURL(directory, fileName).then(function (file64) {
                    _this.currentArticle.videoFile = file64;
                });
            }
        });
    };
    EditPublishPage.prototype.Close = function () {
        this.event.publish('news:refresh');
        this.view.dismiss(true);
    };
    EditPublishPage.prototype.deleteVideo = function () {
        this.currentArticle.videoFile = null;
    };
    EditPublishPage.prototype.deletePhoto = function (i, id) {
        if (i == -1) {
            this.currentArticle.imageURL = null;
            this.articleImgs.articlePhoto = null;
            this.articleImgs.toDelete = true;
            this.articleImgs.countPhotos--;
        }
        else if (id) {
            this.currentArticle.images[i].url = null;
        }
        else {
            this.articleImgs.photos.splice(i, 1);
        }
    };
    EditPublishPage.prototype.deleteEditedPhoto = function (index) {
        if (index == 2) {
            this.articleImgs.articleSecondPhoto = null;
            this.articleImgs.countPhotos--;
        }
        if (index == 3) {
            this.articleImgs.articleThirdPhoto = null;
            this.articleImgs.countPhotos--;
        }
    };
    EditPublishPage.prototype.capitalize = function (event, type) {
        if (event) {
            if (type == 'title') {
                this.currentArticle.title = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'description') {
                this.currentArticle.description = event.charAt(0).toUpperCase() + event.slice(1);
            }
        }
    };
    EditPublishPage.prototype.removeCategory = function (category) {
        category = category.toString();
        var stringCategories = [];
        for (var _i = 0, _a = this.currentArticle.categories; _i < _a.length; _i++) {
            var c = _a[_i];
            stringCategories.push(c.toString());
        }
        var foundAt = stringCategories.findIndex(function (i) { return i == category; });
        if (foundAt != -1) {
            stringCategories.splice(foundAt, 1);
            this.currentArticle.categories = stringCategories;
        }
    };
    EditPublishPage.prototype.onChangeCategory = function (selected) {
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
    EditPublishPage.prototype.goBack = function () {
        this.currentArticle = Object.assign({}, this.originArticle);
        this.view.dismiss(this.currentArticle);
    };
    EditPublishPage.prototype.checkFocus = function (element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;
            var test = yOffset - 40;
            this.content.scrollTo(0, test, 2000);
        }
    };
    EditPublishPage.prototype.pad = function (d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    };
    EditPublishPage.prototype.onChangeCity = function (selected) {
        var index = this.cities.findIndex(function (i) { return i.name === selected; });
        this.events.codePostal = this.cities[index].code;
    };
    EditPublishPage.prototype.onChangeCode = function (selected) {
        var index = this.cities.findIndex(function (i) { return i.code == selected; });
        if (index != -1) {
            this.events.city = this.cities[index].name;
        }
    };
    EditPublishPage.prototype.onChangePrivate = function (selected) {
        if (selected.checked) {
            this.disabledCommunity = true;
            this.currentArticle.community = null;
            this.disabledMerchant = false;
            if (this.accountType == "user") {
                this.disabledTheme = true;
                this.currentArticle.category = null;
                this.allCategories = [];
            }
        }
        else {
            this.disabledCommunity = false;
            if (this.accountType == "user") {
                this.currentArticle.group = null;
            }
            this.disabledMerchant = true;
        }
    };
    EditPublishPage.prototype.delete = function () {
        var _this = this;
        var loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.serviceArticle.deleteArticle(this.currentArticle.id, "current").then(function (data) {
            _this.event.publish('news:refresh');
            loadingPopup.dismiss();
            _this.currentArticle = Object.assign({}, _this.originArticle);
            _this.view.dismiss(_this.currentArticle);
            var toast = _this.toastCtrl.create({
                message: 'Article supprimé avec succès',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }, function (err) {
            loadingPopup.dismiss();
            _this.event.publish('http:errors', err);
        });
    };
    EditPublishPage.prototype.SelectCity = function () {
        var _this = this;
        var myModal2 = this.modal.create('SelectCityPage', {}, { cssClass: 'cities-modal' });
        myModal2.onDidDismiss(function (data) {
            if (data) {
                _this.events.city = data.name;
            }
        });
        myModal2.present();
    };
    EditPublishPage.prototype.deleteDocument = function () {
        this.currentArticle.document = null;
        this.currentArticle.deletedoc = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* Slides */])
    ], EditPublishPage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], EditPublishPage.prototype, "content", void 0);
    EditPublishPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-edit-publish',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\edit-publish\edit-publish.html"*/'<!--\n\n  Generated template for the PublishPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-row class="header-popin" no-padding>\n\n        <ion-col class="no-padding " text-left>\n\n            <button ion-button clear small type="button" color="primary" no-margin no-padding>\n\n                <!--<ion-icon name="ios-create-outline"></ion-icon>-->\n\n                <img class="editimg" src="assets/imgs/icons/edit.png">\n\n\n\n            </button> \n\n        </ion-col>\n\n        <ion-col class="no-padding " text-center>\n\n            <h5 class="primary-color title-popin" no-margin>Publier</h5>\n\n        </ion-col>\n\n        <ion-col class="no-padding " text-right>\n\n            <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="goBack()">\n\n                    <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n            </button>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-header>\n\n<ion-content padding>\n\n    <ion-col col-12 text-centre class="padding-top">\n\n        <form  #publishArticleForm="ngForm">\n\n            <ion-grid margin-top>\n\n                <ion-row text-center>\n\n\n\n                    <ion-col col-12 text-center class="privateContent select-not-ie" *ngIf="accountType != \'community\' && accountType != \'user\'">\n\n                             <ion-item class="item-input no-padding-left">\n\n                            <ion-label color="h-color"> <img class="imglock" src="assets/imgs/icons/lock.png" alt="NOUS-Ensemble" />C\'est un contenu privé</ion-label>\n\n                            <ion-toggle name="private" (ionChange)="onChangePrivate($event)" [(ngModel)]="currentArticle.private" checked="false"></ion-toggle>\n\n                        </ion-item>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center class="select-not-ie privateContent" *ngIf="accountType == \'community\'">\n\n                        <ion-item class="item-input no-padding-left">\n\n                            <ion-label color="h-color">C\'est une publication à <br/> garder sur la page dédiée</ion-label>\n\n                            <ion-toggle [disabled]="disabledDedicated" name="private" (ionChange)="onChangeHeading($event)" [ngModel]="activateHeader" checked="false"></ion-toggle>\n\n                        </ion-item>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center *ngIf="accountType == \'community\'">\n\n                             <ion-item class="item-grey select-not-ie no-padding-left"  [class.formError]="heading.invalid && (heading.dirty || submited || heading.touched)">\n\n                              <ion-select [disabled]="disabledHeading" [required]="!disabledHeading" [(ngModel)]="currentArticle.heading" #heading="ngModel" class="select-white no-padding-left" placeholder="Grand projet de ville" name="heading" submitText="Ok" cancelText="Annuler">\n\n                                <ion-option *ngFor="let heading of allHeadings" value="{{heading.id}}">{{heading.title}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-col class="item-grey select-ie no-padding-left"  [class.formError]="heading.invalid && (heading.dirty || submited || heading.touched)">\n\n                                 <select [disabled]="disabledHeading" [required]="!disabledHeading" [(ngModel)]="currentArticle.heading" #heading="ngModel" class="select-white input-select-ie margin-top-select margin-bottom-select padding-right no-padding-left"\n\n                                placeholder="Grand projet de ville" name="heading">\n\n                                <option *ngFor="let heading of allHeadings" value="{{heading.id}}">{{heading.title}}</option>\n\n                            </select>\n\n                        </ion-col>\n\n\n\n                        \n\n                        <div class="error-msg" *ngIf="(heading.invalid && (heading.dirty || submited || heading.touched))">\n\n                             <span class="error">Champs Grand projet de ville obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row text-center>\n\n                    <ion-col col-12 text-center no-padding class="margin-top">\n\n\n\n                        <div>\n\n                            <ion-slides (ionSlideDidChange)="slideChanged()" *ngIf="currentArticle.imageURL || currentArticle.images || articleImgs.photos || articleImgs.articlePhoto"\n\n                                class="image home-card-slides" pager>\n\n                                <ion-slide *ngIf="currentArticle.imageURL || articleImgs.articlePhoto">\n\n                                    <img src="{{articleImgs.articlePhoto}}" *ngIf="articleImgs.articlePhoto">\n\n                                    <img data-src="{{currentArticle.imageURL}}" *ngIf="currentArticle.imageURL">\n\n                                    <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(-1, 0);"\n\n                                              *ngIf="currentArticle.imageURL || articleImgs.articlePhoto"></ion-icon>\n\n\n\n                                </ion-slide>\n\n                                <div *ngFor="let img of currentArticle.images; let i = index">\n\n                                    <ion-slide *ngIf="img.url">\n\n\n\n                                        <img src="{{img.url}}" *ngIf="img.url">\n\n                                        <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(i, img.id);"\n\n                                                  *ngIf="img.url"></ion-icon>\n\n\n\n                                    </ion-slide>\n\n                                </div>\n\n                                <div *ngFor="let item of articleImgs.photos let i = index">\n\n                                    <ion-slide *ngIf="item">\n\n\n\n                                        <img src="{{item}}" *ngIf="item">\n\n                                        <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(i, \'\');"\n\n                                                  *ngIf="item"></ion-icon>\n\n\n\n                                    </ion-slide>\n\n                                </div>\n\n                            </ion-slides>\n\n                        </div>\n\n                        <div *ngIf="currentArticle.thirdPhoto;">\n\n                            <div>\n\n                                <img src="{{currentArticle.thirdPhoto}}" *ngIf="currentArticle.thirdPhoto">\n\n                                <ion-icon name="trash" class="icon-delete" (click)="deletePhoto(3);" *ngIf="currentArticle.thirdPhoto"></ion-icon>\n\n                            </div>\n\n\n\n                        </div>\n\n                        <div>\n\n                            <div class="center" *ngIf="articleImgs.articleSecondPhoto">\n\n                                <img src="{{articleImgs.articleSecondPhoto}}" class="width-100" *ngIf="articleImgs.articleSecondPhoto">\n\n                                <ion-icon name="trash" class="icon-delete" (click)="deleteEditedPhoto(2);"></ion-icon>\n\n                            </div>\n\n                            <div class="center" *ngIf="articleImgs.articleThirdPhoto">\n\n                                <img src="{{articleImgs.articleThirdPhoto}}" class="width-100" *ngIf="articleImgs.articleThirdPhoto">\n\n                                <ion-icon name="trash" class="icon-delete" (click)="deleteEditedPhoto(3);"></ion-icon>\n\n                            </div>\n\n\n\n                        </div>\n\n                        <ion-col col-12 text-center>\n\n                            <!--  <button ion-button class="button-pic" color="grey-color" type="button" round (click)="presentActionSheet()">Photo</button>-->\n\n                            <img class="button-img" src="assets/imgs/icons/button.png" (click)="presentActionSheet()">\n\n                        </ion-col>\n\n                        <div *ngIf="currentArticle.videoFile" style="position: relative;">\n\n                                	<img class="button-img" src="assets/imgs/icons/video.png">\n\n                                    <ion-icon name="trash" \n\n                                    	class="icon-delete delete-icon" \n\n                                    	(click)="deleteVideo();"\n\n                                        *ngIf="currentArticle.videoFile">\n\n                                    </ion-icon>\n\n                        </div>\n\n                        <div *ngIf="currentArticle.document" style="position: relative;">\n\n                            <img class="button-img" src="assets/imgs/icons/doc-icon.png">\n\n                            <ion-icon name="trash"\n\n                                      class="icon-delete delete-icon"\n\n                                      (click)="deleteDocument();"\n\n                                      *ngIf="currentArticle.document">\n\n                            </ion-icon>\n\n                        </div>\n\n                        <div>\n\n\n\n                            <input type="file" id="fileInput" (change)="onFileChange($event)" >\n\n\n\n                        </div>\n\n                    </ion-col>\n\n                    <!-- <p class="indication" *ngIf="accountType == \'association\' || this.accountType == \'merchant\'">(Jusqu\'à 3 photos)</p> -->\n\n                </ion-row>\n\n\n\n                <ion-row>\n\n                    <ion-col col-12 text-center class="select-not-ie">\n\n\n\n                        <ion-item class="no-padding-left" [class.formError]="titre.invalid && (titre.dirty || submited || titre.touched)">\n\n                                  <ion-input name="titre" type="text" id="titre" placeholder="Titre" [(ngModel)]="currentArticle.title"\n\n                                   #titre="ngModel" (change)="capitalize($event.target.value, \'title\')" (focus)="checkFocus($event)"\n\n                                   required></ion-input>\n\n                        </ion-item>\n\n\n\n                        <div style="width: 90%;\n\n                        text-align: right;">\n\n                            <button style="position: absolute;\n\n                            top: 75%;\n\n                            left: 1%;" ion-button clear icon-only (click)="toggled = !toggled"\n\n                            [(emojiPickerIf)]="toggled" [emojiPickerDirection]="\'top\'"\n\n                            (emojiPickerSelect)="handleSelection($event)">\n\n                            😃\n\n                            </button>\n\n                        </div>\n\n                        \n\n                        <div class="error-msg" *ngIf="titre.invalid && (titre.dirty || submited || titre.touched)">\n\n                             <span class="error">Champs titre obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <div style="width: 100%; height: 30px;"></div>\n\n\n\n                    <ion-col col-12 text-center class="margin-top select-ie">\n\n\n\n                        <ion-item class="no-padding-left">\n\n                            <ion-input name="titre" type="text" id="titre" placeholder="Titre" [(ngModel)]="currentArticle.title"\n\n                                       #titre="ngModel" (change)="capitalize($event.target.value, \'title\')" (focus)="checkFocus($event)"\n\n                                       required></ion-input>\n\n                        </ion-item>\n\n\n\n                      \n\n\n\n                        <div class="error-msg" *ngIf="invalidTitre">\n\n                            <span class="error">Champs titre obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center class="select-not-ie">\n\n\n\n                        <ion-item class="no-padding-left" style="padding-top: 15px;" [class.formError]="description.invalid && (description.dirty || submited || description.touched)">\n\n                                  <ion-textarea name="description" placeholder="Description" [(ngModel)]="currentArticle.description"\n\n                                      #description="ngModel" (change)="capitalize($event.target.value, \'description\')"\n\n                                      (focus)="checkFocus($event)" required></ion-textarea>\n\n                        </ion-item>\n\n\n\n                        <div style="width: 90%;\n\n                        text-align: right;">\n\n                        <button style="position: absolute;\n\n                        top: 85%;\n\n                        left: 1%;" ion-button clear icon-only (click)="toggledDes= !toggledDes"\n\n                        [(emojiPickerIf)]="toggledDes" [emojiPickerDirection]="\'top\'"\n\n                        (emojiPickerSelect)="handleDescription($event)">\n\n                        😃\n\n                        </button>\n\n                        </div>\n\n\n\n                        <div class="error-msg" *ngIf="description.invalid && (description.dirty || submited || description.touched)">\n\n                             <span class="error">Champs description obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <div style="width: 100%; height: 30px;"></div>\n\n\n\n                    <ion-col col-12 text-center class="select-ie">\n\n\n\n                        <ion-item class="no-padding-left">\n\n                            <ion-textarea name="description" placeholder="Description" [(ngModel)]="currentArticle.description"\n\n                                          #description="ngModel" (change)="capitalize($event.target.value, \'description\')"\n\n                                          required></ion-textarea>\n\n                        </ion-item>\n\n                        <div class="error-msg" *ngIf="description.invalid && (description.dirty || submited || description.touched)">\n\n                             <span class="error">Champs description obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center no-pading-bottom>\n\n                        <ion-item class="item-grey select-not-ie no-padding-left" [class.formError]="category.invalid && (category.dirty || submited || category.touched)">\n\n                                  <ion-select required class="select-white no-padding-left" placeholder="Thèmes *" name="category" submitText="Ok"\n\n                                    cancelText="Annuler" multiple="true" [(ngModel)]="currentArticle.category" #category="ngModel"\n\n                                    (ionChange)="onChangeCategory($event)">\n\n                                <ion-option *ngFor="let category of allCategories" value={{category.id}}>{{category.name}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-col no-padding class="select-padding-ie item-grey select-ie " style="padding: 0;"\n\n                                 [class.formError]="category.invalid && (category.dirty || submited || category.touched)">\n\n                                 <select required class="select-white input-select-ie select-multiple-ie padding-right no-padding-left"\n\n                                placeholder="Thèmes *" name="category" multiple [(ngModel)]="currentArticle.category"\n\n                                #category="ngModel">\n\n                                <option *ngFor="let category of allCategories" value={{category.id}} (click)="onChangeCategory($event.srcElement.value)">{{category.name}}</option>\n\n                            </select>\n\n                        </ion-col>\n\n                        <div class="form-category">\n\n                            <div class="tags">\n\n                                <div *ngFor="let category of categoryNames"><a>{{category.name}} <span (click)="removeCategory(category.id)">x</span></a></div>\n\n                            </div>\n\n                        </div>\n\n                        <div class="error-msg" *ngIf="category.invalid && (category.dirty || submited || category.touched)">\n\n                             <span class="error">Champs Thèmes obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center class="margin-top">\n\n                        <ion-item class="item-grey no-padding-left" [class.formError]="city.invalid && (city.dirty || submited || city.touched)">\n\n                            <ion-input (click)="SelectCity()"   readonly autocomplete="off" autocorrect="on" name="city" type="text" id="city" placeholder="Ville" [(ngModel)]="events.city"\n\n                                #city="ngModel" required></ion-input>\n\n                        </ion-item>\n\n                        <div text-center class="error-msg" *ngIf="city.invalid && (city.dirty || submited || city.touched)">\n\n                            <span class="error">Champs ville obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n\n\n\n\n\n\n                    <ion-col col-12 text-center>\n\n                        <ion-item class="item-grey" no-padding>\n\n                            <ion-label class="toggle-label" no-padding>\n\n                                <div class="div-event without-icon">Envoyer une notification</div>\n\n                            </ion-label>\n\n                            <ion-toggle class="no-padding" [(ngModel)]="currentArticle.push.enabled" name="event"\n\n                                        checked="false" no-padding></ion-toggle>\n\n                        </ion-item> \n\n                    </ion-col>\n\n                    <div *ngIf="currentArticle.push.enabled" col-12 text-center>\n\n\n\n                        <div class="form-item">\n\n                            <ion-item class="item-grey" [class.formError]="push_date.invalid && (push_date.dirty || submited || push_date.touched)">\n\n                                <ion-datetime #push_date="ngModel" name="push_date" placeholder="Date*" min="2017-08-31" minuteValues="0,5,10,15,20,25,30,35,40,45,50,55"\n\n                                              max="2030-12-31" displayFormat="DD/MM/YYYY HH:mm" pickerFormat="DD-MMMM-YYYY HH:mm"\n\n                                              name="push_date" [(ngModel)]="currentArticle.push.date" monthNames="Janvier, Février, Mars, Avril, Mai, Juin, Juillet, Août, Septembre, Octobre, Novembre, Décembre"\n\n                                              doneText="Ok" cancelText="Annuler" required>\n\n\n\n                                </ion-datetime>\n\n\n\n                            </ion-item>\n\n                            <div class="error-msg" *ngIf="push_date.invalid && (push_date.dirty || submited || push_date.touched)">\n\n                                <span class="error">Champs date obligatoire.</span>\n\n                            </div>\n\n                        </div>\n\n\n\n                        <div class="form-item">\n\n                            <ion-col col-12 text-center>\n\n                                <ion-item class="textAreaInput" style="padding-top: 15px;" [class.formError]="push_content.invalid && (push_content.dirty || submited || push_content.touched)">\n\n                                    <ion-textarea (change)="capitalize($event.target.value)" #push_content="ngModel"\n\n                                                  [(ngModel)]="currentArticle.push.content" class="form-input-text" name="push_content"\n\n                                                  maxlength="140" type="text" id="title"  placeholder="Description*..."\n\n                                                  required></ion-textarea>\n\n                                </ion-item>\n\n                                <div style="width: 100%;\n\n                                text-align: left;">\n\n                                <button style="position: absolute;\n\n                                top: 75%;\n\n                                " ion-button clear icon-only (click)="toggledDesPush= !toggledDesPush"\n\n                                [(emojiPickerIf)]="toggledDesPush" [emojiPickerDirection]="\'top\'"\n\n                                (emojiPickerSelect)="handleDescriptionPush($event)">\n\n                                😃\n\n                                </button>\n\n                                </div>\n\n                                <div class="error-msg" *ngIf="push_content.invalid && (push_content.dirty || submited || push_content.touched)">\n\n                                    <span class="error">Champs description obligatoire</span>\n\n                                </div>\n\n                            </ion-col>\n\n                        </div>\n\n                    </div>\n\n\n\n                    <ion-col col-12 text-center>\n\n                        <button ion-button (click)="editArticleForm(publishArticleForm.invalid, titre, description)" color="primary" type="submit" class="button-publish margin-top" round>Modifier</button>\n\n                    </ion-col>\n\n                    \n\n                </ion-row>\n\n            </ion-grid>\n\n        </form>\n\n    </ion-col>\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\edit-publish\edit-publish.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5__providers_article_article__["a" /* ArticleProvider */],
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
            __WEBPACK_IMPORTED_MODULE_9__providers_globals_globals__["a" /* GlobalsProvider */],
            __WEBPACK_IMPORTED_MODULE_11__providers_eventsrest_eventsrest__["a" /* EventsrestProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_12__providers_association_association__["a" /* AssociationProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_merchant_merchant__["a" /* MerchantProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_globals_globals__["a" /* GlobalsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_14__providers_files_files__["a" /* FilesProvider */]])
    ], EditPublishPage);
    return EditPublishPage;
}());

//# sourceMappingURL=edit-publish.js.map

/***/ })

});
//# sourceMappingURL=15.js.map