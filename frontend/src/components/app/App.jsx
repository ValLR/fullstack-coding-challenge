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
import CreateUser from '../createUser/CreateUser';
import './App.css';

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={'/create-account'}>
          <CreateUser />
        </Route>
        <Redirect from="*" to="/create-account" />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    counter: state.alert
  }
}

const actionDispatcher = {
  clearAlerts: alertActions.clear,
}

const connectedApp = connect(mapStateToProps, actionDispatcher)(App);
export { connectedApp as App };
