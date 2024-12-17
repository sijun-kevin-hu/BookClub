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
    
    def __init__(self, title, authorName, user_id):
        self.title = title
        self.authorName = authorName
        self.user_id = user_id
        
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/view")
def view():
    return render_template("view.html", values=User.query.all())

@app.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        email = request.form["email"]
        name = request.form["name"]
        
        found_user = User.query.filter_by(email=email).first()
        if found_user:
            print("Email exists.")
            return render_template("login.html")
        else:
            session["email"] = email
            session["user"] = name
            usr = User(name, email)
            db.session.add(usr)
            db.session.commit()
            print("Saved User")
            return render_template("login.html")
    else:
        return render_template("register.html")
    
@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        
        found_user = User.query.filter_by(email=email).first()
        if found_user:
            session["email"] = found_user.email
            session["user"] = found_user.username    
            return redirect(url_for("user"))     
        else:
            print("No email")
            return render_template("login.html")
    else:
        if "user" in session:
            return redirect(url_for("user"))
        return render_template("login.html")
    
@app.route("/user", methods=["POST", "GET"])
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