import axios from "axios";

const Login = async (username, password) => {
  const response = await axios.post(`${process.env.REACT_APP_HOST_URL}/Login`, {
    username,
    password,
  });

  return response.data;
};

export default Login;
