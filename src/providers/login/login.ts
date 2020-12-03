import "rxjs/Rx";
import {Injectable} from "@angular/core";
import {API_VERSION, SERVER_LOGIN_URL, SERVER_URL} from "../../app/config";
import {Headers, Http, RequestOptions} from "@angular/http";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class LoginProvider {

    constructor(public http: Http) {
    }
    login(email, password) {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        return this.http.post(SERVER_LOGIN_URL, 'username=' + encodeURIComponent(email) + '&password=' + password + '&api=' + API_VERSION, options)
            .map(res => res.json())
            .toPromise();

    }

    currentUserInformation(token) {
        var url = SERVER_URL + 'user?NousEnsembleToken=' + token;
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

}
