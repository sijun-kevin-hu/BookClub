from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from flask_login import login_required, current_user
from ..models import Book, User, db

bp = Blueprint('book', __name__, url_prefix="/api/book")

@bp.route("/add", methods=["GET", "POST"])
@login_required
def add_book():
    if request.method == "POST":
        usr = User.query.get(current_user.id)
        title = request.form["title"]
        author = request.form["author"]
        book = Book(title, author, user_id=usr.id)
        db.session.add(book)
        db.session.commit()
        return redirect(url_for("user.user"))
    else:
        return render_template("add_book.html")

@bp.route("/delete/<int:book_id>", methods=["POST"])
def delete_book(book_id):
    book = Book.query.filter_by(id=book_id).first()
    db.session.delete(book)
    db.session.commit()
    return redirect(url_for("user.user"))

@bp.route("/", methods=["GET"])
@login_required
def get_books():
    books = Book.query.filter_by(user_id=current_user.id).all()
    books_list = [{"title": book.title, "author": book.author} for book in books]
    return jsonify(books_list)