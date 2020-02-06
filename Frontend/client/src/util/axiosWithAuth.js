import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("jwt");

  return axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {
      Authorization: `${token}`
    }
  });
};

// export const axiosWithAuth = axios.create({
//   baseURL: "http://localhost:5000/api/"
// });

// axiosWithAuth.defaults.headers.common["Authorization"] = localStorage.getItem(
//   "jwt"
// );
