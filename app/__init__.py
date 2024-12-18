from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.secret_key = "hello"
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
    db.init_app(app)
    
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    
    from .models import User
    
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    from .routes import user_routes, book_routes, auth_routes
    app.register_blueprint(user_routes.bp)
    app.register_blueprint(book_routes.bp)
    app.register_blueprint(auth_routes.bp)
    
    with app.app_context():
        db.create_all()
    
    return app
