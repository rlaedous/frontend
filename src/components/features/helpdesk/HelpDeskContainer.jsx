import { useState } from "react";
import styled from "styled-components";
import { fqaList, noticeList } from "../../../utils/helpList";
import { decodeMyTokenData } from "../../../utils/token";
import { StCommonBorder } from "../../interface/styledCommon";
import FQAAccordionCard from "./FQAAccordionCard";
import NoticeAccordionCard from "./NoticeAccordionCard";

function HelpDeskContainer() {
  const [selectTab, setSelectTab] = useState("notice");
  const myData = decodeMyTokenData();

  function selectTabMenu(event) {
    if (event.target.value === "notice") setSelectTab("notice");
    else if (event.target.value === "faq") setSelectTab("faq");
  }

  function notifyNowMaking() {
    alert("현재 준비중에 있습니다. 조금만 기다려주세요.");
  }

  function moveToGoogleFormPage() {
    window.open("https://forms.gle/q1tNtjeTnfr5vfqr9");
  }

  return (
    <StContainer>
      <div>
        {selectTab === "notice" ? (
          <>
            <StTapBox>
              <StActiveTapButton value="notice" onClick={selectTabMenu}>
                공지사항
              </StActiveTapButton>
              <StTapButton value="faq" onClick={selectTabMenu}>
                FAQ
              </StTapButton>
            </StTapBox>

            <div>
              <NoticeAccordionCard
                title={noticeList[0].title}
                date={noticeList[0].date}
                content={noticeList[0].content}
              />
              <StCommonBorder />
            </div>
          </>
        ) : selectTab === "faq" ? (
          <>
            <StTapBox>
              <StTapButton value="notice" onClick={selectTabMenu}>
                공지사항
              </StTapButton>
              <StActiveTapButton value="faq" onClick={selectTabMenu}>
                FAQ
              </StActiveTapButton>
            </StTapBox>

            <div>
              <StFAQTitleBox>
                <h2>자주 묻는 질문 TOP 3</h2>
                <button type="button" onClick={notifyNowMaking}>
                  더보기
                </button>
              </StFAQTitleBox>

              <StFAQAccordionList>
                <FQAAccordionCard
                  title={fqaList[0].title}
                  content={fqaList[0].content}
                />
                <StCommonBorder />

                <FQAAccordionCard
                  title={fqaList[1].title}
                  content={fqaList[1].content}
                />
                <StCommonBorder />

                {myData.provider === "kakao" ? (
                  <FQAAccordionCard
                    title={fqaList[3].title}
                    content={fqaList[3].content}
                  />
                ) : (
                  <FQAAccordionCard
                    title={fqaList[2].title}
                    content={fqaList[2].content}
                  />
                )}
                <StCommonBorder />
              </StFAQAccordionList>

              <StContactBox>
                <p className="uptext">다른 궁금하신 게 있으실까요?</p>
                <p className="downtext">
                  미믹에 직접{" "}
                  <span onClick={moveToGoogleFormPage}>문의하기</span>
                </p>
              </StContactBox>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </StContainer>
  );
}

export default HelpDeskContainer;

const StContainer = styled.div`
  margin: 60px 5% 80px 5%;

  box-sizing: border-box;
`;

const StTapBox = styled.div`
  display: flex;
  flex-direction: row;

  padding: 10px 0 0 0;

  width: 100%;
  height: 40px;
`;

const StActiveTapButton = styled.button`
  background: none;

  font-size: 18px;
  font-weight: 500;
  color: #ff6d53;

  border: none;
  border-bottom: 3px solid #ff6d53;
  outline: none;
  padding-bottom: 10px;

  width: 100%;

  cursor: pointer;
`;

const StTapButton = styled.button`
  background: none;

  font-size: 18px;
  font-weight: 500;
  color: #313131;

  border: none;
  border-bottom: 1px solid #909090;
  outline: none;
  padding-bottom: 10px;

  width: 100%;

  cursor: pointer;
`;

const StFAQTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 500;

  margin: 20px 0 10px 0;

  & > h2 {
    font-size: 25px;
    margin: 5px 0;
  }

  & > button {
    background: none;

    font-size: 18px;

    border: none;
    outline: none;
    margin-left: auto;

    cursor: pointer;
  }

  @media screen and (max-width: 500px) {
    & > h2 {
      font-size: 18px;
    }

    & > button {
      font-size: 14px;
    }
  }
`;

const StFAQAccordionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StContactBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 20px 0;

  .uptext {
    font-size: 18px;
    margin: 4px 0;
  }

  .downtext {
    font-size: 16px;
    color: #979797;
    margin: 4px 0;
  }
  & > p > span {
    font-size: 16px;
    text-decoration: underline;
    line-height: 16px;
    color: #000000;
    cursor: pointer;
  }

  transition: ease 0.1s;
  & > p > span:hover {
    color: #8e8e8e;
  }

  @media screen and (max-width: 500px) {
    .uptext {
      font-size: 14px;
      margin: 4px 0;
    }

    .downtext {
      font-size: 12px;
      color: #979797;
      margin: 4px 0;
    }
    & > p > span {
      font-size: 12px;
    }
  }
`;
