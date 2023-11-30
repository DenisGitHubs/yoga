import styled from "styled-components";

export const LogoTitle = styled.div`
  margin-right: 16px;
`;

export const UserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  flex-direction: column;
  position: relative;
`;

export const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 182.96px;
  height: 28.56px;
`;

export const UserPhotoImg = styled.img`
  width: 50px;
  height: 50px;
`;

export const UserNameSpan = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  text-align: right;
  letter-spacing: -0.1px;
  font-feature-settings: "pnum" on, "lnum" on;
  margin-left: 15px;
  margin-right: 12px;
  color: ${(props) => props.color};
`;

export const HeadContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
`;
export const HeaderUl = styled.ul`
  list-style-type: none;
  position: relative;
  float: right;
  text-align: right;
  z-index: 9;
`;
export const HeaderLi = styled.li`
  padding-top: 10px;
  color: ${(props) => props.color};
  font-size: 22px;
  margin-left: 18px;
  cursor: pointer;
  &:hover {
    color: #c9c9c9;
  }
`;
export const HeaderList = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  top: 2rem;
  right: 0rem;
  width: 100%;
  overflow: hidden;
  transition: height 0.3s ease-in-out 0s;
  height: ${({ $menuVisible }) => ($menuVisible ? "120px" : "0")};
`;

export const Enter = styled.button`
  width: 77px;
  height: 36px;
  left: 1223px;
  top: 24px;
  background: #140d40;
  border-radius: 46px;
  font-family: "StratosSkyeng";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #ffffff;
  &:hover {
    background: #2d1f79;
  }
  &:active {
    background: #3b29a2;
  }
`;
