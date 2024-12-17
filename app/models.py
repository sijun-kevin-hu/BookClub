from app import db

class User(db.Model):
    id = db.Column("id", db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    books = db.relationship('Book', backref='user')
    
    def __init__(self, username, email):
        self.username = username
        self.email = email

class Book(db.Model):
    id = db.Column("id", db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    authorName = db.Column(db.String(80))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    def __init__(self, title, authorName, user_id):
        self.title = title
        self.authorName = authorName
        self.user_id = user_id