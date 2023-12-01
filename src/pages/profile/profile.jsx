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
