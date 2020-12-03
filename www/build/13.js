webpackJsonp([13],{

/***/ 1023:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDepInfoPageModule", function() { return EventDepInfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_dep_info__ = __webpack_require__(1045);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventDepInfoPageModule = /** @class */ (function () {
    function EventDepInfoPageModule() {
    }
    EventDepInfoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_dep_info__["a" /* EventDepInfoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_dep_info__["a" /* EventDepInfoPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__event_dep_info__["a" /* EventDepInfoPage */]
            ]
        })
    ], EventDepInfoPageModule);
    return EventDepInfoPageModule;
}());

//# sourceMappingURL=event-dep-info.module.js.map

/***/ }),

/***/ 1045:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDepInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_article_article__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_agenda_agenda__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




/**
 * Generated class for the EventDepInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EventDepInfoPage = /** @class */ (function () {
    function EventDepInfoPage(navCtrl, navParams, myModal, actionSheetController, alertController, loader, serviceArticle) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.myModal = myModal;
        this.actionSheetController = actionSheetController;
        this.alertController = alertController;
        this.loader = loader;
        this.serviceArticle = serviceArticle;
        this.event = this.navParams.get('event');
        this.id = this.navParams.get('id');
    }
    EventDepInfoPage.prototype.ionViewDidLoad = function () {
    };
    EventDepInfoPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    EventDepInfoPage.prototype.other = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [{
                                    text: 'Supprimer',
                                    icon: 'trash',
                                    handler: function () {
                                        _this.supprimer(item);
                                    }
                                }, {
                                    text: 'Partager',
                                    icon: 'share',
                                    handler: function () {
                                        _this.ShareArticle(item);
                                    }
                                }, {
                                    text: 'Modifier',
                                    icon: 'create',
                                    handler: function () {
                                        _this.edite(item);
                                    }
                                }, {
                                    text: 'Dupliquer',
                                    icon: 'copy',
                                    handler: function () {
                                        _this.dupliquer(item);
                                    }
                                }, {
                                    text: 'Annuler',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventDepInfoPage.prototype.supprimer = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [{
                                    text: 'Cet événement',
                                    icon: 'remove',
                                    handler: function () {
                                        _this.supprimerEvet(data);
                                    }
                                }, {
                                    text: 'Tous les événements à venir',
                                    icon: 'remove-circle',
                                    handler: function () {
                                        _this.supprimerEvetVenir(data);
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventDepInfoPage.prototype.supprimerEvet = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'L\'événement  sera supprimé definitivement',
                            buttons: [
                                {
                                    text: 'Annuler',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'Valider',
                                    handler: function () {
                                        var loadingPopup = _this.loader.create({});
                                        loadingPopup.present();
                                        _this.serviceArticle.deleteEventDuplicate((data.id).toString()).then(function (data) {
                                            if (data.success == true) {
                                                loadingPopup.dismiss();
                                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_agenda_agenda__["a" /* AgendaPage */]);
                                            }
                                        }, function (err) {
                                            console.log(err);
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventDepInfoPage.prototype.supprimerEvetVenir = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Les événements  sera supprimé definitivement',
                            buttons: [
                                {
                                    text: 'Annuler',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'Valider',
                                    handler: function () {
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventDepInfoPage.prototype.ShareArticle = function (data) {
    };
    EventDepInfoPage.prototype.edite = function (data) {
    };
    EventDepInfoPage.prototype.dupliquer = function (data) {
        var item = {
            id: data.id_parent,
            startAt: data.start_at,
            endAt: data.end_at,
        };
        var myModal2 = this.myModal.create('DupliquerPage', { "event": item, "accountType": "accountType" }, { cssClass: 'style-modal' });
        myModal2.onDidDismiss(function (data) {
        });
        myModal2.present();
    };
    EventDepInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-dep-info',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\event-dep-info\event-dep-info.html"*/'<!--\n\n  Generated template for the EventDepInfoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header class="mobile-header MMS" >\n\n    <ion-grid>\n\n        <ion-row>\n\n            <ion-col col-2 text-left>\n\n                <div class="item" (click)="goBack()">\n\n                    <ion-icon name="ios-arrow-back"></ion-icon>\n\n                </div>\n\n            </ion-col>\n\n            <ion-col col-8 text-center class="page-title">\n\n            </ion-col>\n\n            <ion-col col-2>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <ion-grid class="no-padding messagePopup"> \n\n    <ion-row>\n\n        <ion-card >\n\n          <ion-card-header>\n\n            <ion-row>\n\n              <ion-col class="bordred">\n\n                  <div text-left class="csm1">\n\n                      <span class="event-date"> {{event.start_at | date:\'dd MMMM\':\'+0200\':\'fr\'}}\n\n                      </span> <span>\n\n                          <h6> (Jusqu\'au {{event.end_at | date:\'dd MMMM\':\'+0200\':\'fr\'}} ) </h6>\n\n                      </span>\n\n                      <div>\n\n                          <span class="event-day" float-start>\n\n                              {{event.start_at | date:\'EEEE\':\'+0200\':\'fr\'}}\n\n                          </span>\n\n                          <span class="event-hour" float-end>\n\n                            {{event.start_at | date:\'hh\':\'+0200\':\'fr\'}}h{{event.start_at | date:\'mm\':\'+0200\':\'fr\'}}\n\n                          </span>\n\n                      </div>\n\n                      <div class="clear"></div>\n\n                  </div>\n\n              </ion-col>\n\n          </ion-row>\n\n            \n\n        </ion-card-header>\n\n        \n\n          <ion-card-content>\n\n\n\n            <ion-row>\n\n              <ion-col class="csm2">\n\n                  <span class="event-name"> {{event.title}} </span>\n\n                  <span class="event-location">à {{event.city}}</span>\n\n                  <ion-col col-12>\n\n                      <h6 [innerHtml]="event.description"></h6>\n\n                  </ion-col>\n\n                  <ion-col col-12 >\n\n                      <div  class="image home-card-slides">\n\n                          <div *ngIf="event.image">\n\n                              <img src="{{event.image}}" imageViewer>\n\n                          </div>\n\n                          <div *ngIf="!event.image">\n\n                              <img src="assets/img/user_default.png" imageViewer>\n\n                          </div>\n\n                      </div>\n\n                  </ion-col>\n\n              </ion-col>\n\n          </ion-row>\n\n\n\n          <ion-col col-12 text-center>\n\n            <p text-center>\n\n                <span text-center style="display: -webkit-inline-box;">\n\n                        <p class="numberParagraph">11 covoiturages </p> <img alt="NOUS-Ensemble" class="dot-icon" src="assets/imgs/icons/dot.png">\n\n                        <p class="numberParagraph" > 11 participants </p><img alt="NOUS-Ensemble" class="dot-icon" src="assets/imgs/icons/dot.png">\n\n                        <p class="numberParagraph" > 11 transportés</p>\n\n                </span>\n\n            </p>\n\n        </ion-col>\n\n\n\n        <ion-row text-center style="margin-left: 6%;">\n\n          <ion-col col-2 style="margin-top: 2%;">\n\n              <img alt="NOUS-Ensemble" class="agenda-icons icons-car" src="assets/imgs/icons/car.png">\n\n          </ion-col>\n\n          <ion-col col-2 >\n\n              <img alt="NOUS-Ensemble" class="agenda-icons" src="assets/imgs/icons/covoit.png">\n\n          </ion-col>\n\n          <ion-col col-3 >\n\n              <img alt="NOUS-Ensemble" class="agenda-icons" src="assets/imgs/icons/benevole.png">\n\n          </ion-col>\n\n          <ion-col col-2>\n\n              <img alt="NOUS-Ensemble" class="agenda-icons icons-stars"  src="assets/imgs/icons/star-full.png">\n\n          </ion-col >\n\n          <ion-col col-2 style="margin-top: -38px;margin-left: 75%;" >\n\n              <ion-icon name="more" (click)="other(event);"></ion-icon>\n\n          </ion-col> \n\n      </ion-row>\n\n\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n       \n\n    </ion-row>\n\n\n\n  \n\n</ion-grid>\n\n\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\event-dep-info\event-dep-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_article_article__["a" /* ArticleProvider */]])
    ], EventDepInfoPage);
    return EventDepInfoPage;
}());

//# sourceMappingURL=event-dep-info.js.map

/***/ })

});
//# sourceMappingURL=13.js.map