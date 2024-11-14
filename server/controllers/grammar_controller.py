from flask import Blueprint, request, jsonify
from models.grammar_model import GrammarModel

grammar_bp = Blueprint('grammar', __name__)

@grammar_bp.route('/api/check', methods=['POST'])
def check():
    data = request.json
    text_to_check = data.get('text', "")

    if not text_to_check:
        return jsonify({'error': 'No text provided'}), 400
    
    corrected_text = GrammarModel.check_grammar(text_to_check)

    if corrected_text:
        return jsonify({'corrected_text': corrected_text})
    else:
        return jsonify({'error': 'failed to get response from OpenAI API'}), 500