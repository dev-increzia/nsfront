import "rxjs/Rx";
import {Injectable} from "@angular/core";
import {SERVER_URL} from "../../app/config";
import {Http} from "@angular/http";



/*
  Generated class for the EventsrestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let eventsURL = SERVER_URL + "event/";
let ArticleURL = SERVER_URL + "article/";

@Injectable()
export class EventsrestProvider {
    constructor(public http: Http) {
    }
    findAll(page) {
	    console.log("URL 3 : " + eventsURL + 'citzen/agenda/' + page + '/' + 4 + '?NousEnsembleToken=' + localStorage.getItem("token") );
        return this.http.get(eventsURL + 'citzen/agenda/' + page + '/' + 4 + '?NousEnsembleToken=' + localStorage.getItem("token"))
            .map(res => res.json())
            .toPromise();
    }
    findAllByInterestPage(page) {
        if (page)
        {
	        console.log("URL 5 : "+eventsURL + 'citzeneventall/interests/' + page + '/' + 4 + '?NousEnsembleToken=' + localStorage.getItem("token"));
            return this.http.get(eventsURL + 'citzeneventall/interests/' + page + '/' + 4 + '?NousEnsembleToken=' + localStorage.getItem("token"))
                .map(res => res.json())
                .toPromise();
        }
    }

    getFilterbycitytime(filtercity, filterdate, page) {

        return this.http.get(eventsURL + 'citzen/filter/' + filtercity + '/' + filterdate + '/' + page + '/' + 4 + '?NousEnsembleToken=' + localStorage.getItem("token")).map(res => res.json())
            .toPromise();
    }
    getFilterpersonalizedevent(dayactivitymonday, dayactivitytuesday, dayactivitywednesday, dayactivitythursday, dayactivityfriday, dayactivitysaturday, dayactivitysunday
        , agefrom, ageto, lessThanSix, betweenSixTwelve, betweenTwelveEighteen, allChildrens) {
        let account_id = localStorage.getItem("account_id");
        let account_type = localStorage.getItem("account_type");

        return this.http.get(eventsURL + 'citzenevent/personalized/' + account_type + "/" + account_id + "/" + dayactivitymonday + "/" + dayactivitytuesday + "/" + dayactivitywednesday + "/" + dayactivitythursday + "/" + dayactivityfriday + "/" + dayactivitysaturday + "/" + dayactivitysunday
            + "/" + agefrom + "/" + ageto + "/" + lessThanSix + "/" + betweenSixTwelve + "/" + betweenTwelveEighteen + "/" + allChildrens + '?NousEnsembleToken=' + localStorage.getItem("token")).map(res => res.json())
            .toPromise();
    }
    findById(id) {
        return this.http.get(eventsURL + id + '?NousEnsembleToken=' + localStorage.getItem("token"))
            .map(res => res.json())
            .toPromise();
    }

    findAllArticles(type, id) {
        var url = SERVER_URL + "article/" + id + "/" + type + "/0/100" + '?NousEnsembleToken=' + localStorage.getItem("token");
        console.log("URL 5 : "+url);
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    findAssociationArticles(id) {
        var url = ArticleURL + id + '/association?NousEnsembleToken=' + localStorage.getItem("token");
        console.log("URL 4 : "+url);
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getDetailsEvent(id) {
        var url = SERVER_URL + "event/" + id + '/details?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    delete(id , mode) {
        var url = SERVER_URL + "event/delete/" + id + '?NousEnsembleToken=' + localStorage.getItem("token")+"&mode="+mode;
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    getReservations() {
        var url = SERVER_URL + 'event/eventreservations?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    activate(id) {
        var url = SERVER_URL + 'event/' + id + '/activate?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getArticleId(event){
        var url = SERVER_URL + 'article/' + event + '/findEvent?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    postEvent(type, id, data) {
        var url = eventsURL + type + '/' + id + '/new' + '?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            title: data.title,
            video: data.videoFile,
            photo: data.photo,
            photo2: data.secondPhoto,
            photo3: data.thirdPhoto,
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
            city: data.city,
            categories: data.categories,
            private: data.private,
            secondCategories:data.secondCategories,
            secondCommu: data.secondCommu,
            room:data.room, 
            messageMail: data.mailForRoom
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    desactivate(id) {
        var url = SERVER_URL + 'event/' + id + '/deactivate?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();

    }
    takePart(id) {
        var url = SERVER_URL + 'event/' + id + '/takepart?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    cancelTakePart(id) {
        var url = SERVER_URL + 'event/' + id + '/canceltakepart?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    postContact(id, type, value) {
        var url = SERVER_URL + 'event/' + id + '/addcontact?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            type: type,
            value: value,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();

    }
    addCarpoolAnswer(id, phone) {
        var url = SERVER_URL + 'event/' + id + '/addCarpollAnswer?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            phone: phone,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    addCarpool(id, phone,rallyPoint,rdvHours,seatedFree) {
        var url = SERVER_URL + 'event/' + id + '/addCarpoll?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            phone: phone,
            rallyPoint: rallyPoint,
            rdvHours : rdvHours,
            seatedFree: seatedFree
        });
        return this.http.post(url, body)
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
    editEvent(event, param) {
        var url = eventsURL + param + '/' + event + '/editPrivate' + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    eventDuplicateNew(data,id,eventImgs) {
        var url = eventsURL + id+'/duplicate'+ '?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            title:data.title || null,
            description: data.description || null,
            price: "Gratuit",
            city:data.cityName || null,
            video:data.videoFile || null,
            photo:eventImgs.eventPhoto || null,
            photos:eventImgs.photos || null,
            photo2:eventImgs.eventSecondPhoto || null,
            photo3:eventImgs.eventThirdPhoto || null,
           // push_enabled:data.push_enabled || null,
            recursivity_end:data.recursivity_end || null,
            recurivity_period:data.recurivity_period || null,
            recursivity_day:data.recursivity_day || null,
            recursivity_hour:data.recursivity_hour || null,
            images:data.images ,
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
          
    }

    putEvent(event, data, enableArticle, account_type, eventImgs) {

        var url = eventsURL + account_type + '/' + event + '/edit' + '?NousEnsembleToken=' + localStorage.getItem("token");

        let body = JSON.stringify({
            title: data.title,
            video: data.videoFile,
            photo: eventImgs.eventPhoto,
            photos: eventImgs.photos,
            imges: data.images,
            todelete: eventImgs.toDelete,
            photo2: eventImgs.eventSecondPhoto,
            todelete2: eventImgs.toDeleteSecond,
            photoId2: eventImgs.secondId,
            photo3: eventImgs.eventThirdPhoto,
            todelete3: eventImgs.toDeleteThird,
            photoId3: eventImgs.thirdId,
            place: data.address,
            codePostal: data.postalcode,
            start_at: data.startAt,
            description: data.description,
            price: data.price,
            reservation_url: data.reservationUrl,
            need_volunteer: data.volunteer,
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
            eventreservation_id: data.reservation,
            article_id: data.article,
            cityName: data.cityName,
            categories: data.categories,
            pushEnabled: data.push.enabled,
            pushDate: data.push.date,
            pushContent: data.push.content,
            enableArticle: enableArticle,
            mode:data.mode
        });
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    getAgendaEvent(city, period, page) {
        var url = eventsURL + city + '/agenda/' + period + '/pagination/' + page + '/6' + '?NousEnsembleToken=' + localStorage.getItem("token");
        console.log("URL : " + url);
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getEventsByUser(page, parameters) {
        var url = eventsURL + 'agenda/' + page + '/6' + '?NousEnsembleToken=' + localStorage.getItem("token") + parameters;
        console.log("URL 2 : " + url);
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getEventParticipants(id) {
        var url = eventsURL + id + '/participants?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    /*getEventBenevole(id) {
        var url = eventsURL + id + '/volonteers?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }*/

    getEventBenevole(id) {
        var url = eventsURL + id + '/transported?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getEventProgress(id) {
        var url = eventsURL + id + '/progress?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    addParticipantsNbre(events) {
        var url = SERVER_URL + 'event/participantsNbre?NousEnsembleToken=' + localStorage.getItem("token");
        let body = JSON.stringify({
            events: events,
        });

        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();

    }

    deleteEventCarpoolDemand(id) {
        var url = SERVER_URL + 'event/' + id + '/deleteCarpoolDemand?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
}
