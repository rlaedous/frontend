import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { removeCookies } from "../../../utils/cookie";
import { StShadowBackgroundDiv } from "../../interface/styledCommon";

function WelcomeForm() {
  //modalState
  const [modalState, setModalState] = useState("on");

  const closeToModal = () => {
    setModalState("off");
    removeCookies("firstLogin");
  };

  return (
    <>
      {modalState === "on" ? (
        //바같쪽 배경
        <StShadowBackgroundDiv>
          {/* //e.stopPropagation() 는 배경만 눌렀을때 모달이 꺼지게한다 (모달창눌럿을때는 변화없음) */}
          <StContainer onClick={(e) => e.stopPropagation()}>
            <StCloseButton type="button" onClick={closeToModal}>
              <FontAwesomeIcon
                icon={faXmark}
                style={{
                  fontSize: "18px",
                  color: "#ffffff",
                  pointerEvents: "none",
                }}
              />
            </StCloseButton>
            <StText>
              <h5 style={{ fontSize: "18px", fontWeight: "500" }}>
                # 오늘부터 #내가 #따라쟁이
              </h5>
              <StContent>미믹 친구가</StContent>
              <StContent>되신 것을 환영합니다.</StContent>
              <StContent>우리 함께 따라해봐요:)</StContent>
            </StText>
          </StContainer>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}
    </>
  );
}

export default WelcomeForm;

const StContainer = styled.div`
  background: #ff6d53;

  border-radius: 6px;
  padding: 25px;
  margin: 30vh auto;

  width: 80%;
  height: 350px;

  box-sizing: border-box;
`;

const StText = styled.div`
  color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  text-align: left;

  bottom: 0;

  height: 90%;

  box-sizing: border-box;
`;

const StCloseButton = styled.button`
  background: none;

  display: block;

  border: none;
  border-radius: none;
  margin: 0;
  margin-left: auto;
  padding: 0;

  cursor: pointer;
`;

const StContent = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 500;
`;
