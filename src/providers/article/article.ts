import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_URL} from "../../app/config";
let ArticleURL = SERVER_URL + 'article/';
import * as moment from "moment";

@Injectable()
export class ArticleProvider {

    constructor(public http: Http) {
    }

    getRefreshParameter() {
        let v = new Date().valueOf();
        return '&_=' + v;
    }

   

    getAccueilCitoyenArticles(page, parameters) {
        var url = ArticleURL + 'citzen/home/' + page + '/' + 5 + '?NousEnsembleToken=' + localStorage.getItem("token") + this.getRefreshParameter() + parameters;
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();

    }

    getPastilleJCounter() {
        let url = ArticleURL + 'j_tags?NousEnsembleToken=' + localStorage.getItem("token") + this.getRefreshParameter();
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getCategories() {
        var url = SERVER_URL + 'categories?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();

    } 

    

    postArticle(type, id, data) {
        var url = ArticleURL + 'new/' + type + '/' + id + '?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            title: data.title,
            photo: data.photo,
            photos: data.photos,
            photo2: data.secondPhoto,
            photo3: data.thirdPhoto,
            video: data.videoFile,
            document: data.document,
            event: data.event,
            description: data.description,
            categories: data.category,
            public_At: data.publicAt.fullDate,
            private: data.private,
            community: data.community,
            heading: data.heading,
            push_hour: data.push.hour,
            push_date: data.push.date,
            push_content: data.push.content,
            push_enabled: data.push.enabled,
            city: data.city
        });
       
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    postCitoyenArticle(id, data) {
        var url = ArticleURL + 'new/user/' + id + '?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            title: data.title,
            video: data.videoFile,
            document: data.document,
            photo: data.photo,
            photos: data.photos,
            photo2: data.secondPhoto,
            photo3: data.thirdPhoto,
            description: data.description,
            private: data.private,
            community: data.community,
            group: data.group,
            categories: data.category,
            public_At: data.publicAt.fullDate,
            push_hour: data.push.hour,
            push_date: data.push.date,
            push_content: data.push.content,
            push_enabled: data.push.enabled,
            city: data.city
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();

    }
    postCityhallArticle(type, id, data) {
        var url = ArticleURL + 'new/cityhall/' + id + '?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            title: data.title,
            video: data.videoFile,
            document: data.document,
            photo: data.photo,
            photos: data.photos,
            photo2: data.secondPhoto,
            photo3: data.thirdPhoto,
            description: data.description,
            city: data.city,
            category: data.category,
            public_At: data.publicAt.fullDate,
            publishing: type
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();

    }
    putArticle(article, articleImgs) {
        var url = ArticleURL + article.id + '/update?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            title: article.title,
            video: article.videoFile,
            documentUpd: article.documentUpd,
            deletedoc: article.deletedoc,
            photo: articleImgs.articlePhoto,
            photos: articleImgs.photos,
            imges: article.images,
            todelete: articleImgs.toDelete,
            photo2: articleImgs.articleSecondPhoto,
            todelete2: articleImgs.toDeleteSecond,
            photoId2: articleImgs.secondId,
            photo3: articleImgs.articleThirdPhoto,
            todelete3: articleImgs.toDeleteThird,
            photoId3: articleImgs.thirdId, 
            description: article.description,
            category: article.category,
            event: article.event,
            group: article.group,
            private: article.private,
            public_At: article.publicAt,
            city: article.city,
            push_hour: article.push.hour,
            push_date: article.push.date,
            push_content: article.push.content,
            push_enabled: article.push.enabled,
            mode:article.mode

        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    articlesDuplicateNew(article , id, articleImgs) {
        var url = ArticleURL + id +'/duplicate'+ '?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            title: article.title,
            video: article.videoFile,
            document: article.document,
            photo: articleImgs.articlePhoto,
            photos: articleImgs.photos,
            photo2: articleImgs.articleSecondPhoto,
            photo3: articleImgs.articleThirdPhoto,
            description: article.description,
            private: article.private,
            publicAt: article.publicAt,
            city: article.city,
            recursivity_end:article.limit_date || null,
            recurivity_period:article.period || null,
            recursivity_day:article.day  || null,
            images:article.images,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    

    putCitoyenArticle(article, articleImgs) {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhh = "+ JSON.stringify(article));
        var url = ArticleURL + article.id + '/update?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            title: article.title,
            video: article.videoFile,
            documentUpd: article.documentUpd,
            deletedoc: article.deletedoc,
            photo: articleImgs.articlePhoto,
            photos: articleImgs.photos,
            todelete: articleImgs.toDelete,
            photo2: articleImgs.articleSecondPhoto,
            todelete2: articleImgs.toDeleteSecond,
            photoId2: articleImgs.secondId,
            photo3: articleImgs.articleThirdPhoto,
            todelete3: articleImgs.toDeleteThird,
            photoId3: articleImgs.thirdId,
            description: article.description,
            city: article.city,
            category: article.category,
            event: article.event,
          /*  push:{
                hour:article.push.hour,
                date:article.push.date,
                content:article.push.content,
                enabled:article.push.enabled,
            }*/
            push_hour: article.push.hour,
            push_date: article.push.date,
            push_content: article.push.content,
            push_enabled: article.push.enabled,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    findAssociationArticles(id, page) {
        var url = ArticleURL + id + '/association/' + page + '/' + 4 + '?NousEnsembleToken=' + localStorage.getItem("token");
        
        console.log("URL C " + url);
        
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }


    eventDuplicateListe(id) {
        var url = ArticleURL +id+ '/listeEvent'+ '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    articlesDuplicateListe(id) {
        var url = ArticleURL + id +'/liste'+ '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    } 



    findMerchantArticles(id, page) {
        var url = ArticleURL + id + '/merchant/' + page + '/' + 5 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    deleteArticle(id , mode) {
       
        var url = ArticleURL + "delete/" + id +'?NousEnsembleToken=' + localStorage.getItem("token") +'&mode='+mode;
        
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    deleteAll(data) {
        var url = ArticleURL + "deleteAll" + '?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            minDate: moment(data.minDate).format("YYYY-MM-DD HH:mm:ss"),
            duplicateEventId: data.duplicateEventId,
            
        });
        return this.http.post(url, body)
        .map(res => res.json())
        .toPromise();


            
    }


    deleteEventDuplicate(id) {
        var url = ArticleURL + "deleteDuplicate/" + id + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getDetailsArticle(id) {
        var url = ArticleURL + "view/" + id + '?NousEnsembleToken=' + localStorage.getItem("token");

        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    activateArticle(id) {
        var url = ArticleURL + id + '/activate?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    desactivateArticle(id) {
        var url = ArticleURL + id + '/deactivate?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    findMerchantsWallArticles(filter, arrayfiltercity, page) {
        if (arrayfiltercity.length == 0) {
            arrayfiltercity = [0];
        }
        var url = ArticleURL + 'merchant/city/' + arrayfiltercity + '/category/' + filter.category + '/wall/' + page + '/' + 5 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    findAssociationsWallArticles(filter, arrayfiltercity, page) {
        if (arrayfiltercity.length == 0) {
            arrayfiltercity = [0];
        }
        var url = ArticleURL + 'association/city/' + arrayfiltercity + '/category/' + filter.category + '/wall/' + page + '/' + 5 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    findCityHallWallArticles(city, page) {
        var url = ArticleURL + 'cityhall/city/' + city + '/wall/' + page + '/' + 5 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    findCitzensWallArticles(filter, arrayfiltercity, page) {
        if (arrayfiltercity.length == 0) {
            arrayfiltercity = [0];
        }
        var url = ArticleURL + 'citzen/city/' + arrayfiltercity + '/category/' + filter.category + '/wall/' + page + '/' + 5 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    reportAbuse(id, abuse) {
        var url = ArticleURL + 'report/abuse/' + id + '?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            message: abuse.message
        });

        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    like(id) {
        var url = ArticleURL + id + '/like?NousEnsembleToken=' + localStorage.getItem("token");

        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    unlike(id) {
        var url = ArticleURL + id + '/unlike?NousEnsembleToken=' + localStorage.getItem("token");

        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    getLikes(id) {
        var url = ArticleURL + id + '/likes?NousEnsembleToken=' + localStorage.getItem("token");

        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    findCanteenArticles(city, page) {
        var url = ArticleURL + 'cityhall/city/' + city + '/canteen/' + page + '/' + 5 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    findArticlesByHeadings(id_heading, page) {
        var url = ArticleURL + 'community/articleheading/' + id_heading + '/canteen/' + page + '/' + 5 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
}
