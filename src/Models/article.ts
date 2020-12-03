import * as moment from "moment";

export class Article {
    private id: number;
    private title: string = null;
    public photo = null;
    private secondPhoto = null;
    private thirdPhoto = null;
    public photos = null;
    private description: string = null;
    private city = null;
    private category = null;
    private event: string = null;
    private publicAt = {
        year: moment().year(),
        month: moment().month() + 1,
        day: moment().date(),
        hour: moment().hour(),
        minute: moment().minute(),
        fullDate: moment().format()
    };
    public getId() {
        return this.id;
    }

    public getTitle() {
        return this.title;
    }

    public setTitle(title: string) {
        this.title = title;
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

    public getPhotos() {
        return this.photos;
    }

    public setPhotos(photos) {
        this.photos = photos;
    }

    public getDescription() {
        return this.description;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public getCity() {
        return this.city;
    }

    public setCity(city) {
        this.city = city;
    }

    public getCategory() {
        return this.category;
    }

    public setCategory(category) {
        this.category = category;
    }

    public getEvent() {
        return this.event;
    }

    public setEvent(event: string) {
        this.event = event;
    }

    public getPublicAt() {
        return this.publicAt;
    }

    public setPublicAt(publicAt) {
        this.publicAt = publicAt;
    }

    public reset() {
        this.title = null;
        this.photo = null;
        this.secondPhoto = '';
        this.thirdPhoto = '';
        this.photos = null;
        this.description = null;
        this.city = null;
        this.category = null;
        this.event = '';
        this.publicAt = {
            year: moment().year(),
            month: moment().month() + 1,
            day: moment().date(),
            hour: moment().hour(),
            minute: moment().minute(),
            fullDate: moment().format()
        };
    }

}