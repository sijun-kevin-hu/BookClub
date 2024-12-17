from flask import Blueprint, render_template
from ..models import Book

bp = Blueprint('book', __name__)