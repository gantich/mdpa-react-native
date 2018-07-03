import { CameraRoll } from 'react-native';
// https://facebook.github.io/react-native/docs/cameraroll.html
// keep in mind that the CameraRoll needs to be linked in the native progect first.
// This is a good read article: https://www.codementor.io/blessingoraz/access-camera-roll-with-react-native-9uwupuuy0

import firebase from 'react-native-firebase';

import currentUserStore from '@stores/user';
import membersStore from '@stores/members';

const SERVER_API_KEY = 'AIzaSyDt0Odhay56DEYoGCt5rJj8ojRirFS8xLA';

const sendPush = async (title, message) => {
    const res = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            Authorization: `key=${SERVER_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: '/topics/chat',
            notification: { title: title, body: message }
        })
    });
    console.log(await res.json());
};

const getLastCameraRollPhoto = async () => {
    // get only the last image, CameraRoll doesn't give us an UI but just a list of photos
    const photos = await CameraRoll.getPhotos({
        first: 1,
        assetType: 'Photos'
    });

    return photos.edges[0].node.image; // TODO handle error cases (like permission denied or no image in gallery)
};

const login = async ({ email, password }) => {
    try {
        await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password); // https://rnfirebase.io/docs/v4.0.x/auth/reference/auth#signInAndRetrieveDataWithEmailAndPassword
        currentUserStore.data = firebase.auth().currentUser.toJSON();
        currentUserStore.data.userId = currentUserStore.data.uid;
        return currentUserStore.data;
    } catch (error) {
        return { error };
    }
};

const register = async ({ email, password, name }) => {
    try {
        await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
        // https://rnfirebase.io/docs/v4.0.x/auth/reference/auth#createUserWithEmailAndPassword

        currentUserStore.data = firebase.auth().currentUser.toJSON(); // this is the current user we logged in with

        // https://rnfirebase.io/docs/v4.0.x/auth/reference/auth#currentUser
        // after we register we update the user database with the user Id returned by firebase
        currentUserStore.data.userId = currentUserStore.data.uid;
        await updateUser({ name, userId: currentUserStore.data.userId });
        return currentUserStore.data;
    } catch (error) {
        return { error };
    }
};

const updateUser = async ({ name, photo, description, userId }) => {
    // Keep in mind we decided to keep the users in a separate database from the auth to be able to add more attributes to them (description, etc)
    try {
        return await firebase
            .database()
            .ref(`users/${userId}`)
            .update({
                name,
                photo,
                description
            });
    } catch (error) {
        return { error };
    }
};

const sendTextMessage = ({ text, userId }) => {
    const timestamp = firebase.database().getServerTime();
    firebase
        .database()
        .ref(`messages`)
        .push({ type: 'text', text, userId, timestamp });
    // push message to database https://rnfirebase.io/docs/v4.0.x/database/reference/Reference#push

    sendPush(membersStore.data[userId].name, text);
};

const uploadMessagePhoto = async ({ image, userId, timestamp }) => {
    const ref = firebase.storage().ref(`messages/${userId}/${timestamp}_${image.filename}`);
    // we use the timestamp in the filename or firebase will replace the images with the same filename and  we won't be able to upload multiple times the same image

    const uploadResult = await ref.putFile(image.uri);
    // upload image to firebase storage https://rnfirebase.io/docs/v4.0.x/storage/reference/Reference#putFile
    image.contentType && ref.updateMetadata({ contentType: image.contentType });

    return uploadResult.downloadURL;
};

const sendPhotoMessage = async ({ image, userId }) => {
    const timestamp = firebase.database().getServerTime();
    const photoUrl = await uploadMessagePhoto({ image, userId, timestamp });

    firebase
        .database()
        .ref(`messages`)
        .push({ type: 'photo', photoUrl, userId, timestamp });

    sendPush(membersStore.data[userId].name, `Sent a 📸`);
};

const requestPushPremissions = async () => {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        subscribeToTopic();
        console.log('Push authorized');
    } catch (error) {
        console.log('Push denied');
    }
};

const checkPushEnabled = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        console.log('Push enabled');
        subscribeToTopic();
    } else {
        console.log('Push disabled');
        requestPushPremissions();
    }
};

const subscribeToTopic = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
        firebase.messaging().subscribeToTopic('chat');
        console.log('Push subscribe to topic');
    } else {
        console.log('Push has no token');
    }
};

export {
    login,
    register,
    updateUser,
    sendTextMessage,
    sendPhotoMessage,
    getLastCameraRollPhoto,
    checkPushEnabled,
    requestPushPremissions,
    sendPush
};

// curl
// https://fcm.googleapis.com/fcm/send

// -X POST
// --header "Authorization: key=SERVER_API_KEY"
// --header "Content-Type: application/json"
// -d "{\"to\":\"/topics/chat\",\"notification\":{\"title\",\"Hello\",\"body\":\"hey there from curl\"}}"
