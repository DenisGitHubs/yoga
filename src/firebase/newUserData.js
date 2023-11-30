
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
        {progress: [0]},
        {progress: [0,0,0]},
        {progress: [0,0,0,0,0]},
        {progress: [0,0,0,0]},
        {progress: [0,0,0]},
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

