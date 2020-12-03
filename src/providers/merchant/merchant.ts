import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_URL} from "../../app/config";


/*
  Generated class for the CreateMerchantProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let merchantUrl = SERVER_URL + 'merchant/';

@Injectable()
export class MerchantProvider {

    constructor(public http: Http) {
    }
    post(data) {
        let body = JSON.stringify({
            photo: data.photo,
            name: data.name,
            community: data.community,
            category: data.category,
            address: data.address,
            codePostal: data.codePostal,
            phone: data.phone,
            email: data.email,
            city: data.city,
            description: data.description,
            timing: data.timing,
            siret: data.siret
        });
        var url = merchantUrl + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    getAccueilMerchant(id) {
        var url = SERVER_URL + 'merchant/home/' + id + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getMemberShipDemands(id){
        let url = merchantUrl + id + '/get_demands_memberships?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getEvents(id, page) {
        var url = SERVER_URL + 'event/' + id + '/merchant/' + page + '/' + 4 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    getEventsFilter(id, personalized, page) {
        var url = SERVER_URL + 'event/merchant/' + id + '/filter/' + personalized + '/' + page + '/' + 4 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getDetails(id) {
        var url = SERVER_URL + "merchant/view/" + id + '?NousEnsembleToken=' + localStorage.getItem("token");
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
            siret: data.siret,
            phone: data.phone,
            email: data.email,
            city: data.city,
            description: data.description,
            photo: img,
            todelete: toDelete,
            timing: data.timing
        });
        var url = merchantUrl + data.id + '/update?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }
    postAdmin(id, email) {
        let body = JSON.stringify({
            email: email,
        });
        var url = merchantUrl + id + '/admin?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();


    }
    postSuperAdmin(id, email) {
        let body = JSON.stringify({
            email: email,
        });
        var url = merchantUrl + id + '/superadmin?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();


    }

    getMerchantCard(id,page,limit){
        var url = SERVER_URL + 'article/' + id + '/merchant/' + page + '/' + limit + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getAdmins(id, page) {
        var url = merchantUrl + id + '/admins/' + page + '/' + 10 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }
    deleteAdmin(merchant, admins) {
        let body = JSON.stringify({
            admins: admins,
        });

        var url = merchantUrl + merchant + '/admin/remove?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    chekedSiret(merchant, siret) {

        var url = SERVER_URL + 'merchant/' + merchant + '/siret/' + siret + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getAllMerchantsByCities(page) {
        var url = SERVER_URL + 'merchant/cities/' + page + '/' + 10 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    getAllMerchantsByCommunity(page, id) {
        var url = SERVER_URL + 'merchant/community/'+ id+'/'+ page + '/' + 10 + '?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    putSuAdmin(id, email) {
        let body = JSON.stringify({
            id: id,
            email: email
        });

        var url = SERVER_URL + "merchant/" + id + '/change/superadmin?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    deleteMerchant(id, reason) {
        let body = JSON.stringify({
            reason: reason
        });
        var url = SERVER_URL + 'merchant/' + id + '/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    postDemandRequest(id, phoneNumber) {
        let body = JSON.stringify({
            phone: phoneNumber
        });
        var url = SERVER_URL + 'merchant/' + id + '/membership?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.post(url, body)
            .map(res => res.json())
            .toPromise();
    }

    AcceptMemberShip(id, idDemander){
        let url = merchantUrl + id + '/demandmembership/'+ idDemander +'/accept?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    RefuseMemberShip(id, idDemander){
        let url = merchantUrl + id + '/demandmembership/'+ idDemander +'/refuse?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

    DeleteMemberShip(id, idDemander){
        let url = merchantUrl + id + '/demandmembership/'+ idDemander +'/delete?NousEnsembleToken=' + localStorage.getItem("token");
        return this.http.get(url)
            .map(res => res.json())
            .toPromise();
    }

}
