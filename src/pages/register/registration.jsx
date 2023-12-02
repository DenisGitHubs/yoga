import { useEffect, useState } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlices";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { setLogo } from "../../store/slices/logoSlices";
import { saveNewUsers } from "../../firebase/newUserData";
import { firebaseEmailReset } from "../../firebase/verification";


export function Register() {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dublicatePass, setDublicatePass] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    dispatch(
      setLogo({
        logo: "white",
      })
    );
  }, []);

  const handleEmail = (event) => {
    const emailValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setNewEmail(event.target.value);
    if (!emailValidation.test(event.target.value)) {
      setError("Проверяйте вводимые символы");
    } else {
      setError(null);
    }
  };

  const handlePassword = (event) => {
    if (event.target.value.length < 6) {
      setError("Пароль должен быть не менее 6 знаков");
    } else {
      setError(null);
    }
    setPassword(event.target.value);
  };

  const handleRepeatPassword = (event) => {
    if (event.target.value.length < 6) {
      setError("Пароль должен быть не менее 6 знаков");
    } else {
      setError(null);
    }
    setDublicatePass(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (!newEmail) {
      setError("Введите email");
      return;
    }

    if (!password) {
      setError("Введите пароль");
      return;
    }

    if (password !== dublicatePass) {
      setError("Пароли не совпадают. Попробуйте еще раз");
      setIsLoading(false);
    } else {
      setError("");
      setPassword(dublicatePass);
      setIsLoading(true);
    }


    const createUser = async () => {
      const auth = getAuth();
      try {
        
        const { user } = await createUserWithEmailAndPassword(
          auth,
          newEmail,
          password
        );
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("email verification sent to user");
        });

        dispatch(
          setUser({
            userMail: user.email,
            token: user.accessToken,
            id: user.uid,
          })
        );
        saveNewUsers(newEmail, password)
        navigate("/");
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    createUser();
  };

  return (
    <S.Wrapper>
      <S.ContainerEnter>
        <Link to="/"><S.ModalFormLoginTopImg src="/img/logo.png" alt="logo" /></Link>
        <S.ModalBlock>
          <S.ModalFormLogin>
            <Link to="/">
              <S.ModalFormLoginImg src="/img/logoBlack.png" alt="logo" />
            </Link>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            <S.ModalFormLoginInput>
              <S.ModalInput
                type="email"
                placeholder="Почта"
                value={newEmail}
                onChange={handleEmail}
              />
              <S.ModalInput
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={handlePassword}
              />
              <S.ModalInputConfirmPassword
                type="password"
                placeholder="Повторите пароль"
                value={dublicatePass}
                onChange={handleRepeatPassword}
              />
            </S.ModalFormLoginInput>
            <S.ModalFormLoginButtons>
              <S.ModalBtnSignup disabled={isLoading} onClick={handleRegister}>
                {isLoading ? "Происходит регистрация..." : "Зарегистрироваться"}
              </S.ModalBtnSignup>
            </S.ModalFormLoginButtons>
          </S.ModalFormLogin>
        </S.ModalBlock>
      </S.ContainerEnter>
    </S.Wrapper>
  );
}
