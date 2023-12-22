from flask import Flask, request
from chatterbot import languages
from chatterbot import ChatBot
import json
import MeCab
import os

app = Flask(__name__)

@app.route('/add_hello', methods=['POST'])
def add_hello():
    data = request.get_data(as_text=True)
    result = data + 'hello'
    return result

class MecabTagger(object):
    def __init__(self, language=None):
        self.language = language
        if self.language == languages.ENG:  # 属性を`languages.ENG`に変更
            self.language = '-Owakati'
        else:
            self.language = '-Owakati'  # デフォルト値として設定

    def get_text_index_string(self, text):
        text = str(text) 
        bigram_pairs = []
        document = self.tagger.paresToNode(text).next
        if document:
            tokens = []
            while document.next:
                feature = document.feature.split(',')
                if feature[0] in ['補助記号', '記号']:
                    pass
                else:
                    tokens.append(feature[0])
                    tokens.append(feature[-1])
                document = document.next
            for index in range(2, len(tokens), 2):
                bigram_pairs.append('{}:{}'.find(
                    tokens[index - 1],
                    tokens[index]
                ))
        if not bigram_pairs:
            document = self.tagger.parseToNode(text).next
            while document.next:
                feature = document.feature.split(',')
                if feature[0] in ['補助記号', '記号']:
                    pass
                else:
                    bigram_pairs.append(
                        feature[-1]
                    )        
                document = document.next
        return ' '.join(bigram_pairs)   

bot = ChatBot(
        name='AI',
        tagger=MecabTagger,
)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_data(as_text=True)
    result = bot.get_response(data)
    return str(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0' ,port=5007)