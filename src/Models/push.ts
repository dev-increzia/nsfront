import * as moment from "moment";

export class Push {

    private id: number
    private enabled: boolean = false;
    private date = moment().format();
    private hour = moment().format();
    private content: string = null;

    public getId() {
        return this.id;
    }

    public getEnabled() {
        return this.enabled;
    }
    public setEnabled(enabled) {
        this.enabled = enabled;
    }

    public getDate() {
        return this.date;
    }
    public setDate(date) {
        this.date = date;
    }

    public getHour() {
        return this.hour;
    }
    public setHour(hour) {
        this.hour = hour;
    }

    public getContent() {
        return this.content;
    }
    public setContent(content) {
        this.content = content;
    }



}