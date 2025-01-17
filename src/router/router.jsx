import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "../pages/main";
import Activity from "../pages/activity";
import ErrorPage from "../pages/errorPage";
import FeedDetail from "../pages/feedDetail";
import Login from "../pages/login";
import Mbti from "../pages/mbti";
import Follow from "../pages/follow";
import Feed from "../pages/feed";
import MyPage from "../pages/myPage";
import OthersPage from "../pages/othersPage";
import SelectMBTIFeed from "../pages/selectMBTIFeed";
import SetUpTodo from "../pages/setUpTodo";
import SignUp from "../pages/signUp";
import Teaser from "../pages/teaser";
import WelcomePage from "../pages/welcomePage";
import WriteTodo from "../pages/writeTodo";
import ModifyProfile from "../pages/modifyProfile";
import ChangePW from "../pages/changePW";
import HelpDesk from "../pages/helpDesk";
import Withdraw from "../pages/withdraw";
import { getCookie } from "../utils/cookie";
import TestPage from "../pages/testPage";

const FirstPage = ({ children }) => {
  if (getCookie("firstEnter") === undefined) {
    return <Navigate to="/welcomepage" />;
  }
  return children;
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <FirstPage>
              <Main />
            </FirstPage>
          }
        />
        <Route path="/activity" element={<Activity />} />
        <Route path="/errorpage" element={<ErrorPage />} />
        <Route path="/todolists" element={<Feed />} />
        <Route path="/todolists/:mbti" element={<Feed />} />
        {/* <Route path="/todolists?filter=challengedCounts" element={<Feed/>}/>
        <Route path="/todolists?filter=commentsCounts" element={<Feed/>}/> */}
        <Route path="/feeddetail/:todoId" element={<FeedDetail />} />
        <Route path="/follows/:userId" element={<Follow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mbti" element={<Mbti />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/otherspage/:userId" element={<OthersPage />} />
        <Route path="/selectmbtifeed" element={<SelectMBTIFeed />} />
        <Route path="/setuptodo" element={<SetUpTodo />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/teaser" element={<Teaser />} />
        <Route path="/welcomepage" element={<WelcomePage />} />
        <Route path="/mytodos" element={<WriteTodo />} />
        <Route path="/modifyprofile" element={<ModifyProfile />} />
        <Route path="/changepw" element={<ChangePW />} />
        <Route path="/helpdesk" element={<HelpDesk />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
