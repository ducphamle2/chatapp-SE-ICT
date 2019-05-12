import axios from "axios";
const url = {
  LOGIN: 'login',
  REGISTER: 'register'
};

function authenticate(payload, callback) {
  console.log('payload at auth: ', payload);
  axios({
    method: 'POST',
    url: url.LOGIN,
    data: payload
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

function register(payload, callback) {
  console.log('payload at register: ', payload);
  axios({
    method: 'POST',
    url: url.REGISTER,
    data: payload
  })
    .then(response => {
      callback(true, response, null);
    })
    .catch(error => {
      callback(false, null, error);
    });
}

const api = {
  authenticate,
  register
}

export default api;
