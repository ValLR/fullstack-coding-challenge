const apiUrl = 'http://localhost:4000';

export const userService = { 
  login,
  logout,
  register
};

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }

  return fetch(`${apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };
  const url = `${apiUrl}/users/authenticate`;
  
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

function logout() {
  localStorage.getItem('user');
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if(!response.ok) {
      if(response === 401) {
        logout();
      }
      const error = response.status || (data && data.message);
      
      return Promise.reject(error);
    }
    return data;
  });
}
