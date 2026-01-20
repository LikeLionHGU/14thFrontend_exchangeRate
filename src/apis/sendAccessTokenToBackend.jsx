import axios from "axios";

const sendAccessTokenToBackend = async (code) => {
  try {

  
    /*
    TODO:
    - axios.post를 사용하여 백엔드 서버에 authorization code를 전송하세요.
    - 요청 URL: 환경 변수(.env 파일)에 저장된 REACT_APP_HOST_URL와 '/auth/google'을 조합하여 생성하기!
    - 요청 Body: 전달받은 code를 객체에 담아서 보내기!
    - 요청 성공 시:
        1. 서버로부터 받은 응답(response)에서 token과 memberId를 추출하여 localstorage에 저장후, 콘솔에 찍어보기
        3. 서버 응답 데이터(response.data)를 반환(return)하기
    */

    
     const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/auth/google`, 
      {code}
    );

    console.log("Login successful with server response:", response);

    // 토큰 저장 (백엔드가 token을 반환하는 경우)
    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
      console.log("토큰 저장 완료!");
    }

    // memberId 저장 (백엔드가 memberId를 반환하는 경우)
    if (response.data.memberId) {
       localStorage.setItem("memberId", response.data.memberId);
      console.log("memberId 저장 완료!");
    }

    // 사용자 정보 저장 (선택사항)
    if (response.data.user) {
       localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      console.log("사용자 정보 저장 완료!");
    }

    return response.data;
    
    
  } catch (error) {
    console.error("Login failed with error:", error);
    throw error;
  }
};

export default sendAccessTokenToBackend;
