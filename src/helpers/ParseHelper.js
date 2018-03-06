import Parse from 'parse';
import User from './User';

export default class ParseHelper {

    static checkAuth(user) {
        var userQuery = new Parse.Query(User);
        userQuery.equalTo('objectId',user.id);
        return userQuery.first().then((result) => {
            if (result) {
                return true;
            } else {
                return false;
            } 
        });
    }

    static emptyUserData() {
        var obj = {
            id: null,
            email: null,
            password: null,
            avatar: null,
            name: null,
            country: null,
            city: null,
            userType: 1,
            rate: null,
            statement: null
        }

        return obj;
    }

    static userDataFromObject(object) {
        var obj = {
            id: object.id,
            email: object.get('email'),
            password: object.get('password'),
            avatar: object.get("avatar") ? object.get("avatar").url() : null,
            name: object.get('name'),
            country: object.get('country'),
            city: object.get('city'),
            userType: object.get('userType'),
            rate: object.get('rate'),
            statement: object.get('personalStatement')
        }

        return obj;

    }

    static updateParseUser(parseUser, editUser, parseFile) {
        parseUser.set('email',editUser.email);
        parseUser.set('username',editUser.email);
        parseUser.set('password',editUser.password);
        parseUser.set('name',editUser.name);
        parseUser.set('userType',editUser.userType);
        if (parseFile) {
            parseUser.set("avatar", parseFile);
        }
        if (editUser.userType === 1) {
            parseUser.set('country',editUser.country);
            parseUser.set('city',editUser.city);
        } else if (editUser.userType === 2) {
            parseUser.set('rate',Number(editUser.rate));
            parseUser.set('personalStatement',editUser.statement);
        }

    }

    static fetchTeacherList() {
        var query = new Parse.Query(User);
        query.equalTo('userType',2);
        return query.find();
    }

}