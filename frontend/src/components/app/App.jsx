import React from 'react';
import { 
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

import { alertActions } from '../../actions';
import { history } from '../../helpers';
import PrivateRoute from '../PrivateRoute';
import CreateUserPage from '../createUser/CreateUser';
import Login from '../login/Login';
import Home from '../home/Home';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div id="content">
        {alert.message && (
          <Alert color={alert.type}>
            {alert.message}
          </Alert>
        )}
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
}

function mapState(state) {
  return {
    alert: state.alert
  }
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export default connectedApp;
