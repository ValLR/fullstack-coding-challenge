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
import './App.css';

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={'/create-account'}>
          <CreateUserPage />
        </Route>
        <Redirect from="*" to="/create-account" />
      </Switch>
    </Router>
  );
}

function mapState(state) {
  return {
    alert: state.alert
  }
}

const connectedApp = connect(mapState)(App);
export { connectedApp as App };
