import * as S from "./profileStyle";
import { useEffect, useState } from "react";
import { Header } from "../../Components/header/header";
import { NewLogin } from "../../Components/newLogin/newLogin";
import { NewRegister } from "../../Components/newRegister/newRegister";
import { setLogo } from "../../store/slices/logoSlices";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WorkoutSelect from "../../Components/WorkoutSelect/WorkoutSelect";
import { Loader } from "../../Components/loader/loader";
import { useDataWorkout } from "../../firebase/fireWorkouts";
import { dataTraining } from "../../context/dataTraining";
import { useUser } from "../../firebase/getUser";
const courses = [{ id: "1", img: "/img/profCard1.png" }];

  //мокап тренировок
  const yogaWorkoutsMock = [{
    id: 0,
    name: 'Утренняя практика',
    type: 'Йога на каждый день / 1 день',
    exercise: [{
      id: 1,
      name: 'Приветствие солнца',
      repeats: 10,
      repeats_done: 15
    }],
    video_file: 'https://youtu.be/oqe98Dxivns',
    isFinished: true
  }, 
  {
    id: 1,
    name: 'Красота и здоровье',
    type: 'Йога на каждый день / 2 день',
    exercise: [{
      id: 1,
      name: 'Наклон вперед',
      repeats: 10,
      repeats_done: 3
    },
    {
      id: 2,
      name: 'Наклон назад',
      repeats: 10,
      repeats_done: 5
    },
    {
      id: 3,
      name: 'Поднятие ног, согнутых в коленях',
      repeats: 5,
      repeats_done: 2
    }],
    video_file: 'https://www.youtube.com/embed/v-xTLFDhoD0?si=sOUcrSXeRMOTjIC1',
    isFinished: true
  },
  {
      id: 2,
      name: 'Асаны стоя',
      type: 'Йога на каждый день / 3 день',
      exercise: [{
        id: 1,
        name: 'Наклон к правой ноге',
        repeats: 10,
        repeats_done: 0
      },
      {
        id: 2,
        name: 'Наклон к левой ноге',
        repeats: 10,
        repeats_done: 5
      },
      {
        id: 3,
        name: 'Наклон к согнутой правой ноге',
        repeats: 10,
        repeats_done: 2
      },
      {
        id: 4,
        name: 'Наклон к согнутой левой ноге',
        repeats: 10,
        repeats_done: 5
      },
      {
        id: 5,
        name: 'Асана стоя',
        repeats: 10,
        repeats_done: 5
      }],
      video_file: 'https://youtu.be/WxFz-4YsiEE',
      isFinished: false
  },
  {
      id: 3,
      name: 'Растягиваем мышцы бедра',
      type: 'Йога на каждый день / 4 день',
      exercise: [{
        id: 1,
        name: 'Сесть на пятки с носками от себя',
        repeats: 5,
        repeats_done: 0
      },
      {
        id: 2,
        name: 'Сесть на пятки с носками на себя',
        repeats: 5,
        repeats_done: 5
      },
      {
        id: 3,
        name: 'Отпустить колено на пол из позы лотоса',
        repeats: 10,
        repeats_done: 2
      },
      {
        id: 4,
        name: 'Отпустить колено на пол из позы лотоса с соединенными стопами',
        repeats: 10,
        repeats_done: 5
      }],
      video_file: 'https://youtu.be/09uGkAEQuZI',
      isFinished: true
  },
  {
      id: 4,
      name: 'Гибкость спины',
      type: 'Йога на каждый день / 5 день',
      exercise: [{
        id: 1,
        name: 'Округляем грудную клетку при выдохе',
        repeats: 10,
        repeats_done: 0
      },
      {
        id: 2,
        name: 'Тянем левую руку в правую сторону',
        repeats: 20,
        repeats_done: 5
      },
      {
        id: 3,
        name: 'Тянем правую руку в левую сторону (20 повторений)',
        repeats: 20,
        repeats_done: 2
      }],
      video_file: 'https://youtu.be/MIvcMapie_A',
      isFinished: false
  }];

export const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [valuePass, setValuePass] = useState(null);
  const dispatch = useDispatch();
  const progress = useSelector(state => state.progress)
  const [dataTrain, setDataTrain] = useState("1")
  useDataWorkout();
  useUser()
  const dataWorkout = useSelector((state) => state.workout);
  const email = localStorage.getItem("email");

console.log(progress);
  useEffect(() => {
    dispatch(
      setLogo({
        logo: "black",
      })
    );
  }, []);


  const [formOnShow, setFormOnShow] = useState(false);

  const closeForm = () => {
    setFormOnShow(false);

  };
  

  const workoutSelectionForm = (
    <WorkoutSelect
      closeForm={closeForm}
    ></WorkoutSelect>
  );

  return (
    
    <S.Container>
      <S.Content>
        <Header />
        <S.SubTitle>
          <S.TitleText>Мой профиль</S.TitleText>
          <S.TitleTextLogin>
            Логин:<S.Text>{email}</S.Text>
          </S.TitleTextLogin>
          {edit ? <NewLogin setEdit={setEdit} /> : null}
          <S.TitleTextPass>
            Пароль:<S.Text>******</S.Text>
          </S.TitleTextPass>
          {editPass ? (
            <NewRegister
              setEditPass={setEditPass}
              value={valuePass}
              setValuePass={setValuePass}
            />
          ) : null}
        </S.SubTitle>
        <S.ChangeLogPass>
          <S.LogButton onClick={() => setEdit(true)}>
            Изменить логин
          </S.LogButton>
          <S.PassButton onClick={() => setEditPass(true)}>
            Изменить пароль
          </S.PassButton>
        </S.ChangeLogPass>
        <S.TitleCourse>Мои курсы</S.TitleCourse>
        
        <S.SportChoice>
          {courses.map((course) => (
            <S.Sport key={course.id}>
              <S.ProfCard src={course.img} alt="prof_card" />
              
              <S.SportButton onClick={() => setFormOnShow(true)}>
                Перейти →
              </S.SportButton>
              
            </S.Sport>

          ))}
        </S.SportChoice>
        
        {formOnShow ? workoutSelectionForm : null}
      </S.Content>
    </S.Container>

  );
};

// (
//     <div>
//       <S.textNoPay>У вас ещё не куплено ни одного курса</S.textNoPay>
//       <Link to="/">
//         <S.buttonNextPay>Купить...</S.buttonNextPay>
//       </Link>
//     </div>
//   )
