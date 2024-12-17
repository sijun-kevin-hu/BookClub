from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.secret_key = "hello"
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
    db.init_app(app)
    
    from app import models
    
    from .routes import user_routes, book_routes
    app.register_blueprint(user_routes.bp)
    app.register_blueprint(book_routes.bp)
    
    with app.app_context():
        db.create_all()
    
    return app
