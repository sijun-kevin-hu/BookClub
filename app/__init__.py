from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "hello"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'

db = SQLAlchemy(app)

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
    
    def __init__(self, bookName, authorName):
        self.bookName = bookName
        self.authorName = authorName
        
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/view")
def view():
    return render_template("view.html", values=User.query.all())

@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        user = request.form["name"]
        session["user"] = user
        
        found_user = User.query.filter_by(username=user).first()
        if found_user:
            session["email"] = found_user.email            
        else:
            usr = User(user, "")
            db.session.add(usr)
            db.session.commit()
        return redirect(url_for("user"))
    else:
        if "user" in session:
            return redirect(url_for("user"))
        return render_template("login.html")
    
@app.route("/user", methods=["POST", "GET"])
def user():
    email = None
    if "user" in session:
        user = session["user"]
        
        if request.method == "POST":
            email = request.form["email"]
            session["email"] = email
            found_user = User.query.filter_by(username=user).first()
            found_user.email = email
            db.session.commit()
            return render_template("user.html", email=email)
        else:
            if "email" in session:
                email = session["email"]
        return render_template("user.html", email=email)
    else:
        return redirect(url_for("login"))

@app.route("/logout")
def logout():
    session.pop("user", None)
    session.pop("email", None)
    flash("You have been logged out!", "info")
    return redirect(url_for("login"))

with app.app_context():
    db.create_all()
    
if __name__ == "__main__":
    app.run(debug=True)