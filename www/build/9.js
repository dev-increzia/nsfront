webpackJsonp([9],{

/***/ 1027:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopinChoiceEventPageModule", function() { return PopinChoiceEventPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popin_choice_event__ = __webpack_require__(1049);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopinChoiceEventPageModule = /** @class */ (function () {
    function PopinChoiceEventPageModule() {
    }
    PopinChoiceEventPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__popin_choice_event__["a" /* PopinChoiceEventPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__popin_choice_event__["a" /* PopinChoiceEventPage */]),
            ],
        })
    ], PopinChoiceEventPageModule);
    return PopinChoiceEventPageModule;
}());

//# sourceMappingURL=popin-choice-event.module.js.map

/***/ }),

/***/ 1049:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopinChoiceEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_comment_comment__ = __webpack_require__(22);
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
 * Generated class for the PopinChoiceEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PopinChoiceEventPage = /** @class */ (function () {
    function PopinChoiceEventPage(event, camera, userService, navCtrl, modal, navParams, commentService, loadingCtrl, alertCtrl, view) {
        this.event = event;
        this.camera = camera;
        this.userService = userService;
        this.navCtrl = navCtrl;
        this.modal = modal;
        this.navParams = navParams;
        this.commentService = commentService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.view = view;
        this.commentEvent = {
            content: '',
            photo: null
        };
        this.Events = navParams.get('events');
    }
    PopinChoiceEventPage.prototype.Close = function () {
        this.view.dismiss();
    };
    PopinChoiceEventPage.prototype.addPhotoParticipated = function (id) {
        this.takePicture(id);
    };
    PopinChoiceEventPage.prototype.addComment = function (id) {
        var _this = this;
        var loadingPopup = this.loadingCtrl.create({});
        // Show the popup
        loadingPopup.present();
        this.commentService.postEventComment(id, this.commentEvent).then(function (data) {
            loadingPopup.dismiss();
        }, function (err) {
            loadingPopup.dismiss();
            _this.event.publish('http:errors', err);
        });
    };
    PopinChoiceEventPage.prototype.takePicture = function (id) {
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
            _this.commentEvent.photo = "data:image/jpeg;base64," + imageData;
            var myModal2 = _this.modal.create('EvenCommentPage', { "comment": _this.commentEvent, "participation": id }, { cssClass: 'comment-modal' });
            myModal2.present();
        });
    };
    PopinChoiceEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-popin-choice-event',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\popin-choice-event\popin-choice-event.html"*/'<!--\n\n  Generated template for the PopinChoiceEventPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content>\n\n    <ion-grid class="no-padding ">\n\n        <ion-row>\n\n            <ion-col col-12 no-padding>\n\n                <div class="close-btn" (click)="Close()" float-end>\n\n                    <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n                </div>\n\n            </ion-col>\n\n            <ion-col col-12>\n\n                <h6 class="centred-block-text">\n\n\n\n                    Partagez en live vos photos avec nous, pour chaque événement :\n\n\n\n                </h6>\n\n            </ion-col>\n\n\n\n            <ion-col col-12 text-center *ngFor="let event of Events">\n\n                <button ion-button color="white-color" round class="button-white" text-capitalize no-padding (click)="addPhotoParticipated(event.articleId)">\n\n\n\n                    <div class="block-name">\n\n                        {{event.title.substring(0,20)}}\n\n                        <span *ngIf="event.title.length > 20">...</span>\n\n                    </div>\n\n                    <div class="block-icon">\n\n                        <ion-icon name="ios-arrow-forward"></ion-icon>\n\n                    </div>\n\n                </button>\n\n            </ion-col>\n\n\n\n        </ion-row>\n\n    </ion-grid>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\popin-choice-event\popin-choice-event.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_comment_comment__["a" /* CommentProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["B" /* ViewController */]])
    ], PopinChoiceEventPage);
    return PopinChoiceEventPage;
}());

//# sourceMappingURL=popin-choice-event.js.map

/***/ })

});
//# sourceMappingURL=9.js.map