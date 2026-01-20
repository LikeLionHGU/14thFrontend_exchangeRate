/*
jwt token test page 
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const [authResult, setAuthResult] = useState("인증 확인 중...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        
        // TODO 1: localStorage에서 'accessToken' 가져오기
        const token = localStorage.getItem("accessToken");
        
        console.log("저장된 토큰:", token ? "있음" : "없음");
        if (!token) {
          setAuthResult("토큰이 없습니다. 로그인이 필요합니다.");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          return;
        }
    
        /*
        TODO 2: axios를 사용하여 백엔드에 인증 요청 보내기
        - 요청 URL: 환경 변수에 저장된 REACT_APP_HOST_URL와 '/test'를 조합하여 만들기
        - 요청 헤더(headers): Authorization 헤더에 위에서 가져온 token을 'Bearer' 형식으로 담아서 보내기

        힌트: 로그인 (ID/PW → 토큰 발급):POST
             로그인 상태 확인:	GET
             내 정보 조회:	GET

             지금은 백엔드에게 토큰을 이용해, 로그인 상태를 확인받는 절차입니다.
        */
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_URL}/main`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰 추가!
            },
          }
        );
        

        console.log("서버 응답:", response.data);

   
        if (response.data === 1) {
          setAuthResult("인증 성공!");
          

          const userInfo = localStorage.getItem("userInfo");
          if (userInfo) {
            const user = JSON.parse(userInfo);
            setAuthResult(`인증 성공! 환영합니다, ${user.name}님! 이메일: ${user.email}`);
          }
        } else {
          setAuthResult("인증 실패 (서버에서 0 반환)");
          console.log("인증 실패 - 토큰 삭제 및 로그인 페이지로 이동");
          
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userInfo");
          localStorage.removeItem("memberId");
          
          /*
          로컬스토리지에서 토큰을 삭제하는 코드를 작성하기
           ("accessToken"), ("userInfo"), ("memberId");
           이 세개를 없애야 합니다!
          */
     
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        
        setAuthResult("인증 실패 (에러 발생)");
        console.error("Error during authentication:", error);
        
        localStorage.removeItem("accessToken");
          localStorage.removeItem("userInfo");
          localStorage.removeItem("memberId");
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };

    fetchAuthStatus();
  }, [navigate]);
  return (
    <div style={{ padding: "2rem" }}>
      <h2>JWT 인증 테스트</h2>
      <p style={{ whiteSpace: "pre-line", fontSize: "18px" }}>
        결과: {authResult}
      </p>
      
      {authResult.includes("실패") && (
        <p style={{ color: "#666", fontSize: "14px", marginTop: "1rem" }}>
          2초 후 로그인 페이지로 이동합니다...
        </p>
      )}
    </div>
  );
};

export default TestPage;
