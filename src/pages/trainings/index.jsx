import { useParams } from "react-router-dom";
import { useDataWorkout } from "../../firebase/fireWorkouts";
import { useUser } from "../../firebase/getUser";
import { Header } from "../../Components/header/header";
import * as S from "./styles";

import { useEffect, useState } from "react";
import ProgressInput from "../../Components/ProgressInput/ProgressInput";
import { setLogo } from "../../store/slices/logoSlices";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../Components/loader/loader";



export const Trainings = () => {
  
  useUser();
  useDataWorkout();

  const [loaderOn, setLoaderOn] = useState(false);

  const getProgressInPercent = ({ needed, done }) => {
    return (done / needed) * 100;
  };

  //мокап тренировок
  // const [yogaWorkouts, setYogaWorkouts] = useState([
  //   {
  //     id: 0,
  //     name: "Утренняя практика",
  //     type: "Йога на каждый день / 1 день",
  //     exercise: [
  //       {
  //         id: 1,
  //         name: "Приветствие солнца",
  //         repeats: 10,
  //         repeats_done: 15,
  //       },
  //     ],
  //     video_file: "https://youtu.be/oqe98Dxivns",
  //     isFinished: true,
  //   },
  //   {
  //     id: 1,
  //     name: "Красота и здоровье",
  //     type: "Йога на каждый день / 2 день",
  //     exercise: [
  //       {
  //         id: 1,
  //         name: "Наклон вперед",
  //         repeats: 10,
  //         repeats_done: 2,
  //       },
  //       {
  //         id: 2,
  //         name: "Наклон назад",
  //         repeats: 10,
  //         repeats_done: 5,
  //       },
  //       {
  //         id: 3,
  //         name: "Поднятие ног, согнутых в коленях",
  //         repeats: 5,
  //         repeats_done: 2,
  //       },
  //     ],
  //     video_file:
  //       "https://www.youtube.com/watch?v=v-xTLFDhoD0",
  //     isFinished: true,

  //   },
  //   {
  //     id: 2,
  //     name: "Асаны стоя",
  //     type: "Йога на каждый день / 3 день",
  //     exercise: [
  //       {
  //         id: 1,
  //         name: "Наклон к правой ноге",
  //         repeats: 10,
  //         repeats_done: 0,
  //       },
  //       {
  //         id: 2,
  //         name: "Наклон к левой ноге",
  //         repeats: 10,
  //         repeats_done: 5,
  //       },
  //       {
  //         id: 3,
  //         name: "Наклон к согнутой правой ноге",
  //         repeats: 10,
  //         repeats_done: 2,
  //       },
  //       {
  //         id: 4,
  //         name: "Наклон к согнутой левой ноге",
  //         repeats: 10,
  //         repeats_done: 5,
  //       },
  //       {
  //         id: 5,
  //         name: "Асана стоя",
  //         repeats: 10,
  //         repeats_done: 5,
  //       },
  //     ],
  //     video_file: "https://youtu.be/WxFz-4YsiEE",
  //     isFinished: false,
  //   },
  //   {
  //     id: 3,
  //     name: "Растягиваем мышцы бедра",
  //     type: "Йога на каждый день / 4 день",
  //     exercise: [
  //       {
  //         id: 1,
  //         name: "Сесть на пятки с носками от себя",
  //         repeats: 5,
  //         repeats_done: 0,
  //       },
  //       {
  //         id: 2,
  //         name: "Сесть на пятки с носками на себя",
  //         repeats: 5,
  //         repeats_done: 5,
  //       },
  //       {
  //         id: 3,
  //         name: "Отпустить колено на пол из позы лотоса",
  //         repeats: 10,
  //         repeats_done: 2,
  //       },
  //       {
  //         id: 4,
  //         name: "Отпустить колено на пол из позы лотоса с соединенными стопами",
  //         repeats: 10,
  //         repeats_done: 5,
  //       },
  //     ],
  //     video_file: "https://youtu.be/09uGkAEQuZI",
  //     isFinished: true,
  //   },
  //   {
  //     id: 4,
  //     name: "Гибкость спины",
  //     type: "Йога на каждый день / 5 день",
  //     exercise: [
  //       {
  //         id: 1,
  //         name: "Округляем грудную клетку при выдохе",
  //         repeats: 10,
  //         repeats_done: 0,
  //       },
  //       {
  //         id: 2,
  //         name: "Тянем левую руку в правую сторону",
  //         repeats: 20,
  //         repeats_done: 5,
  //       },
  //       {
  //         id: 3,
  //         name: "Тянем правую руку в левую сторону (20 повторений)",
  //         repeats: 20,
  //         repeats_done: 2,
  //       },
  //     ],
  //     video_file: "https://youtu.be/MIvcMapie_A",
  //     isFinished: false,
  //   },
  // ]);

  const yogaWorkouts = useSelector(state => state.workout);
  console.log(yogaWorkouts.trainingData);

  // const progress = useSelector(state => state.progress.userProgressAll.userProgressAll);
  // console.log(progress);


  useEffect(() => {
    if (yogaWorkouts === null) {
      setLoaderOn(true);
    }
  }, [yogaWorkouts]);

  // костыль для цвета прогрессбара
  const colors = [
    {
      main: "#565EEF",
      light: "#EDECFF",
    },
    {
      main: "#FF6D00",
      light: "#FFF2E0",
    },
    {
      main: "#9A48F1",
      light: "#F9EBFF",
    },
    {
      main: "#565EEF",
      light: "#EDECFF",
    },
    {
      main: "#FF6D00",
      light: "#FFF2E0",
    },
  ];

  const params = useParams();
  // console.log(params); 


  const trainingChosen = yogaWorkouts.trainingData.find(
    (training) => training.id === Number(params.id)
  );
  console.log(trainingChosen);

  useEffect(() => {
    if (!trainingChosen) {
      setLoaderOn(true);
    } else {
      setLoaderOn(false);
    }
  }, [trainingChosen]);


  const [inputOnShow, setInputOnShow] = useState(false);

  const closeInput = () => {
    setInputOnShow(false);
  };

  const progressForm = (
    <ProgressInput
      closeInput={closeInput}
      trainingChosen={trainingChosen}
    ></ProgressInput>
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setLogo({
        logo: "black",
      })
    );
  }, []);

    return (
      <S.Wrapper>
      <S.HeaderWrapper>
        <Header />

        {loaderOn ? 
        <Loader /> :      
        <S.ContentBlock>
          <S.ContentVideoBlock>
            <S.VideoHeader>Йога</S.VideoHeader>
            <S.VideoName>
              {trainingChosen?.name} / {trainingChosen?.type}
            </S.VideoName>
  
            <S.VideoExercise
              src={trainingChosen?.video_file}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </S.ContentVideoBlock>
          <S.ExerciseBlock>
            <S.ExerciseDescription>
              <S.ExerciseDescriptionHeader>
                Упражнения
              </S.ExerciseDescriptionHeader>
              <S.ExercisesList>
                {trainingChosen?.exercise.map((exe, index) => (
                  <S.ExerciseListItem key={index}>
                    {exe.name} ({exe.repeats} повторений)
                  </S.ExerciseListItem>
                ))}
              </S.ExercisesList>
              <S.FillInProgress onClick={() => setInputOnShow(true)}>
                Заполнить свой прогресс
              </S.FillInProgress>
            </S.ExerciseDescription>
            <S.Progress>
              <S.ProgressHeader>Мой прогресс по тренировке</S.ProgressHeader>
              <S.ProgressDetails>
                {trainingChosen?.exercise.map((exe, index) => (
                  <S.ProgressItem key={index}>
                    <S.ExerciseProgress>{exe.name}</S.ExerciseProgress>
                    <S.FirstExerciseBar
                      $progColorLight={colors[index].light}
                      $progColorMain={colors[index].main}
                    >
                      <S.FirstFilledIn
                        $progColorMain={colors[index].main}
                        $width={getProgressInPercent({
                          needed: exe.repeats,
                          done: exe.repeats_done,
                        })}
                      >
                        <S.ProgressResult>
                          {getProgressInPercent({
                            needed: exe.repeats,
                            done: exe.repeats_done,
                          })}
                          %
                        </S.ProgressResult>
                      </S.FirstFilledIn>
                    </S.FirstExerciseBar>
                  </S.ProgressItem>
                ))}
              </S.ProgressDetails>
            </S.Progress>
          </S.ExerciseBlock>
        </S.ContentBlock>
        }
        {inputOnShow ? progressForm : null}
      </S.HeaderWrapper>
    </S.Wrapper>
  );
  };
  

