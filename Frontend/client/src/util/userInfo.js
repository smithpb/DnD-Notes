export const getUserID = () => {
  return JSON.parse(localStorage.getItem("DnDNotesUser")).id;
};

export const getUsername = () => {
  return JSON.parse(localStorage.getItem("DnDNotesUser")).username;
};

export const getFullUser = () => {
  const user = localStorage.getItem("DnDNotesUser")
    ? JSON.parse(localStorage.getItem("DnDNotesUser"))
    : {};
  return user;
};

export const setFullUser = (token, user) => {
  localStorage.setItem("jwt", token);
  localStorage.setItem("DnDNotesUser", JSON.stringify(user));
};
