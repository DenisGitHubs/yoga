
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changeLogin } from "../../firebase/changeEmail";
import * as S from "./styles";

export const NewLogin = ({ setEdit }) => {

  const [login, setLogin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleClose = () => {
    setEdit(false);
  };

  const handleSaveNewLogin = async () => {

    await changeLogin(login);
    const responsError = localStorage.getItem('error')
    if(responsError !== null) {
      setError(responsError)
    }
    console.log('done');
  };
  const newLogin = (event) => {
    const loginValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setLogin(event.target.value);
    if (!loginValidation.test(event.target.value)) {
      setError("Проверяйте вводимые символы");
    } else {
      setError(null);
    }
  };

  return (
    <S.Wrapper>
      <S.ModalBlock>
        <S.Closer src="/img/close.png" alt="закрыть" onClick={handleClose} />
        <S.ModalFormLogin action="#">
          <Link to="/">
            <S.ModalFormLoginImg src="/img/logoBlack.png" alt="logo" />
          </Link>
          <S.Text>Новый логин:</S.Text>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <S.ModalFormLoginInput>
            <S.ModalInput
              type="text"
              placeholder="Логин"
              onChange={newLogin}
              value={login}
            />
          </S.ModalFormLoginInput>
          <S.ModalFormLoginButtons>
            <S.ModalButtonEnter
              disabled={isLoading}
              onClick={handleSaveNewLogin}
            >
              {isLoading ? "Меняю..." : "Сохранить"}
            </S.ModalButtonEnter>
          </S.ModalFormLoginButtons>
        </S.ModalFormLogin>
      </S.ModalBlock>
    </S.Wrapper>
  );
};
