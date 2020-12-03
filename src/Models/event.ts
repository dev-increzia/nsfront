import * as moment from "moment";
import {Article} from "./article";
import {Push} from "./push";

export class Event {
    private id: number;
    private title: string = null;
    private room: string = null;
    private address: string = null;
    private postalcode: number = null;
    private city = null;
    private categories = null;
    private startDate = {
        year: moment().year(),
        month: moment().month() + 1,
        day: moment().date(),
        hour: moment().hour(),
        minute: moment().minute(),
        fullDate: moment().format()
    };
    private endDate = {
        year: moment().year(),
        month: moment().month() + 1,
        day: moment().date(),
        hour: moment().hour(),
        minute: moment().add('m', 1).minute(),
        fullDate: moment().add('m', 1).format()
    };
    private price: string = "Gratuit";
    private description: string = null;
    private reservationUrl: string = null;
    private photo = null;
    private secondPhoto = null;
    private thirdPhoto = null;
    private reservation = null;
    private article: Article = null;
    private push: Push = new Push();
    private volunteer: boolean = false;
    private personalized: boolean = false;
    private monday = null;
    private tuesday = null;
    private wednesday = null;
    private thursday = null;
    private friday = null;
    private saturday = null;
    private sunday = null;
    private agefrom: number = null;
    private ageto: number = null;
    private lessthansix = null;
    private betweensixtwelve = null;
    private twelveeighteen = null;
    private allchildrens = null;
    private newPhoto = null;
    private deletePhoto: boolean = false;

    public getId() {
        return this.id;
    }

    public getTitle() {
        return this.title;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public getRoom() {
        return this.room;
    }
    public setRoom(room: string) {
        this.room = room;
    }

    public getAddress() {
        return this.address
    }
    public setAddress(address) {
        this.address = address;
    }

    public getPostalcode() {
        return this.postalcode;
    }
    public setPostalcode(postalcode) {
        this.postalcode = postalcode;
    }

    public getCity() {
        return this.city;
    }
    public setCity(city) {
        this.city = city;
    }

    public getCategories() {
        return this.categories;
    }
    public setCategories(categories) {
        this.categories = categories;
    }

    public getStartDate() {
        return this.startDate;
    }
    public setStartDate(startDate) {
        this.startDate = startDate;
    }

    public getEndDate() {
        return this.endDate;
    }
    public setEndDate(endDate) {
        this.endDate = endDate;
    }

    public getPrice() {
        return this.price;
    }
    public setPrice(price: string) {
        this.price = price;
    }

    public getDescription() {
        return this.description;
    }
    public setDescription(description: string) {
        this.description = description;
    }

    public getReservationUrl() {
        return this.reservationUrl;
    }
    public setReservationUrl(reservationUrl: string) {
        this.reservationUrl = reservationUrl;
    }

    public getPhoto() {
        return this.photo;
    }
    public setPhoto(photo) {
        this.photo = photo;
    }

    public getSecondPhoto() {
        return this.secondPhoto;
    }
    public setSecondPhoto(secondPhoto) {
        this.secondPhoto = secondPhoto;
    }

    public getThirdPhoto() {
        return this.thirdPhoto;
    }
    public setThirdPhoto(thirdPhoto) {
        this.thirdPhoto = thirdPhoto;
    }

    public getReservation() {
        return this.reservation;
    }
    public setReservation(reservation) {
        this.reservation = reservation;
    }

    public getArticle() {
        return this.article;
    }
    public setArticle(article) {
        this.article = article;
    }

    public getPush() {
        return this.push;
    }
    public setPush(push: Push) {
        this.push = push;
    }

    public getVolunteer() {
        return this.volunteer;
    }
    public setVolunteer(volunteer: boolean) {
        this.volunteer = volunteer;
    }

    public getPersonalized() {
        return this.personalized;
    }
    public setPersonalized(personalized: boolean) {
        this.personalized = personalized;
    }

    public getMonday() {
        return this.monday;
    }
    public setMonday(monday) {
        this.monday = monday;
    }

    public getTuesday() {
        return this.tuesday;
    }
    public setTuesday(tuesday) {
        this.tuesday = tuesday;
    }

    public getWednesday() {
        return this.wednesday;
    }
    public setWednesday(wednesday) {
        this.wednesday = wednesday;
    }

    public getThursday() {
        return this.thursday;
    }
    public setThursday(thursday) {
        this.thursday = thursday;
    }

    public getFriday() {
        return this.friday;
    }
    public setFriday(friday) {
        this.friday = friday;
    }

    public getSaturday() {
        return this.saturday;
    }

    public setSaturday(saturday) {
        this.saturday = saturday;
    }

    public getSunday() {
        return this.sunday;
    }

    public setSunday(sunday) {
        this.sunday = sunday;
    }

    public getAgefrom() {
        return this.agefrom;
    }
    public setAgefrom(agefrom) {
        this.agefrom = agefrom;
    }

    public getAgeto() {
        return this.ageto;
    }
    public setAgeto(ageto) {
        this.ageto = ageto;
    }

    public getLessthansix() {
        return this.lessthansix;
    }
    public setLessthansix(lessthansix) {
        this.lessthansix = lessthansix;
    }

    public getBetweensixtwelve() {
        return this.betweensixtwelve;
    }
    public setBetweensixtwelve(betweensixtwelve) {
        this.betweensixtwelve = betweensixtwelve;
    }

    public getTwelveeighteen() {
        return this.twelveeighteen;
    }
    public setTwelveeighteen(twelveeighteen) {
        this.twelveeighteen = twelveeighteen;
    }

    public getAllchildrens() {
        return this.allchildrens;
    }

    public setAllchildrens(allchildrens) {
        this.allchildrens = allchildrens;
    }

    public getNewPhoto() {
        return this.newPhoto;
    }
    public setNewPhoto(newPhoto) {
        this.newPhoto = newPhoto;
    }

    public getDeletePhoto() {
        return this.deletePhoto;
    }

    public setDeletePhoto(deletePhoto: boolean) {
        this.deletePhoto = deletePhoto;
    }
}