import firebase from 'react-native-firebase';
import _ from 'lodash';

const watchUsers = callback => {
    firebase
        .database()
        .ref(`users`)
        .on('value', snapshot => {
            //https://rnfirebase.io/docs/v4.0.x/database/reference/Reference#on
            // the value event triggers everytime we change the database (add/delete/update a message in it)
            const members = snapshot.val();
            callback(members);
        });
};

const watchMessages = callback => {
    firebase
        .database()
        .ref(`messages`)
        .on('value', snapshot => {
            const res = snapshot.val();
            // the messages are stored as an object in firebase, so we need to map them to an array to populate the FlatList:
            // https://facebook.github.io/react-native/docs/flatlist.html#data
            const messages = _.chain(res)
                .map(item => {
                    return item;
                })
                .sortBy(['timestamp'])
                // We add a timestamp on the message creation, which is the Firebase timestamp so we know the order of the messages
                // https://rnfirebase.io/docs/v4.0.x/database/reference/database#getServerTime

                .reverse()
                .value();

            callback(messages);
        });
};

export { watchMessages, watchUsers };
