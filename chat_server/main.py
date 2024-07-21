from flask import Flask, request
from chatterbot import languages
from chatterbot import ChatBot
import json
import MeCab
import os

app = Flask(__name__)

class MecabTagger(object):
    def __init__(self):
        self.tagger = MeCab.Tagger('-Owakati')

    def get_text_index_string(self, text):
        text = str(text) 
        bigram_pairs = []
        document = self.tagger.parseToNode(text)
        while document:
            feature = document.feature.split(',')
            if feature[0] not in ['補助記号', '記号']:
                bigram_pairs.append(feature[-1])
            document = document.next
        return ' '.join(bigram_pairs)
    
def remove_invalid_chars(text):
    return text.replace('\ufffd', '')    

bot = ChatBot(
        name='AI',
        tagger=MecabTagger,
    	storage_adapter='chatterbot.storage.MongoDatabaseAdapter',
    	database_uri='mongodb://192.168.0.34:27017/chat'
)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_data(as_text=True)
    cleaned_data = remove_invalid_chars(data)
    result = bot.get_response(cleaned_data)
    print(cleaned_data + "|" + str(result))
    return str(result)

if __name__ == '__main__':
    #app.run(debug=True, host='0.0.0.0' ,port=6001)
    app.run()