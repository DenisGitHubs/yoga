import { useState } from "react";
import * as S from "./WorkoutSelect.styled";
import { useSelector } from "react-redux";


export const WorkoutSelectItem = ({ name, type, exercise, id }) => {

    const userProg = useSelector(state => state.progress.userProgressAll.userProgressAll.workoutsProgress[id - 1][0]);

    const [progress, setProgress] = useState(userProg);
    const [exe, setExe] = useState(exercise);

    const allExeChecked = () => {
        for (const ex of exe) {
            const matchProgress = progress.find(item => item.training === ex.name);
            if (!matchProgress || matchProgress.progress < ex.repeats) {
                return false
            }
        }
        return true
    }

    return (
        <S.SelectItem $isFinished={allExeChecked()}>
            {name}
            {allExeChecked() ? (
              <S.SelectItemCheckboxImg>
                <use xlinkHref="/icons/sprite.svg#icon-complete" />
              </S.SelectItemCheckboxImg>
            ) : (
              ""
            )}
            <S.SelectItemType>{type}</S.SelectItemType>
          </S.SelectItem>
    )
}