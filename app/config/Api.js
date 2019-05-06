import axios from "axios";
const url = {
  LOGIN: "login"
};

function authenticate(payload, callback) {
  axios({
    method: 'post',
    url: url.LOGIN,
    data: payload
  })
  .then(response => {
    callback(true, response, null);
  })
  .catch(error => {
    callback(false, null, error);
  })
}

const api = {
  authenticate,
}

export default api;
