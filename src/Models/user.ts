export class User {

    private id: number;
    private firstname: string = null;
    private lastname: string = null;
    private birth;
    private email: string = null;
    private city = null;
    private phone = null;
    private image_url;
    private password: string = null;
    private rePassword: string = null;
    private rememberMe: boolean = true;

    public getId() {
        return this.id;
    }

    public getFirstname() {
        return this.firstname;
    }

    public setFirstName(firstname) {
        this.firstname = firstname;
    }

    public getLastname() {
        return this.lastname;
    }

    public setLastname(lastname) {
        this.lastname = lastname;
    }

    public getBirth() {
        return this.birth;
    }

    public setBirth(birth) {
        this.birth = birth;
    }

    public getEmail() {
        return this.email;
    }

    public setEmail(email) {
        this.email = email;
    }

    public getCity() {
        return this.city;
    }

    public setCity(city) {
        this.city = city;
    }

    public getPhone() {
        return this.phone;
    }

    public setPhone(phone) {
        this.phone = phone;
    }

    public getImageUrl() {
        return this.image_url;
    }

    public setImageUrl(image_url) {
        this.image_url = image_url;
    }

    public getPassword() {
        return this.password;
    }

    public setPassword(password) {
        this.password = password;
    }

    public getRePassword() {
        return this.rePassword;
    }

    public setRePassword(rePassword) {
        this.rePassword = rePassword;
    }

    public getRememberMe() {
        return this.rememberMe;
    }

    public setRememberMe(rememberMe) {
        this.rememberMe = rememberMe;
    }

    getCurrent(currentUser) {
        this.firstname = currentUser.firstname; 
        this.lastname = currentUser.lastname;
        this.birth = currentUser.birth_date;
        this.email = currentUser.email;
        this.phone = currentUser.phone;
        this.city =  currentUser.city ? currentUser.city.name : null;
        this.image_url = currentUser.image_url;
    }
}
