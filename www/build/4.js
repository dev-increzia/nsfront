webpackJsonp([4],{

/***/ 1033:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublishPageModule", function() { return PublishPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__publish__ = __webpack_require__(1057);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_tools_emoji_picker__ = __webpack_require__(565);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PublishPageModule = /** @class */ (function () {
    function PublishPageModule() {
    }
    PublishPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__publish__["a" /* PublishPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__publish__["a" /* PublishPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ionic_tools_emoji_picker__["a" /* EmojiPickerModule */]
            ],
        })
    ], PublishPageModule);
    return PublishPageModule;
}());

//# sourceMappingURL=publish.module.js.map

/***/ }),

/***/ 1057:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublishPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_media_capture__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_article_article__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_user_user__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_globals_globals__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_eventsrest_eventsrest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_association_association__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_merchant_merchant__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_google_analytics__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_goodplanrest_goodplanrest__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_chooser__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file_path__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_document_picker__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_files_files__ = __webpack_require__(108);
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
var PublishPage = /** @class */ (function () {
    function PublishPage(event, formBuilder, globals, view, actionSheetCtrl, userService, appGlobals, camera, navCtrl, navParams, ga, articleService, loadingCtrl, alertCtrl, platform, docPicker, serviceEvent, serviceGoodPlan, associationService, modal, merchantService, mediaCapture, file, fileChooser, filepath, filesProvider) {
        this.event = event;
        this.formBuilder = formBuilder;
        this.globals = globals;
        this.view = view;
        this.actionSheetCtrl = actionSheetCtrl;
        this.userService = userService;
        this.appGlobals = appGlobals;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ga = ga;
        this.articleService = articleService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.docPicker = docPicker;
        this.serviceEvent = serviceEvent;
        this.serviceGoodPlan = serviceGoodPlan;
        this.associationService = associationService;
        this.modal = modal;
        this.merchantService = merchantService;
        this.mediaCapture = mediaCapture;
        this.file = file;
        this.fileChooser = fileChooser;
        this.filepath = filepath;
        this.filesProvider = filesProvider;
        this.items = [];
        this.listPhotos = [];
        this.toggled = false;
        this.toggledDes = false;
        this.toggledContent = false;
        this.filter = {
            city: 'all',
            category: 0
        };
        this.article = {
            title: "",
            photo: null,
            videoFile: null,
            photos: null,
            document: null,
            secondPhoto: '',
            thirdPhoto: '',
            description: "",
            community: null,
            city: null,
            category: null,
            heading: null,
            event: null,
            group: null,
            private: false,
            push: {
                enabled: false,
                date: new Date((new Date()).getTime() - (new Date()).getTimezoneOffset() * 60 * 1000).toISOString(),
                hour: new Date((new Date()).getTime() - (new Date()).getTimezoneOffset() * 60 * 1000).toISOString(),
                content: ""
            },
            publicAt: {
                year: __WEBPACK_IMPORTED_MODULE_10_moment__().year(),
                month: __WEBPACK_IMPORTED_MODULE_10_moment__().month() + 1,
                day: __WEBPACK_IMPORTED_MODULE_10_moment__().date(),
                hour: __WEBPACK_IMPORTED_MODULE_10_moment__().hour(),
                minute: __WEBPACK_IMPORTED_MODULE_10_moment__().minute(),
                fullDate: ""
            }
        };
        this.listAccount = [];
        this.years = [];
        this.months = [];
        this.days = [];
        this.hours = [];
        this.minutes = [];
        this.events = {
            title: null,
            room: false,
            mailForRoom: null,
            address: null,
            city: null,
            categories: null,
            secondCategories: null,
            startDate: {
                year: __WEBPACK_IMPORTED_MODULE_10_moment__().year(),
                month: __WEBPACK_IMPORTED_MODULE_10_moment__().month() + 1,
                day: __WEBPACK_IMPORTED_MODULE_10_moment__().date(),
                hour: __WEBPACK_IMPORTED_MODULE_10_moment__().hour(),
                minute: __WEBPACK_IMPORTED_MODULE_10_moment__().minute(),
                fullDate: new Date().toISOString()
            },
            endDate: {
                year: __WEBPACK_IMPORTED_MODULE_10_moment__().year(),
                month: __WEBPACK_IMPORTED_MODULE_10_moment__().month() + 1,
                day: __WEBPACK_IMPORTED_MODULE_10_moment__().date(),
                hour: __WEBPACK_IMPORTED_MODULE_10_moment__().hour(),
                minute: __WEBPACK_IMPORTED_MODULE_10_moment__().add('m', 1).minute(),
                fullDate: new Date().toISOString()
            },
            price: "Gratuit",
            description: null,
            photo: null,
            photos: null,
            secondPhoto: null,
            thirdPhoto: null,
            article: null,
            push: {
                enabled: false,
                date: new Date().toISOString(),
                hour: new Date().toISOString(),
                content: ""
            },
            personalized: false,
            monday: null,
            tuesday: null,
            wednesday: null,
            thursday: null,
            friday: null,
            saturday: null,
            sunday: null,
            ageFrom: null,
            ageTo: null,
            lessThanSix: null,
            betweenSixTwelve: null,
            twelveEighteen: null,
            allChildrens: null,
            newPhoto: null,
            deletePhoto: false,
            private: false,
            secondCommu: null,
            document: null,
        };
        this.isSubmitEnabled = true;
        this.submited = false;
        this.dateEndError = false;
        this.showEvent = false;
        this.categoryNames = [];
        this.secondCategoryNames = [];
        this.moreEvent = false;
        this.invalidTitre = false;
        this.invalidDesc = false;
        this.publicDate = false;
        this.disabledCommunity = false;
        this.disabledMerchant = true;
        this.disabledHeading = true;
        this.disabledTheme = true;
        this.disabledDedicated = true;
        this.disabledSecondTheme = true;
        this.surveyDisabled = false;
        this.adminCommunities = [];
        this.hasSondage = false;
        this.articleActivated = true;
        this.evtdescription = "";
        this.cities = this.appGlobals.allCities;
        this.userImg = localStorage.getItem("user_image");
        this.userId = localStorage.getItem("user_id");
        this.userFullName = localStorage.getItem("user_firstname") + " " + localStorage.getItem("user_lastname");
        this.event.publish('user:current');
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.accountType = navParams.get('accountType');
        this.account = navParams.get('account');
        this.linkedCommunities = JSON.parse(localStorage.getItem("allCommunities"));
        for (var _i = 0, _a = this.linkedCommunities; _i < _a.length; _i++) {
            var community = _a[_i];
            if (community["isAdminPublish"]) {
                this.adminCommunities.push({
                    categories: community.categories,
                    articleHeading: community.articleHeading,
                    follow: community.follow,
                    id: community.id,
                    img_url: community.img_url,
                    isAdminPublish: community.isAdminPublish,
                    isPrivate: community.isPrivate,
                    name: community.name,
                    cityName: community.cityName,
                    survey: community.activate_survey,
                    article: community.activate_articles
                });
            }
        }
        var currentYear = (new Date()).getFullYear();
        for (var i = currentYear; i <= (new Date()).getFullYear() + 50; i++) {
            this.years.push(i);
        }
        // remplir les mois
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
        if (this.accountType == 'citoyen') {
            var associations = JSON.parse(localStorage.getItem("adherentAssociations"));
            this.listAccount = [];
            for (var _b = 0, _c = associations; _b < _c.length; _b++) {
                var association = _c[_b];
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
        }
        else {
            var associations = this.appGlobals.adminAssociations;
            var merchants = this.appGlobals.adminMerchants;
            this.listAccount = [];
            for (var _d = 0, _e = associations; _d < _e.length; _d++) {
                var association = _e[_d];
                if (this.accountType == 'association' && (association.role == 'superadmin' || association.role == 'admin') && association.moderate == 'accepted') {
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
            for (var _f = 0, _g = merchants; _f < _g.length; _f++) {
                var merchant = _g[_f];
                if (this.accountType == 'merchant' && (merchant.role == 'superadmin' || merchant.role == 'admin') && merchant.moderate == 'accepted') {
                    this.listAccount.push({
                        id: merchant.id,
                        name: merchant.name,
                        address: merchant.address,
                        role: merchant.role,
                        image_url: merchant.image_url,
                        moderate: merchant.moderate,
                        category: merchant.category,
                        type: 'merchant',
                        community: merchant.community,
                        categories: merchant.categories,
                        city: merchant.city
                    });
                }
            }
        }
    }
    PublishPage.prototype.handleSelection = function (event) {
        this.article.title = this.article.title + " " + event.char;
    };
    PublishPage.prototype.handleDescription = function (event) {
        this.article.description = this.article.description + " " + event.char;
    };
    PublishPage.prototype.handleContent = function (event) {
        this.evtdescription = this.evtdescription + " " + event.char;
    };
    PublishPage.prototype.ionViewWillEnter = function () {
        var currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes());
        currentDate.setHours(currentDate.getHours() + 1);
        this.article.publicAt.fullDate = currentDate.toISOString();
        this.minPublicDate = currentDate.toISOString();
    };
    PublishPage.prototype.ionViewWillLeave = function () {
        this.globals.showHeader = true;
    };
    PublishPage.prototype.getCategories = function () {
        var _this = this;
        this.userService.findCategories().then(function (data) {
            _this.allCategories = data;
        }, function (err) {
            _this.event.publish('http:errors', err);
        });
    };
    PublishPage.prototype.onChangeCommuCitoyen = function () {
        this.article.category = null;
        this.allCategories = [];
        if (!this.disabledCommunity) {
            for (var _i = 0, _a = this.linkedCommunities; _i < _a.length; _i++) {
                var linkedcommu = _a[_i];
                if (this.article.community == linkedcommu["id"]) {
                    for (var _b = 0, _c = linkedcommu["categories"]; _b < _c.length; _b++) {
                        var category = _c[_b];
                        if (category['type'] == "Activité groupe / association") {
                            this.allCategories.push({
                                id: category.id,
                                name: category.name,
                                type: category.type
                            });
                        }
                    }
                }
            }
        }
        this.disabledTheme = this.allCategories.length == 0;
    };
    PublishPage.prototype.onChangeSecondCommu = function () {
        this.events.secondCategories = null;
        this.allSecondCategories = [];
        for (var _i = 0, _a = this.linkedCommunities; _i < _a.length; _i++) {
            var linkedcommu = _a[_i];
            if (this.events.secondCommu == linkedcommu["id"]) {
                for (var _b = 0, _c = linkedcommu["categories"]; _b < _c.length; _b++) {
                    var catego = _c[_b];
                    if (this.accountType == "association" && catego['type'] == "Activité groupe / association") {
                        this.allSecondCategories.push({
                            id: catego.id,
                            name: catego.name,
                            type: catego.type
                        });
                    }
                    if (this.accountType == "merchant" && catego['type'] == "Thème commerce / partenaire") {
                        this.allSecondCategories.push({
                            id: catego.id,
                            name: catego.name,
                            type: catego.type
                        });
                    }
                }
            }
        }
        this.disabledSecondTheme = this.allSecondCategories.length == 0;
    };
    PublishPage.prototype.onChangeCommuAsso = function (event) {
        this.linkedCommunities = JSON.parse(localStorage.getItem("allCommunities"));
        this.article.category = null;
        this.allCategories = [];
        this.events.secondCategories = null;
        this.allSecondCategories = [];
        var selectedAsso = null;
        for (var _i = 0, _a = this.listAccount; _i < _a.length; _i++) {
            var account = _a[_i];
            if (account["id"] == event) {
                selectedAsso = account;
                break;
            }
        }
        var foundAt = this.linkedCommunities.findIndex(function (i) { return i.id == selectedAsso["community"]["id"]; });
        if (foundAt != -1) {
            this.linkedCommunities.splice(foundAt, 1);
        }
        if (this.article.group == selectedAsso["id"]) {
            this.events.address = selectedAsso["address"];
            if (selectedAsso["city"]) {
                this.events.city = selectedAsso["city"]["name"];
            }
            else {
                this.events.city = null;
            }
            for (var _b = 0, _c = selectedAsso["community"]["categories"]; _b < _c.length; _b++) {
                var catego = _c[_b];
                if (this.accountType == "association" && catego['type'] == "Activité groupe / association") {
                    this.allCategories.push({
                        id: catego.id,
                        name: catego.name,
                        type: catego.type
                    });
                }
                if (this.accountType == "merchant" && catego['type'] == "Thème commerce / partenaire") {
                    this.allCategories.push({
                        id: catego.id,
                        name: catego.name,
                        type: catego.type
                    });
                }
            }
            this.article.community = selectedAsso["community"]["id"];
        }
        this.disabledTheme = this.allCategories.length == 0;
        this.disabledSecondTheme = this.allSecondCategories.length == 0;
    };
    PublishPage.prototype.onChangeEtablish = function (event) {
        var myarr = event.split("-");
        this.allCategories = [];
        for (var _i = 0, _a = this.listAccount; _i < _a.length; _i++) {
            var asso = _a[_i];
            if (asso['type'] == 'association' && asso['id'] == myarr[1]) {
                for (var _b = 0, _c = asso['community']["categories"]; _b < _c.length; _b++) {
                    var category = _c[_b];
                    if (category['type'] == "Activité groupe / association") {
                        this.allCategories.push({
                            id: category.id,
                            name: category.name,
                            type: category.type
                        });
                    }
                }
            }
        }
    };
    PublishPage.prototype.onChangeCommuCommu = function () {
        this.article.category = null;
        this.article.heading = null;
        this.allCategories = [];
        this.allHeadings = [];
        for (var _i = 0, _a = this.adminCommunities; _i < _a.length; _i++) {
            var allCommu = _a[_i];
            if (this.article.group == allCommu["id"]) {
                this.hasSondage = allCommu['survey'];
                this.articleActivated = allCommu['article'];
                this.events.city = allCommu["cityName"];
                for (var _b = 0, _c = allCommu["categories"]; _b < _c.length; _b++) {
                    var catego = _c[_b];
                    if (catego['type'] == "Activité groupe / association") {
                        this.allCategories.push({
                            id: catego.id,
                            name: catego.name,
                            type: catego.type,
                        });
                    }
                }
                if (allCommu["articleHeading"]) {
                    for (var _d = 0, _e = allCommu["articleHeading"]; _d < _e.length; _d++) {
                        var heading = _e[_d];
                        this.allHeadings.push({
                            id: heading.id,
                            title: heading.title,
                        });
                    }
                }
                this.article.community = allCommu["id"];
            }
        }
        this.disabledTheme = this.allCategories.length == 0;
        this.disabledDedicated = this.allHeadings.length == 0;
    };
    PublishPage.prototype.goToSlide = function (nbreSlide) {
        this.slides.slideTo(500, nbreSlide);
    };
    PublishPage.prototype.saveArticle = function (errorValidation, title, description) {
        var _this = this;
        this.submited = true;
        if (!errorValidation) {
            this.isSubmitEnabled = false;
            this.article.city = this.events.city;
            if (this.accountType == 'association' || this.accountType == 'merchant' || this.accountType == 'community') {
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
                    this.article.publicAt.fullDate = this.events.endDate.year +
                        "-" + this.article.publicAt.month +
                        "-" + this.article.publicAt.day +
                        " " + this.article.publicAt.hour +
                        ":" + this.article.publicAt.minute;
                }
                else {
                    this.events.startDate.fullDate = this.globals.IsoToDateString(this.events.startDate.fullDate);
                    this.events.endDate.fullDate = this.globals.IsoToDateString(this.events.endDate.fullDate);
                    this.article.publicAt.fullDate = this.globals.IsoToDateString(this.article.publicAt.fullDate);
                }
                this.isSubmitEnabled = false;
                var loadingPopup_1 = this.loadingCtrl.create({});
                loadingPopup_1.present();
                if (this.showEvent && (this.accountType == 'association' || this.accountType == 'community')) {
                    this.events.title = this.article.title;
                    this.article.push.content = this.evtdescription;
                    this.events.description = this.article.description;
                    this.events.private = this.article.private;
                    if (this.article.photo) {
                        this.events.photo = this.article.photo;
                    }
                    else {
                        this.events.photo = null;
                    }
                    if (this.article.photos) {
                        this.events.photos = this.article.photos;
                    }
                    else {
                        this.events.photos = null;
                    }
                    this.events.categories = this.article.category;
                    this.article.push.hour = this.globals.IsoToDateString(this.article.push.hour);
                    this.serviceEvent.postEvent(this.accountType, this.article.group, this.events).then(function (data) {
                        console.log(JSON.stringify(_this.article));
                        if (data.success) {
                            _this.idEvent = data.id;
                            _this.article.event = _this.idEvent;
                            _this.article.push.content = _this.evtdescription;
                            _this.articleService.postArticle(_this.accountType, _this.article.group, _this.article).then(function (data) {
                                loadingPopup_1.dismiss();
                                _this.event.publish('association:refresh');
                                _this.event.publish('news:refresh');
                                var successAlert = _this.alertCtrl.create({
                                    title: 'Succès',
                                    subTitle: 'Votre article a été ajouté avec succès.',
                                    buttons: [
                                        {
                                            text: 'OK',
                                            handler: function () {
                                                _this.isSubmitEnabled = true;
                                                _this.Close();
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
                    }, function (err) {
                        loadingPopup_1.dismiss();
                        _this.isSubmitEnabled = true;
                        _this.event.publish('http:errors', err);
                    });
                    this.ga.startTrackerWithId('UA-105582305-1')
                        .then(function () {
                        _this.ga.trackEvent('event', 'click', 'createEvent', 1, true);
                        // Tracker is ready
                        // You can now track pages or set additional information such as AppVersion or UserId
                    })
                        .catch();
                    this.ga.startTrackerWithId(localStorage.getItem('ga'))
                        .then(function () {
                        _this.ga.trackEvent('event', 'click', 'createEvent', 1, true);
                        // Tracker is ready
                        // You can now track pages or set additional information such as AppVersion or UserId
                    })
                        .catch();
                }
                else if (this.accountType == "merchant") { //goodPlan
                    console.log(' platform = ' + this.platform.is('core'));
                    console.log("this merchant");
                    this.events.push.hour = this.globals.IsoToDateString(this.article.push.hour);
                    this.article.push.content = this.evtdescription;
                    this.events.push.enabled = this.article.push.enabled;
                    this.events.push.date = this.article.push.date;
                    this.events.title = this.article.title;
                    this.events.description = this.article.description;
                    this.events.private = this.article.private;
                    if (this.article.photo) {
                        this.events.photo = this.article.photo;
                    }
                    else {
                        this.events.photo = null;
                    }
                    if (this.article.photos) {
                        this.events.photos = this.article.photos;
                    }
                    else {
                        this.events.photos = null;
                    }
                    this.events.categories = this.article.category;
                    this.events.document = this.article.document;
                    //this.events.article.hour = this.globals.IsoToDateString(this.events.article.hour);
                    this.serviceGoodPlan.postGoodPlan(this.accountType, this.article.group, this.events).then(function (data) {
                        if (data.success) {
                            loadingPopup_1.dismiss();
                            var successAlert = _this.alertCtrl.create({
                                title: 'Succès',
                                subTitle: 'Votre bon plan a été ajouté avec succès.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        handler: function () {
                                            _this.isSubmitEnabled = true;
                                            _this.Close();
                                        }
                                    }
                                ]
                            });
                            successAlert.present();
                        }
                    }, function (err) {
                        loadingPopup_1.dismiss();
                        _this.isSubmitEnabled = true;
                        _this.event.publish('http:errors', err);
                    });
                }
                else {
                    //Add article Citizen or Association or Community
                    this.article.push.content = this.evtdescription;
                    this.articleService.postArticle(this.accountType, this.article.group, this.article).then(function (data) {
                        _this.event.publish('association:refresh');
                        _this.event.publish('news:refresh');
                        loadingPopup_1.dismiss();
                        _this.event.publish('association:refresh');
                        var successAlert = _this.alertCtrl.create({
                            title: 'Succès',
                            subTitle: 'Votre article a été ajouté avec succès.',
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: function (data) {
                                        _this.isSubmitEnabled = true;
                                        _this.Close();
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
                if (this.platform.is('core')) {
                    this.article.publicAt.fullDate = this.article.publicAt.year +
                        "-" + this.article.publicAt.month +
                        "-" + this.article.publicAt.day +
                        " " + this.article.publicAt.hour +
                        ":" + this.article.publicAt.minute;
                }
                else {
                    // get string date for ws
                    this.article.publicAt.fullDate = this.globals.IsoToDateString(this.article.publicAt.fullDate);
                }
                var loadingPopup_2 = this.loadingCtrl.create({});
                loadingPopup_2.present();
                this.article.push.content = this.evtdescription;
                this.articleService.postCitoyenArticle(this.currentUser.id, this.article).then(function (data) {
                    loadingPopup_2.dismiss();
                    _this.items.splice(0, 0, data);
                    _this.event.publish('association:refresh');
                    _this.event.publish('news:refresh');
                    var successAlert = _this.alertCtrl.create({
                        title: 'Succès',
                        subTitle: 'Votre article a été ajouté avec succès.',
                        buttons: [
                            {
                                text: 'OK',
                                handler: function (data) {
                                    _this.isSubmitEnabled = true;
                                    _this.article = {
                                        title: null,
                                        photo: null,
                                        photos: null,
                                        videoFile: null,
                                        document: null,
                                        secondPhoto: '',
                                        thirdPhoto: '',
                                        push: {
                                            enabled: false,
                                            date: new Date().toISOString(),
                                            hour: new Date().toISOString(),
                                            content: ""
                                        },
                                        description: null,
                                        community: null,
                                        city: null,
                                        category: null,
                                        event: '',
                                        group: null,
                                        private: false,
                                        heading: null,
                                        publicAt: {
                                            year: __WEBPACK_IMPORTED_MODULE_10_moment__().year(),
                                            month: __WEBPACK_IMPORTED_MODULE_10_moment__().month() + 1,
                                            day: __WEBPACK_IMPORTED_MODULE_10_moment__().date(),
                                            hour: __WEBPACK_IMPORTED_MODULE_10_moment__().hour(),
                                            minute: __WEBPACK_IMPORTED_MODULE_10_moment__().minute(),
                                            fullDate: __WEBPACK_IMPORTED_MODULE_10_moment__().format()
                                        }
                                    };
                                    _this.Close();
                                }
                            }
                        ]
                    });
                    successAlert.present();
                }, function (err) {
                    _this.isSubmitEnabled = true;
                    loadingPopup_2.dismiss();
                    _this.event.publish('http:errors', err);
                });
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
    PublishPage.prototype.captureVideo = function () {
        var _this = this;
        var options = { duration: 45 };
        this.mediaCapture.captureVideo(options)
            .then(function (res) {
            var video = res[0];
            var fileName = video.name;
            var fullPath = video['localURL'];
            var directory = fullPath.substring(0, fullPath.lastIndexOf("/") + 1);
            _this.file.readAsDataURL(directory, fileName).then(function (file64) {
                _this.article.videoFile = file64;
            }).catch(function (err) {
                console.log("ERR : " + err);
            });
        }, function (err) {
            console.log("ERROR");
        }).catch(function (err) {
            console.log("VideoERRORVideo : " + err);
        }).catch((function (err) {
            console.log("VideoERRORVideo22 : " + err);
        }));
    };
    PublishPage.prototype.takePicture = function () {
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
    PublishPage.prototype.loadImageFromLibrary = function () {
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
    PublishPage.prototype.loadVideoFromLibrary = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.NATIVE_URI,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            quality: 100,
            mediaType: this.camera.MediaType.VIDEO,
            allowEdit: false
        }).then(function (videoName) {
            if (_this.platform.is('android')) {
                videoName = "file://" + videoName;
                var directory = videoName.substring(0, videoName.lastIndexOf("/") + 1);
                var fileName = videoName.substring(videoName.lastIndexOf("/") + 1);
                _this.file.readAsDataURL(directory, fileName).then(function (file64) {
                    _this.article.videoFile = file64;
                }).catch(function (error) {
                    console.log("Error : " + error.message);
                });
            }
            else {
                console.log(videoName);
                var fileData = _this.filesProvider.parseFilePath(videoName);
                console.log("Dir : " + fileData.directory);
                console.log("File : " + fileData.fileName);
                _this.file.readAsDataURL(fileData.directory, fileData.fileName).then(function (file64) {
                    _this.article.videoFile = file64;
                }).catch(function (error) {
                    console.log("Error : " + error.message);
                });
            }
        });
    };
    PublishPage.prototype.deleteVideo = function () {
        this.article.videoFile = null;
    };
    PublishPage.prototype.deletePhotos = function (index) {
        this.article.photos.splice(index, 1);
    };
    PublishPage.prototype.presentActionSheet = function () {
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
        //this.goToSlide(this.listPhotos.length);
    };
    PublishPage.prototype.presentActionSheetDocument = function () {
        var _this = this;
        this.filesProvider.presentFileChooser(function (base64) {
            _this.article.document = base64;
        }, function (failure) {
            document.getElementById("fileInput").click();
        });
    };
    PublishPage.prototype.onFileChange = function (event) {
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
                        _this.article.document = reader.result;
                    }
                    else {
                        _this.filesProvider.generateMimeTypeError();
                    }
                };
            }
        }
    };
    PublishPage.prototype.deleteDocument = function () {
        this.article.document = null;
    };
    PublishPage.prototype.deletePhoto = function (index) {
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
    PublishPage.prototype.Close = function () {
        this.event.publish('news:refresh');
        this.event.publish('agenda:refresh');
        this.view.dismiss('close');
    };
    PublishPage.prototype.capitalize = function (event, type) {
        if (event) {
            if (type == 'title') {
                this.article.title = event.charAt(0).toUpperCase() + event.slice(1);
            }
            if (type == 'description') {
                this.article.description = event.charAt(0).toUpperCase() + event.slice(1);
            }
        }
    };
    PublishPage.prototype.checkDate = function () {
        var DateStart;
        var DateEnd;
        if (this.platform.is('core')) {
            DateStart = this.events.startDate.year +
                "-" + this.events.startDate.month +
                "-" + this.events.startDate.day +
                " " + this.events.startDate.hour +
                ":" + this.events.startDate.minute;
            DateEnd = this.events.endDate.year +
                "-" + this.events.endDate.month +
                "-" + this.events.endDate.day +
                " " + this.events.endDate.hour +
                ":" + this.events.endDate.minute;
        }
        else {
            // get string date for ws
            DateStart = this.globals.IsoToDateString(this.events.startDate.fullDate);
            DateEnd = this.globals.IsoToDateString(this.events.endDate.fullDate);
        }
        if ((__WEBPACK_IMPORTED_MODULE_10_moment__(DateEnd).diff(__WEBPACK_IMPORTED_MODULE_10_moment__(DateStart)) <= 0)) {
            this.dateEndError = true;
        }
        else {
            this.dateEndError = false;
        }
    };
    PublishPage.prototype.pad = function (d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    };
    PublishPage.prototype.openEvent = function (e) {
        this.showEvent = e._value;
    };
    PublishPage.prototype.removeCategory = function (category) {
        category = category.toString();
        var stringCategories = [];
        for (var _i = 0, _a = this.article.category; _i < _a.length; _i++) {
            var c = _a[_i];
            stringCategories.push(c.toString());
        }
        var foundAt = stringCategories.findIndex(function (i) { return i == category; });
        if (foundAt != -1) {
            stringCategories.splice(foundAt, 1);
            this.article.category = stringCategories;
        }
    };
    PublishPage.prototype.removeSecondCategory = function (category) {
        category = category.toString();
        var stringCategories = [];
        for (var _i = 0, _a = this.events.secondCategories; _i < _a.length; _i++) {
            var c = _a[_i];
            stringCategories.push(c.toString());
        }
        var foundAt = stringCategories.findIndex(function (i) { return i == category; });
        if (foundAt != -1) {
            stringCategories.splice(foundAt, 1);
            this.events.secondCategories = stringCategories;
        }
    };
    PublishPage.prototype.onChangeCategory = function (selected) {
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
    PublishPage.prototype.onChangeSecondCategory = function (selected) {
        this.secondCategoryNames = [];
        var _loop_2 = function (c) {
            var index = this_2.allSecondCategories.findIndex(function (i) { return i.id == c; });
            if (index != -1) {
                this_2.secondCategoryNames.push(this_2.allSecondCategories[index]);
            }
        };
        var this_2 = this;
        for (var _i = 0, selected_2 = selected; _i < selected_2.length; _i++) {
            var c = selected_2[_i];
            _loop_2(c);
        }
    };
    PublishPage.prototype.onChangePrivate = function (selected) {
        if (selected.checked) {
            this.disabledCommunity = true;
            this.article.community = null;
            this.disabledMerchant = false;
            if (this.accountType == "citoyen") {
                this.disabledTheme = true;
                this.article.category = null;
                this.allCategories = [];
            }
        }
        else {
            this.disabledCommunity = false;
            if (this.accountType == "citoyen") {
                this.article.group = null;
            }
            this.disabledMerchant = true;
        }
    };
    PublishPage.prototype.onChangeHeading = function (selected) {
        if (selected.checked) {
            this.disabledHeading = false;
        }
        else {
            this.disabledHeading = true;
            this.article.heading = null;
        }
    };
    PublishPage.prototype.OnChangeRoom = function (selected) {
        var _this = this;
        if (selected.checked) {
            var myModal2 = this.modal.create('PopupAskRoomPage', null, { cssClass: 'style-modal modalRoom' });
            myModal2.onDidDismiss(function (data) {
                if (data) {
                    _this.events.mailForRoom = data;
                }
                else {
                    _this.events.mailForRoom = null;
                    _this.events.room = false;
                }
            });
            myModal2.present();
        }
        else {
            this.events.mailForRoom = null;
        }
    };
    PublishPage.prototype.loadAdress = function (loadingPopup) {
        var _this = this;
        if (this.accountType == "association") {
            this.service = this.associationService;
        }
        else if (this.accountType == "merchant") {
            this.service = this.merchantService;
        }
        this.service.getDetails(this.account.id).then(function (data) {
            _this.events.address = data.address;
            _this.events.city = data.city.name;
            loadingPopup.dismiss();
        }, function (err) {
            loadingPopup.dismiss();
            _this.event.publish('http:errors', err);
        });
    };
    PublishPage.prototype.goBack = function () {
        this.view.dismiss();
    };
    PublishPage.prototype.showMoreEvent = function () {
        this.moreEvent = !this.moreEvent;
    };
    PublishPage.prototype.showMore = function () {
        this.publicDate = !this.publicDate;
        var currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes());
        currentDate.setHours(currentDate.getHours() + 1);
        this.article.publicAt.fullDate = currentDate.toISOString();
        this.minPublicDate = currentDate.toISOString();
    };
    PublishPage.prototype.checkFocus = function (element) {
        if (this.platform.is('android')) {
            var requiredElement = element.target.offsetParent.parentElement;
            var yOffset = requiredElement.offsetTop;
            var test = yOffset - 40;
            this.content.scrollTo(0, test, 2000);
        }
    };
    PublishPage.prototype.popSondage = function () {
        var _this = this;
        if (this.article.group) {
            this.surveyDisabled = false;
            var myModal2 = this.modal.create('SondagePage', {
                "community": this.article.community
            }, { cssClass: 'style-modal' });
            myModal2.onDidDismiss(function (data) {
                if (data) {
                    _this.Close();
                }
            });
            myModal2.present();
        }
        else {
            this.surveyDisabled = true;
        }
    };
    PublishPage.prototype.SelectCity = function () {
        var _this = this;
        var myModal2 = this.modal.create('SelectCityPage', {}, { cssClass: 'cities-modal' });
        myModal2.onDidDismiss(function (data) {
            if (data) {
                _this.events.city = data.name;
            }
        });
        myModal2.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* Slides */])
    ], PublishPage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], PublishPage.prototype, "content", void 0);
    PublishPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-publish',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\publish\publish.html"*/'<!--\n\n  Generated template for the PublishPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header> \n\n    <ion-row class="header-popin" no-padding>\n\n        <ion-col class="no-padding " text-left>\n\n            <button ion-button clear small type="button" color="primary" no-margin no-padding>\n\n                <!--<ion-icon name="ios-create-outline"></ion-icon>-->\n\n                <img class="editimg" src="assets/imgs/icons/edit.png">\n\n\n\n            </button>\n\n        </ion-col>\n\n        <ion-col class="no-padding " text-center>\n\n            <h5 class="primary-color title-popin" no-margin>Publier</h5>\n\n        </ion-col>\n\n        <ion-col class="no-padding " text-right>\n\n            <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="goBack()">\n\n                <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n            </button>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-header>\n\n<ion-content padding>\n\n    <ion-col col-12 text-centre class="padding-top">\n\n        <form  #publishForm="ngForm">\n\n            <ion-grid class="margin-top-grid padding-horizontal">\n\n                <ion-row text-center>\n\n                    <ion-col col-12 text-center *ngIf="accountType == \'association\'">\n\n\n\n                        <ion-item class="item-grey select-not-ie no-padding-left"  [class.formError]="group.invalid && (group.dirty || submited || group.touched)">\n\n                            <ion-select (ionChange)="onChangeCommuAsso($event)" required [(ngModel)]="article.group" #group="ngModel" class="select-white no-padding-left" placeholder="Groupe / Association" name="group" submitText="Ok" cancelText="Annuler">\n\n                                <ion-option *ngFor="let asso of listAccount" value="{{asso.id}}">{{asso.name}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-col class="item-grey select-ie no-padding-left"  [class.formError]="group.invalid && (group.dirty || submited || group.touched)">\n\n                            <select required (ionChange)="onChangeCommuAsso($event)" [(ngModel)]="article.group" #group="ngModel" class="select-white input-select-ie margin-top-select margin-bottom-select padding-right no-padding-left"\n\n                                    placeholder="Groupe / Association" name="group">\n\n                                <option *ngFor="let asso of listAccount" value="{{asso.id}}">{{asso.name}}</option>\n\n                            </select>\n\n                        </ion-col>\n\n                        <div class="error-msg" *ngIf="(group.invalid && (group.dirty || submited || group.touched))">\n\n                            <span class="error">Le champs Groupe / Association est obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center *ngIf="accountType == \'community\'">\n\n                        <ion-item class="item-grey select-not-ie no-padding-left"  [class.formError]="group.invalid && (group.dirty || submited || group.touched || surveyDisabled)">\n\n                            <ion-select (ionChange)="onChangeCommuCommu($event)" required [(ngModel)]="article.group" #group="ngModel" class="select-white no-padding-left" placeholder="Communauté" name="group" submitText="Ok" cancelText="Annuler">\n\n                                <ng-container *ngFor="let community of adminCommunities">\n\n                                    <ion-option  *ngIf="community.survey || community.article" value="{{community.id}}">{{community.name}}</ion-option>\n\n                                </ng-container>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-col class="item-grey select-ie no-padding-left"  [class.formError]="group.invalid && (group.dirty || submited || group.touched || surveyDisabled)">\n\n                            <select required (ionChange)="onChangeCommuCommu($event)" [(ngModel)]="article.group" #group="ngModel" class="select-white input-select-ie margin-top-select margin-bottom-select padding-right no-padding-left"\n\n                                    placeholder="Communauté" name="group">\n\n                                <ng-container *ngFor="let community of adminCommunities">\n\n                                    <option *ngIf="community.survey || community.article" value="{{community.id}}">{{community.name}}</option>\n\n                                </ng-container>\n\n                            </select>\n\n                        </ion-col>\n\n                        <div class="error-msg" *ngIf="(group.invalid && (group.dirty || submited || group.touched || surveyDisabled))">\n\n                            <span class="error">Le champs communauté est obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center *ngIf="accountType == \'merchant\'">\n\n\n\n                        <ion-item class="item-grey select-not-ie no-padding-left"  [class.formError]="group.invalid && (group.dirty || submited || group.touched)">\n\n                            <ion-select (ionChange)="onChangeCommuAsso($event)" required [(ngModel)]="article.group" #group="ngModel" class="select-white no-padding-left" placeholder="Commerce / Partenaire" name="group" submitText="Ok" cancelText="Annuler">\n\n                                <ion-option *ngFor="let merchant of listAccount" value="{{merchant.id}}">{{merchant.name}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-col class="item-grey select-ie no-padding-left"  [class.formError]="group.invalid && (group.dirty || submited || group.touched)">\n\n                            <select (ionChange)="onChangeCommuAsso($event)" required [(ngModel)]="article.group" #group="ngModel" class="select-white input-select-ie margin-top-select margin-bottom-select padding-right no-padding-left"\n\n                                    placeholder="Commerce / Partenaire" name="group">\n\n                                <option *ngFor="let merchant of listAccount" value="{{merchant.id}}">{{merchant.name}}</option>\n\n                            </select>\n\n                        </ion-col>\n\n                        <div class="error-msg" *ngIf="(group.invalid && (group.dirty || submited || group.touched))">\n\n                            <span class="error">Le champs Commerce / Partenaire est obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center class="privateContent select-not-ie" *ngIf="accountType != \'community\' && accountType != \'citoyen\'">\n\n                        <ion-item class="item-input no-padding-left">\n\n                            <ion-label color="h-color"> <img class="imglock" src="assets/imgs/icons/lock.png" alt="NOUS-Ensemble" />C\'est un contenu privé</ion-label>\n\n                            <ion-toggle name="private" (ionChange)="onChangePrivate($event)" [(ngModel)]="article.private" checked="false"></ion-toggle>\n\n                        </ion-item>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center class="privateContent select-not-ie" *ngIf="accountType == \'citoyen\'">\n\n                        <ion-item class="item-input no-padding-left">\n\n                            <ion-label color="h-color"> <img class="imglock" src="assets/imgs/icons/lock.png" alt="NOUS-Ensemble" />C\'est un contenu privé</ion-label>\n\n                            <ion-toggle [disabled]="listAccount.length < 1" name="private" (ionChange)="onChangePrivate($event)" [(ngModel)]="article.private" checked="false"></ion-toggle>\n\n                        </ion-item>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center *ngIf="accountType == \'community\' && hasSondage">\n\n                        <button ion-button round type="button" class="button-white button-survey" no-padding (click)="popSondage()">\n\n                            <div class="block-image"><img src="assets/imgs/icons/survey.png" class="img-survey"></div>\n\n                            <div class="block-name">C\'est un sondage</div>\n\n                            <div class="block-icon">\n\n                            </div>\n\n                        </button>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center class="select-not-ie privateContent" *ngIf="accountType == \'community\'">\n\n                        <ion-item class="item-input no-padding-left">\n\n                            <ion-label color="h-color">C\'est une publication à <br/> garder sur la page dédiée</ion-label>\n\n                            <ion-toggle [disabled]="disabledDedicated" name="private" (ionChange)="onChangeHeading($event)" checked="false"></ion-toggle>\n\n                        </ion-item>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center *ngIf="accountType == \'community\'">\n\n\n\n                        <ion-item class="item-grey select-not-ie no-padding-left"  [class.formError]="heading.invalid && (heading.dirty || submited || heading.touched)">\n\n                            <ion-select [disabled]="disabledHeading" [required]="!disabledHeading" [(ngModel)]="article.heading" #heading="ngModel" class="select-white no-padding-left" placeholder="Grand projet de ville" name="heading" submitText="Ok" cancelText="Annuler">\n\n                                <ion-option *ngFor="let heading of allHeadings" value="{{heading.id}}">{{heading.title}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-col class="item-grey select-ie no-padding-left"  [class.formError]="heading.invalid && (heading.dirty || submited || heading.touched)">\n\n                            <select [disabled]="disabledHeading" [required]="!disabledHeading" [(ngModel)]="article.heading" #heading="ngModel" class="select-white input-select-ie margin-top-select margin-bottom-select padding-right no-padding-left"\n\n                                    placeholder="Grand projet de ville" name="heading">\n\n                                <option *ngFor="let heading of allHeadings" value="{{heading.id}}">{{heading.title}}</option>\n\n                            </select>\n\n                        </ion-col>\n\n                        <div class="error-msg" *ngIf="(heading.invalid && (heading.dirty || submited || heading.touched))">\n\n                            <span class="error">Champs Grand projet de ville obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center *ngIf="accountType == \'citoyen\'">\n\n\n\n                        <ion-item class="item-grey select-not-ie no-padding-left"  [class.formError]="group.invalid && (group.dirty || submited || group.touched)">\n\n                            <ion-select (ionChange)="onChangeEtablish($event)" [disabled]="disabledMerchant" [required]="!disabledMerchant" [(ngModel)]="article.group" #group="ngModel" class="select-white no-padding-left" placeholder="Choix groupe/établissement" name="group" submitText="Ok" cancelText="Annuler">\n\n                                <ion-option *ngFor="let group of listAccount" value="{{group.type}}-{{group.id}}">{{group.name}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-col class="item-grey select-ie no-padding-left"  [class.formError]="group.invalid && (group.dirty || submited || group.touched)">\n\n                            <select (ionChange)="onChangeEtablish($event)" [disabled]="disabledMerchant" [required]="!disabledMerchant" [(ngModel)]="article.group" #group="ngModel" class="select-white input-select-ie margin-top-select margin-bottom-select padding-right no-padding-left"\n\n                                    placeholder="Choix groupe/établissement" name="group">\n\n                                <option *ngFor="let group of listAccount" value="{{group.type}}-{{group.id}}">{{group.name}}</option>\n\n                            </select>\n\n                        </ion-col>\n\n                        <div class="error-msg" *ngIf="(group.invalid && (group.dirty || submited || group.touched))">\n\n                            <span class="error">Champs groupe / établissement obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row text-center>\n\n                    <ion-col col-12 text-center no-padding class="margin-top">\n\n\n\n                        <div>\n\n                            <ion-slides class="image home-card-slides" pager>\n\n                                <ion-slide *ngIf="article.photo">\n\n                                    <img src="{{article.photo}}" *ngIf="article.photo">\n\n\n\n                                    <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhoto(1);"\n\n                                        *ngIf="article.photo"></ion-icon>\n\n\n\n                                </ion-slide>\n\n                                <div *ngFor="let item of article.photos; let i = index">\n\n                                    <ion-slide *ngIf="item">\n\n\n\n                                        <img src="{{item}}" *ngIf="item">\n\n                                        <ion-icon name="trash" class="icon-delete delete-icon" (click)="deletePhotos(i);"\n\n                                            *ngIf="item"></ion-icon>\n\n                                    </ion-slide>\n\n                                </div>\n\n\n\n                            </ion-slides>\n\n                        </div>\n\n\n\n                        <div *ngIf="article.photos && article.photos.length <= 8;">\n\n                            <img class="button-img" src="assets/imgs/icons/button.png" (click)="presentActionSheet()">\n\n                        </div>\n\n                        <div *ngIf="!article.photos">\n\n                            <img class="button-img" src="assets/imgs/icons/button.png" (click)="presentActionSheet()">\n\n                        </div>\n\n                        <div *ngIf="article.videoFile" style="position: relative;">\n\n                                	<img class="button-img" src="assets/imgs/icons/video.png">\n\n                                    <ion-icon name="trash" \n\n                                    	class="icon-delete delete-icon" \n\n                                    	(click)="deleteVideo();"\n\n                                        *ngIf="article.videoFile">\n\n                                    </ion-icon>\n\n                        </div>\n\n                        <div *ngIf="article.document" style="position: relative;">\n\n                            <img class="button-img" src="assets/imgs/icons/doc-icon.png">\n\n                            <ion-icon name="trash"\n\n                                      class="icon-delete delete-icon"\n\n                                      (click)="deleteDocument();"\n\n                                      *ngIf="article.document">\n\n                            </ion-icon>\n\n                        </div>\n\n\n\n                        <div>\n\n\n\n                            <input type="file" id="fileInput" (change)="onFileChange($event)" >\n\n\n\n                        </div>\n\n                        <!-- <p class="indication" *ngIf="accountType == \'association\' || this.accountType == \'merchant\'">(Jusqu\'à 3 photos)</p> -->\n\n                    </ion-col>\n\n\n\n                </ion-row>\n\n\n\n            </ion-grid>\n\n\n\n            <ion-grid class="padding-horizontal">\n\n\n\n                <ion-row>\n\n\n\n                    <ion-col col-12 text-center class="margin-top select-not-ie">\n\n\n\n                        <ion-item class="no-padding-left" [class.formError]="titre.invalid && (titre.dirty || submited || titre.touched)">\n\n                            <ion-input autocomplete="on" autocorrect="on" name="titre" type="text" id="titre" placeholder="Titre" [(ngModel)]="article.title"\n\n                                #titre="ngModel" (change)="capitalize($event.target.value, \'title\')" (focus)="checkFocus($event)"\n\n                                required></ion-input>\n\n                        </ion-item>\n\n\n\n                        <div style="width: 90%;\n\n                        text-align: right;">\n\n                            <button class="emojiPosition" ion-button clear icon-only (click)="toggled = !toggled"\n\n                            [(emojiPickerIf)]="toggled" [emojiPickerDirection]="\'top\'"\n\n                            (emojiPickerSelect)="handleSelection($event)">\n\n                            😃\n\n                            </button>\n\n                        </div>\n\n                        \n\n                        <div class="error-msg" *ngIf="titre.invalid && (titre.dirty || submited || titre.touched)">\n\n                            <span class="error">Champs titre obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <div style="width: 100%; height: 20px;"></div>\n\n                    <ion-col col-12 text-center class="margin-top select-ie">\n\n\n\n                        <ion-item class="no-padding-left">\n\n                            <ion-input autocomplete="on" autocorrect="on" name="titre" type="text" id="titre" placeholder="Titre" [(ngModel)]="article.title"\n\n                                #titre="ngModel" (change)="capitalize($event.target.value, \'title\')" (focus)="checkFocus($event)"\n\n                                required></ion-input>\n\n                        </ion-item>\n\n                        <div class="error-msg" *ngIf="invalidTitre">\n\n                            <span class="error">Champs titre obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center class="margin-top select-not-ie">\n\n\n\n                        <ion-item class="no-padding-left" style="padding-top: 15px;" [class.formError]="description.invalid && (description.dirty || submited || description.touched)">\n\n                            <ion-textarea autocomplete="on" autocorrect="on" name="description" placeholder="Description" [(ngModel)]="article.description"\n\n                                #description="ngModel" (change)="capitalize($event.target.value, \'description\')"\n\n                                (focus)="checkFocus($event)" required></ion-textarea>\n\n                        </ion-item>\n\n\n\n                        <div style="width: 90%;\n\n                        text-align: right;">\n\n                        <button style="position: absolute;\n\n                        top: 85%;\n\n                        left: 1%;" ion-button clear icon-only (click)="toggledDes= !toggledDes"\n\n                        [(emojiPickerIf)]="toggledDes" [emojiPickerDirection]="\'top\'"\n\n                        (emojiPickerSelect)="handleDescription($event)">\n\n                        😃\n\n                        </button>\n\n                        </div>\n\n                        <div class="error-msg" *ngIf="description.invalid && (description.dirty || submited || description.touched)">\n\n                            <span class="error">Champs description obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <div style="width: 100%; height: 30px;"></div>\n\n                    <ion-col col-12 text-center class="select-ie">\n\n\n\n                        <ion-item class="no-padding-left" style="padding-top: 15px;">\n\n                            <ion-textarea autocomplete="on" autocorrect="on" name="description" placeholder="Description" [(ngModel)]="article.description"\n\n                                #description="ngModel" (change)="capitalize($event.target.value, \'description\')"\n\n                                required></ion-textarea>\n\n                        </ion-item>\n\n                        <div class="error-msg" *ngIf="invalidDesc">\n\n                            <span class="error">Champs description obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-12 text-center  *ngIf="accountType == \'citoyen\' ; else elseBlock">\n\n                        <ion-item class="item-grey select-not-ie no-padding-left" [class.formError]="community.invalid && (community.dirty || submited || community.touched)">\n\n                            <ion-select (ionChange)="onChangeCommuCitoyen($event)" [disabled]="disabledCommunity" [required]="!disabledCommunity"  [(ngModel)]="article.community" #community="ngModel" class="select-white no-padding-left" placeholder="Communauté" name="communaute" submitText="Ok" cancelText="Annuler" required>\n\n                                <ion-option *ngFor="let community of linkedCommunities" value={{community.id}}>{{community.name}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-col class="item-grey select-ie no-padding-left" [class.formError]="community.invalid && (community.dirty || submited || community.touched)">\n\n                            <select (ionChange)="onChangeCommuCitoyen($event)" [disabled]="disabledCommunity" [required]="!disabledCommunity" [(ngModel)]="article.community" #community="ngModel" class="select-white input-select-ie margin-top-select margin-bottom-select padding-right no-padding-left"\n\n                                    placeholder="Communauté" name="community" required>\n\n                                <option *ngFor="let community of linkedCommunities" value={{community.id}}>{{community.name}}</option>\n\n                            </select>\n\n                        </ion-col>\n\n                        <div class="error-msg" *ngIf="community.invalid && (community.dirty || submited || community.touched)">\n\n                            <span class="error">Champs Communauté obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n                        <ion-col col-12 text-center no-pading-bottom>\n\n                            <ion-item class="item-grey select-not-ie no-padding-left" [class.formError]="category.invalid && (category.dirty || submited || category.touched)">\n\n                                <ion-select required class="select-white no-padding-left" placeholder="Thèmes *" name="category" submitText="Ok"\n\n                                    cancelText="Annuler" multiple="true" [(ngModel)]="article.category" #category="ngModel"\n\n                                    (ionChange)="onChangeCategory($event)">\n\n                                    <ion-option *ngFor="let category of allCategories" value={{category.id}}>{{category.name}}</ion-option>\n\n                                </ion-select>\n\n                            </ion-item>\n\n                            <ion-col no-padding class="select-padding-ie item-grey select-ie " style="padding: 0;"\n\n                                [class.formError]="category.invalid && (category.dirty || submited || category.touched)">\n\n                                <select required class="select-white input-select-ie select-multiple-ie padding-right no-padding-left"\n\n                                    placeholder="Thèmes *" name="category" multiple [(ngModel)]="article.category"\n\n                                    #category="ngModel">\n\n                                    <option *ngFor="let category of allCategories" value={{category.id}} (click)="onChangeCategory($event.srcElement.value)">{{category.name}}</option>\n\n                                </select>\n\n                            </ion-col>\n\n                            <div class="form-category">\n\n                                <div class="tags">\n\n                                    <div *ngFor="let category of categoryNames"><a>{{category.name}} <span (click)="removeCategory(category.id)">x</span></a></div>\n\n                                </div>\n\n                            </div>\n\n                            <div class="error-msg" *ngIf="category.invalid && (category.dirty || submited || category.touched)">\n\n                                <span class="error">Champs Thèmes obligatoire</span>\n\n                            </div>\n\n\n\n                        </ion-col>\n\n                    <ion-col col-12 text-center class="margin-top">\n\n                        <ion-item class="item-grey no-padding-left" [class.formError]="city.invalid && (city.dirty || submited || city.touched)">\n\n                            <ion-input (click)="SelectCity()"   readonly autocomplete="off" autocorrect="on" name="city" type="text" id="city" placeholder="Ville" [(ngModel)]="events.city"\n\n                                #city="ngModel" required></ion-input>\n\n                        </ion-item>\n\n                        <div text-center class="error-msg" *ngIf="city.invalid && (city.dirty || submited || city.touched)">\n\n                            <span class="error">Champs ville obligatoire</span>\n\n                        </div>\n\n                    </ion-col>\n\n\n\n                    <ion-col col-12 text-center *ngIf=" account.role != \'community_su_admin\'">\n\n                        <div class="form-item" *ngIf="publicDate" showWhen="core">\n\n                            <!-- start date -->\n\n                            <div col-12 class="label">\n\n                                <label>Date de publication:</label>\n\n                            </div>\n\n                            <ion-grid class="select-not-ie">\n\n                                <ion-row class="full-width">\n\n                                    <ion-col col-12 class="col-select-date center" no-padding>\n\n                                        <span>Le&nbsp;</span>\n\n                                        <select [class.formError]="publicAtYear.invalid && (publicAtYear.dirty || submited || publicAtYear.touched)"\n\n                                            [(ngModel)]="article.publicAt.year" #publicAtYear="ngModel" name="publicAtYear"\n\n                                            class="selected-date date">\n\n                                            <option disabled>Année</option>\n\n                                            <option *ngFor="let y of years" value="{{y}}">{{y}}</option>\n\n                                            <div class="select-icon-inner"></div>\n\n                                        </select>\n\n                                        <select [class.formError]="publicAtMonth.invalid && (publicAtMonth.dirty || submited || publicAtMonth.touched)"\n\n                                            [(ngModel)]="article.publicAt.month" #publicAtMonth="ngModel" name="publicAtMonth"\n\n                                            class="selected-date date">\n\n                                            <option disabled>Mois</option>\n\n                                            <option *ngFor="let m of months" [ngValue]="m.id">{{m.name}}</option>\n\n                                        </select>\n\n                                        <select [class.formError]="publicAtDay.invalid && (publicAtDay.dirty || submited || publicAtDay.touched)"\n\n                                            [(ngModel)]="article.publicAt.day" #publicAtDay="ngModel" name="publicAtDay"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Jour</option>\n\n                                            <option *ngFor="let d of days" [ngValue]="d">{{pad(d)}}</option>\n\n                                        </select>\n\n\n\n                                        <span>&nbsp;À&nbsp;</span>\n\n                                        <select [class.formError]="publicAtHour.invalid && (publicAtHour.dirty || submited || publicAtHour.touched)"\n\n                                            [(ngModel)]="article.publicAt.hour" #publicAtHour="ngModel" name="publicAtHour"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Heure</option>\n\n                                            <option *ngFor="let h of hours" [ngValue]="h">{{pad(h)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;H&nbsp;</span>\n\n                                        <select [class.formError]="publicAtMinute.invalid && (publicAtMinute.dirty || submited || publicAtMinute.touched)"\n\n                                            [(ngModel)]="article.publicAt.minute" #publicAtMinute="ngModel" name="publicAtMinute"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Minute</option>\n\n                                            <option *ngFor="let min of minutes" [ngValue]="min">{{pad(min)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;M&nbsp;</span>\n\n                                    </ion-col>\n\n                                </ion-row>\n\n                            </ion-grid>\n\n                            <ion-grid class="select-ie">\n\n                                <ion-row class="full-width">\n\n                                    <ion-col col-12 class="col-select-date center" no-padding>\n\n                                        <span>Le&nbsp;</span>\n\n                                        <select [class.formError]="publicAtYear.invalid && (publicAtYear.dirty || submited || publicAtYear.touched)"\n\n                                            [(ngModel)]="article.publicAt.year" #publicAtYear="ngModel" name="publicAtYear"\n\n                                            class="selected-date date">\n\n                                            <option disabled>Année</option>\n\n                                            <option *ngFor="let y of years" value="{{y}}">{{y}}</option>\n\n                                            <div class="select-icon-inner"></div>\n\n                                        </select>\n\n                                        <select [class.formError]="publicAtMonth.invalid && (publicAtMonth.dirty || submited || publicAtMonth.touched)"\n\n                                            [(ngModel)]="article.publicAt.month" #publicAtMonth="ngModel" name="publicAtMonth"\n\n                                            class="selected-date date">\n\n                                            <option disabled>Mois</option>\n\n                                            <option *ngFor="let m of months" [ngValue]="m.id">{{m.name}}</option>\n\n                                        </select>\n\n                                        <select [class.formError]="publicAtDay.invalid && (publicAtDay.dirty || submited || publicAtDay.touched)"\n\n                                            [(ngModel)]="article.publicAt.day" #publicAtDay="ngModel" name="publicAtDay"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Jour</option>\n\n                                            <option *ngFor="let d of days" [ngValue]="d">{{pad(d)}}</option>\n\n                                        </select>\n\n                                    </ion-col>\n\n                                    <ion-col col-12 class="col-select-date center" no-padding>\n\n                                        <span>&nbsp;À&nbsp;</span>\n\n                                        <select [class.formError]="publicAtHour.invalid && (publicAtHour.dirty || submited || publicAtHour.touched)"\n\n                                            [(ngModel)]="article.publicAt.hour" #publicAtHour="ngModel" name="publicAtHour"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Heure</option>\n\n                                            <option *ngFor="let h of hours" [ngValue]="h">{{pad(h)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;H&nbsp;</span>\n\n                                        <select [class.formError]="publicAtMinute.invalid && (publicAtMinute.dirty || submited || publicAtMinute.touched)"\n\n                                            [(ngModel)]="article.publicAt.minute" #publicAtMinute="ngModel" name="publicAtMinute"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Minute</option>\n\n                                            <option *ngFor="let min of minutes" [ngValue]="min">{{pad(min)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;M&nbsp;</span>\n\n                                    </ion-col>\n\n                                </ion-row>\n\n                            </ion-grid>\n\n                        </div>\n\n\n\n                        <div class="form-item" *ngIf="this.accountType != \'merchant\'">\n\n                            <a class="show-more" (click)="showMore()">(<span *ngIf="publicDate">-</span><span *ngIf="!publicDate">+</span>)\n\n                                Date de publication</a>\n\n                        </div>\n\n                        <div class="more-event-div" *ngIf="publicDate">\n\n                            <div class="form-item" showWhen="android, ios, windows">\n\n                                <ion-item class="item-grey">\n\n                                    <ion-datetime class="datetime-input" [(ngModel)]="article.publicAt.fullDate"\n\n                                        placeholder="Date de publication" name="publicAt" id="publicAt" displayFormat="DD/MM/YYYY HH:mm" [min]="minPublicDate"\n\n                                        min="2017" max="2030-10-31" pickerFormat="DD-MMMM-YYYY HH:mm" monthNames="Janvier, Février, Mars, Avril, Mai, Juin, Juillet, Août, Septembre, Octobre, Novembre, Décembre"\n\n                                        doneText="Ok" cancelText="Annuler">\n\n                                    </ion-datetime>\n\n                                </ion-item>\n\n                            </div>\n\n                        </div>\n\n                    </ion-col>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n                    <div class="more-event-div privateContent">\n\n                        <ion-col col-12 text-center>\n\n                            <ion-item class="item-grey" no-padding>\n\n                                <ion-label class="toggle-label" no-padding>\n\n                                    <div class="div-event without-icon">Envoyer une notification</div>\n\n                                </ion-label>\n\n                                <ion-toggle class="no-padding" [(ngModel)]="article.push.enabled" name="event"\n\n                                    checked="false" no-padding></ion-toggle>\n\n                            </ion-item>\n\n                        </ion-col>\n\n                        <div *ngIf="article.push.enabled">\n\n                            <div class="form-item">\n\n                                <ion-item class="item-grey" [class.formError]="push_date.invalid && (push_date.dirty || submited || push_date.touched)">\n\n                                    <ion-datetime #push_date="ngModel" name="push_date" placeholder="Date*" min="2017-08-31"\n\n                                        max="2030-12-31" displayFormat="DD/MM/YYYY" pickerFormat="DD-MMMM-YYYY"\n\n                                        name="push_date" [(ngModel)]="article.push.date" monthNames="Janvier, Février, Mars, Avril, Mai, Juin, Juillet, Août, Septembre, Octobre, Novembre, Décembre"\n\n                                        doneText="Ok" cancelText="Annuler" required>\n\n                                    </ion-datetime>\n\n                                </ion-item>\n\n                                <div class="error-msg" *ngIf="push_date.invalid && (push_date.dirty || submited || push_date.touched)">\n\n                                    <span class="error">Champs date obligatoire.</span>\n\n                                </div>\n\n                            </div>\n\n                            <div class="form-item">\n\n                                <ion-item class="item-grey" [class.formError]="push_hour.invalid && (push_hour.dirty || submited || push_hour.touched)">\n\n                                    <ion-datetime class="datetime-input" #push_hour="ngModel" minuteValues="0,5,10,15,20,25,30,35,40,45,50,55"\n\n                                        name="push_hour" placeholder="Heure*" displayFormat="HH:mm" pickerFormat="HH:mm"\n\n                                        [(ngModel)]="article.push.hour" doneText="Ok" cancelText="Annuler" required>\n\n                                    </ion-datetime>\n\n                                </ion-item>\n\n                                <div class="error-msg" *ngIf="push_hour.invalid && (push_hour.dirty || submited || push_hour.touched)">\n\n                                    <span class="error">Champs heure obligatoire.</span>\n\n                                </div>\n\n                            </div>\n\n                            <div class="form-item">\n\n                                <ion-col col-12 text-center class="margin-top select-not-ie">\n\n                                    <ion-item class="textAreaInput" style="padding-top: 15px;" [class.formError]="push_content.invalid && (push_content.dirty || submited || push_content.touched)">\n\n                                        <ion-textarea (change)="capitalize($event.target.value)" #push_content="ngModel"\n\n                                             class="form-input-text" name="push_content"\n\n                                            maxlength="140" type="text" id="title" placeholder="Description*..." [(ngModel)]="evtdescription"\n\n                                            required></ion-textarea>\n\n                                    </ion-item>\n\n\n\n                                    <div style="width: 90%;\n\n                                    text-align: right;">\n\n                                    <button style="position: absolute;\n\n                                    top: 78%;\n\n                                    left: 0%;" ion-button clear icon-only (click)="toggledContent= !toggledContent"\n\n                                    [(emojiPickerIf)]="toggledContent" [emojiPickerDirection]="\'top\'"\n\n                                    (emojiPickerSelect)="handleContent($event)">\n\n                                    😃\n\n                                    </button>\n\n                                    </div>\n\n                                    \n\n\n\n                                    <div class="error-msg" *ngIf="push_content.invalid && (push_content.dirty || submited || push_content.touched)">\n\n                                        <span class="error">Champs description obligatoire</span>\n\n                                    </div>\n\n                                </ion-col>\n\n                            </div>\n\n                        </div>\n\n                      \n\n                    </div>\n\n\n\n\n\n\n\n\n\n\n\n                    <div style="width: 100%; height: 20px;"></div>\n\n                    \n\n\n\n                    <ion-col col-12 text-center *ngIf="accountType == \'association\' || accountType == \'community\'">\n\n                        <ion-item class="item-input no-padding-left privateContent">\n\n                            <ion-label color="h-color"> <img class="imgcalendar" src="assets/imgs/icons/calendar.png" alt="NOUS-Ensemble" />C’est un évènement</ion-label>\n\n                            <ion-toggle name="event" (ionChange)="openEvent($event)" checked="false"></ion-toggle>\n\n                        </ion-item>\n\n                    </ion-col>\n\n\n\n                    <ion-col col-12 text-center *ngIf="accountType == \'merchant\'">\n\n                        <p class="secondCommuText">Organisation du bon plan</p>\n\n                    </ion-col>\n\n\n\n                    <ion-row class="step-row" text-center="" *ngIf="showEvent || accountType == \'merchant\'">\n\n                        <div class="form-item" showWhen="core">\n\n                            <!-- start date -->\n\n                            <div col-12 class="label">\n\n                                <label>Date de début:</label>\n\n                            </div>\n\n                            <ion-grid class="select-not-ie">\n\n                                <ion-row class="full-width">\n\n                                    <ion-col col-12 class="col-select-date center" no-padding>\n\n                                        <span>Le&nbsp;</span>\n\n                                        <select [class.formError]="startDateYear.invalid && (startDateYear.dirty || submited || startDateYear.touched)"\n\n                                            [(ngModel)]="events.startDate.year" #startDateYear="ngModel" name="startDateYear"\n\n                                            class="selected-date date" (change)="checkDate()" required>\n\n                                            <option disabled>Année</option>\n\n                                            <option *ngFor="let y of years" value="{{y}}">{{y}}</option>\n\n                                            <div class="select-icon-inner"></div>\n\n                                        </select>\n\n                                        <select [class.formError]="startDateMonth.invalid && (startDateMonth.dirty || submited || startDateMonth.touched)"\n\n                                            [(ngModel)]="events.startDate.month" #startDateMonth="ngModel" name="startDateMonth"\n\n                                            class="selected-date date" (change)="checkDate()" required>\n\n                                            <option disabled>Mois</option>\n\n                                            <option *ngFor="let m of months" [ngValue]="m.id">{{m.name}}</option>\n\n                                        </select>\n\n                                        <select [class.formError]="startDateDay.invalid && (startDateDay.dirty || submited || startDateDay.touched)"\n\n                                            [(ngModel)]="events.startDate.day" #startDateDay="ngModel" name="startDateDay"\n\n                                            class="selected-date hours" (change)="checkDate()" required>\n\n                                            <option disabled>Jour</option>\n\n                                            <option *ngFor="let d of days" [ngValue]="d">{{pad(d)}}</option>\n\n                                        </select>\n\n\n\n                                        <span>&nbsp;À&nbsp;</span>\n\n                                        <select [class.formError]="startDateHour.invalid && (startDateHour.dirty || submited || startDateHour.touched)"\n\n                                            [(ngModel)]="events.startDate.hour" #startDateHour="ngModel" name="startDateHour"\n\n                                            class="selected-date hours" (change)="checkDate()" required>\n\n                                            <option disabled>Heure</option>\n\n                                            <option *ngFor="let h of hours" [ngValue]="h">{{pad(h)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;H&nbsp;</span>\n\n                                        <select [class.formError]="startDateMinute.invalid && (startDateMinute.dirty || submited || startDateMinute.touched)"\n\n                                            [(ngModel)]="events.startDate.minute" #startDateMinute="ngModel" name="startDateMinute"\n\n                                            class="selected-date hours" (change)="checkDate()" required>\n\n                                            <option disabled>Minute</option>\n\n                                            <option *ngFor="let min of minutes" [ngValue]="min">{{pad(min)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;M&nbsp;</span>\n\n                                    </ion-col>\n\n                                </ion-row>\n\n                            </ion-grid>\n\n                            <ion-grid class="select-ie">\n\n                                <ion-row class="full-width">\n\n                                    <ion-col col-12 class="col-select-date center" no-padding>\n\n                                        <span>Le&nbsp;</span>\n\n                                        <select [class.formError]="startDateYear.invalid && (startDateYear.dirty || submited || startDateYear.touched)"\n\n                                            [(ngModel)]="events.startDate.year" #startDateYear="ngModel" name="startDateYear"\n\n                                            class="selected-date date" (change)="checkDate()" required>\n\n                                            <option disabled>Année</option>\n\n                                            <option *ngFor="let y of years" value="{{y}}">{{y}}</option>\n\n                                            <div class="select-icon-inner"></div>\n\n                                        </select>\n\n                                        <select [class.formError]="startDateMonth.invalid && (startDateMonth.dirty || submited || startDateMonth.touched)"\n\n                                            [(ngModel)]="events.startDate.month" #startDateMonth="ngModel" name="startDateMonth"\n\n                                            class="selected-date date" (change)="checkDate()" required>\n\n                                            <option disabled>Mois</option>\n\n                                            <option *ngFor="let m of months" [ngValue]="m.id">{{m.name}}</option>\n\n                                        </select>\n\n                                        <select [class.formError]="startDateDay.invalid && (startDateDay.dirty || submited || startDateDay.touched)"\n\n                                            [(ngModel)]="events.startDate.day" #startDateDay="ngModel" name="startDateDay"\n\n                                            class="selected-date hours" (change)="checkDate()" required>\n\n                                            <option disabled>Jour</option>\n\n                                            <option *ngFor="let d of days" [ngValue]="d">{{pad(d)}}</option>\n\n                                        </select>\n\n                                    </ion-col>\n\n                                    <ion-col col-12 class="col-select-date center marg-top" no-padding>\n\n                                        <span>&nbsp;À&nbsp;</span>\n\n                                        <select [class.formError]="startDateHour.invalid && (startDateHour.dirty || submited || startDateHour.touched)"\n\n                                            [(ngModel)]="events.startDate.hour" #startDateHour="ngModel" name="startDateHour"\n\n                                            class="selected-date hours" (change)="checkDate()" required>\n\n                                            <option disabled>Heure</option>\n\n                                            <option *ngFor="let h of hours" [ngValue]="h">{{pad(h)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;H&nbsp;</span>\n\n                                        <select [class.formError]="startDateMinute.invalid && (startDateMinute.dirty || submited || startDateMinute.touched)"\n\n                                            [(ngModel)]="events.startDate.minute" #startDateMinute="ngModel" name="startDateMinute"\n\n                                            class="selected-date hours" (change)="checkDate()" required>\n\n                                            <option disabled>Minute</option>\n\n                                            <option *ngFor="let min of minutes" [ngValue]="min">{{pad(min)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;M&nbsp;</span>\n\n                                    </ion-col>\n\n                                </ion-row>\n\n                            </ion-grid>\n\n                        </div>\n\n                        <div class="form-item" showWhen="core">\n\n                            <!-- end date -->\n\n                            <div col-12 class="label">\n\n                                <label>Date de fin:</label>\n\n                            </div>\n\n                            <ion-grid class="select-not-ie">\n\n                                <ion-row class="full-width">\n\n                                    <ion-col class="col-select-date center" no-padding>\n\n                                        <span>Le&nbsp;</span>\n\n                                        <select [(ngModel)]="events.endDate.year" name="endDateYear" (change)="checkDate()"\n\n                                            class="selected-date date">\n\n                                            <option disabled>Année</option>\n\n                                            <option *ngFor="let y of years" [ngValue]="y">{{y}}</option>\n\n                                        </select>\n\n                                        <select [(ngModel)]="events.endDate.month" name="endDateMonth" (change)="checkDate()"\n\n                                            class="selected-date date">\n\n                                            <option disabled>Mois</option>\n\n                                            <option *ngFor="let m of months" [ngValue]="m.id">{{m.name}}</option>\n\n                                        </select>\n\n                                        <select [(ngModel)]="events.endDate.day" name="endDateDay" (change)="checkDate()"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Jour</option>\n\n                                            <option *ngFor="let d of days" [ngValue]="d">{{pad(d)}}</option>\n\n                                        </select>\n\n\n\n                                        <span>&nbsp;À&nbsp;</span>\n\n                                        <select [(ngModel)]="events.endDate.hour" name="endDateHour" (change)="checkDate()"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Heure</option>\n\n                                            <option *ngFor="let h of hours" [ngValue]="h">{{pad(h)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;H&nbsp;</span>\n\n                                        <select [(ngModel)]="events.endDate.minute" name="endDateMinute" (change)="checkDate()"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Minute</option>\n\n                                            <option *ngFor="let min of minutes" [ngValue]="min">{{pad(min)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;M&nbsp;</span>\n\n                                    </ion-col>\n\n                                </ion-row>\n\n                            </ion-grid>\n\n                            <ion-grid class="select-ie">\n\n                                <ion-row class="full-width">\n\n                                    <ion-col col-12 class="col-select-date center" no-padding>\n\n                                        <span>Le&nbsp;</span>\n\n                                        <select [(ngModel)]="events.endDate.year" name="endDateYear" (change)="checkDate()"\n\n                                            class="selected-date date">\n\n                                            <option disabled>Année</option>\n\n                                            <option *ngFor="let y of years" [ngValue]="y">{{y}}</option>\n\n                                        </select>\n\n                                        <select [(ngModel)]="events.endDate.month" name="endDateMonth" (change)="checkDate()"\n\n                                            class="selected-date date">\n\n                                            <option disabled>Mois</option>\n\n                                            <option *ngFor="let m of months" [ngValue]="m.id">{{m.name}}</option>\n\n                                        </select>\n\n                                        <select [(ngModel)]="events.endDate.day" name="endDateDay" (change)="checkDate()"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Jour</option>\n\n                                            <option *ngFor="let d of days" [ngValue]="d">{{pad(d)}}</option>\n\n                                        </select>\n\n                                    </ion-col>\n\n                                    <ion-col col-12 class="col-select-date center marg-top" no-padding>\n\n                                        <span>&nbsp;À&nbsp;</span>\n\n                                        <select [(ngModel)]="events.endDate.hour" name="endDateHour" (change)="checkDate()"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Heure</option>\n\n                                            <option *ngFor="let h of hours" [ngValue]="h">{{pad(h)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;H&nbsp;</span>\n\n                                        <select [(ngModel)]="events.endDate.minute" name="endDateMinute" (change)="checkDate()"\n\n                                            class="selected-date hours">\n\n                                            <option disabled>Minute</option>\n\n                                            <option *ngFor="let min of minutes" [ngValue]="min">{{pad(min)}}</option>\n\n                                        </select>\n\n                                        <span>&nbsp;M&nbsp;</span>\n\n                                    </ion-col>\n\n                                </ion-row>\n\n                            </ion-grid>\n\n                        </div>\n\n                        <div class="form-item" *ngIf="dateEndError" showWhen="core">\n\n                            <div class="error-msg">\n\n                                <span class="error" *ngIf="dateEndError">La date de fin doit être supérieure à la date\n\n                                    de début.</span>\n\n                            </div>\n\n                        </div>\n\n                        <div class="form-item no-padding-left" showWhen="android, ios, windows">\n\n                            <ion-item class="item-grey" [class.formError]="(mStartDate.invalid && (mStartDate.dirty || submited || mStartDate.touched)) || dateEndError">\n\n                                <ion-datetime class="datetime-input" [(ngModel)]="events.startDate.fullDate"\n\n                                    #mStartDate="ngModel" placeholder="Date de début" name="mStartDate" id="mStartDate"\n\n                                    displayFormat="DD/MM/YYYY HH:mm" min="2017" max="2030-10-31" pickerFormat="DD-MMMM-YYYY HH:mm"\n\n                                    monthNames="Janvier, Février, Mars, Avril, Mai, Juin, Juillet, Août, Septembre, Octobre, Novembre, Décembre"\n\n                                    minuteValues="0,5,10,15,20,25,30,35,40,45,50,55" doneText="Ok" cancelText="Annuler"\n\n                                    (ionChange)="checkDate()" no-padding required>\n\n                                </ion-datetime>\n\n                            </ion-item>\n\n                            <div class="error-msg" *ngIf="mStartDate.invalid && (mStartDate.dirty || submited || mStartDate.touched)">\n\n                                <span class="error">Champs Date obligatoire</span>\n\n                            </div>\n\n                        </div>\n\n                        <div class="form-item no-padding-left" showWhen="android, ios, windows">\n\n                            <ion-item class="item-grey" [class.formError]="dateEndError">\n\n                                <ion-datetime class="datetime-input" [(ngModel)]="events.endDate.fullDate" placeholder="Date de fin"\n\n                                    name="mEndDate" id="mEndDate" displayFormat="DD/MM/YYYY HH:mm" min="2017" max="2030-10-31"\n\n                                    pickerFormat="DD-MMMM-YYYY HH:mm" monthNames="Janvier, Février, Mars, Avril, Mai, Juin, Juillet, Août, Septembre, Octobre, Novembre, Décembre"\n\n                                    minuteValues="0,5,10,15,20,25,30,35,40,45,50,55" doneText="Ok" cancelText="Annuler"\n\n                                    (ionChange)="checkDate()">\n\n                                </ion-datetime>\n\n                            </ion-item>\n\n                            <div class="error-msg" *ngIf="dateEndError">\n\n                                <span class="error">La date de fin doit être supérieure à la date de début.</span>\n\n                            </div>\n\n                        </div>\n\n                        <!-- end date -->\n\n                        <!-- adress -->\n\n                        <div class="form-item townSelect">\n\n                            <ion-item [class.formError]="address.invalid && (address.dirty || submited || address.touched)">\n\n                                <ion-input name="titre" type="text" id="address" name="address" placeholder="Adresse"\n\n                                    [(ngModel)]="events.address" (focus)="checkFocus($event)" #address="ngModel"\n\n                                    required></ion-input>\n\n                            </ion-item>\n\n                            <div class="error-msg" *ngIf="address.invalid && (address.dirty || submited || address.touched)">\n\n                                <span class="error">Champs adresse obligatoire</span>\n\n                            </div>\n\n                        </div>\n\n                        \n\n                        <div class="more-event-div privateContent" *ngIf=" (accountType == \'association\' || accountType == \'community\') ">\n\n                            \n\n                            <ion-col col-12 text-center *ngIf="accountType == \'association\'">\n\n                                <ion-item class="item-grey privateContent" no-padding>\n\n                                    <ion-label class="toggle-label" no-padding>\n\n                                        <div class="div-event without-icon">Besoin d’une salle / un terrain</div>\n\n                                    </ion-label>\n\n                                    <ion-toggle (ionChange)="OnChangeRoom($event)" [(ngModel)]="events.room" class="no-padding" name="event" checked="false"\n\n                                        no-padding></ion-toggle>\n\n                                </ion-item>\n\n                            </ion-col>\n\n                        </div>\n\n                        <div *ngIf="accountType == \'association\' || accountType == \'merchant\' ">\n\n                        <ion-col col-12 text-center>\n\n                            <p class="secondCommuText">Si vous le voulez, vous pouvez adresser votre publication à une seconde communauté que vous suivez<br/>\n\n                                <span>soumis à acceptation par l’administrateur de cette communauté</span></p>\n\n                        </ion-col>\n\n                        <ion-col col-12 text-center> \n\n                            <ion-item class="item-grey select-not-ie no-padding-left">\n\n                                <ion-select (ionChange)="onChangeSecondCommu($event)"  [(ngModel)]="events.secondCommu" #secondCommu="ngModel" class="select-white no-padding-left" placeholder="Communauté" name="secondCommu" submitText="Ok" cancelText="Annuler">\n\n                                    <ion-option *ngFor="let community of linkedCommunities" value={{community.id}}>{{community.name}}</ion-option>\n\n                                </ion-select>\n\n                            </ion-item>\n\n                            <ion-col class="item-grey select-ie no-padding-left">\n\n                                <select (ionChange)="onChangeSecondCommu($event)" [(ngModel)]="events.secondCommu" #secondCommu="ngModel" class="select-white input-select-ie margin-top-select margin-bottom-select padding-right no-padding-left"\n\n                                        placeholder="Communauté" name="secondCommu">\n\n                                    <option *ngFor="let community of linkedCommunities" value={{community.id}}>{{community.name}}</option>\n\n                                </select>\n\n                            </ion-col>\n\n                        </ion-col>\n\n                        <ion-col col-12 text-center no-pading-bottom>\n\n                            <ion-item class="item-grey select-not-ie no-padding-left" [class.formError]="secondCategories.invalid && (secondCategories.dirty || submited || secondCategories.touched)">\n\n                                <ion-select [disabled]="disabledSecondTheme" [required]="!disabledSecondTheme" class="select-white no-padding-left" placeholder="Thèmes *" name="secondCategories" submitText="Ok"\n\n                                            cancelText="Annuler" multiple="true" [(ngModel)]="events.secondCategories" #secondCategories="ngModel"\n\n                                            (ionChange)="onChangeSecondCategory($event)">\n\n                                    <ion-option *ngFor="let category of allSecondCategories" value={{category.id}}>{{category.name}}</ion-option>\n\n                                </ion-select>\n\n                            </ion-item>\n\n                            <ion-col no-padding class="select-padding-ie item-grey select-ie " style="padding: 0;"\n\n                                     [class.formError]="secondCategories.invalid && (secondCategories.dirty || submited || secondCategories.touched)">\n\n                                <select [disabled]="disabledSecondTheme" [required]="!disabledSecondTheme" class="select-white input-select-ie select-multiple-ie padding-right no-padding-left"\n\n                                        placeholder="Thèmes *" name="secondCategories" multiple [(ngModel)]="events.secondCategories"\n\n                                        #secondCategories="ngModel">\n\n                                    <option *ngFor="let category of allSecondCategories" value={{category.id}} (click)="onChangeSecondCategory($event.srcElement.value)">{{category.name}}</option>\n\n                                </select>\n\n                            </ion-col>\n\n                            <div class="form-category">\n\n                                <div class="tags">\n\n                                    <div *ngFor="let category of secondCategoryNames"><a>{{category.name}} <span (click)="removeSecondCategory(category.id)">x</span></a></div>\n\n                                </div>\n\n                            </div>\n\n                            <div class="error-msg" *ngIf="secondCategories.invalid && (secondCategories.dirty || submited || secondCategories.touched)">\n\n                                <span class="error">Champs Thèmes obligatoire</span>\n\n                            </div>\n\n                        </ion-col>\n\n                        </div>\n\n                    </ion-row>\n\n                    <ion-col col-12 text-center>\n\n                        <button *ngIf="accountType != \'community\'" ion-button color="primary" type="submit" class="button-publish" (click)="saveArticle(publishForm.invalid, titre, description)" round>Publier</button>\n\n                        <button *ngIf="accountType == \'community\' && articleActivated" ion-button color="primary" type="submit" class="button-publish" (click)="saveArticle(publishForm.invalid, titre, description)" round>Publier</button>\n\n                        <p *ngIf="accountType == \'community\' && !articleActivated">Cette communauté ne peux pas publier d\'article.</p>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n        </form>\n\n    </ion-col>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\publish\publish.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_9__providers_globals_globals__["a" /* GlobalsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_8__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_globals_globals__["a" /* GlobalsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_google_analytics__["a" /* GoogleAnalytics */],
            __WEBPACK_IMPORTED_MODULE_7__providers_article_article__["a" /* ArticleProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_document_picker__["a" /* DocumentPicker */],
            __WEBPACK_IMPORTED_MODULE_11__providers_eventsrest_eventsrest__["a" /* EventsrestProvider */],
            __WEBPACK_IMPORTED_MODULE_15__providers_goodplanrest_goodplanrest__["a" /* GoodplanrestProvider */],
            __WEBPACK_IMPORTED_MODULE_12__providers_association_association__["a" /* AssociationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_13__providers_merchant_merchant__["a" /* MerchantProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_19__providers_files_files__["a" /* FilesProvider */]])
    ], PublishPage);
    return PublishPage;
}());

//# sourceMappingURL=publish.js.map

/***/ })

});
//# sourceMappingURL=4.js.map