import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_URL} from "../../app/config";
/*
  Generated class for the CreateMerchantProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let SurveyURL = SERVER_URL + 'survey/';

@Injectable()
export class SurveyProvider {

    constructor(public http: Http) {
    }

    postSurvey(id, data, questions,community) {
        let url = SurveyURL + 'new?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            title: data.title,
            photo: data.photo,
            photos: data.photos,
            photo2: data.secondPhoto,
            photo3: data.thirdPhoto,
            sondage: data.sondage,
            questions: questions,
            community: community
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    postAnswerSurvey(id,currentArticle) {
        let url = SurveyURL + 'addResponse?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            idResponse: id,
            currentArticle : currentArticle
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
}
