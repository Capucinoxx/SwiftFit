import io
import hashlib
from flask import Blueprint, Flask, render_template, request, jsonify
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

@routes.route('/auth/login', methods=['POST'])
def auth_login():
  data = request.json
  email = data['email']
  password = data['password']

  if email and password:
    login = User.query.filter_by(
      email = email,
      password = sha512(password)
    ).first()

    if login is not None:
      return jsonify({
        'id': login.id
      })
  return jsonify({ "Status": "erreur" })

@routes.route('/auth/register', methods=['POST'])
def auth_register():
  data = request.json
  email = data['email']
  password = data['password']

  new_user = User(
    email = email,
    password = sha512(password)
  )

  db.session.add(new_user)
  db.session.commit()

  return { "email": email }

@routes.route('/image/new', methods=['POST'])
def image_new():
  data = request.json
  uid = data['uid']
  image = data['image']
  print(image)
  height = data['height']
  width = data['width']

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

@routes.route('/clothes/<id>')
def get_images(id):
  clothes: Optional[Clothes] = Clothes.query.filter_by(user_id=id).limit(100)

  if not clothes:
    return []

  return clothes

@routes.route('/history/<id>')
def get_history(id):
  histories: Optional[History] = History.query.filter_by(user_id=id).limit(100)

  if not histories:
    return []

  return histories

@routes.route('/clothes/<id>/<clothes>')
def del_clothes(id, clothes):
  return Clothes.query.delete(Clothes.query.filter_by(id=clothes, user_id=id).first())