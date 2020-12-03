import {Component} from "@angular/core";
import {Events, LoadingController, NavController, NavParams} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {CommunityProvider} from "../../providers/community/community";
import {NewsPage} from "../news/news";

/**
 * Generated class for the CommunitiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-communities',
    templateUrl: 'communities.html',
})
export class CommunitiesPage {

    public communities = [];
    public followed: any;
    public approved: any;
    private selected = [];
    private selectAll = false;
    
    

    constructor(public navCtrl: NavController,
                public appGlobals: GlobalsProvider,
                public appEvent: Events,
                public loadingCtrl: LoadingController,
                public serviceCommunity: CommunityProvider,
                public navParams: NavParams) {
        this.appEvent.publish('closeFilters');
        this.appEvent.subscribe('refreshApprovedCommunities', () => {
            this.communities = JSON.parse(localStorage.getItem("allCommunities"));
        });
        this.communities = JSON.parse(localStorage.getItem("allCommunities"));
        for (let community of this.communities) {
            if (community.follow) {
                this.selected.push(community);
            }
        }
        Promise.all([this.serviceCommunity.getAllPublicCommunities(), this.serviceCommunity.getAllPrivateCommunities(), this.serviceCommunity.findCurrentUserCommunities()]).then(user => {
            localStorage.setItem("publicCommunities", JSON.stringify(user[0]));
            localStorage.setItem("privateCommunities", JSON.stringify(user[1]));
            localStorage.setItem("allCommunities", JSON.stringify(user[2]));
            this.appEvent.publish('refreshCommunities');
            let approved :any;
             approved = user[2];
            if (approved.length != 0) {
                localStorage.setItem("hasApprovedCommunities", "true");
            } else {
                localStorage.setItem("hasApprovedCommunities", "false");
            }
        });
    }
    ionViewWillEnter(){
        this.appGlobals.onNegativeTopSearch = true;
        this.appEvent.publish('updateFooter');
    }
    ionViewWillLeave(){
        this.appGlobals.onNegativeTopSearch = false;
    }
    showHidePrivateSearch() {
        if (!this.appGlobals.privateSearch) {
            this.appGlobals.privateSearch = true;
        } else {
            this.appGlobals.privateSearch = false;
        }
    }

    showHidePublicSearch() {
        if (!this.appGlobals.publicSearch) {
            this.appGlobals.publicSearch = true;
        } else {
            this.appGlobals.publicSearch = false;
        }
    }

    checkUncheckAll() {
        this.selected = [];
        if (this.selectAll) {
            for (let i = 0; i <= (this.communities.length) - 1; i++) {
                this.communities[i].follow = true;
                this.selected.push(this.communities[i]);
            }
        } else {
            for (let i = 0; i <= (this.communities.length) - 1; i++) {
                this.communities[i].follow = false;
            }

        }
    }

    selectCommunity(data) {
        if (data.follow == true) {
            this.selected.push(data);
        } else {
            let newArray = this.selected.filter(function (el) {
                return el.id !== data.id;
            });
            this.selectAll = false;
            this.selected = newArray;
        }
    }


    followCOmmunities() {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.serviceCommunity.postCommunitiesFollow(this.selected).then(data => {
                Promise.all([this.serviceCommunity.findCurrentUserCommunities(), this.serviceCommunity.findCurrentUserFollowedCommunities()]).then(user => {
                        localStorage.setItem("allCommunities", JSON.stringify(user[0]));
                        localStorage.setItem("followedCommunities", JSON.stringify(user[1]));
                        this.appEvent.publish('refreshApprovedCommunities');
                        this.followed = user[1];
                        if (this.followed.length != 0) {
                            localStorage.setItem("hasCommunities", "true");
                        } else {
                            localStorage.setItem("hasCommunities", "false");
                        }
                        this.appEvent.publish('refreshCommunities');
                        this.appEvent.publish('news:refresh', loadingPopup);
                        this.appEvent.publish('agenda:refresh');
                        this.appEvent.publish('goodplan:refresh');
                        this.navCtrl.setRoot(NewsPage);
                    },
                    err => {
                        loadingPopup.dismiss();
                        this.appEvent.publish('http:errors', err);
                    });
            },
            err => {
                loadingPopup.dismiss();
                this.appEvent.publish('http:errors', err);
            });
            loadingPopup.dismiss();
    }

    unfollow(community) {
        let loadingPopup = this.loadingCtrl.create({});
        loadingPopup.present();
        this.serviceCommunity.postCommunitiesUnfollow(community).then(data => {
                Promise.all([this.serviceCommunity.getAllPublicCommunities(), this.serviceCommunity.getAllPrivateCommunities(), this.serviceCommunity.findCurrentUserCommunities(), this.serviceCommunity.findCurrentUserFollowedCommunities()]).then(user => {
                        localStorage.setItem("publicCommunities", JSON.stringify(user[0]));
                        localStorage.setItem("privateCommunities", JSON.stringify(user[1]));
                        localStorage.setItem("allCommunities", JSON.stringify(user[2]));
                        localStorage.setItem("followedCommunities", JSON.stringify(user[3]));
                        this.approved = user[2];
                        if (this.approved.length != 0) {
                            localStorage.setItem("hasApprovedCommunities", "true");
                        } else {
                            localStorage.setItem("hasApprovedCommunities", "false");
                        }
                        this.followed = user[3];
                        if (this.followed.length != 0) {
                            localStorage.setItem("hasCommunities", "true");
                        } else {
                            localStorage.setItem("hasCommunities", "false");
                        }
                        this.appEvent.publish('refreshCommunities');
                        this.appEvent.publish('refreshApprovedCommunities');
                        loadingPopup.dismiss();
                    },
                    err => {
                        loadingPopup.dismiss();
                        this.appEvent.publish('http:errors', err);
                    });
            },
            err => {
                loadingPopup.dismiss();
                this.appEvent.publish('http:errors', err);
            });

    }
}
