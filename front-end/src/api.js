import axios from "axios";

const API_ENDPOINT = "http://127.0.0.1:3001/";

const CreateRedirect = async (url) => {
    return await axios({
        method: "post",
        url: API_ENDPOINT + "redirects",
        data: { url: url },
    });
};

export { CreateRedirect, API_ENDPOINT };
