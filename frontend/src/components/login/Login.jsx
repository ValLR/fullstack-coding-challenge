import React, { Component } from 'react';
import { 
  Button, 
  Form, 
  FormGroup,
  FormFeedback,
  Label,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import logoMachine from '../../images/legalbot-maquina.png';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.props.logout();

    this.state = {
      email: '',
      password: '',
      isSubmitted: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      isSubmitted: true
    });

    const { email, password } = this.state;
    const { login } = this.props;

    if (email.length > 0 && password.length > 0) {
      login(email, password);
    }
  }

  render() {
    const { email, password, isSubmitted } = this.state;
    return (
      <div>
        <h1 className="title">Iniciar sesión</h1>
        <div className="content-container" id="login">
          <div className="text-center image-container">
            <img src={logoMachine} alt="legalbot logo maquina" id="login-image"/>
          </div>
          <Form className="form">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                onChange={this.handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="Ej: usuario@ejemplo.com"
                invalid={isSubmitted && email.length < 1}
              />
              <FormFeedback>Campo obligatorio</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Input
                onChange={this.handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="Ingrese contraseña"
                invalid={isSubmitted && password.length < 1}
              />
              <FormFeedback>Campo obligatorio</FormFeedback>
            </FormGroup>
            <div className="d-flex">
              <Button onClick={this.handleSubmit}>
                Ingresa
              </Button>
              <Link to="/create-account" className="btn btn-link">
                Crea una cuenta
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { loggedIn } = state.authentication;
  return { loggedIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
}

const LoginPage = connect(mapState, actionCreators)(Login);
export default LoginPage;