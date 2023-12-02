import { Link } from "react-router-dom";
import * as S from "./WorkoutSelect.styled";
import { useSelector } from "react-redux";
import { useState } from "react";
import { WorkoutSelectItem } from "./WorkoutSelectItem";

export default function WorkoutSelect({
  closeForm
}) {

  const yogaWorkouts = useSelector(state => state.workout);

  const workoutList = yogaWorkouts.trainingData.map((workout) => (
    <Link key={workout.id} to={`/training/${workout.id}`}>
      <WorkoutSelectItem name={workout.name} type={workout.type} exercise={workout.exercise} id={workout.id} />
    </Link>
  ));

  
  return (
    <S.SelectContainer>
      <S.SelectWrapper>
        <S.SelectCloseIconSvg onClick={() => closeForm()}>
          <use xlinkHref="/icons/sprite.svg#icon-close" />
        </S.SelectCloseIconSvg>
        <S.SelectHeader>Выберите тренировку</S.SelectHeader>
        <S.SelectList>{workoutList}</S.SelectList>
      </S.SelectWrapper>
    </S.SelectContainer>
  );
}

