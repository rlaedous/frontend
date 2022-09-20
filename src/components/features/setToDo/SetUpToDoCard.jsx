import {
  StCommonColumnBox,
  StCommonRowBox,
  StShadowBackgroundDiv,
} from "../../interface/styledCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeMyTokenData } from "../../../utils/token";
import instance from "../../../app/modules/instance";
import { useDispatch } from "react-redux";
import { getSetUpMyTodoFetch } from "../../../app/modules/setUpTodoSlice";
import { settingTodayDate } from "../../../utils/commonFunc";

function SetUpToDoCard({ data, hideState, isTodayChallenge }) {
  const [menuModal, setMenuModal] = useState(false);
  const myData = decodeMyTokenData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 상세 피드 페이지로 이동시켜줌.
  function moveToFeedDetail() {
    console.log("들어가나요");
    if (data.challengedTodo !== undefined) {
      if (data.originTodoId !== "null" && data.originTodoId !== undefined) {
        navigate(`/feeddetail/${data.originTodoId}`);
      }
    }
    if (data.todo !== undefined) {
      if (data.todoId !== "null" && data.todoId !== undefined) {
        navigate(`/feeddetail/${data.todoId}`);
      }
    }
  }

  // 오늘의 챌린지 완료/진행중 상태를 바꿔주도록 함.
  function changeStateChallenge(event) {
    event.stopPropagation();
    const stateChallenge = async () => {
      try {
        const response = await instance.put(
          `/mytodos/${data.challengedTodoId}/challenged`
        );
        if (response.data.message === "success") {
          dispatch(getSetUpMyTodoFetch({ date: settingTodayDate() }));
        }
      } catch (error) {
        alert(error.response.data.errorMessage);
      }
    };
    stateChallenge();
  }

  // 팝업창 열고 닫기 위한 코드
  function displayCardMenu(event) {
    event.stopPropagation();
    setMenuModal(!menuModal);
  }

  // 오늘 도전하기 위해 등록한 미믹을 취소함.
  function cancelTodayChallenge(event) {
    event.stopPropagation();
    const cancelApply = async () => {
      try {
        const response = await instance.delete(
          `/mytodos/${data.challengedTodoId}/challenged`,
          { data: { date: settingTodayDate() } }
        );
        if (response.data.message === "success") {
          dispatch(getSetUpMyTodoFetch({ date: settingTodayDate() }));
        }
      } catch (error) {
        alert(error.response.data.errorMessage);
      }
    };
    cancelApply();
  }

  // 내가 제안한 미믹을 삭제함.
  function deleteMyTodayMakingChallenge(event) {
    event.stopPropagation();
    const deleteApply = async () => {
      try {
        const response = await instance.delete(`mytodos/${data.todoId}`);
        if (response.data.message === "success") {
          dispatch(getSetUpMyTodoFetch({ date: settingTodayDate() }));
        }
      } catch (error) {
        alert(error.response.data.errorMessage);
      }
    };
    deleteApply();
  }

  // 이용 시, <ChallengeCard id={todoId} data={객체값} key={idx} hideState={true/false} isTodayChallenge={true/false} />로 작성해줄 것
  // map을 쓰지 않는 경우, key는 예외.
  return (
    <>
      {menuModal === true ? (
        <StShadowBackgroundDiv>
          {isTodayChallenge === true ? (
            <StPopUpWhiteButton
              onClick={cancelTodayChallenge}
              transform="translateY(76vh)">
              등록 취소
            </StPopUpWhiteButton>
          ) : (
            <StPopUpWhiteButton
              onClick={deleteMyTodayMakingChallenge}
              transform="translateY(76vh)">
              삭제
            </StPopUpWhiteButton>
          )}
          <StPopUpWhiteButton
            onClick={displayCardMenu}
            transform="translateY(77vh)">
            닫기
          </StPopUpWhiteButton>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}

      {/* 진행중 완료 버튼 출현 여부 결정 */}
      <StChallengeCardDiv
        width="90%"
        id={data.todoId}
        onClick={moveToFeedDetail}
        background={data.isCompleted === 1 ? "#FF6D53" : "#ffffff"}
        border={
          data.isCompleted === 1 ? "1px solid #FF6D53" : "1px solid #ffffff"
        }
        cursor="pointer">
        {hideState === true ? (
          <></>
        ) : (
          <StChallengeStateBtn
            onClick={isTodayChallenge === true ? changeStateChallenge : null}>
            <StTodoStateImage
              src={
                data.isCompleted === 1
                  ? process.env.PUBLIC_URL + `/images/Complete.png`
                  : process.env.PUBLIC_URL + `/images/Progress.png`
              }
            />
          </StChallengeStateBtn>
        )}

        <StCommonRowBox
          width="100%"
          height="100%"
          alignItems="center"
          style={{ textAlign: "left" }}>
          <StChallengeNameSpan
            color={data.isCompleted === 1 ? "#ffffff" : "#979797"}>
            {data.challengedTodo !== undefined
              ? data.challengedTodo.length > 30
                ? `${data.challengedTodo.substring(0, 27)}...`
                : data.challengedTodo
              : data.todo !== undefined
              ? data.todo.length > 30
                ? `${data.todo.substring(0, 27)}...`
                : data.todo
              : ""}
          </StChallengeNameSpan>

          {/* 상세 메뉴 출력 여부 표시 */}

          <StCommonColumnBox style={{ height: "100%" }}>
            {isTodayChallenge === true ? (
              <StMenuBtn
                color={data.isCompleted === 1 ? "#ffffff" : "#979797"}
                onClick={displayCardMenu}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </StMenuBtn>
            ) : data.todo !== undefined ? (
              <StMenuBtn color="#979797" onClick={displayCardMenu}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </StMenuBtn>
            ) : (
              <div>　</div>
            )}
          </StCommonColumnBox>
        </StCommonRowBox>
      </StChallengeCardDiv>
    </>
  );
}

export default SetUpToDoCard;

const StChallengeCardDiv = styled.div`
  background: ${(props) => props.background || "#ffffff"};

  display: flex;
  flex-direction: row;
  align-items: center;

  width: ${(props) => props.width || "100%"};
  height: 102px;
  border: ${(props) => props.border};
  border-radius: 6px;
  padding: 16px 18px;
  margin: 5px 25px;

  box-sizing: border-box;
  cursor: ${(props) => props.cursor || "pointer"};
`;

const StChallengeStateBtn = styled.button`
  background: none;
  display: flex;
  align-items: center;

  border: none;
  outline: none;

  cursor: pointer;
`;

const StTodoStateImage = styled.img`
  width: 46px;
  height: 46px;
  margin-right: 19px;
  pointer-events: none;
`;

const StChallengeNameSpan = styled.span`
  font-size: 22px;
  font-weight: 400;
  color: ${(props) => props.color};
  line-height: 32px;

  margin-right: auto;
`;

const StMenuBtn = styled.button`
  background: none;
  font-size: 16px;
  line-height: 32px;
  color: ${(props) => props.color};

  border: none;
  outline: none;
  margin-left: auto;

  cursor: pointer;
`;

const StPopUpWhiteButton = styled.button`
  background: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 500;
  color: #979797;

  border: none;
  outline: none;
  margin: 0 25px;
  border-radius: 6px;

  width: 90%;
  height: 70px;
  transform: ${(props) => props.transform};
  cursor: pointer;
`;