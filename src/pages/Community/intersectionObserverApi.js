import React, { useRef, useContext, useState, useEffect } from 'react';

export function InfinityScrollExample() {
    const target = useRef(null);    // observe 타겟이 될 요소


    const callback1 = () => {   // target이 화면에 나타날때와 사라질 때 모두 호출됨.
        // 실행내용
        target.current.innerText += "관측되었습니다";
    };
    const callback2 = (entries) =>{ // target이 화면에 나타날때만 호출됨.
        entries.forEach(entry => {
            if(entry.isIntersecting){
                // 실행내용
            }
        })
    };
    const callback3 = (entries) =>{ // target이 화면에 사라질때만 호출됨.
        entries.forEach(entry => {
            if(! entry.isIntersecting){
                // 실행내용
            }
        })
    }
    const options = {
        // root: null,                                  // 타켓 요소가 "어디에" 들어왔을때 콜백함수를 실행할 것인지 결정합니다. null이면 viewport가 root로 지정됩니다.
        // root: document.querySelector('#scrollArea'), // => 특정 요소를 선택할 수도 있습니다.
        // rootMargin: '0px',                           // root에 마진값을 주어 범위를 확장 가능합니다.
        threshold: 1.0,                                 // 타겟 요소가 얼마나 들어왔을때 백함수를 실행할 것인지 결정합니다. 1이면 타겟 요소 전체가 들어와야 합니다.
    };

    const observer = new IntersectionObserver(callback1, options);

    useEffect(() => {
        observer.observe(target.current);    // 타겟 요소 관측 시작
        // observer.unobserve(target);  // 타겟 요소 관측 종료
    }, []);

    return (
        <>
            <div style={{ height: "300vh", backgroundColor: "green" }} />
            <div style={{ height: "100px", backgroundColor: "red" }} ref={target}>
                target
            </div>
        </>
    );
}
