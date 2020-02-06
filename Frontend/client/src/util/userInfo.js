export const getUserID = () => {
  return JSON.parse(localStorage.getItem("DnDNotesUser")).id;
};

export const getUsername = () => {
  return JSON.parse(localStorage.getItem("DnDNotesUser")).username;
};
