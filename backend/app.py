from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sql')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize db
db = SQLAlchemy(app)

#Initialize ma
ma = Marshmallow(app)

# User Class/Model
class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  firstName = db.Column(db.String(100))
  lastName = db.Column(db.String(100))
  email = db.Column(db.String(100), unique=True)
  password = db.Column(db.String(100))
  gender = db.Column(db.String(1))

  def __init__(self, firstName, lastName, email, password, gender):
    self.firstName = firstName
    self.lastName = lastName
    self.email = email
    self.password = password
    self.gender = gender

# User Schema
class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'firstName', 'lastName', 'email', 'password', 'gender')

# Initialize schemprint('error')a
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Create User
@app.route('/user', methods=['POST'])
def add_user():
  firstName = request.json['firstName']
  lastName = request.json.get('lastName')
  email = request.json['email']
  password = request.json['password']
  gender = request.json['gender']

  new_user = User(firstName, lastName, email, password, gender)

  try: 
    db.session.add(new_user)
    db.session.commit()
  except:
    abort(400, 'Ya existe un email asociado a esa cuenta')

  return user_schema.jsonify(new_user)
  
# Login
@app.route('/login')
def login():
  auth = request.authorization
  if not auth or not auth.username or not auth.password:
    return abort(401, 'No pudimos verificar sus credenciales')

  user = User.query.filter_by(email=auth.username).first()
  if not user:
    return abort(401, 'No pudimos encontrar al usuario ingresado')
  
  if (user.password == auth.password):
    user_data = {}
    user_data['firstName'] = user.firstName
    user_data['lastName'] = user.lastName
    user_data['email'] = user.email
    user_data['password'] = user.password
    user_data['gender'] = user.gender

    return jsonify({'user' : user_data})

  return abort(401, 'Por favor inicie sesión')

# Run Server
if __name__ == '__main__':
  app.run(debug=True)
