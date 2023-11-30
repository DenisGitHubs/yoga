import { useParams } from 'react-router-dom';
import * as S from './ProgressInput.styled';
import { useState } from 'react';
import ValidatedProgress from '../ValidatedProgress/ValidatedProgress';
import { updateProgressExercise } from '../../firebase/updateUserProgress';
import { useDataWorkout } from '../../firebase/fireWorkouts';
import { useUser } from '../../firebase/getUser';

export default function ProgressInput ({ closeInput, yogaWorkouts, setYogaWorkouts }) {
    const [newPogress, setNewProgress] = useState([])
    const [confirmOnShow, setConfirmOnShow] = useState(false);
        //выбранный урок из списка
        const params = useParams();
        const index = Number(params.id);

        const submitProgress = () => {
            updateProgressExercise(index, newPogress)
            setConfirmOnShow(true);
        }
            function ProgressHTML(props) {
                function saveData(val) {
                    const id = props.exercise.id - 1;
                    let tempValues = newPogress;
                    tempValues[id] = Number(val);
                    setNewProgress(tempValues)
                }
                return(
                    <S.ProgressItem key={props.exercise.id}>
                    <label htmlFor={props.exercise.id}>Сколько раз вы сделали {props.exercise.name} </label>
                    <S.ProgressItemInput placeholder='Введите значение' id={props.exercise.id} type='number'
                    onChange={(event) => saveData(event.target.value)}
                     />
                </S.ProgressItem>
                )
            }
            
            function ProgressList2 () {
                return (
                    yogaWorkouts[index].exercise.map((exercise) => (
                        <ProgressHTML exercise={exercise} />
                      ))
                )
            };
    return (
        <S.ProgressContainer>
            {confirmOnShow ? 
            <ValidatedProgress closeInput={closeInput}/> :
            <S.ProgressWrapper>
                <S.ProgressCloseButton onClick={closeInput}>
                    <use xlinkHref='/icons/sprite.svg#icon-close' />
                </S.ProgressCloseButton>
                <S.ProgressHeader>Мой прогресс</S.ProgressHeader>
                <S.ProgressList>
                    <ProgressList2/>
                    <S.ProgressInputButton onClick={() => submitProgress()} type='submit'>Отправить</S.ProgressInputButton>
                </S.ProgressList>
            </S.ProgressWrapper> }
        </S.ProgressContainer>
    )
}