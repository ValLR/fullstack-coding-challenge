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
  
# Run Server
if __name__ == '__main__':
  app.run(debug=True)
