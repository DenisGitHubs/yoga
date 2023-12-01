import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./styles";
import { changePassword } from "../../firebase/changePass";

export function NewRegister({ setEditPass }) {
  const [repeatPass, setRepeatPass] = useState("");
  const [valuePass, setValuePass] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setEditPass(false);
  };

  const handleChange = (event) => {
    if (event.target.value.length < 6) {
      setError("Пароль должен быть не менее 6 знаков");
    } else {
      setError("");
    }
    setValuePass(event.target.value);
  };

  const handleRepeatChange = (event) => {
    if (event.target.value.length < 6) {
      setError("Пароль должен быть не менее 6 знаков");
    } else {
      setError("");
    }
    setRepeatPass(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!valuePass) {
      setError("Введите пароль");
      return;
    }

    if (!repeatPass) {
      setError("Повторите пароль");
      return;
    }

    if (valuePass !== repeatPass) {
      setError("Пароли не совпадают. Попробуйте еще раз");
      setIsLoading(false);
    } else {
      setError("");
      setValuePass(repeatPass);
      setIsLoading(true);
      changePassword(valuePass);
      setEditPass(false);
    }
  };

  return (
    <S.Wrapper>
      <S.ModalBlock>
        <S.Closer src="/img/close.png" alt="закрыть" onClick={handleClose} />
        <S.ModalFormLogin action="#" onSubmit={handleSave}>
          <Link to="/">
            <S.ModalFormLoginImg src="/img/logoBlack.png" alt="logo" />
          </Link>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <S.Text>Новый пароль:</S.Text>
          <S.ModalFormLoginInput>
            <S.ModalInput
              type="password"
              placeholder="Введите старый пароль"
              value={valuePass}
              onChange={handleChange}
            />
          </S.ModalFormLoginInput>
          <S.ModalFormLoginInput>
            <S.ModalInput
              type="password"
              placeholder="Пароль"
              value={valuePass}
              onChange={handleChange}
            />
          </S.ModalFormLoginInput>
          <S.ModalFormLoginInput>
            <S.ModalInput
              type="password"
              placeholder="Повторите пароль"
              value={repeatPass}
              onChange={handleRepeatChange}
            />
          </S.ModalFormLoginInput>
          <S.ModalFormLoginButtons>
            <S.ModalButtonEnter disabled={isLoading} onClick={handleSave}>
              {isLoading ? "Обновляется..." : "Сохранить"}
            </S.ModalButtonEnter>
          </S.ModalFormLoginButtons>
        </S.ModalFormLogin>
      </S.ModalBlock>
    </S.Wrapper>
  );
}
