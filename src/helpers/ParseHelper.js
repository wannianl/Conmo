import Parse from 'parse';
import User from './User';
import Notification from './Notification';

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

    static fetchClassList() {
        
    }

    static fetchUserNotifications(userID,userType) {
        var userPointer = User.createWithoutData(userID);
        var query = new Parse.Query(Notification);
        if (userType === 1) {
            query.equalTo("student",userPointer);
            query.include("teacher");
        } else if (userType === 2) {
            query.equalTo("teacher",userPointer);
            query.include("student");
        }
        
        return query.find();
    }

    static sendRequestNotification(teacher,student) {
        var parseNotif = new Notification();
        var teacherPointer = User.createWithoutData(teacher.id);
        var studentPointer = User.createWithoutData(student.id);
        parseNotif.set('teacher',teacherPointer);
        parseNotif.set('type',"request");
        parseNotif.set('date',new Date());
        parseNotif.set('student',studentPointer);
        parseNotif.save();
    }

    static fetchNotificationByID(notificationID) {
        var query = new Parse.Query(Notification);
        query.equalTo("objectId",notificationID);
        query.include("teacher");
        query.include("student");
        return query.first();
    }
    

}