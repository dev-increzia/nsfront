export class Merchant {

    private id: number;
    private name: string = null;
    private photo = null;
    private category = null;
    private siret: string = null;
    private address: string = null;
    private codePostal: number = null;
    private phone: string = null;
    private email: string = null;
    private city = null;
    private description: string = null;
    private timing = null;
    private community = null;


    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }
    public getCommunity() {
        return this.community;
    }

    public setCommunity(community) {
        this.community = community;
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

    public getTiming() {
        return this.timing;
    }
    public setTiming(timing) {
        this.timing = timing;
    }

    public getSiret() {
        return this.siret;
    }
    public setSiret(siret) {
        this.siret = siret;
    }


}