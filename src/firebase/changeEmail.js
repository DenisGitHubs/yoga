
import { getAuth, reauthenticateWithCredential, updateEmail, EmailAuthProvider, } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { firebaseEmailReset } from "./verification";


// export function changeLogin(login) {
// const auth = getAuth();
// console.log(auth);
// updateEmail(auth.currentUser, login).then(() => {
// console.log("object");
//     localStorage.setItem('error', null)
// }).catch((error) => {
// console.error(error);
// localStorage.setItem('error', "Please verify the new email before changing email")
// });
// }

export async function changeLogin(login, valueOldPass) {
    const auth = getAuth();
    CheckCredential(auth, valueOldPass)
await firebaseEmailReset(auth.currentUser, login).then(() => {
    console.log('done');
}).catch((error) => {
    console.error(error.message);
    });
}

async function CheckCredential(auth, valueOldPass) {

    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        valueOldPass
   );
   await reauthenticateWithCredential(auth.currentUser, credential);
  }
// export function changeLogin(login) {
// const user = firebase.auth().currentUser;
// user.updateEmail(login).then(() => {
// }).catch((error) => {
//     console.error(error);
// });
// }