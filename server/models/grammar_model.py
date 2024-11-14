import requests
from config import Config

class GrammarModel:
    CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions'

    @staticmethod
    def check_grammar(text_to_check):
        payload = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": f"Please check the grammar of the following text: {text_to_check}"
                }
            ],
            "max_tokens": 1000
        }

        headers = {
            'Authorization': f'Bearer {Config.OPENAI_API_KEY}',
            'Content-Type': 'application/json'
        }

        response = requests.post(GrammarModel.CHATGPT_API_URL, json=payload, headers=headers)

        if response.status_code == 200:
            result = response.json()
            return result['choices'][0]['message']['content']
        else:
            return None