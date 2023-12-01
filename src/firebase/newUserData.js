
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export function saveNewUsers(newEmail, password) {
  firebase
    .database()
    .ref(`/users/` + newEmail.replace(/\./g, "-"))
    .set({
      email: newEmail,
      password: password,
      workoutsName: [
        [{ name: "Приветствие солнца"}],
        [
          { name: "Наклон вперед"},
          { name: "Наклон назад"},
          { name: "Поднятие ног, согнутых в коленях"},
        ],
        [
          { name: "Наклон к правой ноге"},
          { name: "Наклон к левой ноге"},
          { name: "Наклон к согнутой правой ноге"},
          { name: "Наклон к согнутой левой ноге"},
          { name: "Асана стоя"},
        ],
        [
          { name: "Сесть на пятки с носками от себя"},
          { name: "Сесть на пятки с носками на себя"},
          { name: "Отпустить колено на пол из позы лотоса"},
          {name: "Отпустить колено на пол из позы лотоса с соединенными стопами"},
        ],
        [
          { name: "Округляем грудную клетку при выдохе"},
          { name: "Тянем левую руку в правую сторону"},
          {name: "Тянем правую руку в левую сторону (20 повторений)"},
        ],
      ],
      workoutsProgress: [
        [[{id: 0, progress: 0, training: "Приветствие солнца"}]],
        [[{id: 0, progress: 0, training: "Наклон вперед"}, {id: 1, progress: 0, training: "Наклон назад"}, {id: 2, progress: 0, training: "Поднятие ног, согнутых в коленях"}]],
        [[{id: 0, progress: 0, training: "Наклон к правой ноге"}, {id: 1, progress: 0, training: "Наклон к левой ноге"}, {id: 2, progress: 0, training: "Наклон к согнутой правой ноге"}, {id: 3, progress: 0, training: "Наклон к согнутой левой ноге"}, {id: 4, progress: 0, training: "Асана стоя"}]],
        [[{id: 0, progress: 0, training: "Сесть на пятки с носками от себя"}, {id: 1, progress: 0, training: "Сесть на пятки с носками на себя"}, {id: 2, progress: 0, training: "Отпустить колено на пол из позы лотоса"}, {id: 3, progress: 0, training: "Отпустить колено на пол из позы лотоса с соединенными стопами"}]],
        [[{id: 0, progress: 0, training: "Округляем грудную клетку при выдохе"}, {id: 1, progress: 0, training: "Тянем левую руку в правую сторону"}, {id: 2, progress: 0, training: "Тянем правую руку в левую сторону (20 повторений)"}]],
      ],
      workoutsDone: [
        { name: "Утренняя практика", done: false },
        { name: "Красота и здоровье", done: false },
        { name: "Асаны стоя", done: false },
        { name: "Растягиваем мышцы бедра", done: false },
        { name: "Гибкость спины", done: false },
      ],
    });
  console.log("saved");
}

// var promise = auth.createUserWithEmailAndPassword(email, pass);
// promise.then(function(authData) {// You are forgetting this reference.
//     authData.user.sendEmailVerification();
// }, function(error) {
//     // An error happened.
// })


// firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
//   .then(() => {
//     // The link was successfully sent. Inform the user.
//     // Save the email locally so you don't need to ask the user for it again
//     // if they open the link on the same device.
//     window.localStorage.setItem('emailForSignIn', email);
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });

