
import "firebase/compat/database";
import firebase from "firebase/compat/app";



import { getAuth, reauthenticateWithCredential, signOut, verifyBeforeUpdateEmail } from "firebase/auth";


// TODO(you): prompt the user to re-provide their sign-in credentials
// const credential = promptForCredentials();

// reauthenticateWithCredential(user, credential).then(() => {
//   // User re-authenticated.
// }).catch((error) => {
//   // An error ocurred
//   // ...
// });



// export function verificationEmail() {
//     const user = firebase.auth().currentUser;
//     user.sendEmailVerification().then(function() {
//       // Email sent.
//     }).catch(function(error) {
//       // An error happened.
//     });
// }

export async function firebaseEmailReset(user, newEmail) {
    
    try {
        await verifyBeforeUpdateEmail(user, newEmail);
        await firebase.auth().signOut();
        window.location.reload();
    } catch (error) {
        console.error(error.message);
    }
}
