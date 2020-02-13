const userStorage = "DnDNotesUser";

export const getUserID = () => {
  return JSON.parse(localStorage.getItem(userStorage)).id;
};

export const getUsername = () => {
  return JSON.parse(localStorage.getItem(userStorage)).username;
};

export const getFullUser = () => {
  const user = localStorage.getItem(userStorage)
    ? JSON.parse(localStorage.getItem(userStorage))
    : {};
  return user;
};

export const setFullUser = (token, user) => {
  localStorage.setItem("jwt", token);
  localStorage.setItem(userStorage, JSON.stringify(user));
};

export const setUserInfo = user => {
  localStorage.setItem(userStorage, JSON.stringify(user));
};
