import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {API_VERSION, SERVER_URL} from "../../app/config";
import {Events} from "ionic-angular";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
    
    constructor(public appEvent: Events, public http: Http) {
    }

    register(data) {
        let url = SERVER_URL + 'users';
        let body = JSON.stringify({
            lastname: data.lastname,
            firstname: data.firstname,
            email: data.email,
            residence_city: data.city,
            birth_date: data.birth,
            password: data.password,
            api: API_VERSION
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }


    registerFollow(data) {
        let url = SERVER_URL + 'users/register/follow';
        let body = JSON.stringify({
            lastname: data.lastname,
            firstname: data.firstname,
            email: data.email,
            residence_city: data.city,
            birth_date: data.birth,
            password: data.password,
            communities:data.communities,
            api: API_VERSION
        });

       
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    findCurrentUser() {
        var url = SERVER_URL + 'user?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    findCurrentUserAssociations() {
        var url = SERVER_URL + 'user/associations?NousEnsembleToken=' + localStorage.getItem("token");
        return new Promise(resolve => {
            this.http.get(url)
                .subscribe(data => {
                    resolve(data.json());
                });
        });
    }

    findCurrentUserAdherentAsso() {
        var url = SERVER_URL + 'user/adherentAsso?NousEnsembleToken=' + localStorage.getItem("token");
        return new Promise(resolve => {
            this.http.get(url)
                .subscribe(data => {
                    resolve(data.json());
                });
        });
    }
    findCurrentUserAdherentMerchant() {
        var url = SERVER_URL + 'user/adherentMerchant?NousEnsembleToken=' + localStorage.getItem("token");
        return new Promise(resolve => {
            this.http.get(url)
                .subscribe(data => {
                    resolve(data.json());
                });
        });
    }

    findCurrentUserMerchants() {
        var url = SERVER_URL + 'user/merchants?NousEnsembleToken=' + localStorage.getItem("token");
        return new Promise(resolve => {
            this.http.get(url)
                .subscribe(data => {
                    resolve(data.json());
                });
        });

    }
    forgetPassword(email) {
        return this.http.get(SERVER_URL + 'user/reset_password?email=' + email)
            .map(res => res.json())
            .toPromise();

    }

    findCategories() {
        var url = SERVER_URL + 'categories?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    findCategoriesByUser() {
        var url = SERVER_URL + 'user_categories?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }



    logout() {
        var url = SERVER_URL + 'user/logout?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

 
    search(criteria, cities) {
        var url = SERVER_URL + 'user/advanced/search?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            key: criteria.key,
            theme: criteria.theme,
            events: criteria.event,
            articles: criteria.article,
            accounts: criteria.account,
            goodplans: criteria.goodplans,
            cities: cities
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    searchCities(key) {
        var url = SERVER_URL + 'searchcities';
        let body = JSON.stringify({
            pattern: key
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    findIntercomCities(primaryCity) {
        var url = SERVER_URL + 'intercommunal/' + primaryCity;
        return new Promise(resolve => {
            this.http.get(url)
                .subscribe(data => {
                    resolve(data.json());
                });
        });
    }
    postCity(city) {
        let url = SERVER_URL + 'user/profile/secondarycity?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            city: city,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();

    }
    deleteCity(city) {
        let url = SERVER_URL + 'user/secondarycity/remove?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            city: city,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    putInterests(interest, action) {
        let url = SERVER_URL + 'user/profile/interests?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            interest: interest,
            action: action,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    putDays(day, action) {
        let url = SERVER_URL + 'user/profile/days?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            day: day,
            action: action,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    putChildrens(children, action) {
        let url = SERVER_URL + 'user/profile/childrens?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            children: children,
            action: action,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    putPassword(data) {
        let url = SERVER_URL + 'user/password?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            actual_password: data.actual_password,
            password: data.password,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    put(data) {
        let url = SERVER_URL + 'user/edit?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            city: data.city,
            birth: data.birth,
            phone: data.phone
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    getNotifications(page) {
        var url = SERVER_URL + 'user/notifications?limit=' + 12 + '&start=' + page + '&NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    getParticipationNotif() {
        var url = SERVER_URL + 'user/notifications/participation?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    deviceToken(registrationId, deviceType) {
        var userToken = localStorage.getItem("token");

        if (userToken && userToken != null) {
            let url = SERVER_URL + 'user/deviceToken?NousEnsembleToken=' + localStorage.getItem("token");
            let body = JSON.stringify({
                deviceToken: registrationId,
                deviceType: deviceType
            });
            return this.http.post(url, body)
                .map(res => res.json())
                .toPromise();
        }
    }
    deleteDeviceToken(deviceToken) {
        var userToken = localStorage.getItem("token");

        if (userToken && userToken != null) {
            let url = SERVER_URL + 'user/deviceToken/delete?NousEnsembleToken=' + localStorage.getItem("token");
            let body = JSON.stringify({
                deviceToken: deviceToken
            });
            return this.http.post(url, body)
                .map(res => res.json())
                .toPromise();
        }
    }
    getAssociationsMerchants() {
        var url = SERVER_URL + 'associations/merchants?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    postSuperAdminAssociationsMerchants(items) {
        var url = SERVER_URL + 'associations/merchants/save/superadmin?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            items: items,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    deleteAccount(reason) {
        let body = JSON.stringify({
            reason: reason
        });
        var url = SERVER_URL + 'account/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    getNumbers(category) {
        var url = SERVER_URL + 'user/number/' + category + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    findNumberCategories() {
        var url = SERVER_URL + 'number/categories?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    findLocalActor(id) {
        var url = SERVER_URL + 'localActor/'+ id +'?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getMapInterest(categories) {
        var url = SERVER_URL + 'user/map/interest?categories=' + categories + '&NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    postInvitation(email) {
        let body = JSON.stringify({
            email: email,
        });
        var url = SERVER_URL + 'user/invitation?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();


    }

    putProfilePicture(photo) {
        let url = SERVER_URL + 'user/profile/picture?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            photo: photo,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
}
