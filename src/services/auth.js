import api from "../api/api.js";

export const loginUser = async (username, password) => {
  const response = await api.post("/token/", {
    username,
    password,
  });

  const { access, refresh } = response.data;

  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);

  return response.data;
};
