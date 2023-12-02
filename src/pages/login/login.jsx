import { useEffect, useState } from "react";
import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlices";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setLogo } from "../../store/slices/logoSlices";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    setEmail(event.target.value);
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

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email) {
      setError("Введите email");
      return;
    }

    if (!password) {
      setError("Введите пароль");
      return;
    }
    setIsLoading(true);
    
    async function signIn() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        dispatch(
          setUser({
            userMail: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );

        navigate("/");
      } catch (error) {
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          setError("Неправильная авторизация");
        } else {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    signIn();
  };
  return (
    <S.Wrapper>
      <S.ContainerEnter>
      <Link to="/">
        <S.ModalFormLoginTopImg src="/img/logo.png" alt="logo" />
        </Link>
        <S.ModalBlock>
          <S.ModalFormLogin action="#">
            <Link to="/">
              <S.ModalFormLoginImg src="/img/logoBlack.png" alt="logo" />
            </Link>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            <S.ModalFormLoginInput>
              <S.ModalInput
                type="email"
                placeholder="Почта"
                value={email}
                onChange={handleEmail}
              />
              <S.ModalInput
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={handlePassword}
              />
            </S.ModalFormLoginInput>
            <S.ModalFormLoginButtons>
              <S.ModalButtonEnter disabled={isLoading} onClick={handleLogin}>
                {isLoading ? "Минутку..." : "Войти"}
              </S.ModalButtonEnter>
              <S.ModalBtnSignup>
                <Link to="/register">Зарегистрироваться</Link>
              </S.ModalBtnSignup>
            </S.ModalFormLoginButtons>
          </S.ModalFormLogin>
        </S.ModalBlock>
      </S.ContainerEnter>
    </S.Wrapper>
  );
};
