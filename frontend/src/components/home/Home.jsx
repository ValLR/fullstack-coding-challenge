import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import image from '../../images/legalbot-logo-vertical.png';
import './home.css';

class Home extends Component {
  getGreeting = (user) => {
    return `¡Bienvenid${this.getFinalLetter(user.gender)} de nuevo,`;
  }

  getFinalLetter = (gender) => {
    if (gender === 'F') {
      return 'a';
    } else if (gender === 'M') {
      return 'o';
    } else {
      return '@';
    }
  }

  render() {
    const { user } = this.props;
    const name = `${user.firstName}${` ${user.lastName}` ?? ''}!`;

    return(
      <div>
        <div className="content-container" id="home">
          <div className="d-flex justify-content-right">
            <img src={image} alt="que hacemos" id="home-image"/>
            <div className="greeting-container">
              <h2 className="title">{this.getGreeting(user)}</h2>
              <h3 className="highlight-text">{name}</h3>
            </div>
          </div>
          <div className="text-center">
            <Link to="/login" className="btn">
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapState(state) {
  const { authentication } = state;
  const { user } = authentication;
  return { user };
}

const HomePage = connect(mapState)(Home);
export default HomePage;
