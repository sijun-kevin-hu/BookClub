from flask import Blueprint, request, redirect, url_for, jsonify
from flask_login import login_required, current_user
from ..models import Book, User, db

bp = Blueprint('book', __name__, url_prefix="/api/book")

@bp.route("/add", methods=["POST"])
@login_required
def add_book():
    try:
        data = request.json
        title = data["title"]
        author = data["author"]
        
        book = Book(title, author, user_id=current_user.id)
        db.session.add(book)
        db.session.commit()
        return jsonify({
            "status": "success",
            "message": "Successfully Added Book!"
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Add Book Failed"
        })

@bp.route("/delete/<int:book_id>", methods=["POST"])
def delete_book(book_id):
    book = Book.query.filter_by(id=book_id).first()
    db.session.delete(book)
    db.session.commit()
    return redirect(url_for("user.user"))

@bp.route("/", methods=["GET"])
@login_required
def get_books():
    try:
        books = Book.query.filter_by(user_id=current_user.id).all()
        books_list = [{"title": book.title, "author": book.author} for book in books]
        return jsonify({
            "status": "success",
            "books": books_list
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Fetch Book Failed"
        })
        