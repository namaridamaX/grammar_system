# app.py
from flask import Flask
from flask_cors import CORS
from controllers.grammar_controller import grammar_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # CORSの設定
    CORS(app)

    # Blueprintsの登録
    app.register_blueprint(grammar_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)