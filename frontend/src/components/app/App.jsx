import React from 'react';
import { 
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import { alertActions } from '../../actions';
import { history } from '../../helpers';

import CreateUserPage from '../createUser/CreateUser';
import Login from '../login/Login';
import './App.css';

export default function App() {
  return (
    <div id="content">
      <Router history={history}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path={'/create-account'}>
            <CreateUserPage />
          </Route>
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
