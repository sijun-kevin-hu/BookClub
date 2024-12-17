from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from ..models import User, Book, db

bp = Blueprint('user', __name__)

@bp.route("/")
def home():
    return render_template("index.html")

@bp.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        email = request.form["email"]
        name = request.form["name"]
        
        found_user = User.query.filter_by(email=email).first()
        if found_user:
            print("Email exists.")
            return redirect(url_for("user.login"))
        else:
            session["email"] = email
            session["user"] = name
            usr = User(name, email)
            db.session.add(usr)
            db.session.commit()
            print("Saved User")
            return redirect(url_for("user.login"))
    else:
        return render_template("register.html")
    
@bp.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        
        found_user = User.query.filter_by(email=email).first()
        if found_user:
            session["email"] = found_user.email
            session["user"] = found_user.username    
            return redirect(url_for("user.user"))     
        else:
            print("No email")
            return render_template("login.html")
    else:
        if "user" in session:
            return redirect(url_for("user.user"))
        return render_template("login.html")
    
@bp.route("/user", methods=["POST", "GET"])
def user():
    if "user" in session:
        sessionUser = session["user"]
        user = User.query.filter_by(username=sessionUser).first()
        if request.method == "GET":
            return render_template("user.html", values=user)
        else:
            title = request.form["title"]
            author = request.form["author"]
            user_id = user.id
            book = Book(title=title, authorName=author, user_id=user_id)
            db.session.add(book)
            db.session.commit()
            return render_template("user.html", values=user)
    else:
        return redirect(url_for("login"))
    
@bp.route("/logout")
def logout():
    session.pop("user", None)
    session.pop("email", None)
    flash("You have been logged out!", "info")
    return redirect(url_for("user.login"))

@bp.route("/view")
def view():
    return render_template("view_user.html", values=User.query.all())
