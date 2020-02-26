import firebase, {providers, firestore} from "./firebase";
import fire from "firebase";
import {v4 as uuid} from "uuid";
import APP from "./const";

export default class Auth {
  constructor() {
    this.googleProvider = providers.googleProvider;
    this.facebookProvider = providers.facebookProvider;
    this.firebase = firebase;
    this.firestore = firestore;
    this.storage = window.localStorage;
  }

  logInViaPopup = async () => {
    return this.firebase
      .auth()
      .signInWithPopup(this.googleProvider)
      .then(async response => {
        const {displayName, photoURL, email, uid} = response.user;
        const result = await firestore
          .collection("user")
          .where("email", "==", email)
          .get();
        if (result.docs.length === 0) {
          const _result = await firestore
            .collection("user")
            .doc(uid)
            .set({
              id: uid,
              email,
              photoURL,
              displayName,
            });
        }
        this.storage.setItem(APP.USER_ID, uid);
        this.storage.setItem(APP.USER_DISPLAYNAME, displayName);
        this.storage.setItem(APP.USER_EMAIL, email);
        this.storage.setItem(APP.USER_PHOTOURL, photoURL);
        return {
          success: true,
        };
      })
      .catch(err => {
        return {
          success: false,
          message: err.message,
        };
      });
  };

  loginViaEmail = ({email, password}) => {
    return this.firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async response => {
        const {user} = response;
        const {uid} = user;
        const snapshot = await this.firestore
          .collection("user")
          .doc(uid)
          .get();
        const result = snapshot.data();
        const {displayName, email, photoURL} = result;
        this.storage.setItem(APP.USER_ID, uid);
        this.storage.setItem(APP.USER_DISPLAYNAME, displayName);
        this.storage.setItem(APP.USER_EMAIL, email);
        this.storage.setItem(APP.USER_PHOTOURL, photoURL);
        return {
          success: true,
          data: response,
        };
      })
      .catch(err => {
        return {
          success: false,
          message: err.message,
        };
      });
  };

  signUpWithEmail = async ({email, password, photoURL, displayName}) => {
    const result = await firestore
      .collection("user")
      .where("email", "==", email)
      .get();
    if (result.docs.length !== 0) {
      return {
        success: false,
        message: "Email has been taken",
      };
    } else {
      const response = await this.firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log(response);
      if (response) {
        const {user} = response;
        const {uid} = user;
        const _result = await firestore
          .collection("user")
          .doc(uid)
          .set({
            id: uid,
            email,
            photoURL,
            displayName,
          });
        return {
          success: true,
        };
      }
    }
  };

  logout = () => {
    return this.firebase
      .auth()
      .signOut()
      .then(response => {
        this.storage.removeItem(APP.USER_ID);
        this.storage.removeItem(APP.USER_DISPLAYNAME);
        this.storage.removeItem(APP.USER_EMAIL);
        this.storage.removeItem(APP.USER_PHOTOURL);
        return {
          success: true,
        };
      })
      .catch(err => {
        return {
          success: false,
          message: err.message,
        };
      });
  };

  isLogin = () => {
    return this.storage.getItem(APP.USER_ID);
  };

  getUserInfo = () => {
    return {
      id: this.storage.getItem(APP.USER_ID),
      displayName: this.storage.getItem(APP.USER_DISPLAYNAME),
      email: this.storage.getItem(APP.USER_EMAIL),
      photoURL: this.storage.getItem(APP.USER_PHOTOURL),
    };
  };
}
