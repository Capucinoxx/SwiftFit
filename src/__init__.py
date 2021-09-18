from flask import Flask

def create_app() -> Flask:
  app = Flask(__name__, template_folder='templates')

  from .routes import routes
  app.register_blueprint(routes, url_prefix='/')

  return app