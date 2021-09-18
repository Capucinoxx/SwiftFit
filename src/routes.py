
import hashlib
from flask import Blueprint, Flask, render_template, request
from src.models import User
from src import db

def sha512(password: str) -> str:
  return hashlib.sha512(password.encode('utf-8')).hexdigest()

routes = Blueprint("routes", __name__)

@routes.route('/')
def entry_point():
  return render_template('index.jinja2')

@routes.route('/auth/login', methods=('GET', 'POST'))
def auth_login():
  email = request.form['email']
  password = request.form['password']

  if email and password:
    login = User.query.filter_by(
      email = email,
      password = sha512(password)
    ).first()

    if login is not None:
      return {
        'id': login.id
      }
  return { "Status": "erreur" }

@routes.route('/auth/register', methods=('GET', 'POST'))
def auth_register():
  print(request.form)
  email = request.form['email']
  password = request.form['password']

  new_user = User(
    email = email,
    password = sha512(password)
  )

  db.session.add(new_user)
  db.session.commit()

  return { "email": email }