webpackJsonp([14],{

/***/ 1022:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvenCommentPageModule", function() { return EvenCommentPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__even_comment__ = __webpack_require__(1044);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EvenCommentPageModule = /** @class */ (function () {
    function EvenCommentPageModule() {
    }
    EvenCommentPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__even_comment__["a" /* EvenCommentPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__even_comment__["a" /* EvenCommentPage */]),
            ],
        })
    ], EvenCommentPageModule);
    return EvenCommentPageModule;
}());

//# sourceMappingURL=even-comment.module.js.map

/***/ }),

/***/ 1044:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EvenCommentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_comment_comment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
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
 * Generated class for the EvenCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EvenCommentPage = /** @class */ (function () {
    function EvenCommentPage(event, navCtrl, navParams, actionSheetCtrl, platform, commentService, view, loader, alertCtrl) {
        this.event = event;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.commentService = commentService;
        this.view = view;
        this.loader = loader;
        this.alertCtrl = alertCtrl;
        this.comment = {
            content: '',
            photo: null
        };
        this.eventComment = this.navParams.get('comment');
        this.participation = this.navParams.get('participation');
        this.comment = Object.assign({}, this.eventComment);
    }
    EvenCommentPage.prototype.ionViewDidLoad = function () {
    };
    EvenCommentPage.prototype.capitalize = function (event) {
        if (event) {
            this.comment.content = event.charAt(0).toUpperCase() + event.slice(1);
        }
    };
    EvenCommentPage.prototype.goBack = function () {
        this.comment = Object.assign({}, this.eventComment);
        this.view.dismiss();
    };
    EvenCommentPage.prototype.commentForm = function () {
        var _this = this;
        var loadingPopup = this.loader.create({});
        loadingPopup.present();
        this.commentService.postArticleComment(this.participation, this.comment).then(function (data) {
            loadingPopup.dismiss();
            var successAlert = _this.alertCtrl.create({
                title: 'Succès',
                subTitle: 'Votre Commentaire a été ajouté avec succès.',
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
            loadingPopup.dismiss();
            _this.event.publish('http:errors', err);
        });
    };
    EvenCommentPage.prototype.Close = function () {
        this.view.dismiss(true);
    };
    EvenCommentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-even-comment',template:/*ion-inline-start:"D:\celaneo\mobile\new-mobile\test\src\pages\even-comment\even-comment.html"*/'<!--\n\n  Generated template for the PublishPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-row class="header-popin" no-padding>\n\n        <ion-col class="no-padding " text-left>\n\n        </ion-col>\n\n        <ion-col class="no-padding " text-center>\n\n            <h5 class="primary-color title-popin" no-margin>Commentaire</h5>\n\n        </ion-col>\n\n        <ion-col class="no-padding " text-right>\n\n            <button ion-button clear small color="primary" icon-start no-margin no-padding (click)="goBack()">\n\n                <img class="icon-heart material-icons" src="assets/imgs/icons/image3.png">\n\n            </button>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-header>\n\n<ion-content padding>\n\n    <ion-col col-12 text-centre class="padding-top">\n\n        <form (ngSubmit)="commentForm()">\n\n            <ion-grid margin-top>\n\n                <ion-row text-center>\n\n                    <ion-col col-12 text-center no-padding>\n\n                        <ion-item>\n\n                            <ion-textarea autocomplete="true" name="content" [(ngModel)]="comment.content" (change)="capitalize($event.target.value)"\n\n                                placeholder="Commenter">\n\n                            </ion-textarea>\n\n                        </ion-item>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row text-center>\n\n                    <ion-col col-12 text-center>\n\n                        <button ion-button color="primary" type="submit" class="button-send" round>Envoyer</button>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n        </form>\n\n\n\n    </ion-col>\n\n</ion-content>'/*ion-inline-end:"D:\celaneo\mobile\new-mobile\test\src\pages\even-comment\even-comment.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["u" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["v" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0__providers_comment_comment__["a" /* CommentProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["B" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], EvenCommentPage);
    return EvenCommentPage;
}());

//# sourceMappingURL=even-comment.js.map

/***/ })

});
//# sourceMappingURL=14.js.map