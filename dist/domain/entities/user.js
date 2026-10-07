export default class User {
    _id;
    name;
    email;
    name_company;
    number_phone;
    types;
    roles;
    constructor({ _id = null, name = null, email, name_company = null, number_phone = null, types, roles }) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.name_company = name_company;
        this.number_phone = number_phone;
        this.types = types;
        this.roles = roles;
    }
    static fromJson(json) {
        return new User(json);
    }
}
//# sourceMappingURL=user.js.map