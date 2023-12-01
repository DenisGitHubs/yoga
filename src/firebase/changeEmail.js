
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

export async function changeLogin(login) {
    const auth = getAuth();
    CheckCredential(auth)
await firebaseEmailReset(auth.currentUser, login).then(() => {
    console.log('done');
    localStorage.setItem('email', auth.currentUser.email)
}).catch((error) => {
    console.error(error.message);
    });
}

async function CheckCredential(auth) {
    let valueOldPass = prompt('пароль')
    const oldPassword = valueOldPass;
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
      oldPassword
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