from app import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column("id", db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    books = db.relationship('Book', backref='user')
    
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

class Book(db.Model):
    id = db.Column("id", db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    author = db.Column(db.String(80))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    def __init__(self, title, author, user_id):
        self.title = title
        self.author = author
        self.user_id = user_id