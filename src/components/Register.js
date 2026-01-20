import axios from "axios";

const Register = async (username, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_HOST_URL}/register`,
    {
      username,
      password,
    }
  );

  return response.data;
};

export default Register;