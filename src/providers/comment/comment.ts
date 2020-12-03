import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_URL} from "../../app/config";

let CommentURL = SERVER_URL + 'comment/';
/*
  Generated class for the CommentProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommentProvider {

    constructor(public http: Http) {
    }
    /**
     *  ajout commentaire sur un article
     */
    postArticleComment(article, data) {

        var url = CommentURL + 'article/' + article + '/citoyen/new?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            content: data.content,
            photo: data.photo,
            document: data.document
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * Ajouter commentaire sur un evenement
     */
    postEventComment(event, data) {

        var url = CommentURL + 'event/' + event + '/citoyen/new?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            content: data.content,
            photo: data.photo,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * répondre à un commentaire sur un article
     */
    postArticleCommentReply(data) {

        var url = CommentURL + data.comment + '/citoyen/article/reply?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            content: data.content,
            photo: data.photo,
            document: data.document

        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * répondre à un commentaire sur un evenement
     */
    postEventCommentReply(data) {

        var url = CommentURL + data.comment + '/citoyen/event/reply?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            content: data.content,
            photo: data.photo,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * supprimer un commentaire sur un article
     */
    deleteArticleComment(comment) {

        var url = CommentURL + comment + '/citoyen/article/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * supprimer un commentaire sur un evénement
     */
    deleteEventComment(comment) {

        var url = CommentURL + comment + '/citoyen/event/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * supprimer un commentaire sur un article
     */
    deleteArticleCommentReply(comment) {

        var url = CommentURL + comment + '/citoyen/article/reply/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * supprimer un commentaire sur un evénement
     */
    deleteEventCommentReply(comment) {

        var url = CommentURL + comment + '/citoyen/event/reply/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * mettre à jour un commentaire sur un article
     */
    putArticleComment(comment, data) {

        var url = CommentURL + comment + '/citoyen/article/update?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            content: data
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * mettre à jour un commentaire sur un article
     */
    putEventComment(comment, data) {

        var url = CommentURL + comment + '/citoyen/event/update?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            content: data
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * mettre à jour un commentaire sur un article
     */
    putArticleCommentReply(comment, data) {

        var url = CommentURL + comment + '/citoyen/article/reply/update?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            content: data
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * mettre à jour un commentaire sur un article
     */
    putEventCommentReply(comment, data) {

        var url = CommentURL + comment + '/citoyen/event/reply/update?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            content: data
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    findEventCommentAssociation(id, page) {
        var url = CommentURL + 'association/' + id + '/event/' + page + '/' + 10 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    findArticleCommentAssociation(id, page) {
        var url = CommentURL + 'association/' + id + '/article/' + page + '/' + 10 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    findEventCommentMerchant(id, page) {
        var url = CommentURL + 'merchant/' + id + '/event/' + page + '/' + 10 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    findArticleCommentMerchant(id, page) {
        var url = CommentURL + 'merchant/' + id + '/article/' + page + '/' + 10 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    markCommentsArticleAsRead(article) {
        var url = CommentURL + 'read/' + article + '/article?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    markCommentsEventAsRead(event) {
        var url = CommentURL + 'read/' + event + '/event?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * supprimer un commentaire sur un article
     */
    deleteArticleListComment(comment) {

        var url = CommentURL + comment + '/citoyen/article/list/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * supprimer un commentaire sur un evénement
     */
    deleteEventListComment(comment) {

        var url = CommentURL + comment + '/citoyen/event/list/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    postCommentsArticle(article) {
        var url = CommentURL + 'article/' + article + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getCommentsEvent(event, page) {
        var url = CommentURL + 'event/' + event + '/pagination/' + page + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getCommentsArticlePagination(article, page) {
        var url = CommentURL + 'article/' + article + '/pagination/' + page + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * Méthodes de commentaire BonPlan
     */
    postCommentsGoodPlan(goodPlan,comment) {
        var url = CommentURL + 'goodplan/' + goodPlan + '/citoyen/new?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            content: comment.content,
            photo: comment.photo,
            document: comment.document
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    postGoodPlanCommentReply(id, data) {
        var url = CommentURL + id + '/citoyen/goodplan/reply?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            content: data.content,
            photo: data.photo,
            document: data.document
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    getCommentsGoodPlan(event, page) {
        var url = CommentURL + 'goodplan/' + event + '/pagination/' + page + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    deleteGoodPlanComment(comment) {

        var url = CommentURL + comment + '/citoyen/goodplan/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    deleteGoodPlanCommentReply(comment) {

        var url = CommentURL + comment + '/citoyen/goodplan/reply/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

}
