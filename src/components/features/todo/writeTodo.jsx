import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 나중에 코드 추가정리 필요!
function WriteTodo() {
  // mbti들어가야할 곳에 값을 받아오기위해서 미리 작성해놓음
  //   const[mbti,setMbti] =  useState({
  //     todo: "",
  // });

  const [todo, setTodo] = useState({
    todo: "",
  });

  // 구조 분해 할당
  const onChange = (event) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  // state와 ref의 차이 state는 값이 바뀔 때마다 렌더링 ref는 값은 바뀌고 있으나 렌더링을 직접해주지 않으면 값이 나타나지 않음 *별코딩 youtube https://www.youtube.com/watch?v=VxqZrL4FLz8&t=0s 7분~*
  // 변화는 방지해야하지만 그 변화가 렌더링을 발생시키면 안되는 어떤 값을 다룰 때 정말 유용
  const todoRef = useRef();

  useEffect(() => {
    //새로고침시 textarea안에 커서가 가게끔하기 위하여
    todoRef.current.focus();
  }, []);

  // 글자칠때마다 줄 늘어남
  // const todoRef = useRef();
  // const handleResizeHeight = useCallback(()=> {
  //   todoRef.current.style.height=todoRef.current.scrollHeight +"px" ;
  // },[]);

  const navigate = useNavigate();

  // 스타일드 컴포넌트 프롭스 활용해보자
  // suggestion finish go todopage
  const submitTodoData = () => {
    navigate("/todoList?date=");
  };

  return (
    <>
      <StTotalWrap>
        <span>mbti들어가야함</span>
        <StWriteTodoForm onSubmit={submitTodoData}>
          <StWriteTodoTextArea
            // onInput={handleResizeHeight}
            ref={todoRef} placeholder="내용을 입력하세요" maxLength={200} name="todo" value={todo.todo} onChange={onChange}
          />
          {/* 글자수가 200제한인데 10자 이하로 남았을 때 빨간색으로 알려줌 */}
          <span>입력할 수 있는 글자 수 :  <StTextCount color={200-todo.todo.length < 10 ? "red" : "black"}>{200-todo.todo.length}</StTextCount></span>
          
          <Stbutton type="submit">등록하기</Stbutton>
        </StWriteTodoForm>
      </StTotalWrap>
    </>
  );
}

const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
  margin-top: 120px;
`;

const StWriteTodoForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StWriteTodoTextArea = styled.textarea`
  resize: none; // 크기 조절하는 커서 안뜨게할려고
  height: 50px;
`;

const StTextCount = styled.span`
  color:${(props) => (props.color)};
`;
const Stbutton = styled.button`
  margin-top: 500px;
  cursor: pointer;
`;

export default WriteTodo;