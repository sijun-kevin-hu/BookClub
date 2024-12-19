from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from flask_login import login_required, current_user
from ..models import User, Book, db

bp = Blueprint('user', __name__)

@bp.route("/user", methods=["POST"])
@login_required
def user():
    usr = User.query.filter_by(id=current_user.id).first()
    if request.method == "GET":
        return render_template("user.html", values=usr)
    else:
        title = request.form["title"]
        author = request.form["author"]
        user_id = usr.id
        book = Book(title=title, author=author, user_id=user_id)
        db.session.add(book)
        db.session.commit()
        return render_template("user.html", values=user)
    
@bp.route("/view")
def view():
    return render_template("view_user.html", values=User.query.all())
