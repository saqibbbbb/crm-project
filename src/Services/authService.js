import users from "../navigation.json";

export const loginUser = (username, password) => {
  return users.find(
    (u) => u.username === username.trim() && u.password === password
  );
};
