from src import db

class User(db.Model):
  __tablename__ = 'user'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  email = db.Column(db.String(128), unique_key=True)
  password = db.Column(db.String(256))

class Type:
  __tablename__ = 'type'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  desc = db.Column(db.String(50))

class Clothes:
  __tablename__ = 'clothes'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  image = db.Column(db.LargeBinary)
  type = db.Column(db.Integer)
  user = db.Column(db.Integer)
  color = db.Column(db.Integer)

class History(db.Model):
  __tablename__ = 'history'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  created = db.Column(db.DateTime)
  user = db.Column(db.Integer)
  pants = db.Column(db.Integer)
  shirt = db.Column(db.Integer)
  shoe = db.Column(db.Integer)





