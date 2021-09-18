from flask import Blueprint, Flask, render_template

routes = Blueprint("routes", __name__)

@routes.route('/')
def entry_point():
    return render_template('index.jinja2')