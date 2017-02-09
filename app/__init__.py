from flask import Flask,render_template
from flask_bootstrap import Bootstrap

app = Flask(__name__)

bootstrap = Bootstrap(app)


def create_app():
    app = Flask(__name__)
    bootstrap.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)



    return app
