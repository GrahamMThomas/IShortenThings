import axios from "axios";

const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://api.ishortenthings.com/"
    : "http://127.0.0.1:3001/";

const CreateRedirect = async (url, canRickRoll) => {
  return await axios({
    method: "post",
    url: API_ENDPOINT + "redirects",
    data: { url: url, can_rickroll: canRickRoll },
  });
};

const UseRedirect = async (redirect_id, visitorId) => {
  return await axios({
    method: "get",
    headers: { "user-token": visitorId },
    url: API_ENDPOINT + "redirects/" + redirect_id + "?use=true",
  });
};

export { CreateRedirect, UseRedirect, API_ENDPOINT };
