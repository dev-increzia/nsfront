import {Injectable} from "@angular/core";
import {ConnectionBackend, Headers, Http, RequestOptions, RequestOptionsArgs, Response} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {API_VERSION, APP_VERSION} from "../../app/config";

/*
  Generated class for the InterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterceptorProvider extends Http {


    constructor(connectionBackend: ConnectionBackend, requestOptions: RequestOptions) {
        super(connectionBackend, requestOptions);
    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }

        // add API Version / APP Version to Header
        options.headers.append('Api-Version', API_VERSION);
        options.headers.append('App-Version', APP_VERSION);


        if (localStorage.getItem("token") !== null) {
            options.headers.append('Authorization', 'NousEnsembleToken ' + localStorage.getItem("token"));
        }

        return options;
    }

}
