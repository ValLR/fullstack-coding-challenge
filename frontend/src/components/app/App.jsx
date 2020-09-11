import React from 'react';
import { 
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../helpers';

import PrivateRoute from '../PrivateRoute';
import CreateUserPage from '../createUser/CreateUser';
import Login from '../login/Login';
import Home from '../home/Home';
import './App.css';

export default function App() {
  return (
    <div id="content">
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path={'/create-account'} component={CreateUserPage} loggedIn={false} />
          <Route path={'/login'} component={Login} />
          <PrivateRoute exact path={'/'} component={Home} loggedIn />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

function mapState(state) {
  return {
    alert: state.alert
  }
}

const connectedApp = connect(mapState)(App);
export { connectedApp as App };
