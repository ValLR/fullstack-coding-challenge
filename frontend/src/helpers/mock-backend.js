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
        let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
        if (duplicateUser) {
          reject('email "' + newUser.email + '" is already associated to an account');
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

      // pass through any requests not handled above
      realFetch(url, opts).then(response => resolve(response));

      }, 500);
    });
  }
}
