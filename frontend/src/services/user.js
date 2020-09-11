var base64 = require('base-64');
const apiUrl = '/';

export const userService = { 
  login,
  logout,
  register
};

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }

  return fetch(`${apiUrl}user`, requestOptions).then(handleResponse);
}

function login(email, password) {
  const requestOptions = {
    headers: {
      "Authorization": `Basic ${base64.encode(`${email}:${password}`)}`
    },
  };
  // console.log(fetch(`${apiUrl}login`, requestOptions).then(handleResponse));
  return fetch(`${apiUrl}login`, requestOptions).then(handleResponse)
    .then(user => {
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
  );
}

function logout() {
  localStorage.getItem('user');
  localStorage.removeItem('user');
}

function handleResponse(response) {
  console.log('HANDLE RESPONSE::::::');
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if(!response.ok) {
      if(response !== 200) {
        logout();
      }
      const error = response.status || (data && data.message);
      
      return Promise.reject(error);
    }
    return data;
  });
}
