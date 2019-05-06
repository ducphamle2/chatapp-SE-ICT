// set path for axios http
const setPath = {
  ApiHost: 'http://localhost:3000/',
  ApiSubPath: 'api',
  slash: '/'
};

const apiUrl = build(
  setPath.ApiHost,
  setPath.slash,
  setPath.ApiSubPath,
  setPath.slash
);

// this function is used to concat the path string and then return it
function build(...params) {
  let data = '';

  if (params) {
    for (let i = 0, len = params.length; i < len; i += 1) {
      data += params[i];
    }
  }

  return data;
}

const setting = {
  setPath,
  apiUrl
};

export default setting;