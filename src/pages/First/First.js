import React from 'react';
import './First.css';

const First = () => {
    const backgroundUrl = process.env.REACT_APP_BG_URL;

    return (
        <div
            className="page-container"
            style={{
                backgroundImage: `url(${backgroundUrl})`,
            }}
        >
            <div className="content">
                <h1 className="title">Yeogaekgi</h1>
                <div className="button-container">
                    <button className="btn signup">회원가입</button>
                    <button className="btn login">로그인</button>
                </div>
            </div>
        </div>
    );
};

export default First;
