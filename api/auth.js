import client from "./client";

const login = (email, password) => client.post("/login_check", {"username":email, "password":password});

export default {
  login,
};
