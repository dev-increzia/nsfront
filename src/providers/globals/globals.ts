import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {LinkreplacePipe} from "../../pipes/linkreplace/linkreplace";

/*
  Generated class for the GlobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalsProvider {

    public allCities: any;
    public allCategories: any;
    public currentEventId: any;
    public currentEvent: any;
    public checkedCarpool: any;
    public adminAssociations = {};
    public adminMerchants= {};
    public adherentMerchants= {};
    public adherentAssociations= {};
    public currentPageid: string;
    public currentPageTitle: string;
    public currentPageLogo: string;
    public token: any;
    public showHeader = true;
    public showFooter = true;
    public showSearchNews = false;
    public showSearchAgenda = false;
    public showBenevoleAgenda = false;
    public showproposeCarpooling = false;
    public showcontactBar = false;
    public showNeedCarpooling = false;
    public showAnswerCarpooling = false;
    public showPutAgenda = false;
    public themeFilter = false;
    public publicSearch = false;
    public privateSearch = false;
    public villeFilter = false;
    public appSearch = false;
    public onEventDetails = false;
    public onNegativeTopSearch = false;
    public goodPlanMessage = "";
    public goodPlanCreatorId = "";
    public isFromMerchant = false;
    public searchCriteria = {
        key: null,
        theme: null,
        event: false,
        article: false,
        account: false,
        goodplans: false,
        cities: "all"
    };

    public nbrNotification: number = 0;

    constructor(public http: Http) {
    }

    toIsoString(date: Date) {
        var tzo = date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
            };
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            dif + pad(tzo / 60) +
            ':' + pad(tzo % 60);
    }

    IsoToDateString(isoStr: String) {
        let decomp = isoStr.split("T");
        let date = decomp[0];
        let time = decomp[1];
        if (time) {
            let decompTime = time.split(":");
            return date + " " + decompTime[0] + ":" + decompTime[1];
        } else {
            return null;
        }
    }


    phpToJsDate(phpDate, type) {
        let decomp = phpDate.split("+");
        if (decomp[1]) {

        }
        if (type == "date") {
            return new Date(decomp[0]);
        } else {
            return decomp[0];
        }
    }

    pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    capitalizeData(data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

    linky(val) {
        var l = new LinkreplacePipe();
        return l.transform(val);
    }

}
