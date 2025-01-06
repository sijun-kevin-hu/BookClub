from flask import Blueprint, request, jsonify
<<<<<<< HEAD
from itsdangerous import URLSafeTimedSerializer
=======
>>>>>>> parent of 3a55a6c (implement password reset functionality with email notifications)
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from ..models import User

bp = Blueprint("auth", __name__, url_prefix="/auth")

@bp.route("/user", methods=["GET"])
@login_required
def getUser():
    try:
        return jsonify({
            "status": "success",
            "message": "User found",
            "username": current_user.username
        })
    except Exception as e:
        print(f"Error in getUser: {e}")
        return jsonify({
            "status": "error",
            "message": "Server Error"
        })

@bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        email = data["email"]
        password = data["password"]
        
        found_user = User.query.filter_by(email=email).first()
        if found_user and check_password_hash(found_user.password, password):
            login_user(found_user)   
            return jsonify({
                "status": "success",
                "message": "User logged in."
            })    
        else:
            return jsonify({
                "status": "error",
                "message": "Check email and password again."
            })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Server Error"
        })

@bp.route("/logout", methods=["DELETE"])
@login_required
def logout():
    try:
        logout_user()
        return jsonify({
            "status": "success",
            "message": "Successfully logged out!"
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Server error"
        })

@bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        username = data["username"]
        email = data["email"]
        password = data["password"]
        
        found_user = User.query.filter_by(email=email).first()
        if found_user:
            return jsonify({
                "status": "error",
                "message": "Email already exists"
            })
        else:
            usr = User(username=username, email=email, password=generate_password_hash(password, method="pbkdf2:sha256"))
            db.session.add(usr)
            db.session.commit()
            return jsonify({"status": "success"})
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": "Server error"
        })
        
@bp.route("/all", methods=["GET"])
def get_users():
    try:
        users = User.query.all()
        users_list = [{"username": user.username, "email": user.email, "password": user.password, "books": user.books} for user in users]
        return jsonify({
            "status": "success",
            "message": "Successfully fetched users",
            "users": users_list
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Server Error"
        })
        
@bp.route("/admin", methods=["GET"])
@login_required
def check_admin():
    try:
        admin_user = User.query.filter_by(username="admin").first()
        if current_user.id != admin_user.id:
            return jsonify({
                "status": "error"
            })
        else:
            return jsonify({
                "status": "success"
            })
    except Exception as e:
        return jsonify({
            "status": "error"
        })