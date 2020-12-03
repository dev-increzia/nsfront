import {Component} from "@angular/core";
import {AlertController, IonicPage, NavController, NavParams, ViewController} from "ionic-angular";
import {GlobalsProvider} from "../../providers/globals/globals";
import {UserProvider} from "../../providers/user/user";
import "rxjs/add/operator/map";
/**
 * Generated class for the PopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-select-city',
    templateUrl: 'select-city.html',
})
export class SelectCityPage {
    public allCities: any;
    public allCitiesFilter: any;
    public selectedCity: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private view: ViewController,
        public appGlobals: GlobalsProvider,
        public alertCtrl: AlertController,
        public userService: UserProvider,) {
            this.allCities = this.appGlobals.allCities;
            this.allCitiesFilter = this.appGlobals.allCities;

    }
    filterVilles(event) {
        let key = event.target.value;
        this.userService.searchCities(key).then(data => {
            this.allCitiesFilter = data;
        });
    }
    Close() {
        this.view.dismiss();
    }
    
    selectCity(city){
        this.selectedCity = city;
    }
    validate(){
        this.view.dismiss(this.selectedCity);
    }
}
