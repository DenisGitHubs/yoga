
import { useDispatch } from "react-redux";
import * as S from "./mainStyled";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setLogo } from "../../store/slices/logoSlices";
import { Header } from "../../Components/header/header";
import { useUser } from "../../firebase/getUser";

import { updateProgressExercise } from "../../firebase/updateUserProgress";
import { useDataWorkout } from "../../firebase/fireWorkouts";
import { CheckCredential } from "../../firebase/changePass";
import { getAuth } from "firebase/auth";



const courses = [
  { id: "1", img: "/img/profCard1.png" },
  { id: "2", img: "/img/profCard2.png" },
  { id: "3", img: "/img/profCard3.png" },
  { id: "4", img: "/img/profCard4.png" },
  { id: "5", img: "/img/profCard5.png" },
];

export const Main = () => {
  const user = getAuth()
  console.log(user);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(setLogo({
    logo: "white",
  }))
}, []);
useUser()
useDataWorkout();
      return (
    <S.Container>
      <S.Content>
        <Header/>
        <S.HeaderContent>
          <S.SubTitle>
            <S.TitleText name="top">
              Онлайн-тренировки для занятий дома
            </S.TitleText>
            <S.TitleTextSpan>
              Начните заниматься спортом и улучшите качество жизни
            </S.TitleTextSpan>
          </S.SubTitle>
          <S.Sticker src="/img/sticker.png" alt="SaleSticker" />
        </S.HeaderContent>
        <S.Choice>
          {courses.map((i) => (
            <Link key={i.id} to={`course/${i.id}`}>
              <S.ProfCard src={i.img} alt="prof_card" />
            </Link>
          ))}
        </S.Choice>
        <S.Button>
          <a href="#top">
            <S.Up>Наверх ↑</S.Up>
          </a>
        </S.Button>
      </S.Content>
      </S.Container>
      )
    }