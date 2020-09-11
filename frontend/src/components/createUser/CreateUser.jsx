import React, { Component } from 'react';
import { 
  Button, 
  Form, 
  FormGroup, 
  FormFeedback,
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
        gender: 'F',
        email: '',
        password: '',
      },
      isSubmitted: false,
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

  emailValidation = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  passwordValidation = (password) => {
    return (password.length >= 8 && /[*@!#%&()^~{}]+/.test(password))
  }

  nameValidation = (name) => name.length > 0;

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      isSubmitted: true
    });

    const { user } = this.state;
    const { register } = this.props;

    const obj = {...user};
    if (user.lastName.length === 0) {
      delete obj['lastName'];
    }
    if (
      this.nameValidation(user.firstName)
      && this.emailValidation(user.email)
      && this.passwordValidation(user.password)
    ) {
      register(obj); 
    }
  }

  render() {
    const { user, isSubmitted } = this.state;
    return (
      <div>
        <h1 className="title">Crear usuario</h1>
        <div className="content-container" id="create-user">
          <Form className="form">
            <FormGroup validate={isSubmitted && !this.nameValidation(user.firstName)}>
              <Label for="firstName">Nombre</Label>
              <Input
                onChange={this.handleChange}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Ej: Juan"
                invalid={(isSubmitted && !this.nameValidation(user.firstName))}
              />
              <FormFeedback>Campo obligatorio</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Apellido</Label>
              <Input onChange={this.handleChange} type="text" name="lastName" id="lastName" placeholder="Ej: Pérez" />
            </FormGroup>
            <FormGroup>
              <Label for="gender">Género</Label>
              <Input onChange={this.handleChange} type="select" name="gender" id="gender">
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
                <option value="O">Otro</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                onChange={this.handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="Ej: usuario@ejemplo.com"
                invalid={isSubmitted && !this.emailValidation(user.email)}  
              />
              <FormFeedback>Ingrese un email válido</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Input
                onChange={this.handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="Ingrese contraseña"
                invalid={isSubmitted && !this.passwordValidation(user.password)}
              />
              <FormFeedback>
                Su contraseña debe incluir al menos 1 caracter especial (ej: $%...) y tener al menos 8 caracteres
              </FormFeedback>
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
