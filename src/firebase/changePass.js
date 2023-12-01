
import {
    getAuth,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
  } from 'firebase/auth';
  

async function CheckCredential(valueOldPass, user) {
    const oldPassword = valueOldPass;
    const credential = EmailAuthProvider.credential(
      user.currentUser.email,
      oldPassword
   );
   await reauthenticateWithCredential(user.currentUser, credential);
  }


  

  export async function changePassword(valueOldPass, newPassword) {
    const user = getAuth()
    await CheckCredential(valueOldPass, user)
    await updatePassword(user.currentUser, newPassword);
  }
