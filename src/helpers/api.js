/**
 * Function to help with making calls to the api - basically wraps fetch with some
 * API specific things
 */

const baseUrl = 'http://localhost:3001';

// https://stackoverflow.com/questions/111529/how-to-create-query-parameters-in-javascript
const encodeUrl = (url, params) => {
  if (Object.keys(params).length === 0 && params.constructor === Object) {
    return url;
  }
  let ret = [];
  for (let d in params)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]));
  return url + '?' + ret.join('&');
};

export const getRequest = (url, params, options): Promise<*> => {
  const path = baseUrl + encodeUrl(url, params);
  return new Promise((resolve, reject) => {
    const token = sessionStorage.getItem('jwtToken');
    if ((!options || !options.skipAuth) && (!token || token === '')) {
      reject(new Error('No token found'));
    }
    fetch(path, {
      method: 'GET',
      headers: { 'x-access-token': token },
      ...options
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

export const postRequest = (url, params, options): Promise<*> => {
  const path = baseUrl + url;
  return new Promise((resolve, reject) => {
    const token = sessionStorage.getItem('jwtToken');
    if ((!options || !options.skipAuth) && (!token || token === '')) {
      reject(new Error('No token found'));
    }
    fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(params),
      ...options
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};
