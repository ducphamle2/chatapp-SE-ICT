import axios from "axios";
const url = {
  LOGIN: 'login'
};

function authenticate(payload, callback) {
  axios
    .post(url.LOGIN, {
      data: {
        username: payload.username,
        password: payload.password
      }
    })
    .then(response => {
      console.log('respone: ', payload);
      callback(true, response, null);
    })
    .catch(error => {
      console.log('error: ', payload);
      callback(false, null, error);
    });
}

const api = {
  authenticate,
}

export default api;
