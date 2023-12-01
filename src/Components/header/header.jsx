import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./headerStyle";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/use-auth";
import { removeUser } from "../../store/slices/userSlices";

export function Header() {
  const { isAuth } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const logo = useSelector((state) => state.logo);
  const email2 = localStorage.getItem("email");
  const ToMain = () => {
    navigate("/");
  };

  const menuAppear = () => {
    setMenuVisible(!menuVisible);
  };

  const Exit = () => {
    dispatch(removeUser());
    navigate("/");
  };
  const ToProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <S.HeadContentDiv>
        <Link to="/">
          {logo.logo === "white" ? (
            <S.LogoImg src="/img/logo.png" alt="logo" />
          ) : (
            <S.LogoImg src="/img/logoBlack.png" alt="logo" />
          )}
        </Link>
        {isAuth ? (
          <S.UserDiv onClick={menuAppear}>
            <S.UserDetails>
              <S.UserPhotoImg src="/img/Ellipse.png" alt="userphoto" />
              <S.UserNameSpan color={logo.logo}>{email2} ↓</S.UserNameSpan>
            </S.UserDetails>
            <S.HeaderList $menuVisible={menuVisible}>
              <S.HeaderUl onMouseLeave={() => setMenuVisible(false)}>
                <S.HeaderLi color={logo.logo} onClick={ToMain}>
                  На главную
                </S.HeaderLi>
                <S.HeaderLi color={logo.logo} onClick={ToProfile}>
                  Профиль
                </S.HeaderLi>
                <S.HeaderLi color={logo.logo} onClick={Exit}>
                  Выход
                </S.HeaderLi>
              </S.HeaderUl>
            </S.HeaderList>
          </S.UserDiv>
        ) : (
          <S.LogoTitle>
            <Link to="/login">
              <S.Enter>Войти</S.Enter>
            </Link>
          </S.LogoTitle>
        )}
      </S.HeadContentDiv>
    </>
  );
}
