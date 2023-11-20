import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./headerStyle";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/use-auth";

export function Header() {
  const {isAuth, email} = useAuth();

  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const logo = useSelector(state => state.logo)
  const email2 = localStorage.getItem("email")
  console.log(email2);
  const toggleVisibility = () => setVisible(!visible);
  const ToMain = () => {
    navigate("/");
  }
  const Exit = () => {
    navigate("/login");
  };
  const ToProfile = () => {
    navigate("/profile");
  }

  return (
    <>
        <S.HeadContentDiv>
        <Link to="/">
           {logo.logo === "white" ? <S.LogoImg src="/img/logo.png" alt="logo" /> : <S.LogoImg src="/img/logoBlack.png" alt="logo" />}
        </Link>
          {isAuth ?     
          <S.UserDiv>
            <S.UserPhotoImg src="/img/Ellipse.png" alt="userphoto" />
            <S.UserNameSpan onClick={toggleVisibility}>
              {email2} ↓
            </S.UserNameSpan>
            </S.UserDiv> : 
                    <S.LogoTitle>
                      <Link to="/login">
                        <S.Enter>Войти</S.Enter>
                      </Link>
                    </S.LogoTitle>  
            }
            </S.HeadContentDiv>
            {!visible && (
                            <S.HeaderList>
            <S.HeaderUl>
            <S.HeaderLi onClick={ToMain}>На главную</S.HeaderLi>
            <S.HeaderLi onClick={ToProfile}>Профиль</S.HeaderLi>
            <S.HeaderLi onClick={Exit}>Выход</S.HeaderLi>
            </S.HeaderUl>
                        </S.HeaderList>
        )}
</>
          

      );
}