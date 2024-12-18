from flask import Blueprint, request, session, url_for, redirect, render_template, flash
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from ..models import User

bp = Blueprint("auth", __name__, url_prefix="/auth")

@bp.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        
        found_user = User.query.filter_by(email=email).first()
        if found_user and check_password_hash(found_user.password, password):
            login_user(found_user)   
            return redirect(url_for("user.user"))     
        else:
            flash("Please check your login details and try again")
            return redirect(url_for("auth.login"))
    else:
        if current_user.is_authenticated:
            return redirect(url_for("user.user"))
        return render_template("login.html")

@bp.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You have been logged out!", "info")
    return redirect(url_for("auth.login"))

@bp.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        name = request.form["name"]
        
        found_user = User.query.filter_by(email=email).first()
        if found_user:
            flash("Email exists", "info")
            return redirect(url_for("auth.register"))
        else:
            usr = User(username=name, email=email, password=generate_password_hash(password, method="pbkdf2:sha256"))
            db.session.add(usr)
            db.session.commit()
            flash("Saved User", "info")
            return redirect(url_for("auth.login"))
    else:
        return render_template("register.html")
