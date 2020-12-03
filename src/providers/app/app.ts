import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_URL} from "../../app/config";

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {

    constructor(public http: Http) {
    }

    getAllCities() {
        var url = SERVER_URL + 'cities';
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getReportingCategories() {
        var url = SERVER_URL + 'reporting/categories?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    postReporting(reporting) {
        var url = SERVER_URL + "reporting?NousEnsembleToken=" + localStorage.getItem("token");
        let body = JSON.stringify({
            title: reporting.title,
            description: reporting.description,
            image: reporting.photo,
            address: reporting.address,
            category: reporting.category
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    postContact(data) {
        var url = SERVER_URL + "user/contact?NousEnsembleToken=" + localStorage.getItem("token");
        let body = JSON.stringify({
            object: data.object,
            description: data.description,
            city: data.city,
            location: data.location,
            photo: data.photo,
            document: data.document,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    getInterestCategories(id) {
        var url = SERVER_URL + 'interest/category/'+ id +'?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getWorks(id) {
        var url = SERVER_URL + 'user/map/work/'+ id +'?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    findCommunityLocationByMapHeading(id) {
        var url = SERVER_URL + 'user/map/location/'+ id +'?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getObjects(idHeading) {
        var url = SERVER_URL + 'reportHeading/objects/'+ idHeading +'?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

}
