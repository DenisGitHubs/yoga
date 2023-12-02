
import * as S from './ValidatedProgress.styled'

export default function ValidatedProgress ({ closeInput }) {
        window.location.reload()


    return (
        // <S.ValidatedProgressContainer>
            <S.ValidatedProgressWrapper>
                <S.ProgressCloseButton onClick={closeInput}>
                    <use xlinkHref='/icons/sprite.svg#icon-close' />
                </S.ProgressCloseButton>
                <S.ValidatedProgressHeader>Ваш прогресс засчитан!</S.ValidatedProgressHeader>
                <S.ValidatedProgressSvg>
                    <use xlinkHref='/icons/sprite.svg#icon-ok-hand' />
                </S.ValidatedProgressSvg>
            </S.ValidatedProgressWrapper>
        // </S.ValidatedProgressContainer>
    )
}