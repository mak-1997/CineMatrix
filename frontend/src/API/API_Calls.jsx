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

export const get_movies = async() => {
  let res = await axios.get(`${backend_url}/movies/get`);
  return res;
}

export const get_events = async() => {
  let res = await axios.get(`${backend_url}/events/get`);
  return res;
}

export const get_all_event_shows = async () => {
  let res = await axios.get(`${backend_url}/event_shows`);
  return res;
}

export const get_all_movie_shows = async () => {
  let res = await axios.get(`${backend_url}/movie_shows`);
  return res;
}

export const get_related_movie_shows = async (id) => {
  let res = await axios.get(`${backend_url}/movie_shows/${id}`);
  return res;
}

export const get_related_event_shows = async (id) => {
  let res = await axios.get(`${backend_url}/event_shows/${id}`);
  return res;
}

export const book_movie_show = async (data, token) => {
  let res = await axios.put(`${backend_url}/book_movie_show/${data._id["$oid"]}`,{
    ...data
  },{
    headers :{
      Authorization : token
    }
  });
  return res;
}

export const book_event_show = async (data, token) => {
  let res = await axios.put(`${backend_url}/book_event_show/${data._id["$oid"]}`,{
    ...data
  },{
    headers :{
      Authorization : token
    }
  });
  return res;
}

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

export const add_new_movie = async (data, token) => {
  let res = await axios.post(`${backend_url}/movie/add`,{
    ...data
  },{
    headers:{
      Authorization : token
    }
  });
  return res;
}

export const add_new_event = async (data, token) => {
  let res = await axios.post(`${backend_url}/event/add`,{
    ...data
  },{
    headers:{
      Authorization : token
    }
  });
  return res;
}

export const create_movie_show = async (data, token) => {
  let res = await axios.post(`${backend_url}/movie_show/create`,{
    ...data
  },{
    headers:{
      Authorization : token
    }
  });
  return res;
}

export const create_event_show = async (data, token) => {
  let res = await axios.post(`${backend_url}/event_show/create`,{
    ...data
  },{
    headers:{
      Authorization : token
    }
  });
  return res;
}