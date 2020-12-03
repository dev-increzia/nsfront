import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_URL} from "../../app/config";


let communityURL = SERVER_URL + 'community/';

/*
  Generated class for the CommunityProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommunityProvider {

  constructor(public http: Http) {
  }

  postUserPublicCommunities(data) {
    var url = communityURL + 'public/add?NousEnsembleToken=' + localStorage.getItem("token");
    let body = JSON.stringify({
      communities: data,
    });
    return this.http.post(url, body)
      .map(res => res.json())
      .toPromise();
  }
  getCommunityInformations(id) {
    var url = communityURL + 'informations/' + id;
    return this.http.get(url)
        .map(res => res.json())
        .toPromise();

}

communityAddFollow(data) {
  var url = communityURL + 'add/follow';
  let body = JSON.stringify({
    communities: data,
  });
  return this.http.post(url, body)
    .map(res => res.json())
    .toPromise();

}

  postUserPrivateCommunities(community, password) {
    var url = communityURL + 'private/add?NousEnsembleToken=' + localStorage.getItem("token");
    let body = JSON.stringify({
      community: community,
      password: password,
    });
    return this.http.post(url, body)
      .map(res => res.json())
      .toPromise();
  }

  postPasswordRequest(community, phone) {
    var url = communityURL + 'password?NousEnsembleToken=' + localStorage.getItem("token");
    let body = JSON.stringify({
      community: community,
      phone: phone,
    });
    return this.http.post(url, body)
      .map(res => res.json())
      .toPromise();
  }

  findCurrentUserFollowedCommunities() {
    var url = SERVER_URL + 'user/communities/followed?NousEnsembleToken=' + localStorage.getItem("token");
    return new Promise(resolve => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data.json());
        });
    });
  }

  getAllPublicCommunities() {
    var url = SERVER_URL + 'communities/public?NousEnsembleToken=' + localStorage.getItem("token");
    return this.http.get(url)
      .map(res => res.json())
      .toPromise();
  }
  getAllPrivateCommunities() {
    var url = SERVER_URL + 'communities/private?NousEnsembleToken=' + localStorage.getItem("token");
    return this.http.get(url)
      .map(res => res.json())
      .toPromise();
  }

  findCurrentUserCommunities() {
    var url = SERVER_URL + 'user/communities?NousEnsembleToken=' + localStorage.getItem("token");
    return new Promise(resolve => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data.json());
        });
    });
  }
  postCommunitiesFollow(communities) {
    var url = communityURL + 'follow?NousEnsembleToken=' + localStorage.getItem("token");
    let body = JSON.stringify({
      communities: communities,
    });
    return this.http.post(url, body)
      .map(res => res.json())
      .toPromise();
  }
  postCommunitiesUnfollow(community) {
    var url = communityURL + 'unfollow?NousEnsembleToken=' + localStorage.getItem("token");
    let body = JSON.stringify({
      community: community,
    });
    return this.http.post(url, body)
      .map(res => res.json())
      .toPromise();
  }
  getInfoCommunity(id) {
    var url = communityURL + id +'/info_dedicated?NousEnsembleToken=' + localStorage.getItem("token");
    return new Promise(resolve => {
      this.http.get(url)
          .subscribe(data => {
            resolve(data.json());
          });
    });
  }
  getHeadingCommunity(id) {
    var url = communityURL + id +'/get_headings?NousEnsembleToken=' + localStorage.getItem("token");
    return new Promise(resolve => {
      this.http.get(url)
          .subscribe(data => {
            resolve(data.json());
          });
    });
  }
    put(data, img, toDelete) {
        let body = JSON.stringify({
            name: data.name,
            phone: data.phone,
            email: data.email,
            city: data.city,
            photo: img,
            todelete: toDelete
        });
        var url = communityURL + data.id + '/update?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();

    }

    getAdmins(id, page) {
        var url = communityURL + id + '/admins/' + page + '/' + 10 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    deleteAdmin(community, admins) {
        let body = JSON.stringify({
            admins: admins,
        });
        var url = communityURL + community + '/admin/remove?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

}
