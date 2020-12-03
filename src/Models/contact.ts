
export class Contact {

    private id: number;
    private object: string = null;
    public description: string = null;
    public location: string = null;
    private photo: string = null;
    private category: string = null;
    private city = null;
    public document = null;

    public getId() {
        return this.id;
    }

    public getObject() {
        return this.object;
    }

    public setObject(object: string) {
        this.object = object;
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

    public getLocation() {
        return this.location;
    }

    public setLocation(location: string) {
        this.location = location;
    }

    public getPhoto() {
        return this.photo;
    }

    public setPhoto(photo: string) {
        this.photo = photo;
    }

    public getDocument() {
        return this.document;
    }

    public setDocument(documnt: string) {
        this.document = document;
    }


    public reset() {
        this.object = null;
        this.description = null;
        this.city = null;
        this.location = null;
        this.category = null;
        this.document = null;
    }

}
