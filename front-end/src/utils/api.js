import axios from "axios";

const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://api.ishortenthings.com/"
    : "http://127.0.0.1:3001/";

const CreateRedirect = async (url, usesLeft, canRickRoll, password) => {
  let data = { url: url, uses_left: usesLeft, can_rickroll: canRickRoll };
  if (password) {
    data.password = password;
  }
  return await axios({
    method: "post",
    url: API_ENDPOINT + "redirects",
    data: data,
  });
};

const UseRedirect = async (redirect_id, visitorId) => {
  return await axios({
    method: "get",
    headers: { "user-token": visitorId },
    url: API_ENDPOINT + "redirects/" + redirect_id + "?use=true",
  });
};

const UseRedirectWPassword = async (redirect_id, visitorId, password) => {
  return await axios({
    method: "get",
    headers: { "user-token": visitorId },
    url:
      API_ENDPOINT + "redirects/" + redirect_id + "?use=true&pass=" + password,
  });
};

export { CreateRedirect, UseRedirect, UseRedirectWPassword, API_ENDPOINT };
