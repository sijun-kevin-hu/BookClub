from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from werkzeug.security import generate_password_hash
from flask_mail import Mail
 
db = SQLAlchemy()
mail = Mail()

def create_app():
    app = Flask(__name__)
    app.secret_key = "hello"
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
    db.init_app(app)
    mail.init_app(app)
    
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = 'email@example.com'
    app.config['MAIL_PASSWORD'] = 'email@example.com'
    app.config['MAIL_DEFAULT_SENDER'] = 'email@example.com'
    
    
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
        
        if not User.query.filter_by(username="admin").first():
            admin_user = User(username="admin", email="admin@admin.com", password=generate_password_hash("admin", method="pbkdf2:sha256"))
            db.session.add(admin_user)
            db.session.commit()
    return app
