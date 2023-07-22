import axios from "axios";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export const user_signup = async (user_data) => {
    let res = await axios.post(`${backend_url}/user/signup`, {
      ...user_data,
    });
    return res;
};

export const user_login = async (user_data) => {
  let res = await axios.post(`${backend_url}/user/login`, {
    ...user_data,
  });
  return res;
};

/////////////////////////////////////////////////////////////////

export const admin_signup = async (admin_data) => {
  let res = await axios.post(`${backend_url}/admin/signup`, {
    ...admin_data,
  });
  return res;
};

export const admin_login = async (admin_data) => {
  let res = await axios.post(`${backend_url}/admin/login`, {
    ...admin_data,
  });
  return res;
};