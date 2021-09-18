import io
import hashlib
from flask import Blueprint, Flask, render_template, request
from src.models import User, Clothes
from src import db
import base64
from PIL import Image

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

@routes.route('/image/new', methods=('GET', 'POST'))
def image_new():
  uid = request.form['id']
  image = request.form['image']
  height = request.form['height']
  width = request.form['width']

  # on crée une copie de l'image en format 28px par 28px
  buffer = io.BytesIO()
  imgdata = base64.b64decode(image)
  img = Image.open(io.BytesIO(imgdata))
  img28x28 = img.resize((28, 28))
  img28x28.save(buffer, format="PNG")

  # on envoi img 28x28 a lIA 
  type, color = 0,0 # a remplacer par le call d'IA

  # on sotre dans la DB
  new_img = Clothes(
    image = image,
    type = type,
    color = color,
    user = uid
  )

  db.session.add(new_img)
  db.session.commit()

  return { "code": "success" }