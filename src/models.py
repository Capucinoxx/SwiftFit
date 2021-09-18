from src import db

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  email = db.Column(db.String(128))
  password = db.Column(db.String(128))

class Type:
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  desc = db.Column(db.String(50))

class Clothes:
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  type = db.relationship(Type, backref='clothes')
  user = db.relationship(User, backref='clothes')
  color = db.Column(db.Integer)

class History(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  created = db.Column(db.DateTime)
  user = db.relationship(User, backref='history')
  pants = db.relationship(Clothes, backref='clothes')
  shirt = db.relationship(Clothes, backref='clothes')
  shoe = db.relationship(Clothes, backref='clothes')





