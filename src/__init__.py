from os import path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


DB_PATH = 'swiftfit.db'
db = SQLAlchemy()

def create_app() -> Flask:
  app = Flask(__name__, template_folder='templates')
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

  db.init_app(app=app)

  if not path.isfile(DB_PATH):
    from src.models import User, Type, Clothes, History
    db.create_all(app=app)


  from .routes import routes
  app.register_blueprint(routes, url_prefix='/')

  return app