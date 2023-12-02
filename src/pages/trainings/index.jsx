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
  console.log('object');
  const [loaderOn, setLoaderOn] = useState(false);
  const yogaWorkouts = useSelector(state => state.workout);
  const params = useParams();
  const index = Number(params.id);
  const progress = useSelector(state => state.progress.userProgressAll);
  const workoutProgress = progress?.userProgressAll.workoutsProgress[index - 1][0];
  const getProgressInPercent = ({ needed, id }) => {
    const done = workoutProgress.find(item => item.id === id).progress; 
    let result = (done / needed) * 100
    if(result > 100){
      result = 100;
    }
    return result;
  };


  useEffect(() => {
    if (yogaWorkouts === null || progress === null) {
      setLoaderOn(true);
    }
  }, [yogaWorkouts, progress]);

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

  const trainingChosen = yogaWorkouts.trainingData.find(
    (training) => training.id === Number(params.id)
  );
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
                          id: exe.id,
                        })}
                      >
                        <S.ProgressResult>
                          {getProgressInPercent({
                            needed: exe.repeats,
                            id: exe.id,
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
