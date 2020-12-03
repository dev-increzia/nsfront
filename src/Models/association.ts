export class Association {

    private id: number;
    private name: string = null;
    private photo = null;
    private category = null;
    private community = null;
    private address: string = null;
    private codePostal: number = null;
    private phone: string = null;
    private email: string = null;
    private city = null;
    private description: string = null;
    private monday: string = "0";
    private mondayHour = null;
    private mondayHourEnd = null;
    private tuesday: string = "0";
    private tuesdayHour = null;
    private tuesdayHourEnd = null;
    private wednesday: string = "0";
    private wednesdayHour = null;
    private wednesdayHourEnd = null;
    private thursday: string = "0";
    private thursdayHour = null;
    private thursdayHourEnd = null;
    private friday: string = "0";
    private fridayHour = null;
    private fridayHourEnd = null;
    private saturday: string = "0";
    private saturdayHour = null;
    private saturdayHourEnd = null;
    private sunday: string = "0";
    private sundayHour = null;
    private sundayHourEnd = null;
    private timing = null;


    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getCommunity() {
        return this.community;
    }

    public setCommunity(community) {
        this.community = community;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getPhoto() {
        return this.photo;
    }

    public setPhoto(photo) {
        this.photo = photo;
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

    public getAddress() {
        return this.address;
    }
    public setAddress(address) {
        this.address = address;
    }

    public getCodePostal() {
        return this.codePostal;
    }
    public setCodePostal(codePostal) {
        this.codePostal = codePostal;
    }

    public getPhone() {
        return this.phone;
    }
    public setPhone(phone) {
        this.phone = phone;
    }

    public getEmail() {
        return this.email;
    }
    public setEmail(email) {
        this.email = email;
    }

    public getMonday() {
        return this.monday;
    }
    public setMonday(monday) {
        this.monday = monday;
    }

    public getMondayHour() {
        return this.mondayHour;
    }
    public setMondayHour(mondayHour) {
        this.mondayHour = mondayHour;
    }

    public getMondayHourEnd() {
        return this.mondayHourEnd;
    }
    public setMondayHourEnd(mondayHourEnd) {
        this.mondayHourEnd = mondayHourEnd;
    }

    public getTuesday() {
        return this.tuesday;
    }
    public setTuesday(tuesday) {
        this.tuesday = tuesday;
    }

    public getTuesdayHour() {
        return this.tuesdayHour;
    }
    public setTuesdayHour(tuesdayHour) {
        this.tuesdayHour = tuesdayHour;
    }

    public getTuesdayHourEnd() {
        return this.tuesdayHourEnd;
    }
    public setTuesdayHourEnd(tuesdayHourEnd) {
        this.tuesdayHourEnd = tuesdayHourEnd;
    }

    public getWednesday() {
        return this.wednesday;
    }
    public setWednesday(wednesday) {
        this.wednesday = wednesday;
    }
    public getWednesdayHour() {
        return this.wednesdayHour;
    }
    public setWednesdayHour(wednesdayHour) {
        this.wednesdayHour = wednesdayHour;
    }

    public getWednesdayHourEnd() {
        return this.wednesdayHourEnd;
    }
    public setWednesdayHourEnd(wednesdayHourEnd) {
        this.wednesdayHourEnd = wednesdayHourEnd;
    }

    public getThursday() {
        return this.thursday;
    }

    public setThursday(thursday) {
        this.thursday = thursday;
    }
    public getThursdayHour() {
        return this.thursdayHour;
    }

    public setThursdayHour(thursdayHour) {
        this.thursdayHour = thursdayHour;
    }
    public getThursdayHourEnd() {
        return this.thursdayHourEnd;
    }

    public setThursdayHourEnd(thursdayHourEnd) {
        this.thursdayHourEnd = thursdayHourEnd;
    }

    public getFriday() {
        return this.friday;
    }
    public setFriday(friday) {
        this.friday = friday;
    }

    public getFridayHour() {
        return this.fridayHour;
    }
    public setFridayHour(fridayHour) {
        this.fridayHour = fridayHour;
    }

    public getFridayHourEnd() {
        return this.fridayHourEnd;
    }
    public setFridayHourEnd(fridayHourEnd) {
        this.fridayHourEnd = fridayHourEnd;
    }

    public getSaturday() {
        return this.saturday;
    }
    public setSaturday(saturday) {
        this.saturday = saturday;
    }
    public getSaturdayHour() {
        return this.saturdayHour;
    }
    public setSaturdayHour(saturdayHour) {
        this.saturdayHour = saturdayHour;
    }

    public getSaturdayHourEnd() {
        return this.saturdayHourEnd;
    }
    public setSaturdayHourEnd(saturdayHourEnd) {
        this.saturdayHourEnd = saturdayHourEnd;
    }

    public getSunday() {
        return this.sunday;
    }
    public setSunday(sunday) {
        this.sunday = sunday;
    }
    public getSundayHour() {
        return this.sundayHour;
    }
    public setSundayHour(sundayHour) {
        this.sundayHour = sundayHour;
    }

    public getSundayHouEnd() {
        return this.sundayHourEnd;
    }
    public setSundayHourEnd(sundayHourEnd) {
        this.sundayHourEnd = sundayHourEnd;
    }

    public getTiming() {
        return this.timing;
    }
    public setTiming(timing) {
        this.timing = timing;
    }


}