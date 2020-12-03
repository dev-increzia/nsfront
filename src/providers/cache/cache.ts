import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ArticleProvider} from "../article/article";
import {Events} from "ionic-angular";
import {GroupitemsPipe} from "../../pipes/groupitems/groupitems";
import {EventsrestProvider} from "../eventsrest/eventsrest";
import {GoodplanrestProvider} from "../goodplanrest/goodplanrest";

/*
  Generated class for the CacheProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CacheProvider {

    constructor(public http: Http, public service: ArticleProvider, public event: Events,public eventService: EventsrestProvider, public goodPlanService: GoodplanrestProvider) {
    }

    loadArticles(page, item, articles, cacheLifeTime, type, parameter = null, force = false, infiniteScroll = null, refresher = null,) {

        let parameters = null;
        let cachedKey = null;
        if (type == 'news') {
            parameters = this.getParameters(type);
            cachedKey = 'news.articles.' + page + '.' + JSON.stringify(parameters);
            if (force) {
                CacheProvider.forceDeleteCache('news.articles');
            }
        }
        else if (type == 'association') {
            parameters = this.getParameters(type, parameter);
            cachedKey = 'association' + parameter.id + '.articles.' + page + '.' + JSON.stringify(parameters);
            if (force) {
                CacheProvider.forceDeleteCache('association' + parameter.id + '.articles');
            }
        }
        else if (type == 'communityArticle') {
            parameters = this.getParameters(type, parameter);
            cachedKey = 'community' + parameter.id + '.articles.' + page + '.' + JSON.stringify(parameters);
            if (force) {
                CacheProvider.forceDeleteCache('community' + parameter.id + '.articles');
            }
        }
        else if (type == 'surveyArticle') {
            parameters = this.getParameters(type, parameter);
            cachedKey = 'survey' + parameter.id + '.articles.' + page + '.' + JSON.stringify(parameters);
            if (force) {
                CacheProvider.forceDeleteCache('survey' + parameter.id + '.articles');
            }
        }
        else if (type == 'agenda') {
            parameters = this.getParameters(type);
            cachedKey = 'agenda.events.' + page + '.' + JSON.stringify(parameters);
            if (force) {
                CacheProvider.forceDeleteCache('agenda.events');
            }
        }
        else if (type == 'agendaAsso') {
            parameters = this.getParameters(type,parameter);
            cachedKey = 'association' + parameter.id + '.agenda.' + page + '.' + JSON.stringify(parameters);
            if (force) {
                CacheProvider.forceDeleteCache('association' + parameter.id + '.agenda');
            }
        }
        else if (type == 'agendaCommu') {
            parameters = this.getParameters(type,parameter);
            cachedKey = 'community' + parameter.id + '.agenda.' + page + '.' + JSON.stringify(parameters);
            if (force) {
                CacheProvider.forceDeleteCache('community' + parameter.id + '.agenda');
            }
        }
        else if (type == 'goodplan') {
            parameters = this.getParameters(type);
            cachedKey = 'goodplan.events.' + page + '.' + JSON.stringify(parameters);
            if (force) {
                CacheProvider.forceDeleteCache('goodplan.events');
            }
        }
        else if (type == 'goodplanMerch') {
            parameters = this.getParameters(type,parameter);
            cachedKey = 'goodplan' + parameter.id + '.merch.' + page + '.' + JSON.stringify(parameters);
            if (force) {
                CacheProvider.forceDeleteCache('goodplan' + parameter.id + '.merch');
            }
        }

        let hasData = false;

        let cachedData = localStorage.getItem(cachedKey);
        let currentTime = Math.floor(Date.now() / 1000);


        if (!force && cachedData) {
            cachedData = JSON.parse(cachedData);
            if (cachedData['time'] >= currentTime - cacheLifeTime) {
                item = cachedData['items'];
                hasData = true;

                CacheProvider.completeAllThings(infiniteScroll, refresher);

                if (type == 'news') {
                    this.event.publish('news:cache', [page, item, articles, cacheLifeTime]);
                }
                else if (type == 'association' || type =='communityArticle' || type =='surveyArticle') {
                    this.event.publish('association:cache', [page, item, articles, cacheLifeTime]);
                }
                else if (type == 'agenda') {
                    this.event.publish('agenda:cache', [page,item,articles,cachedData['itemsDates']]);
                }
                else if (type == 'agendaAsso' || type =='agendaCommu') {
                    this.event.publish('association:agenda', [page,item,articles,cachedData['itemsDates']]);
                }
                else if (type == 'goodplan') {
                    this.event.publish('goodplan:cache', [page,item,articles,cachedData['itemsDates']]);
                }
                else if (type == 'goodplanMerch') {
                    this.event.publish('merchant:goodplan', [page,item,articles,cachedData['itemsDates']]);
                }
            }
        }

        if (!hasData) {
            let loadingPopup = null;

            if (type == 'news' || type == 'association' || type =='communityArticle' || type =='surveyArticle' ) {

                this.service.getAccueilCitoyenArticles(page, parameters).then(data => {
                        articles = data[0];
                        if (!infiniteScroll) {
                            item = [];
                        }

                        for (let article of articles) {
                            item.push(article);
                        }
                        let cachedData = {'items': item, 'time': currentTime};
                        localStorage.setItem(cachedKey, JSON.stringify(cachedData));


                        if (loadingPopup) {
                            loadingPopup.dismiss();
                        }

                        CacheProvider.completeAllThings(infiniteScroll, refresher);

                        if (type == 'news') {
                            this.event.publish('news:cache', [page, item, articles, cacheLifeTime]);
                        }
                        else if (type == 'association' || type =='communityArticle' || type =='surveyArticle') {
                            this.event.publish('association:cache', [page, item, articles, cacheLifeTime]);
                        }
                    },
                    err => {
                        if (loadingPopup) {
                            loadingPopup.dismiss();
                            this.event.publish('http:errors', err);
                        }

                        CacheProvider.completeAllThings(infiniteScroll, refresher);

                    });
            }
            else if(type == 'agenda' || type == 'agendaAsso' || type == 'agendaCommu'){
                this.eventService.getEventsByUser(page, parameters).then(data => {
                        articles = data;
                        if (!infiniteScroll) {
                            item = [];
                        }
                        for (let event of articles) {
                            let dateString = event.day;
                            let arraydateString = dateString.split('T');
                            let arraydate = arraydateString[0].split('-');
                            event.day = arraydate[0] + "-" + arraydate[1] + "-" + arraydate[2] + "T00:00:00";
                            item.push(event);
                        }
                        let g = new GroupitemsPipe();
                        let itemsDates = [];
                        let itemsg = g.transform(item, "day");
                        for (let ir of itemsg) {
                           
                            itemsDates.push(ir);
                        }
                        if (type == 'agenda') {
                            this.event.publish('agenda:cache', [page,item,articles,itemsDates]);
                        }
                        else if(type == 'agendaAsso' || type == 'agendaCommu'){
                            this.event.publish('association:agenda', [page,item,articles,itemsDates]);
                        }
                        let cachedData = {'items': item, 'itemsDates': itemsDates, 'time': currentTime};
                        localStorage.setItem(cachedKey, JSON.stringify(cachedData));
                        if (loadingPopup) {
                            loadingPopup.dismiss();
                        }
                        CacheProvider.completeAllThings(infiniteScroll, refresher);
                    },
                    err => {

                        if (loadingPopup) {
                            loadingPopup.dismiss();
                            this.event.publish('http:errors', err);
                        }
                        CacheProvider.completeAllThings(infiniteScroll, refresher);
                    }
                );
            } else if (type == "goodplan" || type == "goodplanMerch" ) {
                this.goodPlanService.getGoodPlansByUser(page, parameters).then(data => {

                        articles = data;

                        if (!infiniteScroll) {
                            item = [];
                        }

                        for (let event of articles) {
                            let dateString = event.day;
                            let arraydateString = dateString.split('T');
                            let arraydate = arraydateString[0].split('-');
                            event.day = arraydate[0] + "-" + arraydate[1] + "-" + arraydate[2] + "T00:00:00";
                            item.push(event);
                        }
                        let g = new GroupitemsPipe();
                        let itemsDates = [];
                        let itemsg = g.transform(item, "day");
                        for (let ir of itemsg) {
                         
                            itemsDates.push(ir);
                        }

                        if (type == 'goodplan') {
                            this.event.publish('goodplan:cache', [page,item,articles,itemsDates]);
                        }
                        if (type == 'goodplanMerch') {
                            this.event.publish('merchant:goodplan', [page,item,articles,itemsDates]);
                        }

                        let cachedData = {'items': item, 'itemsDates': itemsDates, 'time': currentTime};
                        localStorage.setItem(cachedKey, JSON.stringify(cachedData));

                        if (loadingPopup) {
                            loadingPopup.dismiss();
                        }

                        CacheProvider.completeAllThings(infiniteScroll, refresher);
                    },
                    err => {

                        if (loadingPopup) {
                            loadingPopup.dismiss();
                            this.event.publish('http:errors', err);
                        }

                        CacheProvider.completeAllThings(infiniteScroll, refresher);
                    }
                );
            }
            
        }

        if (parameter) {
            CacheProvider.deleteOldCache(cacheLifeTime, parameter);
        }
        else {
            CacheProvider.deleteOldCache(cacheLifeTime, null);
        }

    }

    getCachedData(serviceMethod, refresh, callback, key, cacheKey, cacheLifeTime, infiniteScroll, refresher) {
        let hasData = false;
        let cachedData = localStorage.getItem(key);
        let currentTime = Math.floor(Date.now() / 1000);
        let items = null;

        if (!refresh && cachedData) {
            cachedData = JSON.parse(cachedData);
            if (cachedData['time'] >= currentTime - cacheLifeTime) {
                items = cachedData['data'];
                hasData = true;

                CacheProvider.completeAllThings(infiniteScroll, refresher);
                this.event.publish(cacheKey, items);
            }
        }

        if (!hasData) {
            let fn = eval(serviceMethod);
            fn.then(data => {

                let cachedData = {'data': data, 'time': currentTime};
                localStorage.setItem(key, JSON.stringify(cachedData));
                
                this.event.publish(callback, data);
                CacheProvider.completeAllThings(infiniteScroll, refresher);
            });
        }
    }

    refreshItem(item, cachedKey) {
        for (let key of Object.keys(localStorage)) {
            if (key.indexOf(cachedKey) === 0) {
                let data = JSON.parse(localStorage.getItem(key));
                for (let i in data['items']) {
                    if (data['items'].hasOwnProperty(i)) {
                        if (data['items'][i].id === item.id) {
                            data['items'][i] = item;
                        }
                    }
                }
                localStorage.setItem(key, JSON.stringify(data));
            }
        }
    }


    public getParameters(type = null, parameter = null) {

        let parameters = '';
        if (type == 'news') {
            let selectedVille = JSON.parse(localStorage.getItem('selectedVille'));
            let selectedTheme = JSON.parse(localStorage.getItem('selectedTheme'));
            let selectedJ = localStorage.getItem('selectedJ');

            if (selectedVille && selectedVille.length) {
                for (let ville of selectedVille) {
                    parameters += "&city[]=" + ville.id;
                }
            }

            if (selectedTheme && selectedTheme.length) {
                for (let theme of selectedTheme) {
                    parameters += "&category[]=" + theme.id;
                }
            }

            if (selectedJ) {
                parameters += "&j=" + selectedJ;
            }
        }
        else if (parameter && type == 'association' && !parameter.all) {
            parameters += "&assoId=" + parameter.id;
            if (parameter.role == "member"){
                parameters += "&userType=1";
            }
        }
        else if (parameter && type == 'communityArticle') {
            parameters += "&communityId=" + parameter.id;
            if (!parameter.isAdminPublish){
                parameters += "&userType=1";
            }
        }
        else if (parameter && type == 'surveyArticle') {
            parameters += "&communityId=" + parameter.id;
            parameters += "&survey=1";
        }
        else if( type == 'agenda' || type == 'goodplan'){

            let selectedVille = JSON.parse(localStorage.getItem('selectedVille'));
            let selectedTheme = JSON.parse(localStorage.getItem('selectedTheme'));
            let selectedDate = localStorage.getItem('selectedDate');

            if (selectedVille && selectedVille.length) {
                for (let ville of selectedVille) {
                    parameters += "&city[]=" + ville.id;
                }
            }

            if (selectedDate) {
                selectedDate = JSON.parse(selectedDate);
                parameters += "&date=" + selectedDate;
            }

            if (selectedTheme && selectedTheme.length) {
                for (let theme of selectedTheme) {
                    parameters += "&category[]=" + theme.id;
                }
            }
        }
        else if (parameter && type == 'agendaAsso') {
                parameters += "&associationId=" + parameter.id;
        }
        else if (parameter && type == 'agendaCommu') {
            parameters += "&communityId=" + parameter.id;
        }
        else if (parameter && type == 'goodplanMerch') {
            parameters += "&merchantId=" + parameter.id;
        }
        return parameters;
    }

    static completeAllThings(infiniteScroll = null, refresher = null) {
        if (infiniteScroll) {
            infiniteScroll.complete();
        }

        if (refresher) {
            refresher.complete();
        }
    }

    static deleteOldCache(cacheLifeTime,parameter) {
        let currentTime = Math.floor(Date.now() / 1000);
        for (let key of Object.keys(localStorage)) {
            if (key.indexOf('news.articles') === 0 || parameter && (key.indexOf('community' + parameter.id + '.articles') === 0 || key.indexOf('community' + parameter.id + '.agenda') === 0 || key.indexOf('association' + parameter.id + '.articles') === 0 || key.indexOf('association' + parameter.id + '.agenda') === 0 ||  key.indexOf('goodplan' + parameter.id + '.merch') === 0) || key.indexOf('agenda.events') === 0) {
                let item = JSON.parse(localStorage.getItem(key));
                if (!item['time'] || item['time'] < currentTime - cacheLifeTime) {
                    localStorage.removeItem(key);
                }
            }
        }
    }

    static forceDeleteCache(index) {
        for (let key of Object.keys(localStorage)) {
            if (key.indexOf(index) === 0) {
                localStorage.removeItem(key);
            }
        }
    }

}
 
 
 
 
 
 
 
 
 
 
