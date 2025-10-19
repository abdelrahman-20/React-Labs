export const FAKE_USER = {
  username: "admin",
  password: "1234",
};

export const login = (username: string, password: string) => {
  if (username === FAKE_USER.username && password === FAKE_USER.password) {
    localStorage.setItem("isLoggedIn", "true");
    return true;
  }
  return false;
};

export const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";
