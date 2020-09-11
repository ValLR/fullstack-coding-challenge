import React, { Component } from 'react';
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input
} from 'reactstrap';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        password: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { user } = this.state;
    const { name, value } = e.target;

    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { user } = this.state;
    const { register } = this.props;

    register(user);
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <h1 className="title">Crear usuario</h1>
        <div className="content-container" id="create-user">
          <Form className="form">
            <FormGroup>
              <Label for='firstName'>Nombre</Label>
              <Input onChange={this.handleChange} type="text" name="firstName" id="firstName" placeholder="Ej: Juan" />
            </FormGroup>
            <FormGroup>
              <Label for='lastName'>Apellido</Label>
              <Input onChange={this.handleChange} type="text" name="lastName" id="lastName" placeholder="Ej: Pérez" />
            </FormGroup>
            <FormGroup>
              <Label for="gender">Género</Label>
              <Input onChange={this.handleChange} type="select" name="gender" id="gender">
                <option value="f">Femenino</option>
                <option value="m">Masculino</option>
                <option value="o">Otro</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input onChange={this.handleChange} type="email" name="email" id="email" placeholder="Ej: usuario@ejemplo.com" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Input onChange={this.handleChange} type="password" name="password" id="password" placeholder="Ingrese contraseña" />
            </FormGroup>
            <Button onClick={this.handleSubmit}>
              Crear Usuario
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register
}

const CreateUserPage = connect(mapState, actionCreators)(CreateUser);
export default CreateUserPage;
