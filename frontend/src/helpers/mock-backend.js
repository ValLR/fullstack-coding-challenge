let users = JSON.parse(localStorage.getItem('users')) || [];
    
export function setupMockBackend() {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {

    setTimeout(() => {
      // Create user
      if (url.endsWith('/users/register') && opts.method === 'POST') {
        let newUser = JSON.parse(opts.body);

        // validation
        let duplicateUser = users.filter(user => { return user.email === newUser.email; }).length;
        if (duplicateUser) {
          reject('email "' + newUser.email + '" está asociado a otra cuenta');
          return;
        }

        // Save new user
        newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK
        resolve({ ok: true, text: () => Promise.resolve() });

        return;
      }

      // authentication
      if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
        let params = JSON.parse(opts.body);

        const match = users.find(user => (user.email === params.email && user.password === params.password));
        
        if (match) {
          let responseJson = {
            id: match.id,
            email: match.email,
            firstName: match.firstName,
            lastName: match.lastName,
            gender: match.gender,
            token: 'jwt-token'
          };
          resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(responseJson))
          });
        } else {
          reject('Credenciales incorrectas')
        }
        return;
      }

      // pass through any requests not handled above
      realFetch(url, opts).then(response => resolve(response));

      }, 500);
    });
  }
}
