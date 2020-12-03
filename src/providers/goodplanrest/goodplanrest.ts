import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_URL} from "../../app/config";

/*
  Generated class for the GoodplanrestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let goodPlanURL = SERVER_URL + "goodplan/";

@Injectable()
export class GoodplanrestProvider {

  constructor(public http: Http) {
  }

    postGoodPlan(type, id, data) {
        var url = goodPlanURL + type + '/' + id + '/new' + '?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            title: data.title,
            photo: data.photo,
            photo2: data.secondPhoto,
            photo3: data.thirdPhoto,
            photos: data.photos,
            place: data.address,
            start_at: data.startDate.fullDate,
            end_at: data.endDate.fullDate,
            description: data.description,
            price: data.price,
            personalized: data.personalized,
            monday: data.monday,
            tuesday: data.tuesday,
            wednesday: data.wednesday,
            thursday: data.thursday,
            friday: data.friday,
            saturday: data.saturday,
            sunday: data.sunday,
            agefrom: data.agefrom,
            ageto: data.ageto,
            lessthansix: data.lessthansix,
            betweensixtwelve: data.betweensixtwelve,
            twelveeighteen: data.twelveeighteen,
            allchildrens: data.allchildrens,
            article_id: data.article,
            push_hour: data.push.hour,
            push_date: data.push.date,
            push_content: data.push.content,
            push_enabled: data.push.enabled,
            city: data.city,
            categories: data.categories,
            private: data.private,
            secondCategories:data.secondCategories,
            secondCommu: data.secondCommu,
            document: data.document,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    getGoodPlansByUser(page, parameters) {
        let url = goodPlanURL + 'good_plans/' + page + '/6' + '?NousEnsembleToken=' + localStorage.getItem("token") + parameters;
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getDetailsGoodPlan(id) {
        var url = goodPlanURL + id + '/details?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    takePart(id) {
        var url = goodPlanURL + id + '/takepart?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    cancelTakePart(id) {
        var url = goodPlanURL + id + '/canceltakepart?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    sendDemand(message, id) {
        let url = goodPlanURL + id + '/contactmerchant?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            message: message
        })
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

}
