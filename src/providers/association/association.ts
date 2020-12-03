import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_URL} from "../../app/config";

/*
  Generated class for the AssociationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

let associationUrl = SERVER_URL + 'association/';

@Injectable()
export class AssociationProvider {

    constructor(public http: Http) {
    }
    post(data) {
        let body = JSON.stringify({
            photo: data.photo,
            name: data.name,
            category: data.category,
            address: data.address,
            codePostal: data.codePostal,
            phone: data.phone,
            email: data.email,
            city: data.city,
            community: data.community,
            description: data.description,
            monday: data.monday,
            mondayHour: data.mondayHour,
            mondayHourEnd: data.mondayHourEnd,
            tuesday: data.tuesday,
            tuesdayHour: data.tuesdayHour,
            tuesdayHourEnd: data.tuesdayHourEnd,
            wednesday: data.wednesday,
            wednesdayHour: data.wednesdayHour,
            wednesdayHourEnd: data.wednesdayHourEnd,
            thursday: data.thursday,
            thursdayHour: data.thursdayHour,
            thursdayHourEnd: data.thursdayHourEnd,
            friday: data.friday,
            fridayHour: data.fridayHour,
            fridayHourEnd: data.fridayHourEnd,
            saturday: data.saturday,
            saturdayHour: data.saturdayHour,
            saturdayHourEnd: data.saturdayHourEnd,
            sunday: data.sunday,
            sundayHour: data.sundayHour,
            sundayHourEnd: data.sundayHourEnd,
            timing: data.timing
        });
        var url = associationUrl + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();

    }

    DemandMemberShip(id, phone){
        let body = JSON.stringify({
            phone: phone
        })
        let url = associationUrl + id + '/membership?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    AcceptMemberShip(id, idDemander){
        let url = associationUrl + id + '/demandmembership/'+ idDemander +'/accept?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    RefuseMemberShip(id, idDemander){
        let url = associationUrl + id + '/demandmembership/'+ idDemander +'/refuse?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    DeleteMemberShip(id, idDemander){
        let url = associationUrl + id + '/demandmembership/'+ idDemander +'/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getMemberShipDemands(id){
        let url = associationUrl + id + '/get_demands_memberships?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getMemberShips(id){
        let url = associationUrl + id + '/get_memberships?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getAccueilAssociation(id) {
        var url = SERVER_URL + 'association/home/' + id + '?NousEnsembleToken=' + localStorage.getItem("token");
        console.log("URLA 1 : " + url);
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getEvents(id, page) {
        var url = SERVER_URL + 'event/' + id + '/association/' + page + '/' + 4 + '?NousEnsembleToken=' + localStorage.getItem("token");
        console.log("URLA 2 : " + url);
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getDetails(id) {
        var url = SERVER_URL + "association/view/" + id + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    put(data, img, toDelete) {
        let body = JSON.stringify({
            name: data.name,
            category: data.category,
            address: data.address,
            codePostal: data.codePostal,
            phone: data.phone,
            email: data.email,
            city: data.city,
            description: data.description,
            photo: img,
            timing: data.timing,
            todelete: toDelete

        });
        var url = associationUrl + data.id + '/update?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();

    }
    postAdmin(id, email) {
        let body = JSON.stringify({
            email: email,
        });
        var url = associationUrl + id + '/admin?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();


    }
    postSuperAdmin(id, email) {
        let body = JSON.stringify({
            email: email,
        });
        var url = associationUrl + id + '/superadmin?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();


    }
    getAdmins(id, page) {

        var url = SERVER_URL + "association/" + id + '/admins/' + page + '/' + 10 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    deleteAdmin(association, admins) {
        let body = JSON.stringify({
            admins: admins,
        });

        var url = SERVER_URL + "association/" + association + '/admin/remove?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    getEventsFilter(id, personalized, page) {
        var url = SERVER_URL + 'event/' + 'association/' + id + '/filter/' + personalized + '/' + page + '/' + 4 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getAllAssociationsByCities(page) {
        var url = SERVER_URL + 'association/cities/' + page + '/' + 10 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getAllAssociationsByCommunity(page,id) {
        var url = SERVER_URL + 'association/community/'+ id +'/' + page + '/' + 10 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    putSuAdmin(id, email) {
        let body = JSON.stringify({
            id: id,
            email: email
        });

        var url = SERVER_URL + "association/" + id + '/change/superadmin?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    deleteAssociation(id, reason) {
        let body = JSON.stringify({
            reason: reason
        });
        var url = SERVER_URL + 'association/' + id + '/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    postDemandRequest(id, phoneNumber) {

        let body = JSON.stringify({
            phone: phoneNumber
        });
        var url = SERVER_URL + 'association/' + id + '/membership?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
}
