webpackJsonp([21],{

/***/ 1015:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddParticipantsNbrePageModule", function() { return AddParticipantsNbrePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_participants_nbre__ = __webpack_require__(1037);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddParticipantsNbrePageModule = /** @class */ (function () {
    function AddParticipantsNbrePageModule() {
    }
    AddParticipantsNbrePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_participants_nbre__["a" /* AddParticipantsNbrePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_participants_nbre__["a" /* AddParticipantsNbrePage */]),
            ],
        })
    ], AddParticipantsNbrePageModule);
    return AddParticipantsNbrePageModule;
}());

//# sourceMappingURL=add-participants-nbre.module.js.map

/***/ }),

/***/ 1037:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddParticipantsNbrePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_eventsrest_eventsrest__ = __webpack_require__(9);
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
 * Generated class for the AddParticipantsNbrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddParticipantsNbrePage = /** @class */ (function () {
    function AddParticipantsNbrePage(navCtrl, event, navParams, loader, serviceEvent, view) {
        this.navCtrl = navCtrl;
        this.event = event;
        this.navParams = navParams;
        this.loader = loader;
        this.serviceEvent = serviceEvent;
        this.view = view;
        this.editedEvents = [];
        this.events = JSON.parse(navParams.get('events'));
        this.event.publish('refreshNotifications');
    }
    AddParticipantsNbrePage.prototype.ionViewDidLoad = function () {
    };
    AddParticipantsNbrePage.prototype.close = function () {
        this.view.dismiss();
    };
    AddParticipantsNbrePage.prototype.addParticipants = function () {
        var _this = this;
        var loadingPopup = this.loader.create({});
        // Show the popup
        loadingPopup.present();
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var event_1 = _a[_i];
            if (event_1.participantsNbre != '') {
                this.editedEvents.push(event_1);
            }
        }
        this.serviceEvent.addParticipantsNbre(this.editedEvents).then(function (data) {
            localStorage.setItem("finishedEvents", JSON.stringify([]));
            _this.event.publish('refreshNotifications');
            _this.view.dismiss();
            loadingPopup.dismiss();
        }, function (err) {
            _this.event.publish('http:errors', err);
            loadingPopup.dismiss();
        });
    };
    AddParticipantsNbrePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-participants-nbre',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\add-participants-nbre\add-participants-nbre.html"*/'<!--\n\n  Generated template for the PublishPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content>\n\n    <ion-grid class="no-padding ">\n\n        <ion-row>\n\n            <ion-col col-12 no-padding>\n\n                <div class="close-btn" (click)="close()" float-end>\n\n                    <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n                </div>\n\n            </ion-col>\n\n            <ion-col col-12>\n\n                <h6 class="centred-block-text">\n\n                    Renseignez le nombre des participants pour chaque événement terminé :\n\n\n\n                </h6>\n\n            </ion-col>\n\n            <ion-col col-12 text-center *ngFor=\'let event of events\'>\n\n                <ion-label text-left color="light-black" stacked>{{event.title}}</ion-label>\n\n                <ion-item class="">\n\n                    <ion-input type="text" placeholder="Nombre des participants" [(ngModel)]="event.participantsNbre"></ion-input>\n\n                </ion-item>\n\n            </ion-col>\n\n            <ion-col col-12 text-center class="validButton">\n\n                <button ion-button color="primary" (click)=\'addParticipants()\' class="button-publish" round>Valider</button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\add-participants-nbre\add-participants-nbre.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_eventsrest_eventsrest__["a" /* EventsrestProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */]])
    ], AddParticipantsNbrePage);
    return AddParticipantsNbrePage;
}());

//# sourceMappingURL=add-participants-nbre.js.map

/***/ })

});
//# sourceMappingURL=21.js.map