import axios from "axios";

const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://api.ishortenthings.com"
    : "http://127.0.0.1:3001/";

const CreateRedirect = async (url) => {
  return await axios({
    method: "post",
    url: API_ENDPOINT + "redirects",
    data: { url: url },
  });
};

const UseRedirect = async (redirect_id) => {
  return await axios({
    method: "get",
    url: API_ENDPOINT + "redirects/" + redirect_id + "?use=true",
  });
};

export { CreateRedirect, UseRedirect, API_ENDPOINT };
