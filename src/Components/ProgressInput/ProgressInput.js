import { useParams } from 'react-router-dom';
import * as S from './ProgressInput.styled';
import { useState } from 'react';
import ValidatedProgress from '../ValidatedProgress/ValidatedProgress';
import { updateProgressExercise } from '../../firebase/updateUserProgress';
import { useDataWorkout } from '../../firebase/fireWorkouts';
import { useUser } from '../../firebase/getUser';

export default function ProgressInput ({ closeInput, trainingChosen }) {
    const [newProgress, setNewProgress] = useState([]);
    const [newID, setNewId] = useState([]);
    const [newOutData, setNewOutData] = useState([]);
    const [confirmOnShow, setConfirmOnShow] = useState(false);
    //выбранный урок из списка
        const params = useParams();
        const index = Number(params.id);

        const submitProgress = () => {
            const minusIndex = index - 1;
            updateProgressExercise(minusIndex, newOutData)
            setConfirmOnShow(true);
        }

            function ProgressHTML(props) {
                
                function saveData(val) {
                    let tempOutData = newOutData;
                    const id = props.exercise.id;
                    const nameTraining = props.exercise.name
                    tempOutData[id] = {id: id, training: nameTraining, progress: Number(val)};
                    setNewOutData(newOutData)
                    // опция для отправки данных в массиве
                    // const newAddedProgress = {id: props.exercise.id, repeats_done: val}
                    // setNewProgress([...newProgress, newAddedProgress])
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
            
            function ProgressList () {
                return (
                    trainingChosen.exercise.map((exercise) => (
                        <ProgressHTML exercise={exercise} />
                      )))};

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
                    <ProgressList/>
                    <S.ProgressInputButton onClick={() => submitProgress()} type='submit'>Отправить</S.ProgressInputButton>
                </S.ProgressList>
            </S.ProgressWrapper> }
        </S.ProgressContainer>
    )
}


// function ProgressHTML(props) {
//     function saveData(val) {
//         const id = props.exercise.id - 1;
//         let tempValues = newProgress;
//         tempValues[id] = Number(val);
//         setNewProgress(tempValues)

//         // опция для отправки данных в массиве
//         // const newAddedProgress = {id: props.exercise.id, repeats_done: val}
//         // setNewProgress([...newProgress, newAddedProgress])
//     }