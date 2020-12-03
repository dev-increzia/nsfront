import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_URL} from "../../app/config";

/*
  Generated class for the BenevolesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VolunteersProvider {

    constructor(public http: Http) {
    }

    getEventBenevoles(event) {
        var url = SERVER_URL + 'event/' + event + '/volunteers?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();

    }

    postMails(data) {
        var benevoles_string = localStorage.getItem("benevoles");
        var url = SERVER_URL + 'event/volunteers/mails?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            benevoles: benevoles_string.split(","),
            object: data.objet,
            email: data.email,
            event_id: localStorage.getItem("currentEvent"),
            account_id: localStorage.getItem("account_id"),
            account_type: localStorage.getItem("account_type")

        });

        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();

    }

    postAllMails(data, volunteers, account) {

        var url = SERVER_URL + 'event/volunteers/mails/all?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            benevoles: volunteers,
            object: data.objet,
            email: data.email,
            account_id: account.id,
            account_type: account.type

        });

        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();

    }

    getAll(account) {
        var url = SERVER_URL + account.type + '/' + account.id + '/volunteers?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    deleteVolunteer(id) {
        var url = SERVER_URL + 'association/' + id + '/volunteers/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
}
