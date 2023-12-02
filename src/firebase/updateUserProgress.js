
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useDataWorkout } from "./fireWorkouts";

    function updatePogressDone(id) {
    const user = localStorage.getItem('email');
    firebase
    .database()
    .ref(`users/` + user.replace(/\./g, "-") + '/workoutsDone' + id)
    .update({
        done: true,
    })
      .catch((error) => {
        console.error(error);
      });
}

export function updateProgressExercise(IDtraining, progress) {
    const user = localStorage.getItem('email');
    const id = IDtraining
    firebase
    .database()
    .ref(`users/` + user.replace(/\./g, "-") + '/workoutsProgress' + `/${IDtraining}`)
    .update([progress])
      .catch((error) => {
        console.error(error);
      });
}