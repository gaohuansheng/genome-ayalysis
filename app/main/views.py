from flask import render_template

from . import main


@main.route('/', methods=['GET', 'POST'])
def index():
    return render_template('home.html')


@main.route('/tda', methods=['GET', 'POST'])
def tda():
    return render_template("test.html")

