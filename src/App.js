import './App.css';
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import BasicButton from './components/BasicButton/BasicButton';

function App() {

  return (
      <Router>
        <Header menuName={"main"}/>
        <div className="App">

          {/* 컴포넌트가 전부 생성되었다는 가정하에 */}
          {/* 해당 path로 이동시 보여줄 컴포넌트 지정 */}

          {/*<Routes>*/}
          {/*    <Route path={"/home"} element={<Home/>}></Route>*/}
          {/*    <Route path={"/wallet"} element={<Wallet/>}></Route>*/}
          {/*    <Route path={"/map"} element={<Map/>}></Route>*/}
          {/*    <Route path={"/community"} element={<Community/>}></Route>*/}
          {/*    <Route path={"/mypage"} element={<Mypage/>}></Route>*/}
          {/*</Routes>*/}
            <BasicButton width={300} text={"hd"} variant={'contained'}/>
          {/* 버튼 */}

        </div>
        <Footer/>
      </Router>
  );
}

export default App;
